// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");

// // Middleware to check if user is authenticated (adjust based on your auth setup)
// // For Hackathon demo purposes, we will trust the ID passed in the body or params
// // In production, use: const ensureAuth = (req, res, next) => req.isAuthenticated() ? next() : res.status(401).json({error: "Unauthorized"});

// // 1. GET GARDEN STATUS
// router.get("/status/:userId", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         if (!user) return res.status(404).json({ error: "User not found" });
//         res.json(user.gamification);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // 2. HARVEST / EARN POINTS (Call this when a Donation is verified)
// router.post("/earn", async (req, res) => {
//     const { userId, actionType } = req.body;
//     // Action Types: "DONATION", "DELIVERY"
    
//     try {
//         const user = await User.findById(userId);
//         let xpGain = 0;
//         let tokenGain = 0;

//         if (actionType === "DONATION") {
//             xpGain = 100; // Grow tree
//             tokenGain = 5; // Spendable wood
//             user.gamification.impactStats.peopleFed += 10; // Mock calculation
//         } else if (actionType === "DELIVERY") {
//             xpGain = 150;
//             tokenGain = 10;
//             user.gamification.impactStats.co2Saved += 2.5;
//         }

//         user.gamification.xp += xpGain;
//         user.gamification.tokens += tokenGain;

//         // Level Up Logic (Simple: Level up every 500 XP)
//         const newLevel = Math.floor(user.gamification.xp / 500) + 1;
//         if (newLevel > user.gamification.level) {
//             user.gamification.level = newLevel;
//             // Bonus tokens for leveling up!
//             user.gamification.tokens += 20; 
//         }

//         await user.save();
//         res.json({ success: true, newStats: user.gamification, message: `Harvested ${tokenGain} Wood!` });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // 3. REDEEM COUPON
// router.post("/redeem", async (req, res) => {
//     const { userId, cost } = req.body;
//     try {
//         const user = await User.findById(userId);
//         if (user.gamification.tokens < cost) {
//             return res.status(400).json({ success: false, message: "Not enough Wood/Tokens!" });
//         }

//         user.gamification.tokens -= cost;
//         await user.save();
//         res.json({ success: true, remainingTokens: user.gamification.tokens });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user");

// 1. GET GARDEN STATUS
// This runs automatically when the user opens the Rewards page
router.get("/status/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        
        // If user has no gamification data yet, return defaults
        const stats = user.gamification || { xp: 0, tokens: 0, level: 1 };
        
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. HARVEST / EARN POINTS (Connected to "Simulate" Button)
router.post("/earn", async (req, res) => {
    const { userId } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // --- HACKATHON DEMO LOGIC ---
        // We initialize the object if it doesn't exist
        if (!user.gamification) {
            user.gamification = { xp: 0, tokens: 0, level: 1, impactStats: { peopleFed: 0, co2Saved: 0 } };
        }

        // Guaranteed Rewards for the Demo Button
        const xpGain = 100;
        const tokenGain = 10;

        user.gamification.xp += xpGain;
        user.gamification.tokens += tokenGain;
        
        // Update Impact Stats (Optional, looks good for judges)
        if (!user.gamification.impactStats) user.gamification.impactStats = {};
        user.gamification.impactStats.peopleFed = (user.gamification.impactStats.peopleFed || 0) + 5;

        // Level Up Logic: Level up every 500 XP
        const newLevel = Math.floor(user.gamification.xp / 500) + 1;
        
        if (newLevel > user.gamification.level) {
            user.gamification.level = newLevel;
            // Bonus tokens for leveling up!
            user.gamification.tokens += 20; 
        }

        await user.save();
        
        // Return "stats" so the frontend can update immediately
        res.json({ success: true, stats: user.gamification, message: `Harvested ${tokenGain} Wood!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 3. REDEEM COUPON
router.post("/redeem", async (req, res) => {
    const { userId, cost } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.gamification || user.gamification.tokens < cost) {
            return res.json({ success: false, message: "Not enough Wood/Tokens!" });
        }

        user.gamification.tokens -= cost;
        await user.save();
        
        // Return "stats" so the frontend can update immediately
        res.json({ success: true, stats: user.gamification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;