// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { Check, X, Bell, Clock, MapPin } from "lucide-react";
// // // // import { toast } from "sonner";

// // // // const Receive = () => {
// // // //   const [notifications, setNotifications] = useState<any[]>([]);

// // // //   // Simulate "Real-time" notification arriving after 3 seconds
// // // //   useEffect(() => {
// // // //     const timer = setTimeout(() => {
// // // //       setNotifications([
// // // //         { id: 1, hotel: "Hotel Paradise", food: "Veg Biryani", qty: "15kg", time: "2h left", dist: "2.4km" }
// // // //       ]);
// // // //       toast.info("New Donation Available near you!");
// // // //     }, 3000);
// // // //     return () => clearTimeout(timer);
// // // //   }, []);

// // // //   const handleDecision = (id: number, accepted: boolean) => {
// // // //     setNotifications(prev => prev.filter(n => n.id !== id));
// // // //     if (accepted) {
// // // //         toast.success("Food Claimed! Volunteer assigned.");
// // // //         // Here you would call API to update status
// // // //     } else {
// // // //         toast.info("Donation declined.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
// // // //       <div className="flex items-center justify-between mb-8">
// // // //         <h1 className="text-3xl font-display font-bold">Incoming <span className="gradient-text">Donations</span></h1>
// // // //         <div className="relative">
// // // //             <Bell className="w-6 h-6 text-emerald-400" />
// // // //             {notifications.length > 0 && (
// // // //                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
// // // //             )}
// // // //         </div>
// // // //       </div>

// // // //       <AnimatePresence>
// // // //         {notifications.length === 0 ? (
// // // //            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 text-muted-foreground">
// // // //                No pending donations nearby. We will notify you when food is available.
// // // //            </motion.div>
// // // //         ) : (
// // // //            notifications.map(n => (
// // // //             <motion.div 
// // // //                 key={n.id}
// // // //                 initial={{ scale: 0.9, opacity: 0 }}
// // // //                 animate={{ scale: 1, opacity: 1 }}
// // // //                 exit={{ scale: 0.9, opacity: 0 }}
// // // //                 className="glass-card p-6 border-l-4 border-emerald-500"
// // // //             >
// // // //                 <div className="flex flex-col md:flex-row justify-between items-center gap-6">
// // // //                     <div>
// // // //                         <h3 className="text-2xl font-bold text-white mb-1">{n.hotel}</h3>
// // // //                         <p className="text-lg text-emerald-400 font-medium">{n.food} • {n.qty}</p>
// // // //                         <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
// // // //                             <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Expires in {n.time}</span>
// // // //                             <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {n.dist} away</span>
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     <div className="flex gap-3">
// // // //                         <button 
// // // //                             onClick={() => handleDecision(n.id, false)}
// // // //                             className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-muted-foreground transition-all flex items-center gap-2"
// // // //                         >
// // // //                             <X className="w-5 h-5" /> Decline
// // // //                         </button>
// // // //                         <button 
// // // //                             onClick={() => handleDecision(n.id, true)}
// // // //                             className="btn-glow-solid px-8 py-3 flex items-center gap-2"
// // // //                         >
// // // //                             <Check className="w-5 h-5" /> Accept
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>
// // // //             </motion.div>
// // // //            ))
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Receive;




// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Check, X, Bell, Clock, MapPin, Loader2 } from "lucide-react";
// // // import { toast } from "sonner";
// // // import { useAuth } from "@/context/AuthContext";

// // // const Receive = () => {
// // //   const { user } = useAuth();
// // //   const [donations, setDonations] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // 1. FETCH REAL DATA ON LOAD
// // //   useEffect(() => {
// // //     fetchAvailableDonations();
// // //   }, []);

// // //   const fetchAvailableDonations = async () => {
// // //     try {
// // //       // Fetch only "pending" donations
// // //       const res = await fetch("http://localhost:5000/api/donations?status=pending");
// // //       const data = await res.json();
// // //       setDonations(data);
// // //     } catch (err) {
// // //       console.error("Failed to load donations");
// // //       toast.error("Could not load live feed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // 2. HANDLE ACCEPT / DECLINE
// // //   const handleDecision = async (id: string, accepted: boolean) => {
// // //     if (!accepted) {
// // //       // Just hide it locally for now (or call an API to ignore it)
// // //       setDonations(prev => prev.filter(d => d._id !== id));
// // //       return;
// // //     }

