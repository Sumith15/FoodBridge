// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import { Truck, MapPin, Navigation, PackageCheck, CheckCircle2, ExternalLink, List, Map as MapIcon, AlertTriangle, ShieldAlert } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//   iconUrl: icon, shadowUrl: iconShadow,
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // --- MATH & UTILITY HELPERS ---
// const calcDist = (loc1: {lat: number, lng: number}, loc2: {lat: number, lng: number}) => {
//     if (!loc1 || !loc2) return 999;
//     const R = 6371; 
//     const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
//     const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
//     const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
//     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// };

// const parseTimeToMins = (timeStr: string) => {
//     if(!timeStr) return 120; 
//     const str = timeStr.toLowerCase();
//     const val = parseFloat(str);
//     if (isNaN(val)) return 120;
//     if (str.includes('hour') || str.includes('hr')) return val * 60;
//     return val; 
// };

// const createNumberedIcon = (num: number, isPickup: boolean, isUrgent: boolean = false) => {
//     const color = isUrgent ? '#EF4444' : (isPickup ? '#00FFB2' : '#3B82F6'); 
//     return L.divIcon({
//         className: 'custom-div-icon',
//         html: `<div style="background-color: ${color}; color: ${isPickup && !isUrgent ? 'black' : 'white'}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);">${num}</div>`,
//         iconSize: [28, 28],
//         iconAnchor: [14, 14]
//     });
// };

// const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
//   const map = useMap();
//   useEffect(() => { map.setView([lat, lng], map.getZoom()); }, [lat, lng, map]);
//   return null;
// };

// const Volunteer = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState<"requests" | "routes">("requests");
//   const [availableTasks, setAvailableTasks] = useState<any[]>([]); 
//   const [myTasks, setMyTasks] = useState<any[]>([]); 
//   const [agentLoc, setAgentLoc] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported");
//         return;
//     }
//     const watchId = navigator.geolocation.watchPosition(
//         (pos) => setAgentLoc([pos.coords.latitude, pos.coords.longitude]),
//         (err) => console.error(err),
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   useEffect(() => { fetchTasks(); }, []);

//   useEffect(() => {
//     if (myTasks.length === 0 || !agentLoc) return;
//     const broadcast = () => {
//         myTasks.forEach(task => {
//             fetch(`http://172.16.26.154:5000/api/donation/${task._id}/location`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ lat: agentLoc[0], lng: agentLoc[1] })
//             }).catch(() => {});
//         });
//     };
//     broadcast();
//     const interval = setInterval(broadcast, 3000);
//     return () => clearInterval(interval);
//   }, [agentLoc, myTasks]);

//   const fetchTasks = async () => {
//     try {
//         const resAvail = await fetch("http://172.16.26.154:5000/api/donations?status=searching_agent");
//         setAvailableTasks(await resAvail.json());

//         if (user?.id) {
//             const resMy = await fetch(`http://172.16.26.154:5000/api/donations?agentId=${user.id}`);
//             const dataMy = await resMy.json();
//             setMyTasks(dataMy.filter((t: any) => t.status === "assigned" || t.status === "transit"));
//         }
//     } catch (err) { console.error("Sync Error", err); }
//   };

//   const handleAccept = async (id: string) => {
//     await fetch(`http://172.16.26.154:5000/api/donation/${id}/claim`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ agentId: user?.id, agentName: user?.name })
//     });
//     toast.success("Added to AI Route Constraints");
//     setActiveTab("routes");
//     fetchTasks();
//   };

//   const handleAction = async (step: any) => {
//     if (step.type === "pickup") {
//         await fetch(`http://172.16.26.154:5000/api/donation/${step.task._id}/pickup`, { method: "PUT" });
//         toast.success("Collected! AI Recalculating...");
//     } else {
//         await fetch(`http://172.16.26.154:5000/api/donation/${step.task._id}/deliver`, { method: "PUT" });
//         toast.success("Safe Delivery Complete!");
//     }
//     fetchTasks();
//   };

//   // ========================================================================
//   // AI ALGORITHM: MULTI-PICKUP BATCHING + VRPTW SPOILAGE CONSTRAINTS
//   // ========================================================================
//   const optimizeRoute = () => {
//       if (!agentLoc || myTasks.length === 0) return [];
      
