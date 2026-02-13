import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Utensils, Truck, Heart, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const roles = [
  { id: "donor", title: "Food Donor", icon: Utensils, desc: "Hotels & Restaurants looking to donate surplus food." },
  { id: "receiver", title: "Receiver", icon: Heart, desc: "Orphanages & NGOs needing food support." },
  { id: "agent", title: "Volunteer Agent", icon: Truck, desc: "Heroes who deliver food to those in need." },
];

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", organization: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success(`Welcome, ${formData.username}!`);
      // Redirect based on role
      if (role === "donor") navigate("/donor");
      else if (role === "agent") navigate("/volunteer");
      else navigate("/admin"); // Receiver goes to Admin/Receiver dashboard

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Join the <span className="gradient-text">Network</span></h1>
          <p className="text-muted-foreground">Select your role to get started.</p>
        </motion.div>

        {step === 1 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.02, borderColor: "#00FFB2" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setRole(r.id); setStep(2); }}
                className="glass-card p-8 text-left hover:bg-white/5 transition-all group border-transparent hover:border-primary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            onSubmit={handleRegister}
            className="glass-card p-8 max-w-md mx-auto space-y-4"
          >
            <div className="flex items-center gap-2 mb-6 text-primary cursor-pointer" onClick={() => setStep(1)}>
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Roles
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</h2>
            
            <input required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary"
              onChange={e => setFormData({...formData, username: e.target.value})} />
            
            <input required placeholder="Organization Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary"
              onChange={e => setFormData({...formData, organization: e.target.value})} />
            
            <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary"
              onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <input required type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary"
              onChange={e => setFormData({...formData, password: e.target.value})} />

            <button disabled={loading} className="btn-glow-solid w-full mt-4 flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default Signup;