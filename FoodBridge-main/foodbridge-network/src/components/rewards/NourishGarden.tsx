// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sprout, TreePine, Leaf, ShoppingBag, Gift, Award, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";

// // ⚠️ Make sure this matches your Backend Port!
// const API_URL = "http://172.16.26.154:5000/api/rewards"; 

// export default function NourishGarden() {
//   const { user } = useAuth();
//   // Handle both _id (MongoDB default) and id (virtual)
//   const userId = user?._id || user?.id;

//   const [stats, setStats] = useState({ 
//     xp: 0, 
//     tokens: 0, 
//     level: 1 
//   });
//   const [loading, setLoading] = useState(true);

//   // --- 1. RETRIEVE DATA ON LOAD ---
//   useEffect(() => {
//     if (userId) {
//       const fetchStats = async () => {
//         try {
//           // Fetch from Database
//           const res = await fetch(`${API_URL}/status/${userId}`);
//           const data = await res.json();
          
//           // Update the UI with Database values
//           if (data) {
//             setStats({
//                 xp: data.xp || 0,
//                 tokens: data.tokens || 0,
//                 level: data.level || 1
//             });
//           }
//         } catch (error) {
//           console.error("Failed to load rewards:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchStats();
//     }
//   }, [userId]);

//   // --- 2. UPDATE DATA (SIMULATE BUTTON) ---
//   const handleSimulateAction = async () => {
//     if (!userId) return toast.error("Please login first");

//     // Optimistic UI Update (Makes it feel instant)
//     const oldStats = { ...stats };
//     setStats(prev => ({
//         ...prev, 
//         xp: prev.xp + 100, 
//         tokens: prev.tokens + 10,
//         level: Math.floor((prev.xp + 100) / 500) + 1
//     }));

//     try {
//       // Save to Database
//       const res = await fetch(`${API_URL}/earn`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });
      
//       const data = await res.json();
      
//       if (data.success) {
//         // Sync with exact DB data just in case
//         setStats(data.stats);
        
//         if (data.stats.level > oldStats.level) {
//             toast.success("🌱 LEVEL UP! Your garden is growing!");
//         } else {
//             toast.success("Verified! Points saved to Database.");
//         }
//       }
//     } catch (error) {
//       toast.error("Network Error: Could not save points.");
//       setStats(oldStats); // Revert if failed
//     }
//   };

//   // --- 3. REDEEM COUPONS ---
//   const handleRedeem = async (cost: number, title: string) => {
//     if (stats.tokens < cost) return toast.error("Not enough Wood!");

//     try {
//         const res = await fetch(`${API_URL}/redeem`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ userId, cost }),
//         });

//         const data = await res.json();

//         if (data.success) {
//             setStats(data.stats); // Update UI with new token balance
//             toast.success(`Redeemed: ${title}`);
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         toast.error("Redemption failed.");
//     }
//   };

//   if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" /></div>;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//       {/* --- VISUAL GARDEN (LEFT) --- */}
//       <Card className="border-none shadow-2xl bg-gradient-to-b from-sky-100 to-emerald-50 overflow-hidden relative min-h-[500px]">
//         <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
//             <span className="text-emerald-800 font-bold">Level {stats.level}</span>
//         </div>

//         <div className="flex flex-col items-center justify-center h-full pt-20 z-10 relative">
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={stats.level}
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 1.2, opacity: 0 }}
//                     transition={{ type: "spring", stiffness: 100 }}
//                 >
//                     {/* Visual Logic: Changes based on Level */}
//                     {stats.level === 1 && <Sprout size={120} className="text-emerald-500" />}
//                     {stats.level === 2 && <TreePine size={180} className="text-emerald-600" />}
//                     {stats.level >= 3 && (
//                         <div className="flex -space-x-8">
//                             <TreePine size={150} className="text-emerald-700 translate-y-4" />
//                             <TreePine size={200} className="text-emerald-500 -translate-y-2 z-10" />
//                             <TreePine size={150} className="text-emerald-600 translate-y-4" />
//                         </div>
//                     )}
//                 </motion.div>
//             </AnimatePresence>
            
