// const express = require("express");
// const app = express();
// const cors = require('cors');
// app.use(cors({
//   origin: 'http://172.16.26.154:8080', // Change to your Frontend port
//   credentials: true
// }));
// const passport = require("passport");
// const flash = require("connect-flash");
// const session = require("express-session");
// const expressLayouts = require("express-ejs-layouts");
// const methodOverride = require("method-override");
// const homeRoutes = require("./routes/home.js");
// const authRoutes = require("./routes/auth.js");
// const adminRoutes = require("./routes/admin.js");
// const donorRoutes = require("./routes/donor.js");
// const agentRoutes = require("./routes/agent.js");
// const rewardsRoutes = require("./routes/api_rewards.js");
// require("dotenv").config();
// require("./config/dbConnection.js")();
// require("./config/passport.js")(passport);



// app.set("view engine", "ejs");
// app.use(expressLayouts);
// app.use("/assets", express.static(__dirname + "/assets"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(session({
// 	secret: "secret",
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(methodOverride("_method"));
// app.use((req, res, next) => {
// 	res.locals.currentUser = req.user;
// 	res.locals.error = req.flash("error");
// 	res.locals.success = req.flash("success");
// 	res.locals.warning = req.flash("warning");
// 	next();
// });



// // Routes
// app.use(homeRoutes);
// app.use(authRoutes);
// app.use(donorRoutes);
// app.use(adminRoutes);
// app.use(agentRoutes);
// app.use((req,res) => {
// 	res.status(404).render("404page", { title: "Page not found" });
// });
// app.use("/api/rewards", rewardsRoutes);

// const port = process.env.PORT || 5000;
// app.listen(port, console.log(`Server is running at http://172.16.26.154:${port}`));


const express = require("express");
const app = express();
const cors = require('cors');
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
require("dotenv").config();

// Route Imports
const homeRoutes = require("./routes/home.js");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/admin.js");
const donorRoutes = require("./routes/donor.js");
const agentRoutes = require("./routes/agent.js");
const rewardsRoutes = require("./routes/api_rewards.js"); // Import Rewards

// Database & Passport Config
require("./config/dbConnection.js")();
require("./config/passport.js")(passport);

// --- MIDDLEWARE ---
// Allow requests from your React Frontend (Default Vite port is 5173)
app.use(cors({
  origin: '*', 
  credentials: true
}));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

// Global Variables for EJS
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    next();
});

// --- ROUTES ---
app.use(homeRoutes);
app.use(authRoutes);
app.use(donorRoutes);
app.use(adminRoutes);
app.use(agentRoutes);

// ⚠️ FIXED: This MUST be BEFORE the 404 handler
app.use("/api/rewards", rewardsRoutes); 

// 404 Handler (Must be last)
app.use((req, res) => {
    res.status(404).render("404page", { title: "Page not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is running at http://172.16.26.154:${port}`));