// // //     try {
// // //       // Call API to update status to "assigned" or "transit"
// // //       // Note: You'll need a route for this, usually PUT /api/donation/:id
// // //       // For now, we will just simulate success locally
// // //       setDonations(prev => prev.filter(d => d._id !== id));
// // //       toast.success("Donation Accepted! Volunteer assigned.");
// // //     } catch (err) {
// // //       toast.error("Failed to accept donation");
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
// // //       <div className="flex items-center justify-between mb-8">
// // //         <div>
// // //            <h1 className="text-3xl font-display font-bold">Incoming <span className="gradient-text">Donations</span></h1>
// // //            <p className="text-muted-foreground mt-1">Live feed of available food nearby</p>
// // //         </div>
// // //         <div className="relative">
// // //             <Bell className="w-6 h-6 text-emerald-400" />
// // //             {donations.length > 0 && (
// // //                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
// // //             )}
// // //         </div>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex justify-center py-20">
// // //             <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
// // //         </div>
// // //       ) : (
// // //         <AnimatePresence>
// // //             {donations.length === 0 ? (
// // //             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-20 glass-card">
// // //                 <p className="text-muted-foreground text-lg">No pending donations right now.</p>
// // //                 <p className="text-sm text-muted-foreground/50">We will notify you when food is available.</p>
// // //             </motion.div>
// // //             ) : (
// // //             donations.map(d => (
// // //                 <motion.div 
// // //                     key={d._id}
// // //                     initial={{ scale: 0.9, opacity: 0 }}
// // //                     animate={{ scale: 1, opacity: 1 }}
// // //                     exit={{ scale: 0.9, opacity: 0 }}
// // //                     className="glass-card p-6 border-l-4 border-emerald-500 mb-4"
// // //                 >
// // //                     <div className="flex flex-col md:flex-row justify-between items-center gap-6">
// // //                         <div className="flex-1">
// // //                             <h3 className="text-2xl font-bold text-white mb-1">{d.donor?.name || "Anonymous Donor"}</h3>
// // //                             <p className="text-lg text-emerald-400 font-medium capitalize">{d.foodType} • {d.quantity}kg</p>
// // //                             <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
// // //                                 <span className="flex items-center gap-1">
// // //                                     <Clock className="w-4 h-4 text-primary" /> Expires: {d.expiry}
// // //                                 </span>
// // //                                 <span className="flex items-center gap-1">
// // //                                     <MapPin className="w-4 h-4 text-primary" /> {d.pickupTime || "30m"} pickup window
// // //                                 </span>
// // //                             </div>
// // //                         </div>
                        
// // //                         <div className="flex gap-3 w-full md:w-auto">
// // //                             <button 
// // //                                 onClick={() => handleDecision(d._id, false)}
// // //                                 className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-muted-foreground transition-all flex items-center gap-2 flex-1 justify-center"
// // //                             >
// // //                                 <X className="w-5 h-5" /> Decline
// // //                             </button>
// // //                             <button 
// // //                                 onClick={() => handleDecision(d._id, true)}
// // //                                 className="btn-glow-solid px-8 py-3 flex items-center gap-2 flex-1 justify-center"
// // //                             >
// // //                                 <Check className="w-5 h-5" /> Accept
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </motion.div>
// // //             ))
// // //             )}
// // //         </AnimatePresence>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Receive;




// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Check, X, Bell, Clock, MapPin, Loader2, Search } from "lucide-react";
// // // import { toast } from "sonner";
// // // import { useAuth } from "@/context/AuthContext";

// // // const Receive = () => {
// // //   const { user } = useAuth();
// // //   const [donations, setDonations] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

// // //   useEffect(() => {
// // //     fetchAvailableDonations();
// // //     // Get Receiver Location
// // //     navigator.geolocation.getCurrentPosition(
// // //         (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
// // //         () => console.log("Default location used")
// // //     );
// // //   }, []);

// // //   const fetchAvailableDonations = async () => {
// // //     try {
// // //       // Fetch 'pending' donations
// // //       const res = await fetch("http://localhost:5000/api/donations?status=pending");
// // //       const data = await res.json();
// // //       setDonations(data);
// // //     } catch (err) { toast.error("Could not load feed"); } 
// // //     finally { setLoading(false); }
// // //   };

// // //   const handleAccept = async (id: string) => {
// // //     try {
// // //         // Send Receiver ID and LOCATION to backend
// // //         await fetch(`http://localhost:5000/api/donation/${id}/accept`, {
// // //             method: "PUT",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify({ 
// // //                 receiverId: user?.id, 
// // //                 receiverName: user?.organization || user?.name,
// // //                 location: location || { lat: 17.4065, lng: 78.4772 } // Fallback loc
// // //             })
// // //         });
        
// // //         toast.success("Request Sent! Searching for nearby agents...");
// // //         // Remove from list locally
// // //         setDonations(prev => prev.filter(d => d._id !== id));
// // //     } catch (err) { toast.error("Failed to accept"); }
// // //   };