//             <motion.div className="mt-8 text-center" layout>
//                 <h2 className="text-2xl font-bold text-emerald-900">
//                     {stats.level === 1 ? "A Humble Sprout" : stats.level === 2 ? "Growing Sapling" : "Thriving Forest"}
//                 </h2>
//                 <p className="text-emerald-600">Keep simulating deliveries to grow!</p>
//             </motion.div>
//         </div>

//         {/* Decorative Ground */}
//         <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-[50%] scale-150 translate-y-10" />
//       </Card>

//       {/* --- CONTROLS & MARKET (RIGHT) --- */}
//       <div className="space-y-6">
        
//         {/* Resource Display */}
//         <div className="grid grid-cols-2 gap-4">
//             <Card className="bg-amber-50 border-amber-200">
//                 <CardContent className="pt-6 flex items-center gap-4">
//                     <div className="p-3 bg-amber-200 rounded-full text-amber-800">
//                         <Leaf size={24} />
//                     </div>
//                     <div>
//                         <p className="text-sm text-amber-700 font-medium">Harvested Wood</p>
//                         <h3 className="text-3xl font-bold text-amber-900">{stats.tokens}</h3>
//                     </div>
//                 </CardContent>
//             </Card>
//             <Card className="bg-blue-50 border-blue-200">
//                 <CardContent className="pt-6 flex items-center gap-4">
//                     <div className="p-3 bg-blue-200 rounded-full text-blue-800">
//                         <Award size={24} />
//                     </div>
//                     <div>
//                         <p className="text-sm text-blue-700 font-medium">Growth XP</p>
//                         <h3 className="text-3xl font-bold text-blue-900">{stats.xp}</h3>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>

//         {/* THE DEMO BUTTON */}
//         <Button 
//             onClick={handleSimulateAction}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg shadow-lg hover:shadow-emerald-500/30 transition-all font-bold"
//         >
//             🚀 Simulate Delivery (+100 XP)
//         </Button>
//         <p className="text-xs text-center text-gray-400">
//             *Clicking this saves data to MongoDB immediately
//         </p>

//         {/* Marketplace */}
//         <div className="space-y-4 pt-4">
//             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <ShoppingBag className="text-purple-600" /> Reward Marketplace
//             </h3>
            
//             <div className="grid grid-cols-1 gap-3">
//                 <CouponItem 
//                     title="Amazon ₹500 Gift Card" 
//                     cost={50} 
//                     currentTokens={stats.tokens} 
//                     onRedeem={() => handleRedeem(50, "Amazon Gift Card")}
//                 />
//                 <CouponItem 
//                     title="Swiggy 20% Off" 
//                     cost={20} 
//                     currentTokens={stats.tokens} 
//                     onRedeem={() => handleRedeem(20, "Swiggy Coupon")}
//                 />
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper Component for List Items
// function CouponItem({ title, cost, currentTokens, onRedeem }: { title: string, cost: number, currentTokens: number, onRedeem: () => void }) {
//     const canAfford = currentTokens >= cost;

//     return (
//         <div className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center gap-3">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                     <Gift className="text-purple-600" size={20} />
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-gray-800">{title}</h4>
//                     <span className="text-xs text-gray-500 font-medium">Cost: {cost} Wood</span>
//                 </div>
//             </div>
//             <Button 
//                 size="sm" 
//                 disabled={!canAfford}
//                 onClick={onRedeem}
//                 className={canAfford ? "bg-purple-600 hover:bg-purple-700" : "opacity-50"}
//             >
//                 Redeem
//             </Button>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, TreePine, Leaf, ShoppingBag, Gift, Award, Loader2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti"; // Make sure to install: npm install canvas-confetti @types/canvas-confetti

// ⚠️ Make sure this matches your Backend Port!
const API_URL = "http://172.16.26.154:5000/api/rewards"; 