//       const tasksWithTime = myTasks.map(t => ({ ...t, expiryMins: parseTimeToMins(t.expiry) }));
//       let currentLoc = { lat: agentLoc[0], lng: agentLoc[1] };
      
//       // unvisitedPickups: Things we agreed to pick up, but haven't yet
//       let unvisitedPickups = tasksWithTime.filter(t => t.status === "assigned");
//       // trunk: Things we HAVE picked up, but haven't dropped off yet
//       let trunk = tasksWithTime.filter(t => t.status === "transit");
      
//       let steps = [];
//       let currentTimeMins = 0; 
//       const AVG_SPEED_KM_MIN = 0.5; // Approx 30 km/h city driving
//       let safety = 0; 
      
//       while ((unvisitedPickups.length > 0 || trunk.length > 0) && safety < 100) {
//           safety++;
//           let bestStep = null;
//           let bestScore = Infinity;
//           let isPickup = true;
//           let stepIndex = -1;
//           let emergencyTriggered = false;

//           // HELPER: Groups nearby pickups to encourage bulk collection
//           const getClusterBonus = (targetNode: any) => {
//               let nearbyCount = 0;
//               unvisitedPickups.forEach(p => {
//                   if (p._id !== targetNode._id && p.location && targetNode.location && calcDist(targetNode.location, p.location) < 3.0) nearbyCount++;
//               });
//               return nearbyCount * 2.0; // Subtracts 2km from distance penalty per nearby node
//           };

//           const evaluateCandidates = (candidates: any[], isPick: boolean) => {
//               candidates.forEach((t, i) => {
//                   const targetLoc = isPick ? t.location : (t.receiver?.location || {lat: 17.385, lng: 78.486});
//                   if(!targetLoc) return;

//                   const dist = calcDist(currentLoc, targetLoc);
//                   const simulatedTravelMins = (dist / AVG_SPEED_KM_MIN) + 5; // Travel + 5 min loading time

//                   // 1. SPOILAGE HARD CONSTRAINT
//                   // "If I do this step, will any food in my trunk expire before I can deliver it?"
//                   let violatesSpoilage = false;
//                   trunk.forEach(drop => {
//                       if (!isPick && drop._id === t._id) return; // Skip checking self if we are evaluating delivering it
//                       const dropLoc = drop.receiver?.location || {lat: 17.385, lng: 78.486};
//                       const distToDropFromHere = calcDist(targetLoc, dropLoc);
//                       const timeToDrop = simulatedTravelMins + (distToDropFromHere / AVG_SPEED_KM_MIN) + 5;
                      
//                       // Check against expiry with a 10 minute safety buffer
//                       if (currentTimeMins + timeToDrop > (drop.expiryMins - 10)) violatesSpoilage = true;
//                   });

//                   if (violatesSpoilage) return; // Route rejected to prevent food waste

//                   // 2. HEURISTIC WEIGHTING (Score: Lower is better)
//                   let score = dist;
                  
//                   if (isPick) {
//                       score -= getClusterBonus(t); 
//                       // BATCHING: If trunk is relatively empty, strongly encourage picking up more!
//                       if (trunk.length < 3) {
//                           score -= 2.0; 
//                       }
//                   } else {
//                       const timeRemaining = t.expiryMins - (currentTimeMins + simulatedTravelMins);
                      
//                       // Only push for drop-off if trunk is getting full
//                       if (trunk.length >= 3) score -= (trunk.length * 1.5);

//                       // URGENCY OVERRIDE: If food is close to expiring, drop everything and deliver it
//                       if (timeRemaining < 60) {
//                           score -= (60 - timeRemaining) * 0.5;
//                       }
//                       if (timeRemaining < 30) {
//                           score -= 100; // Absolute top priority
//                           emergencyTriggered = true;
//                       }
//                   }

//                   if (score < bestScore) {
//                       bestScore = score;
//                       bestStep = t;
//                       isPickup = isPick;
//                       stepIndex = i;
//                   }
//               });
//           };

//           evaluateCandidates(unvisitedPickups, true);
//           evaluateCandidates(trunk, false);

