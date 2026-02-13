// // // const mongoose = require("mongoose");

// // // const donationSchema = new mongoose.Schema({
// // // 	donor: {
// // // 		type: mongoose.Schema.Types.ObjectId,
// // // 		ref: "users",
// // // 		required: true
// // // 	},
// // // 	agent: {
// // // 		type: mongoose.Schema.Types.ObjectId,
// // // 		ref: "users",
// // // 	},
// // // 	foodType: {
// // // 		type: String,
// // // 		required: true
// // // 	},
// // // 	quantity: {
// // // 		type: String,
// // // 		required: true
// // // 	},
// // // 	cookingTime: {
// // // 		type: Date,
// // // 		required: true
// // // 	},
// // // 	address: {
// // // 		type: String,
// // // 		required: true
// // // 	},
// // // 	phone: {
// // // 		type: Number,
// // // 		required: true
// // // 	},
// // // 	donorToAdminMsg: String,
// // // 	adminToAgentMsg: String,
// // // 	collectionTime: {
// // // 		type: Date,
// // // 	},
// // // 	status: {
// // // 		type: String,
// // // 		enum: ["pending", "rejected", "accepted", "assigned", "collected"],
// // // 		required: true
// // // 	},
// // // });

// // // const Donation = mongoose.model("donations", donationSchema);
// // // module.exports = Donation;



// // const mongoose = require("mongoose");

// // const donationSchema = new mongoose.Schema({
// //     foodType: String,
// //     quantity: String,
// //     expiry: String,
// //     pickupTime: String,
// //     status: {
// //         type: String,
// //         enum: ["pending", "transit", "delivered", "expired"],
// //         default: "pending"
// //     },
// //     donor: {
// //         id: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: "User"
// //         },
// //         name: String
// //     },
// //     co2Saved: {
// //         type: Number,
// //         default: 0
// //     },
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // module.exports = mongoose.model("Donation", donationSchema);



// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//     foodType: String,
//     quantity: String,
//     expiry: String, // e.g., "2026-02-14T15:00:00" (ISO String is better for sorting)
//     pickupTime: String,
//     status: {
//         type: String,
//         enum: ["pending", "accepted", "assigned", "collected", "delivered", "expired"],
//         default: "pending"
//     },
//     location: {
//         lat: Number,
//         lng: Number,
//         address: String
//     },
//     donor: {
//         id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         name: String
//     },
//     agent: {
//         id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         name: String,
//         phone: String
//     },
//     co2Saved: Number,
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Donation", donationSchema);




const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    foodType: String,
    quantity: String,
    expiry: String, 
    pickupTime: String,
    
    // UPDATED STATUS LIST
    status: {
        type: String,
        // pending: New donation
        // searching_agent: Receiver accepted, looking for driver
        // assigned: Driver found, on way to pickup
        // transit: Driver picked up food, on way to receiver
        // delivered: Food dropped off
        // expired: Not taken in time
        enum: ["pending", "searching_agent", "assigned", "transit", "delivered", "expired"],
        default: "pending"
    },

    // DONOR LOCATION
    location: {
        lat: Number,
        lng: Number,
        address: String
    },

    // NEW: RECEIVER INFO (So driver knows where to go)
    receiver: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        location: {
            lat: Number,
            lng: Number,
            address: String
        }
    },

    donor: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String
    },

    agent: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        phone: String
    },

    agentLocation: {
        lat: Number,
        lng: Number
    },

    co2Saved: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);