// // //   return (
// // //     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
// // //       <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
// // //       {loading ? <Loader2 className="animate-spin mx-auto" /> : (
// // //         <AnimatePresence>
// // //             {donations.length === 0 ? (
// // //                 <div className="glass-card p-8 text-center text-muted-foreground">
// // //                     <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
// // //                     No pending donations. Check back later.
// // //                 </div>
// // //             ) : (
// // //                 donations.map(d => (
// // //                     <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
// // //                         <div className="flex justify-between items-center">
// // //                             <div>
// // //                                 <h3 className="text-xl font-bold">{d.foodType}</h3>
// // //                                 <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
// // //                             </div>
// // //                             <button onClick={() => handleAccept(d._id)} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
// // //                                 <Check className="w-4 h-4" /> Accept
// // //                             </button>
// // //                         </div>
// // //                     </motion.div>
// // //                 ))
// // //             )}
// // //         </AnimatePresence>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Receive;





// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Check, Search, MapPin, Navigation, Loader2 } from "lucide-react";
// // import { toast } from "sonner";
// // import { useAuth } from "@/context/AuthContext";
// // import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import L from 'leaflet';
// // import icon from 'leaflet/dist/images/marker-icon.png';
// // import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // // Fix Leaflet Icons
// // const DefaultIcon = L.icon({
// //   iconUrl: icon, shadowUrl: iconShadow,
// //   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// // });
// // L.Marker.prototype.options.icon = DefaultIcon;

// // // Helper component for map clicks
// // const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
// //   useMapEvents({
// //     click(e) {
// //       setPos(e.latlng);
// //     },
// //   });
// //   return pos ? <Marker position={pos} /> : null;
// // };

// // const Receive = () => {
// //   const { user } = useAuth();
// //   const [donations, setDonations] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // LOCATION & MODAL STATE
// //   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
// //   const [showLocModal, setShowLocModal] = useState(false);
// //   const [pickerMode, setPickerMode] = useState(false);
// //   const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     fetchAvailableDonations();
// //   }, []);

// //   const fetchAvailableDonations = async () => {
// //     try {
// //       const res = await fetch("http://localhost:5000/api/donations?status=pending");
// //       const data = await res.json();
// //       setDonations(data);
// //     } catch (err) { toast.error("Could not load feed"); } 
// //     finally { setLoading(false); }
// //   };

// //   // --- STEP 1: OPEN MODAL ---
// //   const initiateAccept = (id: string) => {
// //     setSelectedDonationId(id);
// //     setShowLocModal(true);
// //     setPickerMode(false);
// //   };

// //   // --- STEP 2: GET GPS ---
// //   const useCurrentLocation = () => {
// //     if (!navigator.geolocation) {
// //         toast.error("Geolocation not supported");
// //         return;
// //     }
// //     toast.info("Fetching GPS...");
// //     navigator.geolocation.getCurrentPosition(
// //         (pos) => {
// //             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //             setLocation(loc);
// //             confirmAccept(loc); // Proceed immediately
// //         },
// //         () => {
// //             toast.error("GPS Denied. Please pick on map.");
// //             setPickerMode(true);
// //         }
// //     );
// //   };

// //   // --- STEP 3: CONFIRM & SEND ---
// //   const confirmAccept = async (finalLoc: { lat: number, lng: number }) => {
// //     if (!selectedDonationId) return;
    
// //     setIsSubmitting(true);
// //     setShowLocModal(false);

// //     try {
// //         await fetch(`http://localhost:5000/api/donation/${selectedDonationId}/accept`, {
// //             method: "PUT",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ 
// //                 receiverId: user?.id, 
// //                 receiverName: user?.organization || user?.name,
// //                 location: finalLoc 
// //             })
// //         });
        
// //         toast.success("Request Sent! Searching for nearby agents...");
// //         setDonations(prev => prev.filter(d => d._id !== selectedDonationId));
// //     } catch (err) { 
// //         toast.error("Failed to accept"); 
// //     } finally {
// //         setIsSubmitting(false);
// //         setSelectedDonationId(null);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto relative">
// //       <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
// //       {/* --- LOCATION MODAL --- */}
// //       <AnimatePresence>
// //         {showLocModal && (
// //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
// //             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <MapPin className="text-primary" /> Confirm Delivery Location
// //               </h2>

