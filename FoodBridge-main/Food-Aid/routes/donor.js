

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