export default function NourishGarden() {
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const [stats, setStats] = useState({ 
    xp: 0, 
    tokens: 0, 
    level: 1 
  });
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  // --- 1. RETRIEVE DATA ON LOAD ---
  useEffect(() => {
    if (userId) {
      const fetchStats = async () => {
        try {
          const res = await fetch(`${API_URL}/status/${userId}`);
          const data = await res.json();
          if (data) {
            setStats({
                xp: data.xp || 0,
                tokens: data.tokens || 0,
                level: data.level || 1
            });
          }
        } catch (error) {
          console.error("Failed to load rewards:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [userId]);

  // --- 2. UPDATE DATA (SIMULATE BUTTON) ---
  const handleSimulateAction = async () => {
    if (!userId) return toast.error("Please login first");
    setIsSimulating(true);

    // Trigger Confetti for immediate feedback
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#f59e0b']
    });

    const oldLevel = stats.level;

    // Optimistic UI Update
    setStats(prev => ({
        ...prev, 
        xp: prev.xp + 100, 
        tokens: prev.tokens + 10,
        level: Math.floor((prev.xp + 100) / 500) + 1
    }));

    try {
      const res = await fetch(`${API_URL}/earn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStats(data.stats);
        
        if (data.stats.level > oldLevel) {
            toast.success("🌱 LEVEL UP! Your garden is growing!");
            // Big Confetti for Level Up
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        } else {
            toast.success("Verified! +100 XP, +10 Wood");
        }
      }
    } catch (error) {
      toast.error("Network Error: Could not save points.");
    } finally {
      setTimeout(() => setIsSimulating(false), 500);
    }
  };

  // --- 3. REDEEM COUPONS ---
  const handleRedeem = async (cost: number, title: string) => {
    if (stats.tokens < cost) return toast.error("Not enough Wood!");

    try {
        const res = await fetch(`${API_URL}/redeem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, cost }),
        });

        const data = await res.json();

        if (data.success) {
            setStats(data.stats);
            toast.success(`Redeemed: ${title}`);
            confetti({ particleCount: 30, spread: 50, colors: ['#a855f7'] });
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Redemption failed.");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* --- VISUAL GARDEN (LEFT) --- */}
      <Card className="border-none shadow-2xl bg-gradient-to-br from-sky-200 via-emerald-100 to-teal-50 overflow-hidden relative min-h-[500px] flex flex-col justify-between group">
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
             {[...Array(8)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute bg-white/40 rounded-full blur-sm"
                    style={{
                        width: Math.random() * 10 + 5 + "px",
                        height: Math.random() * 10 + 5 + "px",
                        left: Math.random() * 100 + "%",
                        top: "100%",
                    }}
                    animate={{
                        y: -600,
                        x: Math.random() * 50 - 25,
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                 />
             ))}
        </div>

        {/* Level Badge */}
        <div className="absolute top-6 right-6 z-20">
            <motion.div 
                whileHover={{ scale: 1.1 }}
                className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2"
            >
                <span className="text-emerald-800 font-bold">Level {stats.level}</span>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>
        </div>

        {/* Main Plant Area */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 relative mt-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={stats.level}
                    initial={{ scale: 0.5, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.2, opacity: 0, y: -50 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    className="relative"
                >
                    {/* Glow Effect behind plant */}
                    <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    
                    {/* Breathing Animation for Plant */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {stats.level === 1 && <Sprout size={140} className="text-emerald-500 drop-shadow-xl" strokeWidth={1.5} />}
                        {stats.level === 2 && <TreePine size={200} className="text-emerald-600 drop-shadow-2xl" strokeWidth={1.5} />}
                        {stats.level >= 3 && (
                            <div className="flex -space-x-12 items-end">
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
                                    <TreePine size={140} className="text-emerald-700/80 drop-shadow-lg" />
                                </motion.div>
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                    <TreePine size={220} className="text-emerald-600 drop-shadow-2xl z-10" strokeWidth={1.8} />
                                </motion.div>
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
                                    <TreePine size={160} className="text-emerald-500/90 drop-shadow-lg" />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            
            <motion.div className="mt-8 text-center" layout>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-600">
                    {stats.level === 1 ? "A Humble Sprout" : stats.level === 2 ? "Growing Sapling" : "Thriving Forest"}
                </h2>
                <p className="text-emerald-700/80 font-medium mt-1">Every delivery brings life.</p>
            </motion.div>
        </div>

        {/* Dynamic Ground */}
        <div className="absolute bottom-0 w-[120%] -left-[10%] h-32 bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400/0 blur-sm rounded-t-[100%] scale-y-110 translate-y-10 opacity-80" />
      </Card>

      {/* --- CONTROLS & MARKET (RIGHT) --- */}
      <div className="space-y-6 flex flex-col justify-center">
        
        {/* Resource Wallet */}
        <div className="grid grid-cols-2 gap-4">
            <StatCard 
                icon={Leaf} 
                color="amber" 
                label="Harvested Wood" 
                value={stats.tokens} 
                subValue="Spendable"
            />
            <StatCard 
                icon={Award} 
                color="blue" 
                label="Growth XP" 
                value={stats.xp} 
                subValue={`Lvl ${stats.level}`}
            />
        </div>

        {/* THE ACTION BUTTON */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
                onClick={handleSimulateAction}
                disabled={isSimulating}
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white h-16 text-xl shadow-xl shadow-emerald-500/20 transition-all font-bold rounded-2xl border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
                <span className="relative flex items-center gap-3">
                    {isSimulating ? <Loader2 className="animate-spin" /> : <Zap className="fill-yellow-400 text-yellow-400" />} 
                    Simulate Delivery
                    <span className="text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">+100 XP</span>
                </span>
            </Button>
        </motion.div>
        
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Sparkles size={12} className="text-yellow-400" />
            <span>Updates instantly & saves to database</span>
        </div>

        {/* Marketplace */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingBag className="text-purple-600" /> Reward Store
                </h3>
                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">New Items</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <CouponItem 
                    title="Amazon ₹500 Gift Card" 
                    cost={50} 
                    currentTokens={stats.tokens} 
                    onRedeem={() => handleRedeem(50, "Amazon Gift Card")}
                />
                <CouponItem 
                    title="Swiggy 20% Off" 
                    cost={20} 
                    currentTokens={stats.tokens} 
                    onRedeem={() => handleRedeem(20, "Swiggy Coupon")}
                />
            </div>
        </div>
      </div>
    </div>
  );
}

// Sub-Component for Stats
function StatCard({ icon: Icon, color, label, value, subValue }: any) {
    const colors = {
        amber: "bg-amber-50 border-amber-100 text-amber-900 icon-bg-amber-200 icon-text-amber-700",
        blue: "bg-blue-50 border-blue-100 text-blue-900 icon-bg-blue-200 icon-text-blue-700",
    };
    const c = colors[color as keyof typeof colors];

    return (
        <Card className={`${c} border shadow-sm hover:shadow-md transition-shadow`}>
            <CardContent className="pt-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${color === 'amber' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
                    <Icon size={28} />
                </div>
                <div>
                    <p className="text-xs opacity-70 font-bold uppercase tracking-wider">{label}</p>
                    <div className="flex items-baseline gap-1">
                        <h3 className="text-3xl font-black">{value}</h3>
                        <span className="text-[10px] font-bold opacity-60">{subValue}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Sub-Component for Coupons
function CouponItem({ title, cost, currentTokens, onRedeem }: { title: string, cost: number, currentTokens: number, onRedeem: () => void }) {
    const canAfford = currentTokens >= cost;

    return (
        <motion.div 
            whileHover={{ y: -2 }}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all"
        >
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-50 p-3 rounded-xl">
                    <Gift className="text-purple-600" size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">{title}</h4>
                    <div className="flex items-center gap-1 mt-1">
                        <Leaf size={12} className="text-amber-600" />
                        <span className="text-xs text-gray-500 font-bold">{cost} Wood</span>
                    </div>
                </div>
            </div>
            <Button 
                size="sm" 
                disabled={!canAfford}
                onClick={onRedeem}
                className={`font-bold transition-all ${canAfford ? "bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-purple-500/30" : "opacity-40"}`}
            >
                Redeem
            </Button>
        </motion.div>
    );
}