// //               {!pickerMode ? (
// //                 <div className="space-y-3">
// //                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
// //                     <Navigation className="w-5 h-5" /> Use Current Location
// //                   </button>
// //                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
// //                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
// //                     <MapPin className="w-5 h-5" /> Select on Map
// //                   </button>
// //                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   <p className="text-sm text-muted-foreground">Tap map to pin your location.</p>
// //                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
// //                     <MapContainer center={[17.3850, 78.4867]} zoom={13} style={{ height: "100%", width: "100%" }}>
// //                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
// //                       <LocationMarker setPos={setLocation} pos={location} />
// //                     </MapContainer>
// //                     {!location && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] text-xs text-white bg-black/30">Tap to Pin</div>}
// //                   </div>
// //                   <div className="flex gap-3">
// //                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
// //                     <button onClick={() => location && confirmAccept(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
// //                       Confirm
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* --- DONATION LIST --- */}
// //       {loading ? <Loader2 className="animate-spin mx-auto" /> : (
// //         <AnimatePresence>
// //             {donations.length === 0 ? (
// //                 <div className="glass-card p-8 text-center text-muted-foreground">
// //                     <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
// //                     No pending donations. Check back later.
// //                 </div>
// //             ) : (
// //                 donations.map(d => (
// //                     <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
// //                         <div className="flex justify-between items-center">
// //                             <div>
// //                                 <h3 className="text-xl font-bold">{d.foodType}</h3>
// //                                 <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
// //                                 <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
// //                                     <MapPin className="w-3 h-3" /> {d.location?.lat ? "Location Provided" : "Unknown Location"}
// //                                 </p>
// //                             </div>
// //                             <button onClick={() => initiateAccept(d._id)} disabled={isSubmitting} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
// //                                 <Check className="w-4 h-4" /> Accept
// //                             </button>
// //                         </div>
// //                     </motion.div>
// //                 ))
// //             )}
// //         </AnimatePresence>
// //       )}
// //     </div>
// //   );
// // };

// // export default Receive;





// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, Search, MapPin, Navigation, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // Fix Leaflet Icons
// const DefaultIcon = L.icon({
//   iconUrl: icon, shadowUrl: iconShadow,
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // --- 1. SEARCH COMPONENT FOR MAP ---
// const MapSearch = () => {
//   const map = useMap();
//   const [query, setQuery] = useState("");
//   const [searching, setSearching] = useState(false);

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!query) return;
//     setSearching(true);

//     try {
//       // Use OpenStreetMap's free Nominatim API
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
//       const data = await res.json();

//       if (data && data.length > 0) {
//         const { lat, lon } = data[0];
//         map.flyTo([parseFloat(lat), parseFloat(lon)], 16); // Fly to location
//         toast.success(`Found: ${data[0].display_name.split(",")[0]}`);
//       } else {
//         toast.error("Location not found");
//       }
//     } catch (error) {
//       toast.error("Search failed");
//     } finally {
//       setSearching(false);
//     }
//   };

//   return (
//     <div className="absolute top-2 left-2 z-[1000] w-64">
//       <form onSubmit={handleSearch} className="flex gap-2 bg-black/80 p-2 rounded-xl border border-white/20 backdrop-blur-md">
//         <input 
//           type="text" 
//           placeholder="Search place..." 
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground"
//         />
//         <button type="submit" disabled={searching} className="text-primary hover:text-white transition-colors">
//           {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
//         </button>
//       </form>
//     </div>
//   );
// };

// // --- 2. PIN DROPPER COMPONENT ---
// const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
//   useMapEvents({
//     click(e) {
//       setPos(e.latlng);
//     },
//   });
//   return pos ? <Marker position={pos} /> : null;
// };

// const Receive = () => {
//   const { user } = useAuth();
//   const [donations, setDonations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // LOCATION & MODAL STATE
//   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
//   const [showLocModal, setShowLocModal] = useState(false);
//   const [pickerMode, setPickerMode] = useState(false);
//   const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchAvailableDonations();
//   }, []);

//   const fetchAvailableDonations = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/donations?status=pending");
//       const data = await res.json();
//       setDonations(data);
//     } catch (err) { toast.error("Could not load feed"); } 
//     finally { setLoading(false); }
//   };

//   const initiateAccept = (id: string) => {
//     setSelectedDonationId(id);
//     setShowLocModal(true);
//     setPickerMode(false);
//   };

//   const useCurrentLocation = () => {
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported");
//         return;
//     }
//     toast.info("Fetching GPS...");
//     navigator.geolocation.getCurrentPosition(
//         (pos) => {
//             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//             setLocation(loc);
//             confirmAccept(loc); 
//         },
//         () => {
//             toast.error("GPS Denied. Please pick on map.");
//             setPickerMode(true);
//         }
//     );
//   };

//   const confirmAccept = async (finalLoc: { lat: number, lng: number }) => {
//     if (!selectedDonationId) return;
    
//     setIsSubmitting(true);
//     setShowLocModal(false);

//     try {
//         await fetch(`http://localhost:5000/api/donation/${selectedDonationId}/accept`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//                 receiverId: user?.id, 
//                 receiverName: user?.organization || user?.name,
//                 location: finalLoc 
//             })
//         });
        
//         toast.success("Request Sent! Searching for nearby agents...");
//         setDonations(prev => prev.filter(d => d._id !== selectedDonationId));
//     } catch (err) { 
//         toast.error("Failed to accept"); 
//     } finally {
//         setIsSubmitting(false);
//         setSelectedDonationId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto relative">
//       <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
//       {/* --- LOCATION MODAL --- */}
//       <AnimatePresence>
//         {showLocModal && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MapPin className="text-primary" /> Confirm Delivery Location
//               </h2>

