// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate, Link } from "react-router-dom";
// // import { Loader2 } from "lucide-react";
// // import { toast } from "sonner";

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [formData, setFormData] = useState({ username: "", password: "" });

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Login failed");

// //       toast.success(`Welcome back, ${data.user.name}`);
      
// //       // ROLE BASED REDIRECT
// //       const role = data.user.role;
// //       if (role === "donor") navigate("/donor");
// //       else if (role === "agent") navigate("/volunteer");
// //       else if (role === "receiver") navigate("/admin"); // Redirect receiver to dashboard
// //       else navigate("/");

// //     } catch (err: any) {
// //       toast.error(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4">
// //       <motion.form 
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         onSubmit={handleLogin}
// //         className="glass-card p-8 w-full max-w-md space-y-4"
// //       >
// //         <h2 className="text-3xl font-display font-bold text-center mb-6">Welcome <span className="gradient-text">Back</span></h2>
        
// //         <div className="space-y-2">
// //           <label className="text-sm text-muted-foreground">Username</label>
// //           <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
// //             onChange={e => setFormData({...formData, username: e.target.value})} />
// //         </div>

// //         <div className="space-y-2">
// //           <label className="text-sm text-muted-foreground">Password</label>
// //           <input required type="password" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
// //             onChange={e => setFormData({...formData, password: e.target.value})} />
// //         </div>

// //         <button disabled={loading} className="btn-glow-solid w-full mt-6 flex justify-center">
// //           {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
// //         </button>
        
// //         <p className="text-center text-sm text-muted-foreground mt-4">
// //           Don't have an account? <Link to="/signup" className="text-primary hover:underline">Join Now</Link>
// //         </p>
// //       </motion.form>
// //     </div>
// //   );
// // };

// // export default Login;




// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom"; // navigate removed, handled by context
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext"; // Import Global Auth

// const Login = () => {
//   const { login } = useAuth(); // Use the global login function
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({ username: "", password: "" });

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Send Credentials to Backend
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");

//       // 2. Success! Call Global Login
//       // This function in AuthContext will:
//       // - Save user to state
//       // - Save to LocalStorage
//       // - Redirect automatically to the correct dashboard
//       login(data.user);
      
//       toast.success(`Welcome back, ${data.user.username}`);

//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <motion.form 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         onSubmit={handleLogin}
//         className="glass-card p-8 w-full max-w-md space-y-4"
//       >
//         <h2 className="text-3xl font-display font-bold text-center mb-6">Welcome <span className="gradient-text">Back</span></h2>
        
//         <div className="space-y-2">
//           <label className="text-sm text-muted-foreground">Username</label>
//           <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
//             onChange={e => setFormData({...formData, username: e.target.value})} />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm text-muted-foreground">Password</label>
//           <input required type="password" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
//             onChange={e => setFormData({...formData, password: e.target.value})} />
//         </div>

//         <button disabled={loading} className="btn-glow-solid w-full mt-6 flex justify-center">
//           {loading ? <Loader2 className="animate-spin" /> : "Log In"}
//         </button>
        
//         <p className="text-center text-sm text-muted-foreground mt-4">
//           Don't have an account? <Link to="/signup" className="text-primary hover:underline">Join Now</Link>
//         </p>
//       </motion.form>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  // Changed state key from 'username' to 'email'
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend now expects 'email' and 'password'
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user);
      toast.success(`Welcome back!`);

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.form 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleLogin}
        className="glass-card p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-display font-bold text-center mb-6">Welcome <span className="gradient-text">Back</span></h2>
        
        {/* EMAIL INPUT */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Email Address</label>
          <input 
            required 
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Password</label>
          <input 
            required 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
        </div>

        <button disabled={loading} className="btn-glow-solid w-full mt-6 flex justify-center">
          {loading ? <Loader2 className="animate-spin" /> : "Log In"}
        </button>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Join Now</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;