//           // FALLBACK: If all logical paths are blocked by constraints, force an emergency delivery of the most perishable item
//           if (!bestStep && trunk.length > 0) {
//                trunk.sort((a,b) => a.expiryMins - b.expiryMins);
//                bestStep = trunk[0];
//                isPickup = false;
//                stepIndex = 0;
//                emergencyTriggered = true;
//           } else if (!bestStep) {
//               break; 
//           }

//           // LOCK IN THE CHOSEN STEP & UPDATE SIMULATED STATE
//           if (isPickup) {
//               const stepLoc = bestStep.location || { lat: 17.3850, lng: 78.4867 };
//               steps.push({ id: `p_${bestStep._id}`, type: 'pickup', task: bestStep, location: stepLoc, urgent: emergencyTriggered });
//               unvisitedPickups.splice(stepIndex, 1);
//               trunk.push(bestStep); // Load into trunk
              
//               currentTimeMins += (calcDist(currentLoc, stepLoc) / AVG_SPEED_KM_MIN) + 5; 
//               currentLoc = stepLoc;
//           } else {
//               const recLoc = bestStep.receiver?.location || {lat: 17.385, lng: 78.486};
//               steps.push({ id: `d_${bestStep._id}`, type: 'dropoff', task: bestStep, location: recLoc, urgent: emergencyTriggered });
//               trunk.splice(stepIndex, 1); // Remove from trunk
              
//               currentTimeMins += (calcDist(currentLoc, recLoc) / AVG_SPEED_KM_MIN) + 5;
//               currentLoc = recLoc;
//           }
//       }
//       return steps;
//   };
//   // ========================================================================

//   const routeSteps = optimizeRoute();
//   const currentTarget = routeSteps.length > 0 ? routeSteps[0] : null;

//   const openGoogleMaps = () => {
//       if (!currentTarget || !agentLoc) return;
//       const origin = `${agentLoc[0]},${agentLoc[1]}`;
//       const destination = `${currentTarget.location.lat},${currentTarget.location.lng}`;
//       window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, "_blank");
//   };

//   const polylinePositions: [number, number][] = agentLoc 
//       ? [agentLoc, ...routeSteps.map(s => [s.location.lat, s.location.lng] as [number, number])] 
//       : [];

//   if (!agentLoc) {
//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="text-center glass-card p-8 border border-emerald-500/20 max-w-sm mx-auto">
//                 <Navigation className="w-12 h-12 mx-auto animate-pulse mb-4 text-emerald-500" />
//                 <h2 className="text-xl font-bold text-white">Acquiring GPS...</h2>
//                 <div className="mt-6 pt-6 border-t border-white/10">
//                     <button 
//                         onClick={() => { setAgentLoc([17.3850, 78.4867]); toast.success("Simulated GPS Activated!"); }}
//                         className="w-full bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
//                     >
//                         Simulate Location (Testing)
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      
//       {/* LEFT PANEL */}
//       <div className="w-full md:w-1/3 space-y-6">
//         <h1 className="text-2xl font-display font-bold">Agent <span className="gradient-text">Console</span></h1>

//         <div className="glass-card p-1 flex">
//             <button onClick={() => setActiveTab("requests")} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "requests" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}>
//                 <List className="w-4 h-4" /> Requests ({availableTasks.length})
//             </button>
//             <button onClick={() => setActiveTab("routes")} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "routes" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}>
//                 <MapIcon className="w-4 h-4" /> AI Route ({routeSteps.length})
//             </button>
//         </div>

//         <AnimatePresence mode="wait">
//             {activeTab === "requests" && (
//                 <motion.div key="req" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-3">
//                     {availableTasks.length === 0 ? <p className="text-sm text-muted-foreground text-center p-4 glass-card">No new requests nearby.</p> : 
//                     availableTasks.map(t => (
//                         <div key={t._id} className="glass-card p-4 border-l-4 border-yellow-400">
//                             <div className="flex justify-between items-start mb-3">
//                                 <div>
//                                     <p className="font-bold text-white text-lg">{t.foodType}</p>
//                                     <p className="text-emerald-400 text-sm">{t.quantity}kg • Expires in {t.expiry}</p>
//                                 </div>
//                                 <button onClick={() => handleAccept(t._id)} className="btn-glow-solid px-4 py-2 text-xs">Add to Route</button>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                                 <MapPin className="w-3 h-3" /> Pickup: {t.location?.lat ? "Location Provided" : "Unknown"}
//                             </div>
//                         </div>
//                     ))}
//                 </motion.div>
//             )}