//               {!pickerMode ? (
//                 <div className="space-y-3">
//                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
//                     <Navigation className="w-5 h-5" /> Use Current Location
//                   </button>
//                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
//                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
//                     <MapPin className="w-5 h-5" /> Select on Map
//                   </button>
//                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <p className="text-sm text-muted-foreground">Search or tap map to pin location.</p>
                  
//                   {/* MAP CONTAINER */}
//                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
//                     <MapContainer center={[17.3850, 78.4867]} zoom={13} style={{ height: "100%", width: "100%" }}>
//                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                      
//                       {/* --- ADDED SEARCH BAR HERE --- */}
//                       <MapSearch />
                      
//                       <LocationMarker setPos={setLocation} pos={location} />
//                     </MapContainer>
                    
//                     {!location && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] text-xs text-white bg-black/30">Tap to Pin</div>}
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
//                     <button onClick={() => location && confirmAccept(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- DONATION LIST --- */}
//       {loading ? <Loader2 className="animate-spin mx-auto" /> : (
//         <AnimatePresence>
//             {donations.length === 0 ? (
//                 <div className="glass-card p-8 text-center text-muted-foreground">
//                     <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
//                     No pending donations. Check back later.
//                 </div>
//             ) : (
//                 donations.map(d => (
//                     <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <h3 className="text-xl font-bold">{d.foodType}</h3>
//                                 <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
//                                 <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
//                                     <MapPin className="w-3 h-3" /> {d.location?.lat ? "Location Provided" : "Unknown Location"}
//                                 </p>
//                             </div>
//                             <button onClick={() => initiateAccept(d._id)} disabled={isSubmitting} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
//                                 <Check className="w-4 h-4" /> Accept
//                             </button>
//                         </div>
//                     </motion.div>
//                 ))
//             )}
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default Receive;


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, Search, MapPin, Navigation, Loader2, X } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // Fix Leaflet Icons
// const DefaultIcon = L.icon({
//   iconUrl: icon, shadowUrl: iconShadow,
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // --- HELPER 1: HANDLE MAP CLICKS ---
// const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
//   useMapEvents({
//     click(e) {
//       setPos(e.latlng);
//     },
//   });
//   return pos ? <Marker position={pos} /> : null;
// };

// // --- HELPER 2: MOVE MAP CAMERA ---
// const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
//   const map = useMap();
//   map.setView(center, 15); 
//   return null;
// };

// const Receive = () => {
//   const { user } = useAuth();
//   const [donations, setDonations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // LOCATION & MODAL STATE
//   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
//   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 });
//   const [showLocModal, setShowLocModal] = useState(false);
//   const [pickerMode, setPickerMode] = useState(false);
//   const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // SEARCH STATE
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     fetchAvailableDonations();
//   }, []);

//   const fetchAvailableDonations = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/donations?status=pending");
//       const data = await res.json();
//       setDonations(data);
//     } catch (err) { toast.error("Could not load feed"); } 
//     finally { setLoading(false); }
//   };

//   // --- MAP SEARCH FUNCTION ---
//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     setIsSearching(true);
    
//     try {
//         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//         const data = await res.json();

//         if (data && data.length > 0) {
//             const firstResult = data[0];
//             const newLoc = {
//                 lat: parseFloat(firstResult.lat),
//                 lng: parseFloat(firstResult.lon)
//             };
            
//             setMapCenter(newLoc);
//             setLocation(newLoc);
//             toast.success(`Found: ${firstResult.display_name.split(",")[0]}`);
//         } else {
//             toast.error("Location not found");
//         }
//     } catch (error) {
//         toast.error("Search failed");
//     } finally {
//         setIsSearching(false);
//     }
//   };

//   // --- STEP 1: OPEN MODAL ---
//   const initiateAccept = (id: string) => {
//     setSelectedDonationId(id);
//     setShowLocModal(true);
//     setPickerMode(false);
//     // Reset location state for fresh pick
//     setLocation(null);
//     setSearchQuery("");
//   };

//   // --- STEP 2: GET GPS ---
//   const useCurrentLocation = () => {
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported");
//         return;
//     }
//     toast.info("Fetching GPS...");
//     navigator.geolocation.getCurrentPosition(
//         (pos) => {
//             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//             setLocation(loc);
//             confirmAccept(loc); 
//         },
//         () => {
//             toast.error("GPS Denied. Please pick on map.");
//             setPickerMode(true);
//         }
//     );
//   };

//   // --- STEP 3: CONFIRM & SEND ---
//   const confirmAccept = async (finalLoc: { lat: number, lng: number }) => {
//     if (!selectedDonationId) return;
    
//     setIsSubmitting(true);
//     setShowLocModal(false);

