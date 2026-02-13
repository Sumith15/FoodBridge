// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sprout, TreePine, Leaf, ShoppingBag, Gift, Award } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";

// // --- MOCK API CALLS (Replace with fetch calls to your backend) ---
// const API_URL = "http://localhost:5000/api/rewards"; // Verify your backend port

// export default function NourishGarden() {
//   const { user } = useAuth(); // Assuming your auth context provides user ID
//   const [stats, setStats] = useState({ xp: 0, tokens: 0, level: 1 });
//   const [loading, setLoading] = useState(false);

//   // Poll for updates (Simulation for Hackathon)
//   useEffect(() => {
//     if (user) fetchStats();
//   }, [user]);

//   const fetchStats = async () => {
//     // In real app: const res = await fetch(`${API_URL}/status/${user.id}`);
//     // For Demo, we mock the initial state or use local storage
//     setStats({ xp: 340, tokens: 25, level: 1 });
//   };

//   const handleSimulateAction = async () => {
//     // Call backend to earn points
//     // const res = await fetch(`${API_URL}/earn`, { method: 'POST', body: JSON.stringify({ userId: user.id, actionType: 'DONATION' }) ... });
    
//     // Simulating response for pure frontend demo:
//     const newXp = stats.xp + 100;
//     const newTokens = stats.tokens + 10;
//     const newLevel = Math.floor(newXp / 500) + 1;
    
//     setStats({ xp: newXp, tokens: newTokens, level: newLevel });
//     toast.success("Donation Verified! +100 Growth Points, +10 Wood");
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//       {/* LEFT: THE VISUAL GARDEN */}
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
            
//             <motion.div 
//                 className="mt-8 text-center"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//             >
//                 <h2 className="text-2xl font-bold text-emerald-900">
//                     {stats.level === 1 ? "A Humble Sprout" : stats.level === 2 ? "Growing Sapling" : "Thriving Forest"}
//                 </h2>
//                 <p className="text-emerald-600">Keep helping to grow your impact.</p>
//             </motion.div>
//         </div>

//         {/* Dynamic Ground */}
//         <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-[50%] scale-150 translate-y-10" />
        
//         {/* Floating Particles (CSS) */}
//         <div className="absolute inset-0 pointer-events-none">
//              {[...Array(5)].map((_, i) => (
//                  <motion.div
//                     key={i}
//                     className="absolute bg-white/30 rounded-full w-2 h-2"
//                     initial={{ x: Math.random() * 400, y: 500 }}
//                     animate={{ y: -50 }}
//                     transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
//                  />
//              ))}
//         </div>
//       </Card>

//       {/* RIGHT: STATS & MARKET */}
//       <div className="space-y-6">
        
//         {/* Resource Wallet */}
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

//         {/* Action Button (For Demo) */}
//         <Button 
//             onClick={handleSimulateAction}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg shadow-lg hover:shadow-emerald-500/30 transition-all"
//         >
//             Simulate Food Rescue (Admin Demo)
//         </Button>

//         {/* Marketplace */}
//         <div className="space-y-4">
//             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <ShoppingBag className="text-purple-600" /> Reward Marketplace
//             </h3>
            
