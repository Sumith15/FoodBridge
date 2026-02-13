// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/user.js");
// const passport = require("passport");
// const middleware = require("../middleware/index.js")



// router.get("/auth/signup", middleware.ensureNotLoggedIn, (req,res) => {
// 	res.render("auth/signup", { title: "User Signup" });
// });

// router.post("/auth/signup", middleware.ensureNotLoggedIn, async (req,res) => {
	
// 	const { firstName, lastName, email, password1, password2, role } = req.body;
// 	let errors = [];
	
// 	if (!firstName || !lastName || !email || !password1 || !password2) {
// 		errors.push({ msg: "Please fill in all the fields" });
// 	}
// 	if (password1 != password2) {
// 		errors.push({ msg: "Passwords are not matching" });
// 	}
// 	if (password1.length < 4) {
// 		errors.push({ msg: "Password length should be atleast 4 characters" });
// 	}
// 	if(errors.length > 0) {
// 		return res.render("auth/signup", {
// 			title: "User Signup",
// 			errors, firstName, lastName, email, password1, password2
// 		});
// 	}
	
// 	try
// 	{
// 		const user = await User.findOne({ email: email });
// 		if(user)
// 		{
// 			errors.push({msg: "This Email is already registered. Please try another email."});
// 			return res.render("auth/signup", {
// 				title: "User Signup",
// 				firstName, lastName, errors, email, password1, password2
// 			});
// 		}
		
// 		const newUser = new User({ firstName, lastName, email, password:password1, role });
// 		const salt = bcrypt.genSaltSync(10);
// 		const hash = bcrypt.hashSync(newUser.password, salt);
// 		newUser.password = hash;
// 		await newUser.save();
// 		req.flash("success", "You are successfully registered and can log in.");
// 		res.redirect("/auth/login");
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
	
// });

// router.get("/auth/login", middleware.ensureNotLoggedIn, (req,res) => {
// 	res.render("auth/login", { title: "User login" });
// });

// router.post("/auth/login", middleware.ensureNotLoggedIn,
// 	passport.authenticate('local', {
// 		failureRedirect: "/auth/login",
// 		failureFlash: true,
// 		successFlash: true
// 	}), (req,res) => {
// 		res.redirect(req.session.returnTo || `/${req.user.role}/dashboard`);
// 	}
// );

// router.get("/auth/logout", (req,res) => {
// 	req.logout();
// 	req.flash("success", "Logged-out successfully")
// 	res.redirect("/");
// });


// module.exports = router;




const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// --- API ROUTES FOR REACT FRONTEND ---

// REGISTER ROUTE
router.post("/api/auth/register", async (req, res) => {
    try {
        const { username, email, password, role, organization } = req.body;

        // 1. Basic Validation
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // 2. Create User Instance (Do NOT pass password here)
        const newUser = new User({
            username: username,
            email: email,
            role: role,
            organization: organization
        });

        // 3. Register (Handles Hashing & Duplicates automatically)
        const registeredUser = await User.register(newUser, password);

        // 4. Auto-Login after Registration
        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ error: "Login after registration failed" });
            }
            return res.status(200).json({
                message: "Registered successfully",
                user: {
                    id: registeredUser._id,
                    username: registeredUser.username,
                    role: registeredUser.role
                }
            });
        });

    } catch (err) {
        // Handle "User already exists" error
        if (err.name === 'UserExistsError') {
            return res.status(400).json({ error: "A user with this username already exists" });
        }
        // Handle other errors (like duplicate email)
        if (err.code === 11000) {
            return res.status(400).json({ error: "That email is already registered" });
        }
        return res.status(500).json({ error: err.message });
    }
});

// LOGIN ROUTE
router.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // SUCCESS: Send the role back so React knows where to redirect
            return res.json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    organization: user.organization
                }
            });
        });
    })(req, res, next);
});

// LOGOUT ROUTE
router.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return res.status(500).json({ error: "Logout failed" }); }
        res.json({ message: "Logged out successfully" });
    });
});

module.exports = router;