//             {activeTab === "routes" && (
//                 <motion.div key="rt" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
//                     {!currentTarget ? (
//                         <div className="glass-card p-6 text-center text-muted-foreground">
//                             <Truck className="w-12 h-12 mx-auto mb-3 opacity-20" />
//                             No active tasks. Go to Requests to add to your queue.
//                         </div>
//                     ) : (
//                         <>
//                             {/* TARGET #1 */}
//                             <div className={`glass-card p-6 border-l-4 relative overflow-hidden ${currentTarget.urgent ? 'border-red-500 bg-red-500/10' : 'border-emerald-500 bg-emerald-500/5'}`}>
//                                 <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${currentTarget.urgent ? 'text-red-500' : 'text-emerald-500'}`}>
//                                     {currentTarget.urgent ? <><AlertTriangle className="w-4 h-4"/> Spoilage Constraint Active</> : "Next Stop (AI Optimized)"}
//                                 </h2>
//                                 <h3 className="text-xl font-bold text-white mb-1">
//                                     {currentTarget.type === 'pickup' ? "Pickup" : "Deliver"} {currentTarget.task.foodType}
//                                 </h3>
//                                 <p className="text-sm text-muted-foreground mb-4">
//                                     {currentTarget.type === 'pickup' ? "From: " + (currentTarget.task.donor?.name || "Donor") : "To: " + (currentTarget.task.receiver?.name || "Receiver")}
//                                 </p>

//                                 <div className="grid grid-cols-2 gap-3">
//                                     <button onClick={openGoogleMaps} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors">
//                                         <Navigation className="w-4 h-4" /> Navigate
//                                     </button>
                                    
//                                     <button onClick={() => handleAction(currentTarget)} className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors text-black ${currentTarget.urgent ? 'bg-red-500 hover:bg-red-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}>
//                                         {currentTarget.type === 'pickup' ? <PackageCheck className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} 
//                                         {currentTarget.type === 'pickup' ? "Collected" : "Delivered"}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* UPCOMING STEPS QUEUE */}
//                             {routeSteps.length > 1 && (
//                                 <div className="mt-4">
//                                     <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Planned VRPTW Route</h4>
//                                     <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
//                                         {routeSteps.slice(1).map((step, idx) => (
//                                             <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active glass-card p-3 rounded-xl opacity-70">
//                                                 <div className="flex items-center gap-3">
//                                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step.urgent ? 'bg-red-500/20 text-red-500' : (step.type === 'pickup' ? 'bg-[#00FFB2]/20 text-[#00FFB2]' : 'bg-blue-500/20 text-blue-400')}`}>
//                                                         {idx + 2}
//                                                     </div>
//                                                     <div>
//                                                         <p className="font-bold text-sm text-white flex items-center gap-2">
//                                                             {step.type === 'pickup' ? "Pickup" : "Drop-off"} {step.task.foodType}
//                                                             {step.urgent && <AlertTriangle className="w-3 h-3 text-red-500" />}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </motion.div>
//             )}
//         </AnimatePresence>
//       </div>

//       {/* MAP PANEL */}
//       <div className="w-full md:w-2/3 glass-card p-1 h-[600px] relative rounded-xl overflow-hidden">
//         <MapContainer center={agentLoc} zoom={13} style={{ height: "100%", width: "100%" }}>
//             <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
//             <RecenterMap lat={agentLoc[0]} lng={agentLoc[1]} />

//             <Marker position={agentLoc}><Popup>You (Live)</Popup></Marker>

//             {activeTab === "requests" && availableTasks.map(t => t.location && (
//                 <Marker key={t._id} position={[t.location.lat, t.location.lng]}>
//                     <Popup>Pickup: {t.foodType}</Popup>
//                 </Marker>
//             ))}

//             {activeTab === "routes" && routeSteps.map((step, idx) => (
//                 <Marker key={step.id} position={[step.location.lat, step.location.lng]} icon={createNumberedIcon(idx + 1, step.type === 'pickup', step.urgent)}>
//                     <Popup>{step.type === 'pickup' ? "Pickup" : "Deliver"}: {step.task.foodType}</Popup>
//                 </Marker>
//             ))}