//             <div className="grid grid-cols-1 gap-3">
//                 <CouponItem 
//                     title="Amazon ₹500 Gift Card" 
//                     cost={50} 
//                     currentTokens={stats.tokens} 
//                     onRedeem={(cost) => setStats(prev => ({...prev, tokens: prev.tokens - cost}))}
//                 />
//                 <CouponItem 
//                     title="Swiggy 20% Off" 
//                     cost={15} 
//                     currentTokens={stats.tokens} 
//                     onRedeem={(cost) => setStats(prev => ({...prev, tokens: prev.tokens - cost}))}
//                 />
//                 <CouponItem 
//                     title="Donate to Relief Fund" 
//                     cost={100} 
//                     currentTokens={stats.tokens} 
//                     onRedeem={(cost) => setStats(prev => ({...prev, tokens: prev.tokens - cost}))}
//                 />
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CouponItem({ title, cost, currentTokens, onRedeem }: { title: string, cost: number, currentTokens: number, onRedeem: (c:number) => void }) {
//     const canAfford = currentTokens >= cost;

//     const handleRedeem = () => {
//         if (!canAfford) return;
//         toast.success(`Redeemed: ${title}`);
//         onRedeem(cost);
//     };

//     return (
//         <div className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center gap-3">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                     <Gift className="text-purple-600" size={20} />
//                 </div>
//                 <div>
//                     <h4 className="font-semibold text-gray-800">{title}</h4>
//                     <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
//                         Cost: {cost} Wood
//                     </span>
//                 </div>
//             </div>
//             <Button 
//                 size="sm" 
//                 disabled={!canAfford}
//                 onClick={handleRedeem}
//                 className={canAfford ? "bg-purple-600 hover:bg-purple-700" : "opacity-50"}
//             >
//                 Redeem
//             </Button>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, TreePine, Leaf, ShoppingBag, Gift, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// ⚠️ Make sure this matches your Backend Port!
const API_URL = "http://localhost:5000/api/rewards"; 

export default function NourishGarden() {
  const { user } = useAuth();
  // Handle both _id (MongoDB default) and id (virtual)
  const userId = user?._id || user?.id;

  const [stats, setStats] = useState({ 
    xp: 0, 
    tokens: 0, 
    level: 1 
  });
  const [loading, setLoading] = useState(true);

  // --- 1. RETRIEVE DATA ON LOAD ---
  useEffect(() => {
    if (userId) {
      const fetchStats = async () => {
        try {
          // Fetch from Database
          const res = await fetch(`${API_URL}/status/${userId}`);
          const data = await res.json();
          
          // Update the UI with Database values
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

    // Optimistic UI Update (Makes it feel instant)
    const oldStats = { ...stats };
    setStats(prev => ({
        ...prev, 
        xp: prev.xp + 100, 
        tokens: prev.tokens + 10,
        level: Math.floor((prev.xp + 100) / 500) + 1
    }));

    try {
      // Save to Database
      const res = await fetch(`${API_URL}/earn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Sync with exact DB data just in case
        setStats(data.stats);
        
        if (data.stats.level > oldStats.level) {
            toast.success("🌱 LEVEL UP! Your garden is growing!");
        } else {
            toast.success("Verified! Points saved to Database.");
        }
      }
    } catch (error) {
      toast.error("Network Error: Could not save points.");
      setStats(oldStats); // Revert if failed
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
            setStats(data.stats); // Update UI with new token balance
            toast.success(`Redeemed: ${title}`);
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
      <Card className="border-none shadow-2xl bg-gradient-to-b from-sky-100 to-emerald-50 overflow-hidden relative min-h-[500px]">
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
            <span className="text-emerald-800 font-bold">Level {stats.level}</span>
        </div>

        <div className="flex flex-col items-center justify-center h-full pt-20 z-10 relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={stats.level}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    {/* Visual Logic: Changes based on Level */}
                    {stats.level === 1 && <Sprout size={120} className="text-emerald-500" />}
                    {stats.level === 2 && <TreePine size={180} className="text-emerald-600" />}
                    {stats.level >= 3 && (
                        <div className="flex -space-x-8">
                            <TreePine size={150} className="text-emerald-700 translate-y-4" />
                            <TreePine size={200} className="text-emerald-500 -translate-y-2 z-10" />
                            <TreePine size={150} className="text-emerald-600 translate-y-4" />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            
            <motion.div className="mt-8 text-center" layout>
                <h2 className="text-2xl font-bold text-emerald-900">
                    {stats.level === 1 ? "A Humble Sprout" : stats.level === 2 ? "Growing Sapling" : "Thriving Forest"}
                </h2>
                <p className="text-emerald-600">Keep simulating deliveries to grow!</p>
            </motion.div>
        </div>

        {/* Decorative Ground */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-[50%] scale-150 translate-y-10" />
      </Card>

      {/* --- CONTROLS & MARKET (RIGHT) --- */}
      <div className="space-y-6">
        
        {/* Resource Display */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 bg-amber-200 rounded-full text-amber-800">
                        <Leaf size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-amber-700 font-medium">Harvested Wood</p>
                        <h3 className="text-3xl font-bold text-amber-900">{stats.tokens}</h3>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-200 rounded-full text-blue-800">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-blue-700 font-medium">Growth XP</p>
                        <h3 className="text-3xl font-bold text-blue-900">{stats.xp}</h3>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* THE DEMO BUTTON */}
        <Button 
            onClick={handleSimulateAction}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg shadow-lg hover:shadow-emerald-500/30 transition-all font-bold"
        >
            🚀 Simulate Delivery (+100 XP)
        </Button>
        <p className="text-xs text-center text-gray-400">
            *Clicking this saves data to MongoDB immediately
        </p>

        {/* Marketplace */}
        <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="text-purple-600" /> Reward Marketplace
            </h3>
            
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

// Helper Component for List Items
function CouponItem({ title, cost, currentTokens, onRedeem }: { title: string, cost: number, currentTokens: number, onRedeem: () => void }) {
    const canAfford = currentTokens >= cost;

    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                    <Gift className="text-purple-600" size={20} />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{title}</h4>
                    <span className="text-xs text-gray-500 font-medium">Cost: {cost} Wood</span>
                </div>
            </div>
            <Button 
                size="sm" 
                disabled={!canAfford}
                onClick={onRedeem}
                className={canAfford ? "bg-purple-600 hover:bg-purple-700" : "opacity-50"}
            >
                Redeem
            </Button>
        </div>
    );
}