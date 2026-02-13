// import { motion } from "framer-motion";
// import { BarChart3, TrendingUp, Brain, PieChart, Activity } from "lucide-react";
// import {
//   LineChart, Line, AreaChart, Area, BarChart, Bar,
//   PieChart as RePie, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";

// const donationTrend = [
//   { month: "Jan", donations: 120 }, { month: "Feb", donations: 180 },
//   { month: "Mar", donations: 250 }, { month: "Apr", donations: 310 },
//   { month: "May", donations: 420 }, { month: "Jun", donations: 380 },
// ];

// const co2Data = [
//   { month: "Jan", saved: 45 }, { month: "Feb", saved: 72 },
//   { month: "Mar", saved: 98 }, { month: "Apr", saved: 135 },
//   { month: "May", saved: 180 }, { month: "Jun", saved: 160 },
// ];

// const spoilageRisk = [
//   { zone: "Zone 1", risk: 15 }, { zone: "Zone 2", risk: 45 },
//   { zone: "Zone 3", risk: 30 }, { zone: "Zone 4", risk: 72 },
//   { zone: "Zone 5", risk: 20 },
// ];

// const distribution = [
//   { name: "Orphanages", value: 45 },
//   { name: "NGOs", value: 30 },
//   { name: "Shelters", value: 15 },
//   { name: "Communities", value: 10 },
// ];

// const COLORS = ["#00FFB2", "#00D9FF", "#FFD700", "#FF3B5C"];

// const chartCard = "glass-card p-5";

// const Admin = () => {
//   return (
//     <div className="min-h-screen pt-20 pb-12 px-4 max-w-7xl mx-auto">
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-display font-bold mb-8"
//       >
//         Command <span className="gradient-text">Center</span>
//       </motion.h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Donation Trend */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={chartCard}>
//           <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
//             <TrendingUp className="w-4 h-4 text-primary" /> Donation Trend
//           </h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <LineChart data={donationTrend}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//               <XAxis dataKey="month" stroke="#666" fontSize={12} />
//               <YAxis stroke="#666" fontSize={12} />
//               <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
//               <Line type="monotone" dataKey="donations" stroke="#00FFB2" strokeWidth={2} dot={{ fill: "#00FFB2", r: 4 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* CO2 Savings */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={chartCard}>
//           <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
//             <Activity className="w-4 h-4 text-secondary" /> CO₂ Savings (kg)
//           </h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <AreaChart data={co2Data}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//               <XAxis dataKey="month" stroke="#666" fontSize={12} />
//               <YAxis stroke="#666" fontSize={12} />
//               <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
//               <Area type="monotone" dataKey="saved" stroke="#00D9FF" fill="rgba(0,217,255,0.15)" strokeWidth={2} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Spoilage Risk */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={chartCard}>
//           <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
//             <BarChart3 className="w-4 h-4 text-destructive" /> AI Spoilage Risk
//           </h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={spoilageRisk}>
//               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//               <XAxis dataKey="zone" stroke="#666" fontSize={12} />
//               <YAxis stroke="#666" fontSize={12} />
//               <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
//               <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
//                 {spoilageRisk.map((entry, i) => (
//                   <Cell key={i} fill={entry.risk > 50 ? "#FF3B5C" : entry.risk > 30 ? "#FFD700" : "#00FFB2"} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* Distribution */}
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={chartCard}>
//           <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
//             <PieChart className="w-4 h-4 text-yellow-400" /> Distribution Breakdown
//           </h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <RePie>
//               <Pie data={distribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
//                 {distribution.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i]} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
//             </RePie>
//           </ResponsiveContainer>
//           <div className="flex flex-wrap gap-3 mt-2 justify-center">
//             {distribution.map((d, i) => (
//               <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
//                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
//                 {d.name}
//               </span>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* AI Insight */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.4 }}
//         className="glass-card glow-border p-6 mt-6"
//       >
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
//             <Brain className="w-5 h-5 text-primary" />
//           </div>
//           <div>
//             <h3 className="font-display font-semibold mb-1">AI Insight</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">
//               Analysis suggests increasing pickups in <span className="text-primary font-medium">Zone 4</span> between{" "}
//               <span className="text-secondary font-medium">6–9 PM</span>. Spoilage risk is 72% — deploying 2 additional
//               volunteers could reduce waste by an estimated 40% and save 85kg of food weekly.
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Admin;





import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Brain, PieChart, Activity, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Import Auth Context
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart as RePie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// --- MOCK DATA FOR CHARTS (Good for Demo) ---
const donationTrend = [
  { month: "Jan", donations: 120 }, { month: "Feb", donations: 180 },
  { month: "Mar", donations: 250 }, { month: "Apr", donations: 310 },
  { month: "May", donations: 420 }, { month: "Jun", donations: 380 },
];

const co2Data = [
  { month: "Jan", saved: 45 }, { month: "Feb", saved: 72 },
  { month: "Mar", saved: 98 }, { month: "Apr", saved: 135 },
  { month: "May", saved: 180 }, { month: "Jun", saved: 160 },
];

const spoilageRisk = [
  { zone: "Zone 1", risk: 15 }, { zone: "Zone 2", risk: 45 },
  { zone: "Zone 3", risk: 30 }, { zone: "Zone 4", risk: 72 },
  { zone: "Zone 5", risk: 20 },
];

const distribution = [
  { name: "Orphanages", value: 45 },
  { name: "NGOs", value: 30 },
  { name: "Shelters", value: 15 },
  { name: "Communities", value: 10 },
];

const COLORS = ["#00FFB2", "#00D9FF", "#FFD700", "#FF3B5C"];
const chartCard = "glass-card p-5";

const Admin = () => {
  const { user, logout } = useAuth(); // Get user info and logout function

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-display font-bold">
            {user?.role === 'receiver' ? 'Receiver' : user?.role === 'agent' ? 'Volunteer' : 'Donor'} <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, <span className="text-emerald-400 font-medium">{user?.organization || user?.name || "User"}</span>
          </p>
        </motion.div>

        {/* LOGOUT BUTTON */}
        <motion.button 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all w-fit"
        >
           <LogOut className="w-4 h-4" />
           Logout
        </motion.button>
      </div>

      {/* CHARTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Donation Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={chartCard}>
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" /> Donation Trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={donationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
              <Line type="monotone" dataKey="donations" stroke="#00FFB2" strokeWidth={2} dot={{ fill: "#00FFB2", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CO2 Savings */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={chartCard}>
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-secondary" /> CO₂ Savings (kg)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={co2Data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
              <Area type="monotone" dataKey="saved" stroke="#00D9FF" fill="rgba(0,217,255,0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spoilage Risk */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={chartCard}>
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-destructive" /> AI Spoilage Risk
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={spoilageRisk}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="zone" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
              <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
                {spoilageRisk.map((entry, i) => (
                  <Cell key={i} fill={entry.risk > 50 ? "#FF3B5C" : entry.risk > 30 ? "#FFD700" : "#00FFB2"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={chartCard}>
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm">
            <PieChart className="w-4 h-4 text-yellow-400" /> Distribution Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RePie>
              <Pie data={distribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {distribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 40% 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#F5F7FA" }} />
            </RePie>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {distribution.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insight Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="glass-card glow-border p-6 mt-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold mb-1">AI Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Analysis suggests increasing pickups in <span className="text-primary font-medium">Zone 4</span> between{" "}
              <span className="text-secondary font-medium">6–9 PM</span>. Spoilage risk is 72% — deploying 2 additional
              volunteers could reduce waste by an estimated 40% and save 85kg of food weekly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;