//     try {
//         await fetch(`http://localhost:5000/api/donation/${selectedDonationId}/accept`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//                 receiverId: user?.id, 
//                 receiverName: user?.organization || user?.name,
//                 location: finalLoc 
//             })
//         });
        
//         toast.success("Request Sent! Searching for nearby agents...");
//         setDonations(prev => prev.filter(d => d._id !== selectedDonationId));
//     } catch (err) { 
//         toast.error("Failed to accept"); 
//     } finally {
//         setIsSubmitting(false);
//         setSelectedDonationId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto relative">
//       <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
//       {/* --- LOCATION MODAL --- */}
//       <AnimatePresence>
//         {showLocModal && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MapPin className="text-primary" /> Confirm Delivery Location
//               </h2>

//               {!pickerMode ? (
//                 // OPTION 1: BUTTONS
//                 <div className="space-y-3">
//                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
//                     <Navigation className="w-5 h-5" /> Use Current Location
//                   </button>
//                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
//                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
//                     <MapPin className="w-5 h-5" /> Select on Map
//                   </button>
//                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
//                 </div>
//               ) : (
//                 // OPTION 2: MAP PICKER WITH SEARCH
//                 <div className="space-y-4">
//                   {/* SEARCH BAR */}
//                   <div className="flex gap-2">
//                     <input 
//                         type="text" 
//                         placeholder="Search location (e.g., Charminar)" 
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                         className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
//                     />
//                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
//                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
//                     </button>
//                   </div>

//                   <p className="text-xs text-muted-foreground">Search or tap on the map to pin location.</p>
                  
//                   {/* MAP */}
//                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
//                       <ChangeView center={mapCenter} />
//                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
//                       <LocationMarker setPos={setLocation} pos={location} />
//                     </MapContainer>
//                     {!location && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] text-xs text-white bg-black/30">Tap to Pin</div>}
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
//                     <button onClick={() => location && confirmAccept(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- DONATION LIST --- */}
//       {loading ? <Loader2 className="animate-spin mx-auto" /> : (
//         <AnimatePresence>
//             {donations.length === 0 ? (
//                 <div className="glass-card p-8 text-center text-muted-foreground">
//                     <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
//                     No pending donations. Check back later.
//                 </div>
//             ) : (
//                 donations.map(d => (
//                     <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <h3 className="text-xl font-bold">{d.foodType}</h3>
//                                 <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
//                                 <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
//                                     <MapPin className="w-3 h-3" /> {d.location?.lat ? "Pickup location set" : "Unknown"}
//                                 </p>
//                             </div>
//                             <button onClick={() => initiateAccept(d._id)} disabled={isSubmitting} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
//                                 <Check className="w-4 h-4" /> Accept
//                             </button>
//                         </div>
//                     </motion.div>
//                 ))
//             )}
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default Receive;





// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, Search, MapPin, Navigation, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext";
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//   iconUrl: icon, shadowUrl: iconShadow,
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
//   useMapEvents({
//     click(e) { setPos(e.latlng); },
//   });
//   return pos ? <Marker position={pos} /> : null;
// };

// const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
//   const map = useMap();
//   map.setView(center, 15); 
//   return null;
// };

// const Receive = () => {
//   const { user } = useAuth();
//   const [donations, setDonations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
//   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 });
//   const [showLocModal, setShowLocModal] = useState(false);
//   const [pickerMode, setPickerMode] = useState(false);
//   const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);

//   useEffect(() => {
//     fetchAvailableDonations();
//   }, [user]);

//   const fetchAvailableDonations = async () => {
//     try {
//       // 1. Fetch available pending donations
//       const resPending = await fetch("http://localhost:5000/api/donations?status=pending");
//       const dataPending = await resPending.json();
      
//       // 2. Fetch MY accepted donations (so they stay on screen to show tracking!)
//       let dataMy = [];
//       if (user?.id) {
//           const resMy = await fetch(`http://localhost:5000/api/donations?receiverId=${user.id}`);
//           const rawMy = await resMy.json();
//           // Filter to only show active ones, not delivered/expired
//           dataMy = rawMy.filter((d: any) => ["searching_agent", "assigned", "transit"].includes(d.status));
//       }
      
//       // Combine them (Active ones first)
//       setDonations([...dataMy, ...dataPending]);
//     } catch (err) { 
//       toast.error("Could not load feed"); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     setIsSearching(true);
//     try {
//         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//         const data = await res.json();
//         if (data && data.length > 0) {
//             const firstResult = data[0];
//             const newLoc = { lat: parseFloat(firstResult.lat), lng: parseFloat(firstResult.lon) };
//             setMapCenter(newLoc);
//             setLocation(newLoc);
//             toast.success(`Found: ${firstResult.display_name.split(",")[0]}`);
//         } else {
//             toast.error("Location not found");
//         }
//     } catch (error) { toast.error("Search failed"); } 
//     finally { setIsSearching(false); }
//   };

