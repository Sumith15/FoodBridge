

// const express = require("express");
// const router = express.Router();
// const Donation = require("../models/donation");

// // 1. CREATE DONATION
// router.post("/api/donate", async (req, res) => {
//     try {
//         const { foodType, quantity, expiry, pickupTime, donorId, donorName, location } = req.body;
//         const newDonation = new Donation({
//             foodType, quantity, expiry, pickupTime,
//             donor: { id: donorId, name: donorName },
//             location: location, 
//             status: "pending",
//             co2Saved: (parseFloat(quantity) * 2.5).toFixed(1)
//         });
//         await newDonation.save();
//         res.status(200).json(newDonation);
//     } catch (err) { res.status(500).json({ error: "Save failed" }); }
// });

// // 2. GET DONATIONS (With Filters for Donor, Receiver, and Agent)
// router.get("/api/donations", async (req, res) => {
//     try {
//         const { status, agentId, userId, receiverId } = req.query;
//         let query = {};
        
//         if (status) query.status = status;
//         if (agentId) query["agent.id"] = agentId;
//         if (userId) query["donor.id"] = userId; // So Donor sees their own donations
//         if (receiverId) query["receiver.id"] = receiverId; // So Receiver sees their accepted donations

//         const donations = await Donation.find(query).sort({ createdAt: -1 });
//         res.json(donations);
//     } catch (err) { res.status(500).json({ error: "Fetch failed" }); }
// });

// // 3. RECEIVER ACCEPT -> Status: 'searching_agent'
// router.put("/api/donation/:id/accept", async (req, res) => {
//     try {
//         const { receiverId, receiverName, location } = req.body; // Capture Receiver Location
//         await Donation.findByIdAndUpdate(req.params.id, { 
//             status: "searching_agent",
//             receiver: { 
//                 id: receiverId,
//                 name: receiverName,
//                 location: location // { lat, lng }
//             }
//         });
//         res.json({ message: "Searching for agent..." });
//     } catch (err) { res.status(500).json({ error: "Update failed" }); }
// });

// // 4. AGENT CLAIM -> Status: 'assigned'
// router.put("/api/donation/:id/claim", async (req, res) => {
//     try {
//         const { agentId, agentName } = req.body;
//         await Donation.findByIdAndUpdate(req.params.id, { 
//             status: "assigned",
//             agent: { id: agentId, name: agentName }
//         });
//         res.json({ message: "Agent assigned" });
//     } catch (err) { res.status(500).json({ error: "Claim failed" }); }
// });

// // 5. AGENT PICKUP -> Status: 'transit'
// router.put("/api/donation/:id/pickup", async (req, res) => {
//     try {
//         await Donation.findByIdAndUpdate(req.params.id, { status: "transit" });
//         res.json({ message: "Food picked up" });
//     } catch (err) { res.status(500).json({ error: "Update failed" }); }
// });

// // 6. AGENT DELIVER -> Status: 'delivered'
// router.put("/api/donation/:id/deliver", async (req, res) => {
//     try {
//         await Donation.findByIdAndUpdate(req.params.id, { status: "delivered" });
//         res.json({ message: "Food delivered" });
//     } catch (err) { res.status(500).json({ error: "Update failed" }); }
// });


// // ==========================================
// // --- NEW ROUTES FOR LIVE TRACKING ---
// // ==========================================

// // 7. GET SINGLE DONATION (Used by the Tracker page to get live info)
// router.get("/api/donation/:id", async (req, res) => {
//     try {
//         const donation = await Donation.findById(req.params.id);
//         if (!donation) return res.status(404).json({ error: "Donation not found" });
//         res.json(donation);
//     } catch (err) { 
//         res.status(500).json({ error: "Fetch failed" }); 
//     }
// });

// // 8. UPDATE AGENT LIVE LOCATION (Called by Volunteer's phone every few seconds)
// router.put("/api/donation/:id/location", async (req, res) => {
//     try {
//         const { lat, lng } = req.body;
//         await Donation.findByIdAndUpdate(req.params.id, { 
//             agentLocation: { lat, lng } 
//         });
//         res.json({ message: "Location updated" });
//         // console.log(`📍 Received GPS from Agent: Lat ${lat}, Lng ${lng}`);
//     } catch (err) { 
//         res.status(500).json({ error: "Update failed" }); 
//     }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");

// --- 1. AI CONFIGURATION (Gemini) ---
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ensure GEMINI_API_KEY is in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to clean AI JSON response
const cleanAIResponse = (text) => {
    try {
        // Remove markdown backticks if present (e.g., ```json ... ```)
        const cleaned = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("JSON Parse Error:", e);
        return null; 
    }
};
// -------------------------------------