//             {activeTab === "routes" && routeSteps.length > 0 && (
//                 <Polyline positions={polylinePositions} pathOptions={{ color: "#00FFB2", weight: 4, dashArray: "10,10" }} />
//             )}
//         </MapContainer>
        
//         {currentTarget && activeTab === "routes" && (
//             <button 
//                 onClick={openGoogleMaps}
//                 className="absolute bottom-6 right-6 z-[400] flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105 active:scale-95 group"
//             >
//                 <MapIcon className="w-5 h-5" />
//                 <span>Open Next Stop in Maps</span>
//                 <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
//             </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Volunteer;





import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Truck, MapPin, Navigation, PackageCheck, CheckCircle2, ExternalLink, List, Map as MapIcon, AlertTriangle, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon, shadowUrl: iconShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- MATH & UTILITY HELPERS ---
const calcDist = (loc1: {lat: number, lng: number}, loc2: {lat: number, lng: number}) => {
    if (!loc1 || !loc2) return 999;
    const R = 6371; 
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const parseTimeToMins = (timeStr: string) => {
    if(!timeStr) return 120; 
    const str = timeStr.toLowerCase();
    const val = parseFloat(str);
    if (isNaN(val)) return 120;
    if (str.includes('hour') || str.includes('hr')) return val * 60;
    return val; 
};

const createNumberedIcon = (num: number, isPickup: boolean, isUrgent: boolean = false) => {
    const color = isUrgent ? '#EF4444' : (isPickup ? '#00FFB2' : '#3B82F6'); 
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; color: ${isPickup && !isUrgent ? 'black' : 'white'}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);">${num}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });
};

const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], map.getZoom()); }, [lat, lng, map]);
  return null;
};