//   const initiateAccept = (id: string) => {
//     setSelectedDonationId(id);
//     setShowLocModal(true);
//     setPickerMode(false);
//     setLocation(null);
//     setSearchQuery("");
//   };

//   const useCurrentLocation = () => {
//     if (!navigator.geolocation) {
//         toast.error("Geolocation not supported");
//         return;
//     }
//     toast.info("Fetching GPS...");
//     navigator.geolocation.getCurrentPosition(
//         (pos) => {
//             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//             setLocation(loc);
//             confirmAccept(loc); 
//         },
//         () => {
//             toast.error("GPS Denied. Please pick on map.");
//             setPickerMode(true);
//         }
//     );
//   };

//   const confirmAccept = async (finalLoc: { lat: number, lng: number }) => {
//     if (!selectedDonationId) return;
    
//     setIsSubmitting(true);
//     setShowLocModal(false);

//     try {
//         await fetch(`http://localhost:5000/api/donation/${selectedDonationId}/accept`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//                 receiverId: user?.id, 
//                 receiverName: user?.organization || user?.name,
//                 location: finalLoc 
//             })
//         });
        
//         toast.success("Request Sent! Searching for nearby agents...");
        
//         // Update it locally to show "Searching..." immediately instead of disappearing
//         setDonations(prev => prev.map(d => 
//             d._id === selectedDonationId ? { ...d, status: "searching_agent" } : d
//         ));
//     } catch (err) { 
//         toast.error("Failed to accept"); 
//     } finally {
//         setIsSubmitting(false);
//         setSelectedDonationId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto relative">
//       <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
//       {/* --- LOCATION MODAL --- */}
//       <AnimatePresence>
//         {showLocModal && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MapPin className="text-primary" /> Confirm Delivery Location
//               </h2>

//               {!pickerMode ? (
//                 <div className="space-y-3">
//                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
//                     <Navigation className="w-5 h-5" /> Use Current Location
//                   </button>
//                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
//                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
//                     <MapPin className="w-5 h-5" /> Select on Map
//                   </button>
//                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="flex gap-2">
//                     <input 
//                         type="text" 
//                         placeholder="Search location (e.g., Charminar)" 
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                         className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
//                     />
//                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
//                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
//                     </button>
//                   </div>

//                   <p className="text-xs text-muted-foreground">Search or tap on the map to pin location.</p>
                  
//                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
//                       <ChangeView center={mapCenter} />
//                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
//                       <LocationMarker setPos={setLocation} pos={location} />
//                     </MapContainer>
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
//                     <button onClick={() => location && confirmAccept(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- DONATION LIST --- */}
//       {loading ? <Loader2 className="animate-spin mx-auto" /> : (
//         <AnimatePresence>
//             {donations.length === 0 ? (
//                 <div className="glass-card p-8 text-center text-muted-foreground">
//                     <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
//                     No pending donations. Check back later.
//                 </div>
//             ) : (
//                 donations.map(d => (
//                     <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <h3 className="text-xl font-bold">{d.foodType}</h3>
//                                 <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
//                                 <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
//                                     <MapPin className="w-3 h-3" /> {d.location?.lat ? "Location Provided" : "Unknown Location"}
//                                 </p>
//                             </div>
                            
//                             {/* --- CONDITIONAL ACTIONS --- */}
//                             {d.status === "assigned" || d.status === "transit" ? (
//                                 <button 
//                                     onClick={() => window.location.href = `/agent/${d._id}`} 
//                                     className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
//                                 >
//                                     <Navigation className="w-4 h-4" /> Track Volunteer
//                                 </button>
//                             ) : d.status === "searching_agent" ? (
//                                 <button disabled className="btn-glow-solid opacity-50 px-6 py-2 flex items-center gap-2 cursor-not-allowed">
//                                     <Loader2 className="w-4 h-4 animate-spin" /> Searching...
//                                 </button>
//                             ) : (
//                                 <button onClick={() => initiateAccept(d._id)} disabled={isSubmitting} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
//                                     <Check className="w-4 h-4" /> Accept
//                                 </button>
//                             )}
//                         </div>
//                     </motion.div>
//                 ))
//             )}
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default Receive;








import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search, MapPin, Navigation, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom"; // --- IMPORT ADDED ---
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon, shadowUrl: iconShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
  useMapEvents({
    click(e) { setPos(e.latlng); },
  });
  return pos ? <Marker position={pos} /> : null;
};

const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
  const map = useMap();
  map.setView(center, 15); 
  return null;
};