// 1. CREATE DONATION
router.post("/api/donate", async (req, res) => {
    try {
        const { foodType, quantity, expiry, pickupTime, donorId, donorName, location } = req.body;
        const newDonation = new Donation({
            foodType, quantity, expiry, pickupTime,
            donor: { id: donorId, name: donorName },
            location: location, 
            status: "pending",
            co2Saved: (parseFloat(quantity) * 2.5).toFixed(1)
        });
        await newDonation.save();
        res.status(200).json(newDonation);
    } catch (err) { res.status(500).json({ error: "Save failed" }); }
});

// 2. GET DONATIONS
router.get("/api/donations", async (req, res) => {
    try {
        const { status, agentId, userId, receiverId } = req.query;
        let query = {};
        
        if (status) query.status = status;
        if (agentId) query["agent.id"] = agentId;
        if (userId) query["donor.id"] = userId; 
        if (receiverId) query["receiver.id"] = receiverId; 

        const donations = await Donation.find(query).sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) { res.status(500).json({ error: "Fetch failed" }); }
});

// 3. RECEIVER ACCEPT
router.put("/api/donation/:id/accept", async (req, res) => {
    try {
        const { receiverId, receiverName, location } = req.body; 
        await Donation.findByIdAndUpdate(req.params.id, { 
            status: "searching_agent",
            receiver: { 
                id: receiverId,
                name: receiverName,
                location: location 
            }
        });
        res.json({ message: "Searching for agent..." });
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

// 4. AGENT CLAIM
router.put("/api/donation/:id/claim", async (req, res) => {
    try {
        const { agentId, agentName } = req.body;
        await Donation.findByIdAndUpdate(req.params.id, { 
            status: "assigned",
            agent: { id: agentId, name: agentName }
        });
        res.json({ message: "Agent assigned" });
    } catch (err) { res.status(500).json({ error: "Claim failed" }); }
});

// 5. AGENT PICKUP
router.put("/api/donation/:id/pickup", async (req, res) => {
    try {
        await Donation.findByIdAndUpdate(req.params.id, { status: "transit" });
        res.json({ message: "Food picked up" });
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

// 6. AGENT DELIVER
router.put("/api/donation/:id/deliver", async (req, res) => {
    try {
        await Donation.findByIdAndUpdate(req.params.id, { status: "delivered" });
        res.json({ message: "Food delivered" });
    } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

// ==========================================
// --- TRACKING ROUTES ---
// ==========================================

router.get("/api/donation/:id", async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ error: "Donation not found" });
        res.json(donation);
    } catch (err) { 
        res.status(500).json({ error: "Fetch failed" }); 
    }
});

router.put("/api/donation/:id/location", async (req, res) => {
    try {
        const { lat, lng } = req.body;
        await Donation.findByIdAndUpdate(req.params.id, { 
            agentLocation: { lat, lng } 
        });
        res.json({ message: "Location updated" });
    } catch (err) { 
        res.status(500).json({ error: "Update failed" }); 
    }
});

// ==========================================
// --- NEW AI ROUTES (GEMINI INTEGRATION) ---
// ==========================================

// 9. ANALYZE FOOD IMAGE (Vision API)
router.post("/api/analyze-food", async (req, res) => {
    try {
        const { image } = req.body; // Expects Base64 string
        if (!image) return res.status(400).json({ error: "No image provided" });

        // Clean Base64 string (remove data:image/jpeg;base64 prefix)
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            Analyze this food image. 
            Return a raw JSON object with:
            {
                "food": "Name of the dish/item",
                "qty": "Estimated weight in kg (number only, e.g. 2.5)",
                "expiry": "Safe consumption hours (number only, e.g. 4)"
            }
            If unclear, guess based on standard food safety.
        `;

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
        ]);

        const response = await result.response;
        const text = response.text();
        const data = cleanAIResponse(text);

        if (data) {
            res.json(data);
        } else {
            throw new Error("Failed to parse AI response");
        }

    } catch (err) {
        console.error("AI Vision Error:", err);
        // Fallback response so frontend doesn't crash
        res.status(500).json({ food: "Detected Item", qty: "1.0", expiry: "4" });
    }
});

// 10. ANALYZE VOICE COMMAND (Text-to-Data)
router.post("/api/analyze-voice", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "No text provided" });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Extract food details from this voice transcript: "${text}".
            Return a raw JSON object with:
            {
                "food": "Name of food",
                "qty": "Quantity in kg (number only)",
                "expiry": "Expiry in hours (number only)",
                "window": "Pickup window in mins (number only)"
            }
            Example: "I have 5kg rice cooked 2 hours ago" -> {"food": "Cooked Rice", "qty": 5, "expiry": 4, "window": 60}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonResponse = cleanAIResponse(response.text());

        if (jsonResponse) {
            res.json(jsonResponse);
        } else {
            throw new Error("Failed to parse AI response");
        }

    } catch (err) {
        console.error("AI Voice Error:", err);
        res.status(500).json({ error: "Voice analysis failed" });
    }
});

module.exports = router;