const Volunteer = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"requests" | "routes">("requests");
  const [availableTasks, setAvailableTasks] = useState<any[]>([]); 
  const [myTasks, setMyTasks] = useState<any[]>([]); 
  const [agentLoc, setAgentLoc] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
        toast.error("Geolocation not supported");
        return;
    }
    const watchId = navigator.geolocation.watchPosition(
        (pos) => setAgentLoc([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => { fetchTasks(); }, []);

  useEffect(() => {
    if (myTasks.length === 0 || !agentLoc) return;
    const broadcast = () => {
        myTasks.forEach(task => {
            fetch(`http://172.16.26.154:5000/api/donation/${task._id}/location`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat: agentLoc[0], lng: agentLoc[1] })
            }).catch(() => {});
        });
    };
    broadcast();
    const interval = setInterval(broadcast, 3000);
    return () => clearInterval(interval);
  }, [agentLoc, myTasks]);

  const fetchTasks = async () => {
    try {
        const resAvail = await fetch("http://172.16.26.154:5000/api/donations?status=searching_agent");
        setAvailableTasks(await resAvail.json());

        if (user?.id) {
            const resMy = await fetch(`http://172.16.26.154:5000/api/donations?agentId=${user.id}`);
            const dataMy = await resMy.json();
            setMyTasks(dataMy.filter((t: any) => t.status === "assigned" || t.status === "transit"));
        }
    } catch (err) { console.error("Sync Error", err); }
  };

  const handleAccept = async (id: string) => {
    await fetch(`http://172.16.26.154:5000/api/donation/${id}/claim`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: user?.id, agentName: user?.name })
    });
    toast.success("Added to Route AI");
    setActiveTab("routes");
    fetchTasks();
  };

  const handleAction = async (step: any) => {
    if (step.type === "pickup") {
        await fetch(`http://172.16.26.154:5000/api/donation/${step.task._id}/pickup`, { method: "PUT" });
        toast.success("Collected! Recalculating Sequence...");
    } else {
        await fetch(`http://172.16.26.154:5000/api/donation/${step.task._id}/deliver`, { method: "PUT" });
        toast.success("Safe Delivery Complete!");
    }
    fetchTasks();
  };

  // ========================================================================
  // ADVANCED AI: CONTINUOUS BATCHING + VRPTW SPOILAGE CONSTRAINTS
  // ========================================================================
  const optimizeRoute = () => {
      if (!agentLoc || myTasks.length === 0) return [];
      
      const tasksWithTime = myTasks.map(t => ({ ...t, expiryMins: parseTimeToMins(t.expiry) }));
      let currentLoc = { lat: agentLoc[0], lng: agentLoc[1] };
      
      let unvisitedPickups = tasksWithTime.filter(t => t.status === "assigned");
      let trunk = tasksWithTime.filter(t => t.status === "transit");
      
      let steps = [];
      let currentTimeMins = 0; 
      const AVG_SPEED_KM_MIN = 0.5; // ~30 km/h city driving
      const STOP_TIME = 5; // 5 mins to load/unload
      let safety = 0; 
      
      while ((unvisitedPickups.length > 0 || trunk.length > 0) && safety < 100) {
          safety++;
          let bestStep = null;
          let isPickup = false;
          let stepIndex = -1;

          // 1. HARD SPOILAGE CONSTRAINT CHECK
          // Can we go to this pickup and STILL deliver everything in the trunk before it rots?
          const isPickupValid = (pickupTask: any) => {
              const pLoc = pickupTask.location || { lat: 17.385, lng: 78.486 };
              const timeToP = (calcDist(currentLoc, pLoc) / AVG_SPEED_KM_MIN) + STOP_TIME;
              
              // If we do this pickup, the time will be:
              const simulatedTime = currentTimeMins + timeToP;

              // Check every item in the trunk. Can we reach its dropoff from the new pickup location in time?
              for (let i = 0; i < trunk.length; i++) {
                  const dLoc = trunk[i].receiver?.location || { lat: 17.385, lng: 78.486 };
                  const timeToD = (calcDist(pLoc, dLoc) / AVG_SPEED_KM_MIN) + STOP_TIME;
                  // If travel time exceeds expiry, this pickup is INVALID.
                  if (simulatedTime + timeToD > trunk[i].expiryMins) return false; 
              }
              return true; // All safe!
          };

          // Filter out Pickups that would ruin food
          const validPickups = unvisitedPickups.filter(p => isPickupValid(p));

          // 2. CHECK FOR EMERGENCIES IN TRUNK
          let criticalDropoff = null;
          let minTimeLeft = Infinity;
          
          trunk.forEach((t, i) => {
              const dLoc = t.receiver?.location || { lat: 17.385, lng: 78.486 };
              const travelTime = (calcDist(currentLoc, dLoc) / AVG_SPEED_KM_MIN) + STOP_TIME;
              const timeLeft = t.expiryMins - (currentTimeMins + travelTime);
              
              // If an item will expire in under 30 mins, we drop EVERYTHING and go deliver it.
              if (timeLeft < 30 && timeLeft < minTimeLeft) {
                  minTimeLeft = timeLeft;
                  criticalDropoff = { task: t, index: i };
              }
          });

          // 3. DECISION LOGIC: BATCH PICKUP vs BATCH DELIVERY
          if (criticalDropoff) {
              // EMERGENCY: Must deliver immediately
              bestStep = criticalDropoff.task;
              isPickup = false;
              stepIndex = criticalDropoff.index;
          } 
          else if (validPickups.length > 0) {
              // PHASE 1: CONTINUOUS BATCH PICKUP
              // We grab the closest pickup. The loop repeats and keeps grabbing pickups until 
              // the trunk is full or a Spoilage Constraint forces a delivery!
              let minDist = Infinity;
              validPickups.forEach((p) => {
                  const idx = unvisitedPickups.findIndex(up => up._id === p._id);
                  const dist = calcDist(currentLoc, p.location || { lat: 17.385, lng: 78.486 });
                  if (dist < minDist) { minDist = dist; bestStep = p; isPickup = true; stepIndex = idx; }
              });
          } 
          else if (trunk.length > 0) {
              // PHASE 2: CONTINUOUS BATCH DELIVERY
              // Either no pickups left, or picking up more would ruin the food. Time to deliver!
              let bestDropScore = Infinity;
              trunk.forEach((t, i) => {
                  const dLoc = t.receiver?.location || { lat: 17.385, lng: 78.486 };
                  const dist = calcDist(currentLoc, dLoc);
                  const travelTime = (dist / AVG_SPEED_KM_MIN) + STOP_TIME;
                  const timeLeft = t.expiryMins - (currentTimeMins + travelTime);
                  
                  // Score = Distance + Urgency Penalty
                  let score = dist;
                  if (timeLeft < 60) score -= (60 - timeLeft) * 2; 
                  
                  if (score < bestDropScore) { bestDropScore = score; bestStep = t; isPickup = false; stepIndex = i; }
              });
          } else {
              // Failsafe: Trunk is empty, but remaining pickups are technically "invalid" (already expired)
              // Just go clear them from the map.
              let minDist = Infinity;
              unvisitedPickups.forEach((p, i) => {
                  const dist = calcDist(currentLoc, p.location || { lat: 17.385, lng: 78.486 });
                  if(dist < minDist) { minDist = dist; bestStep = p; isPickup = true; stepIndex = i; }
              });
          }

          if (!bestStep) break;

          // 4. LOCK IN THE STEP & UPDATE SIMULATED CLOCK
          if (isPickup) {
              const stepLoc = bestStep.location || { lat: 17.3850, lng: 78.4867 };
              steps.push({ id: `p_${bestStep._id}`, type: 'pickup', task: bestStep, location: stepLoc, urgent: false });
              unvisitedPickups.splice(stepIndex, 1);
              trunk.push(bestStep); 
              currentTimeMins += (calcDist(currentLoc, stepLoc) / AVG_SPEED_KM_MIN) + STOP_TIME; 
              currentLoc = stepLoc;
          } else {
              const recLoc = bestStep.receiver?.location || {lat: 17.385, lng: 78.486};
              const urgent = (bestStep.expiryMins - currentTimeMins) < 45;
              steps.push({ id: `d_${bestStep._id}`, type: 'dropoff', task: bestStep, location: recLoc, urgent: urgent });
              trunk.splice(stepIndex, 1); 
              currentTimeMins += (calcDist(currentLoc, recLoc) / AVG_SPEED_KM_MIN) + STOP_TIME;
              currentLoc = recLoc;
          }
      }
      return steps;
  };
  // ========================================================================

  const routeSteps = optimizeRoute();
  const currentTarget = routeSteps.length > 0 ? routeSteps[0] : null;

  const openGoogleMaps = () => {
      if (!currentTarget || !agentLoc) return;
      const origin = `${agentLoc[0]},${agentLoc[1]}`;
      const destination = `${currentTarget.location.lat},${currentTarget.location.lng}`;
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, "_blank");
  };

  const polylinePositions: [number, number][] = agentLoc 
      ? [agentLoc, ...routeSteps.map(s => [s.location.lat, s.location.lng] as [number, number])] 
      : [];

  if (!agentLoc) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center glass-card p-8 border border-emerald-500/20 max-w-sm mx-auto">
                <Navigation className="w-12 h-12 mx-auto animate-pulse mb-4 text-emerald-500" />
                <h2 className="text-xl font-bold text-white">Acquiring GPS...</h2>
                <div className="mt-6 pt-6 border-t border-white/10">
                    <button 
                        onClick={() => { setAgentLoc([17.3850, 78.4867]); toast.success("Simulated GPS Activated!"); }}
                        className="w-full bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        Simulate Location (Testing)
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/3 space-y-6">
        <h1 className="text-2xl font-display font-bold">Agent <span className="gradient-text">Console</span></h1>

        <div className="glass-card p-1 flex">
            <button onClick={() => setActiveTab("requests")} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "requests" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}>
                <List className="w-4 h-4" /> Requests ({availableTasks.length})
            </button>
            <button onClick={() => setActiveTab("routes")} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "routes" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}>
                <MapIcon className="w-4 h-4" /> AI Route ({routeSteps.length})
            </button>
        </div>

        <AnimatePresence mode="wait">
            {activeTab === "requests" && (
                <motion.div key="req" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-3">
                    {availableTasks.length === 0 ? <p className="text-sm text-muted-foreground text-center p-4 glass-card">No new requests nearby.</p> : 
                    availableTasks.map(t => (
                        <div key={t._id} className="glass-card p-4 border-l-4 border-yellow-400">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-bold text-white text-lg">{t.foodType}</p>
                                    <p className="text-emerald-400 text-sm">{t.quantity}kg • Expires in {t.expiry}</p>
                                </div>
                                <button onClick={() => handleAccept(t._id)} className="btn-glow-solid px-4 py-2 text-xs">Add to Route</button>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" /> Pickup: {t.location?.lat ? "Location Provided" : "Unknown"}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === "routes" && (
                <motion.div key="rt" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
                    {!currentTarget ? (
                        <div className="glass-card p-6 text-center text-muted-foreground">
                            <Truck className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            No active tasks. Go to Requests to add to your queue.
                        </div>
                    ) : (
                        <>
                            {/* TARGET #1 */}
                            <div className={`glass-card p-6 border-l-4 relative overflow-hidden ${currentTarget.urgent ? 'border-red-500 bg-red-500/10' : 'border-emerald-500 bg-emerald-500/5'}`}>
                                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${currentTarget.urgent ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {currentTarget.urgent ? <><ShieldAlert className="w-4 h-4"/> Urgent Delivery Required</> : "Next Stop (AI Optimized)"}
                                </h2>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {currentTarget.type === 'pickup' ? "Pickup" : "Deliver"} {currentTarget.task.foodType}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {currentTarget.type === 'pickup' ? "From: " + (currentTarget.task.donor?.name || "Donor") : "To: " + (currentTarget.task.receiver?.name || "Receiver")}
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={openGoogleMaps} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors">
                                        <Navigation className="w-4 h-4" /> Navigate
                                    </button>
                                    
                                    <button onClick={() => handleAction(currentTarget)} className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors text-black ${currentTarget.urgent ? 'bg-red-500 hover:bg-red-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}>
                                        {currentTarget.type === 'pickup' ? <PackageCheck className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} 
                                        {currentTarget.type === 'pickup' ? "Collected" : "Delivered"}
                                    </button>
                                </div>
                            </div>

                            {/* UPCOMING STEPS QUEUE */}
                            {routeSteps.length > 1 && (
                                <div className="mt-4">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Planned Route</h4>
                                    <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                                        {routeSteps.slice(1).map((step, idx) => (
                                            <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active glass-card p-3 rounded-xl opacity-70">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step.urgent ? 'bg-red-500/20 text-red-500' : (step.type === 'pickup' ? 'bg-[#00FFB2]/20 text-[#00FFB2]' : 'bg-blue-500/20 text-blue-400')}`}>
                                                        {idx + 2}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-white flex items-center gap-2">
                                                            {step.type === 'pickup' ? "Pickup" : "Drop-off"} {step.task.foodType}
                                                            {step.urgent && <AlertTriangle className="w-3 h-3 text-red-500" />}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* MAP PANEL */}
      <div className="w-full md:w-2/3 glass-card p-1 h-[600px] relative rounded-xl overflow-hidden">
        <MapContainer center={agentLoc} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <RecenterMap lat={agentLoc[0]} lng={agentLoc[1]} />

            <Marker position={agentLoc}><Popup>You (Live)</Popup></Marker>

            {activeTab === "requests" && availableTasks.map(t => t.location && (
                <Marker key={t._id} position={[t.location.lat, t.location.lng]}>
                    <Popup>Pickup: {t.foodType}</Popup>
                </Marker>
            ))}

            {activeTab === "routes" && routeSteps.map((step, idx) => (
                <Marker key={step.id} position={[step.location.lat, step.location.lng]} icon={createNumberedIcon(idx + 1, step.type === 'pickup', step.urgent)}>
                    <Popup>{step.type === 'pickup' ? "Pickup" : "Deliver"}: {step.task.foodType}</Popup>
                </Marker>
            ))}

            {activeTab === "routes" && routeSteps.length > 0 && (
                <Polyline positions={polylinePositions} pathOptions={{ color: "#00FFB2", weight: 4, dashArray: "10,10" }} />
            )}
        </MapContainer>
        
        {currentTarget && activeTab === "routes" && (
            <button 
                onClick={openGoogleMaps}
                className="absolute bottom-6 right-6 z-[400] flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg font-bold transition-transform hover:scale-105 active:scale-95 group"
            >
                <MapIcon className="w-5 h-5" />
                <span>Open Next Stop in Maps</span>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
        )}
      </div>
    </div>
  );
};

export default Volunteer;