const Receive = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // --- HOOK ADDED ---
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 });
  const [showLocModal, setShowLocModal] = useState(false);
  const [pickerMode, setPickerMode] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchAvailableDonations();
  }, [user]);

  const fetchAvailableDonations = async () => {
    try {
      // 1. Fetch available pending donations
      const resPending = await fetch("http://localhost:5000/api/donations?status=pending");
      const dataPending = await resPending.json();
      
      // 2. Fetch MY accepted donations (so they stay on screen to show tracking!)
      let dataMy = [];
      if (user?.id) {
          const resMy = await fetch(`http://localhost:5000/api/donations?receiverId=${user.id}`);
          const rawMy = await resMy.json();
          // Filter to only show active ones, not delivered/expired
          dataMy = rawMy.filter((d: any) => ["searching_agent", "assigned", "transit"].includes(d.status));
      }
      
      // Combine them (Active ones first)
      setDonations([...dataMy, ...dataPending]);
    } catch (err) { 
      toast.error("Could not load feed"); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data && data.length > 0) {
            const firstResult = data[0];
            const newLoc = { lat: parseFloat(firstResult.lat), lng: parseFloat(firstResult.lon) };
            setMapCenter(newLoc);
            setLocation(newLoc);
            toast.success(`Found: ${firstResult.display_name.split(",")[0]}`);
        } else {
            toast.error("Location not found");
        }
    } catch (error) { toast.error("Search failed"); } 
    finally { setIsSearching(false); }
  };

  const initiateAccept = (id: string) => {
    setSelectedDonationId(id);
    setShowLocModal(true);
    setPickerMode(false);
    setLocation(null);
    setSearchQuery("");
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
        toast.error("Geolocation not supported");
        return;
    }
    toast.info("Fetching GPS...");
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setLocation(loc);
            confirmAccept(loc); 
        },
        () => {
            toast.error("GPS Denied. Please pick on map.");
            setPickerMode(true);
        }
    );
  };

  const confirmAccept = async (finalLoc: { lat: number, lng: number }) => {
    if (!selectedDonationId) return;
    
    setIsSubmitting(true);
    setShowLocModal(false);

    try {
        await fetch(`http://localhost:5000/api/donation/${selectedDonationId}/accept`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                receiverId: user?.id, 
                receiverName: user?.organization || user?.name,
                location: finalLoc 
            })
        });
        
        toast.success("Request Sent! Searching for nearby agents...");
        
        // Update it locally to show "Searching..." immediately instead of disappearing
        setDonations(prev => prev.map(d => 
            d._id === selectedDonationId ? { ...d, status: "searching_agent" } : d
        ));
    } catch (err) { 
        toast.error("Failed to accept"); 
    } finally {
        setIsSubmitting(false);
        setSelectedDonationId(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto relative">
      <h1 className="text-3xl font-display font-bold mb-8">Incoming <span className="gradient-text">Donations</span></h1>
      
      {/* --- LOCATION MODAL --- */}
      <AnimatePresence>
        {showLocModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-primary" /> Confirm Delivery Location
              </h2>

              {!pickerMode ? (
                <div className="space-y-3">
                  <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
                    <Navigation className="w-5 h-5" /> Use Current Location
                  </button>
                  <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
                  <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" /> Select on Map
                  </button>
                  <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Search location (e.g., Charminar)" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
                        {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground">Search or tap on the map to pin location.</p>
                  
                  <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
                    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <ChangeView center={mapCenter} />
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                      <LocationMarker setPos={setLocation} pos={location} />
                    </MapContainer>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
                    <button onClick={() => location && confirmAccept(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DONATION LIST --- */}
      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <AnimatePresence>
            {donations.length === 0 ? (
                <div className="glass-card p-8 text-center text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    No pending donations. Check back later.
                </div>
            ) : (
                donations.map(d => (
                    <motion.div key={d._id} initial={{opacity:0}} animate={{opacity:1}} className="glass-card p-6 border-l-4 border-emerald-500 mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">{d.foodType}</h3>
                                <p className="text-emerald-400">{d.quantity}kg • {d.donor?.name}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {d.location?.lat ? "Location Provided" : "Unknown Location"}
                                </p>
                            </div>
                            
                            {/* --- CONDITIONAL ACTIONS --- */}
                            {d.status === "assigned" || d.status === "transit" ? (
                                <button 
                                    onClick={() => navigate(`/agent/${d._id}`)} // --- CHANGED TO NAVIGATE ---
                                    className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                                >
                                    <Navigation className="w-4 h-4" /> Track Volunteer
                                </button>
                            ) : d.status === "searching_agent" ? (
                                <button disabled className="btn-glow-solid opacity-50 px-6 py-2 flex items-center gap-2 cursor-not-allowed">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                                </button>
                            ) : (
                                <button onClick={() => initiateAccept(d._id)} disabled={isSubmitting} className="btn-glow-solid px-6 py-2 flex items-center gap-2">
                                    <Check className="w-4 h-4" /> Accept
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))
            )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Receive;