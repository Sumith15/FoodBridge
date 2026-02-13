const mongoose = require("mongoose");
const passportLocalMongooseLib = require("passport-local-mongoose");

const passportLocalMongoose = passportLocalMongooseLib.default || passportLocalMongooseLib;

const userSchema = new mongoose.Schema({
    username: { type: String, required: false }, // Full Name
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ["donor", "receiver", "agent", "admin"], 
        required: true 
    },
    organization: { type: String, required: false },
    phone: { type: Number },
    address: { type: String },
    joinedTime: { type: Date, default: Date.now },

    // --- GAMIFICATION ENGINE ---
    gamification: {
        xp: { type: Number, default: 0 },       // Determines Tree Size (Lifetime Score)
        tokens: { type: Number, default: 0 },   // Spendable Currency (Wood/Fruit)
        level: { type: Number, default: 1 },    // Current Garden Level
        impactStats: {
            peopleFed: { type: Number, default: 0 },
            co2Saved: { type: Number, default: 0 } // kg
        }
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model("User", userSchema);