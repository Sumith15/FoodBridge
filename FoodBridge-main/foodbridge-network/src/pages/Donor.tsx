// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { Camera, Edit3, Package, Clock, CheckCircle2, AlertTriangle, Truck, Loader2, MapPin, Navigation, Search } from "lucide-react";
// // // // import { toast } from "sonner";
// // // // import { useAuth } from "@/context/AuthContext"; 
// // // // import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// // // // import { useNavigate } from "react-router-dom"; // --- IMPORT ADDED ---
// // // // import { Link } from "react-router-dom";
// // // // import { Trees } from "lucide-react";
// // // // import "leaflet/dist/leaflet.css";

// // // // // --- LEAFLET ICON FIX ---
// // // // import L from 'leaflet';
// // // // import icon from 'leaflet/dist/images/marker-icon.png';
// // // // import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // // // const DefaultIcon = L.icon({
// // // //   iconUrl: icon, shadowUrl: iconShadow,
// // // //   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// // // // });
// // // // L.Marker.prototype.options.icon = DefaultIcon;

// // // // const statusConfig = {
// // // //   pending: { color: "text-blue-400", border: "border-blue-400/30", icon: Clock, label: "Pending" },
// // // //   searching_agent: { color: "text-orange-400", border: "border-orange-400/30", icon: Loader2, label: "Finding Driver" },
// // // //   assigned: { color: "text-purple-400", border: "border-purple-400/30", icon: Truck, label: "Driver Assigned" },
// // // //   transit: { color: "text-yellow-400", border: "border-yellow-400/30", icon: Truck, label: "In Transit" },
// // // //   delivered: { color: "text-emerald-400", border: "border-emerald-400/30", icon: CheckCircle2, label: "Delivered" },
// // // //   expired: { color: "text-destructive", border: "border-destructive/30", icon: AlertTriangle, label: "Expired" },
// // // // };

// // // // // --- HELPER 1: HANDLE MAP CLICKS ---
// // // // const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
// // // //   useMapEvents({
// // // //     click(e) {
// // // //       setPos(e.latlng);
// // // //     },
// // // //   });
// // // //   return pos ? <Marker position={pos} /> : null;
// // // // };

// // // // // --- HELPER 2: MOVE MAP CAMERA ---
// // // // const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
// // // //   const map = useMap();
// // // //   map.setView(center, 15); 
// // // //   return null;
// // // // };

// // // // const Donor = () => {
// // // //   const { user } = useAuth();
// // // //   const navigate = useNavigate(); // --- HOOK ADDED ---
// // // //   const [mode, setMode] = useState<"scan" | "manual">("scan");
// // // //   const [scanning, setScanning] = useState(false);
// // // //   const [scanned, setScanned] = useState(false);
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [confirmed, setConfirmed] = useState(false);
  
// // // //   // LOCATION STATE
// // // //   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
// // // //   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 }); 
// // // //   const [showLocModal, setShowLocModal] = useState(false);
// // // //   const [pickerMode, setPickerMode] = useState(false);
// // // //   const [locStatus, setLocStatus] = useState("Ready to Donate");
  
// // // //   // SEARCH STATE
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [isSearching, setIsSearching] = useState(false);

// // // //   // DATA
// // // //   const [history, setHistory] = useState<any[]>([]);
// // // //   const [loadingHistory, setLoadingHistory] = useState(true);

// // // //   const [form, setForm] = useState({ 
// // // //     food: "", 
// // // //     qty: "", 
// // // //     expiry: "", 
// // // //     window: "30 mins" 
// // // //   });

// // // //   useEffect(() => {
// // // //     fetchDonations();

// // // //     if (navigator.geolocation) {
// // // //         navigator.geolocation.getCurrentPosition(
// // // //             (position) => {
// // // //                 setLocStatus("Location Secured");
// // // //             },
// // // //             () => {
// // // //                 setLocStatus("Location Denied");
// // // //                 toast.error("Location access denied.");
// // // //             }
// // // //         );
// // // //     }
// // // //   }, [user]);

// // // //   const fetchDonations = async () => {
// // // //     try {
// // // //       const res = await fetch(`http://localhost:5000/api/donations?userId=${user?.id}`);
// // // //       const data = await res.json();
// // // //       setHistory(data);
// // // //     } catch (err) { console.error("History Error"); } 
// // // //     finally { setLoadingHistory(false); }
// // // //   };

// // // //   const handleScan = () => {
// // // //     setScanning(true);
// // // //     setScanned(false);
// // // //     setTimeout(() => {
// // // //       setScanning(false);
// // // //       setScanned(true);
// // // //       setForm({ food: "Steam Rice", qty: "5.2", expiry: "4 hours", window: "30 mins" });
// // // //       toast.success("Food Detected!");
// // // //     }, 2500);
// // // //   };

// // // //   // --- MAP SEARCH FUNCTION ---
// // // //   const handleSearch = async () => {
// // // //     if (!searchQuery) return;
// // // //     setIsSearching(true);
    
// // // //     try {
// // // //         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
// // // //         const data = await res.json();

// // // //         if (data && data.length > 0) {
// // // //             const firstResult = data[0];
// // // //             const newLoc = {
// // // //                 lat: parseFloat(firstResult.lat),
// // // //                 lng: parseFloat(firstResult.lon)
// // // //             };
            
// // // //             setMapCenter(newLoc);
// // // //             setLocation(newLoc);
// // // //             toast.success(`Found: ${firstResult.display_name.split(",")[0]}`);
// // // //         } else {
// // // //             toast.error("Location not found");
// // // //         }
// // // //     } catch (error) {
// // // //         toast.error("Search failed");
// // // //     } finally {
// // // //         setIsSearching(false);
// // // //     }
// // // //   };

// // // //   const initiateDonation = () => {
// // // //     if (!form.food || !form.qty) {
// // // //         toast.error("Please fill in food details first");
// // // //         return;
// // // //     }
// // // //     setShowLocModal(true);
// // // //     setPickerMode(false);
// // // //   };

// // // //   const useCurrentLocation = () => {
// // // //     if (!navigator.geolocation) {
// // // //         toast.error("Geolocation not supported");
// // // //         return;
// // // //     }
// // // //     toast.info("Fetching GPS...");
// // // //     navigator.geolocation.getCurrentPosition(
// // // //         (pos) => {
// // // //             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// // // //             setLocation(loc);
// // // //             submitDonation(loc);
// // // //         },
// // // //         () => {
// // // //             toast.error("GPS Denied. Please pick on map.");
// // // //             setPickerMode(true);
// // // //         }
// // // //     );
// // // //   };

// // // //   const confirmMapLocation = () => {
// // // //     if (!location) {
// // // //         toast.error("Tap on the map to pin a location!");
// // // //         return;
// // // //     }
// // // //     submitDonation(location);
// // // //   };

// // // //   const submitDonation = async (finalLoc: { lat: number, lng: number }) => {
// // // //     setShowLocModal(false);
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/donate", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           foodType: form.food,
// // // //           quantity: form.qty,
// // // //           expiry: form.expiry,
// // // //           pickupTime: form.window,
// // // //           donorId: user?.id,      
// // // //           donorName: user?.name || user?.organization,
// // // //           location: finalLoc 
// // // //         }),
// // // //       });

// // // //       if (response.ok) {
// // // //         setConfirmed(true);
// // // //         toast.success("Donation Broadcasted to Network!");
// // // //         fetchDonations(); 
        
// // // //         setTimeout(() => {
// // // //           setConfirmed(false);
// // // //           setScanned(false);
// // // //           setForm({ food: "", qty: "", expiry: "", window: "30 mins" });
// // // //         }, 3000);
// // // //         setLocStatus("Donation Sent");
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Connection Failed");
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen pt-20 pb-12 px-4 max-w-2xl mx-auto relative">
// // // //       <div className="flex justify-between items-center mb-8">
// // // //         <h1 className="text-3xl font-display font-bold">Donate <span className="gradient-text">Food</span></h1>
        
// // // //         <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
// // // //             <MapPin className={`w-3 h-3 ${location ? "text-emerald-400" : "text-yellow-400"}`} />
// // // //             {locStatus}
// // // //         </div>
// // // //       </div>

// // // //       {/* --- LOCATION MODAL --- */}
// // // //       <AnimatePresence>
// // // //         {showLocModal && (
// // // //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
// // // //             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
// // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                 <MapPin className="text-primary" /> Select Pickup Location
// // // //               </h2>

// // // //               {!pickerMode ? (
// // // //                 <div className="space-y-3">
// // // //                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
// // // //                     <Navigation className="w-5 h-5" /> Use My Current Location
// // // //                   </button>
// // // //                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
// // // //                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
// // // //                     <MapPin className="w-5 h-5" /> Select on Map
// // // //                   </button>
// // // //                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div className="space-y-4">
// // // //                   <div className="flex gap-2">
// // // //                     <input 
// // // //                         type="text" 
// // // //                         placeholder="Search location (e.g., Charminar)" 
// // // //                         value={searchQuery}
// // // //                         onChange={(e) => setSearchQuery(e.target.value)}
// // // //                         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // // //                         className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
// // // //                     />
// // // //                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
// // // //                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
// // // //                     </button>
// // // //                   </div>

// // // //                   <p className="text-xs text-muted-foreground">Search or tap on the map to pin location.</p>
                  
// // // //                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
// // // //                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
// // // //                       <ChangeView center={mapCenter} />
// // // //                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
// // // //                       <LocationMarker setPos={setLocation} pos={location} />
// // // //                     </MapContainer>
// // // //                   </div>

// // // //                   <div className="flex gap-3">
// // // //                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
// // // //                     <button onClick={() => location && submitDonation(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
// // // //                       Confirm Location
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <div className="glass-card p-1 flex mb-8 max-w-xs">
// // // //         {(["scan", "manual"] as const).map((m) => (
// // // //           <button key={m} onClick={() => { setMode(m); setScanned(false); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-primary text-black" : "text-muted-foreground"}`}>
// // // //             {m === "scan" ? <Camera className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {m === "scan" ? "AI Scan" : "Manual"}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       <AnimatePresence mode="wait">
// // // //         {mode === "scan" && (
// // // //           <motion.div key="scan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 mb-8">
// // // //             <div className="aspect-video rounded-xl bg-muted/30 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden mb-6">
// // // //                 {scanning && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
// // // //                 {!scanned ? (
// // // //                     <button onClick={handleScan} disabled={scanning} className="btn-glow-solid px-6 py-3 flex gap-2">
// // // //                         {scanning ? "Scanning..." : <><Camera className="w-5 h-5" /> Start AI Scan</>}
// // // //                     </button>
// // // //                 ) : (
// // // //                     <div className="text-center">
// // // //                         <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
// // // //                         <p className="text-primary font-medium">Food Detected: Rice</p>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       {(mode === "manual" || scanned) && (
// // // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-8 space-y-4">
// // // //           <h3 className="font-display font-semibold text-lg mb-2">{scanned ? "AI Results" : "Enter Details"}</h3>
// // // //           {[
// // // //             { label: "Food Type", key: "food", placeholder: "e.g., Rice, Bread" },
// // // //             { label: "Quantity (kg)", key: "qty", placeholder: "e.g., 5.2" },
// // // //             { label: "Expiry Time", key: "expiry", placeholder: "e.g., 4 hours" },
// // // //             { label: "Pickup Window", key: "window", placeholder: "e.g., 30 mins" },
// // // //           ].map((field) => (
// // // //             <div key={field.key}>
// // // //               <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
// // // //               <input type="text" value={form[field.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full bg-muted/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary transition-colors" />
// // // //             </div>
// // // //           ))}

// // // //           <button onClick={initiateDonation} disabled={isSubmitting} className="btn-glow-solid w-full mt-4 flex items-center justify-center gap-2">
// // // //             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
// // // //             Confirm & Select Location
// // // //           </button>
// // // //         </motion.div>
// // // //       )}

// // // //       {/* REWARDS */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // // //   {/* Add this Card */}
// // // //   <Link to="/rewards" className="block group">
// // // //     <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform group-hover:-translate-y-1">
// // // //       <div className="flex justify-between items-start">
// // // //         <div>
// // // //           <h3 className="text-xl font-bold mb-1">My Impact Garden</h3>
// // // //           <p className="text-emerald-100 text-sm">Level 1 • 25 Wood Collected</p>
// // // //         </div>
// // // //         <div className="bg-white/20 p-2 rounded-lg">
// // // //           <Trees size={24} />
// // // //         </div>
// // // //       </div>
// // // //       <div className="mt-4 text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full">
// // // //         Visit Garden →
// // // //       </div>
// // // //     </div>
// // // //   </Link>
  
// // // //   {/* ... your other cards (Donations, etc) ... */}
// // // // </div>

// // // //       {/* HISTORY LIST */}
// // // //       <div className="space-y-3">
// // // //         <h3 className="font-semibold text-lg mb-4">History</h3>
// // // //         {loadingHistory ? <p className="text-muted-foreground text-center">Loading...</p> : 
// // // //           history.length === 0 ? <p className="text-muted-foreground text-center p-4 glass-card">No donations yet.</p> :
// // // //           history.map((item) => {
// // // //              const statusKey = item.status || 'pending';
// // // //              const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
// // // //              return (
// // // //                 <div key={item._id} className={`glass-card p-4 border-l-2 ${cfg.border} flex justify-between items-center`}>
// // // //                     <div>
// // // //                         <p className="font-bold">{item.foodType}</p>
// // // //                         <p className="text-xs text-muted-foreground">{item.quantity}kg • {item.expiry}</p>
// // // //                     </div>
// // // //                     <div className="text-right">
// // // //                         <div className={`flex items-center gap-1 text-xs justify-end ${cfg.color}`}>
// // // //                             <cfg.icon className="w-3 h-3" /> {cfg.label}
// // // //                         </div>
                        
// // // //                         {/* --- TRACK VOLUNTEER BUTTON --- */}
// // // //                         {(item.status === "assigned" || item.status === "transit") && (
// // // //                             <button 
// // // //                                 onClick={() => navigate(`/agent/${item._id}`)} // --- CHANGED TO NAVIGATE ---
// // // //                                 className="mt-3 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors"
// // // //                             >
// // // //                                 <Truck className="w-3 h-3" /> Track Volunteer
// // // //                             </button>
// // // //                         )}
// // // //                     </div>
// // // //                 </div>
// // // //              )
// // // //           })
// // // //         }
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Donor;

// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Camera, Edit3, Package, Clock, CheckCircle2, AlertTriangle, Truck, Loader2, MapPin, Navigation, Search, Trees, ArrowRight, Sprout } from "lucide-react";
// // // import { toast } from "sonner";
// // // import { useAuth } from "@/context/AuthContext"; 
// // // import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import "leaflet/dist/leaflet.css";

// // // // --- LEAFLET ICON FIX ---
// // // import L from 'leaflet';
// // // import icon from 'leaflet/dist/images/marker-icon.png';
// // // import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // // const DefaultIcon = L.icon({
// // //   iconUrl: icon, shadowUrl: iconShadow,
// // //   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// // // });
// // // L.Marker.prototype.options.icon = DefaultIcon;

// // // const statusConfig = {
// // //   pending: { color: "text-blue-400", border: "border-blue-400/30", icon: Clock, label: "Pending" },
// // //   searching_agent: { color: "text-orange-400", border: "border-orange-400/30", icon: Loader2, label: "Finding Driver" },
// // //   assigned: { color: "text-purple-400", border: "border-purple-400/30", icon: Truck, label: "Driver Assigned" },
// // //   transit: { color: "text-yellow-400", border: "border-yellow-400/30", icon: Truck, label: "In Transit" },
// // //   delivered: { color: "text-emerald-400", border: "border-emerald-400/30", icon: CheckCircle2, label: "Delivered" },
// // //   expired: { color: "text-destructive", border: "border-destructive/30", icon: AlertTriangle, label: "Expired" },
// // // };

// // // // --- HELPER 1: HANDLE MAP CLICKS ---
// // // const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
// // //   useMapEvents({
// // //     click(e) {
// // //       setPos(e.latlng);
// // //     },
// // //   });
// // //   return pos ? <Marker position={pos} /> : null;
// // // };

// // // // --- HELPER 2: MOVE MAP CAMERA ---
// // // const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
// // //   const map = useMap();
// // //   map.setView(center, 15); 
// // //   return null;
// // // };

// // // const Donor = () => {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [mode, setMode] = useState<"scan" | "manual">("scan");
// // //   const [scanning, setScanning] = useState(false);
// // //   const [scanned, setScanned] = useState(false);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
  
// // //   // LOCATION STATE
// // //   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
// // //   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 }); 
// // //   const [showLocModal, setShowLocModal] = useState(false);
// // //   const [pickerMode, setPickerMode] = useState(false);
// // //   const [locStatus, setLocStatus] = useState("Ready to Donate");
  
// // //   // SEARCH STATE
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [isSearching, setIsSearching] = useState(false);

// // //   // DATA
// // //   const [history, setHistory] = useState<any[]>([]);
// // //   const [loadingHistory, setLoadingHistory] = useState(true);

// // //   const [form, setForm] = useState({ 
// // //     food: "", 
// // //     qty: "", 
// // //     expiry: "", 
// // //     window: "30 mins" 
// // //   });

// // //   useEffect(() => {
// // //     fetchDonations();

// // //     if (navigator.geolocation) {
// // //         navigator.geolocation.getCurrentPosition(
// // //             (position) => {
// // //                 setLocStatus("Location Secured");
// // //             },
// // //             () => {
// // //                 setLocStatus("Location Denied");
// // //                 toast.error("Location access denied.");
// // //             }
// // //         );
// // //     }
// // //   }, [user]);

// // //   const fetchDonations = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/donations?userId=${user?.id}`);
// // //       const data = await res.json();
// // //       setHistory(data);
// // //     } catch (err) { console.error("History Error"); } 
// // //     finally { setLoadingHistory(false); }
// // //   };

// // //   const handleScan = () => {
// // //     setScanning(true);
// // //     setScanned(false);
// // //     setTimeout(() => {
// // //       setScanning(false);
// // //       setScanned(true);
// // //       setForm({ food: "Steam Rice", qty: "5.2", expiry: "4 hours", window: "30 mins" });
// // //       toast.success("Food Detected!");
// // //     }, 2500);
// // //   };

// // //   // --- MAP SEARCH FUNCTION ---
// // //   const handleSearch = async () => {
// // //     if (!searchQuery) return;
// // //     setIsSearching(true);
    
// // //     try {
// // //         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
// // //         const data = await res.json();

// // //         if (data && data.length > 0) {
// // //             const firstResult = data[0];
// // //             const newLoc = {
// // //                 lat: parseFloat(firstResult.lat),
// // //                 lng: parseFloat(firstResult.lon)
// // //             };
            
// // //             setMapCenter(newLoc);
// // //             setLocation(newLoc);
// // //             toast.success(`Found: ${firstResult.display_name.split(",")[0]}`);
// // //         } else {
// // //             toast.error("Location not found");
// // //         }
// // //     } catch (error) {
// // //         toast.error("Search failed");
// // //     } finally {
// // //         setIsSearching(false);
// // //     }
// // //   };

// // //   const initiateDonation = () => {
// // //     if (!form.food || !form.qty) {
// // //         toast.error("Please fill in food details first");
// // //         return;
// // //     }
// // //     setShowLocModal(true);
// // //     setPickerMode(false);
// // //   };

// // //   const useCurrentLocation = () => {
// // //     if (!navigator.geolocation) {
// // //         toast.error("Geolocation not supported");
// // //         return;
// // //     }
// // //     toast.info("Fetching GPS...");
// // //     navigator.geolocation.getCurrentPosition(
// // //         (pos) => {
// // //             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// // //             setLocation(loc);
// // //             submitDonation(loc);
// // //         },
// // //         () => {
// // //             toast.error("GPS Denied. Please pick on map.");
// // //             setPickerMode(true);
// // //         }
// // //     );
// // //   };

// // //   const submitDonation = async (finalLoc: { lat: number, lng: number }) => {
// // //     setShowLocModal(false);
// // //     setIsSubmitting(true);
// // //     try {
// // //       const response = await fetch("http://localhost:5000/api/donate", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           foodType: form.food,
// // //           quantity: form.qty,
// // //           expiry: form.expiry,
// // //           pickupTime: form.window,
// // //           donorId: user?.id,      
// // //           donorName: user?.name || user?.organization,
// // //           location: finalLoc 
// // //         }),
// // //       });

// // //       if (response.ok) {
// // //         toast.success("Donation Broadcasted to Network!");
// // //         fetchDonations(); 
        
// // //         setTimeout(() => {
// // //           setScanned(false);
// // //           setForm({ food: "", qty: "", expiry: "", window: "30 mins" });
// // //         }, 3000);
// // //         setLocStatus("Donation Sent");
// // //       }
// // //     } catch (error) {
// // //       toast.error("Connection Failed");
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen pt-20 pb-12 px-4 max-w-2xl mx-auto relative">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h1 className="text-3xl font-display font-bold">Donate <span className="gradient-text">Food</span></h1>
        
// // //         <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
// // //             <MapPin className={`w-3 h-3 ${location ? "text-emerald-400" : "text-yellow-400"}`} />
// // //             {locStatus}
// // //         </div>
// // //       </div>

// // //       {/* --- LOCATION MODAL --- */}
// // //       <AnimatePresence>
// // //         {showLocModal && (
// // //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
// // //             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
// // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <MapPin className="text-primary" /> Select Pickup Location
// // //               </h2>

// // //               {!pickerMode ? (
// // //                 <div className="space-y-3">
// // //                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
// // //                     <Navigation className="w-5 h-5" /> Use My Current Location
// // //                   </button>
// // //                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
// // //                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
// // //                     <MapPin className="w-5 h-5" /> Select on Map
// // //                   </button>
// // //                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-4">
// // //                   <div className="flex gap-2">
// // //                     <input 
// // //                         type="text" 
// // //                         placeholder="Search location (e.g., Charminar)" 
// // //                         value={searchQuery}
// // //                         onChange={(e) => setSearchQuery(e.target.value)}
// // //                         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // //                         className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary text-white"
// // //                     />
// // //                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 text-white">
// // //                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
// // //                     </button>
// // //                   </div>

// // //                   <p className="text-xs text-muted-foreground">Search or tap on the map to pin location.</p>
                  
// // //                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative z-0">
// // //                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
// // //                       <ChangeView center={mapCenter} />
// // //                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
// // //                       <LocationMarker setPos={setLocation} pos={location} />
// // //                     </MapContainer>
// // //                   </div>

// // //                   <div className="flex gap-3">
// // //                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
// // //                     <button onClick={() => location && submitDonation(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>
// // //                       Confirm Location
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <div className="glass-card p-1 flex mb-8 max-w-xs">
// // //         {(["scan", "manual"] as const).map((m) => (
// // //           <button key={m} onClick={() => { setMode(m); setScanned(false); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-primary text-black" : "text-muted-foreground"}`}>
// // //             {m === "scan" ? <Camera className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {m === "scan" ? "AI Scan" : "Manual"}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       <AnimatePresence mode="wait">
// // //         {mode === "scan" && (
// // //           <motion.div key="scan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 mb-8">
// // //             <div className="aspect-video rounded-xl bg-muted/30 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden mb-6">
// // //                 {scanning && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
// // //                 {!scanned ? (
// // //                     <button onClick={handleScan} disabled={scanning} className="btn-glow-solid px-6 py-3 flex gap-2">
// // //                         {scanning ? "Scanning..." : <><Camera className="w-5 h-5" /> Start AI Scan</>}
// // //                     </button>
// // //                 ) : (
// // //                     <div className="text-center">
// // //                         <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
// // //                         <p className="text-primary font-medium">Food Detected: Rice</p>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       {(mode === "manual" || scanned) && (
// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-8 space-y-4">
// // //           <h3 className="font-display font-semibold text-lg mb-2">{scanned ? "AI Results" : "Enter Details"}</h3>
// // //           {[
// // //             { label: "Food Type", key: "food", placeholder: "e.g., Rice, Bread" },
// // //             { label: "Quantity (kg)", key: "qty", placeholder: "e.g., 5.2" },
// // //             { label: "Expiry Time", key: "expiry", placeholder: "e.g., 4 hours" },
// // //             { label: "Pickup Window", key: "window", placeholder: "e.g., 30 mins" },
// // //           ].map((field) => (
// // //             <div key={field.key}>
// // //               <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
// // //               <input type="text" value={form[field.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full bg-muted/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary transition-colors" />
// // //             </div>
// // //           ))}

// // //           <button onClick={initiateDonation} disabled={isSubmitting} className="btn-glow-solid w-full mt-4 flex items-center justify-center gap-2">
// // //             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
// // //             Confirm & Select Location
// // //           </button>
// // //         </motion.div>
// // //       )}

// // //       {/* --- REWARDS CARD (MY IMPACT GARDEN) --- */}
// // //       <div className="w-full mb-8">
// // //         <Link to="/rewards">
// // //             <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-1 shadow-xl transition-all hover:shadow-emerald-500/40 hover:-translate-y-1">
            
// // //             {/* Animated Shine Effect */}
// // //             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />

// // //             <div className="relative flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4">
// // //                 <div className="flex items-center gap-4">
// // //                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
// // //                     <Sprout size={24} fill="currentColor" className="opacity-80" />
// // //                 </div>
// // //                 <div className="text-left">
// // //                     <h3 className="text-lg font-bold text-white">My Impact Garden</h3>
// // //                     <p className="text-xs font-medium text-emerald-50 opacity-90">
// // //                     Grow your forest with every donation.
// // //                     </p>
// // //                 </div>
// // //                 </div>
                
// // //                 <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-emerald-700">
// // //                 View Progress <ArrowRight size={16} />
// // //                 </div>
// // //             </div>
// // //             </div>
// // //         </Link>
// // //       </div>

// // //       {/* HISTORY LIST */}
// // //       <div className="space-y-3">
// // //         <h3 className="font-semibold text-lg mb-4">Donation History</h3>
// // //         {loadingHistory ? <p className="text-muted-foreground text-center">Loading...</p> : 
// // //           history.length === 0 ? <p className="text-muted-foreground text-center p-4 glass-card">No donations yet.</p> :
// // //           history.map((item) => {
// // //              const statusKey = item.status || 'pending';
// // //              const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
// // //              const StatusIcon = cfg.icon;
             
// // //              return (
// // //                 <div key={item._id} className={`glass-card p-4 border-l-2 ${cfg.border} flex justify-between items-center`}>
// // //                     <div>
// // //                         <p className="font-bold">{item.foodType}</p>
// // //                         <p className="text-xs text-muted-foreground">{item.quantity}kg • {item.expiry}</p>
// // //                     </div>
// // //                     <div className="text-right flex flex-col items-end">
// // //                         <div className={`flex items-center gap-1 text-xs justify-end ${cfg.color}`}>
// // //                             <StatusIcon className="w-3 h-3" /> {cfg.label}
// // //                         </div>
                        
// // //                         {(item.status === "assigned" || item.status === "transit") && (
// // //                             <button 
// // //                                 onClick={() => navigate(`/agent/${item._id}`)}
// // //                                 className="mt-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
// // //                             >
// // //                                 <Truck className="w-3 h-3" /> Track
// // //                             </button>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //              )
// // //           })
// // //         }
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Donor;
// // import { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Camera, Edit3, Package, Clock, CheckCircle2, AlertTriangle, Truck, Loader2, MapPin, Navigation, Search, Mic, Plus, Trash2, Sprout, ArrowRight } from "lucide-react";
// // import { toast } from "sonner";
// // import { useAuth } from "@/context/AuthContext"; 
// // import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// // import { useNavigate, Link } from "react-router-dom";
// // import "leaflet/dist/leaflet.css";

// // import L from 'leaflet';
// // import icon from 'leaflet/dist/images/marker-icon.png';
// // import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// // const DefaultIcon = L.icon({
// //   iconUrl: icon, shadowUrl: iconShadow,
// //   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// // });
// // L.Marker.prototype.options.icon = DefaultIcon;

// // // --- API CONFIGURATION ---
// // const API_URL = "http://localhost:5000";

// // const statusConfig = {
// //   pending: { color: "text-blue-400", border: "border-blue-400/30", icon: Clock, label: "Pending" },
// //   searching_agent: { color: "text-orange-400", border: "border-orange-400/30", icon: Loader2, label: "Finding Driver" },
// //   assigned: { color: "text-purple-400", border: "border-purple-400/30", icon: Truck, label: "Driver Assigned" },
// //   transit: { color: "text-yellow-400", border: "border-yellow-400/30", icon: Truck, label: "In Transit" },
// //   delivered: { color: "text-emerald-400", border: "border-emerald-400/30", icon: CheckCircle2, label: "Delivered" },
// //   expired: { color: "text-destructive", border: "border-destructive/30", icon: AlertTriangle, label: "Expired" },
// // };

// // // --- LEAFLET HELPERS ---
// // const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
// //   useMapEvents({ click(e) { setPos(e.latlng); } });
// //   return pos ? <Marker position={pos} /> : null;
// // };

// // const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
// //   const map = useMap();
// //   useEffect(() => { map.setView(center, 15); }, [center, map]);
// //   return null;
// // };

// // const Donor = () => {
// //   const { user } = useAuth();
// //   const navigate = useNavigate(); 
  
// //   // UI & FORM STATE
// //   const [mode, setMode] = useState<"scan" | "manual">("scan");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isListening, setIsListening] = useState(false);
  
// //   // Initialize form with strict strings for inputs
// //   const [form, setForm] = useState({ food: "", qty: "", expiry: "", window: "30" });

// //   // CAMERA & AI STATE
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const [stream, setStream] = useState<MediaStream | null>(null);
// //   const [scanning, setScanning] = useState(false);
  
// //   // LOCATION STATE
// //   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
// //   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 }); 
// //   const [showLocModal, setShowLocModal] = useState(false);
// //   const [pickerMode, setPickerMode] = useState(false);
// //   const [locStatus, setLocStatus] = useState("Ready to Donate");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isSearching, setIsSearching] = useState(false);

// //   // DATA STATE
// //   const [history, setHistory] = useState<any[]>([]);
// //   const [loadingHistory, setLoadingHistory] = useState(true);

// //   useEffect(() => {
// //     fetchDonations();
// //     if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //             (position) => { setLocStatus("Location Secured"); },
// //             () => { setLocStatus("Location Denied"); toast.error("Location access denied."); }
// //         );
// //     }
// //   }, [user]);

// //   // --- 1. CAMERA ENGINE ---
// //   const startCamera = async () => {
// //       try {
// //           const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
// //           setStream(mediaStream);
// //           if (videoRef.current) videoRef.current.srcObject = mediaStream;
// //       } catch (err) {
// //           toast.error("Camera access denied. Switch to manual mode.");
// //       }
// //   };

// //   const stopCamera = () => {
// //       if (stream) {
// //           stream.getTracks().forEach(track => track.stop());
// //           setStream(null);
// //       }
// //   };

// //   useEffect(() => {
// //       if (mode === "scan") startCamera();
// //       else stopCamera();
// //       return () => stopCamera(); 
// //   }, [mode]);

// //   // --- 2. GEMINI AI CAMERA SCAN ---
// //   const handleCapture = async () => {
// //       if (!videoRef.current || !canvasRef.current) return;
      
// //       const video = videoRef.current;
// //       const canvas = canvasRef.current;
// //       canvas.width = video.videoWidth;
// //       canvas.height = video.videoHeight;
// //       const ctx = canvas.getContext("2d");
// //       if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// //       const base64Image = canvas.toDataURL("image/jpeg", 0.8);

// //       setScanning(true);
// //       toast.info("Gemini Vision analyzing food...", { duration: 4000 });

// //       try {
// //           const res = await fetch(`${API_URL}/api/analyze-food`, {
// //               method: "POST",
// //               headers: { "Content-Type": "application/json" },
// //               body: JSON.stringify({ image: base64Image })
// //           });

// //           if (!res.ok) throw new Error("AI Backend Failed");

// //           const aiData = await res.json();
          
// //           // Auto-fill form
// //           setForm({ 
// //               food: aiData.food || "Unknown Food", 
// //               // Strip non-numeric chars for inputs
// //               qty: aiData.qty ? aiData.qty.toString().replace(/[^0-9.]/g, '') : "", 
// //               expiry: aiData.expiry ? aiData.expiry.toString().replace(/[^0-9]/g, '') : "4", 
// //               window: "30" 
// //           });
// //           toast.success("AI Analysis Complete! Verify details.");

// //       } catch (error) {
// //           console.error(error);
// //           toast.error("Network Error. Using fallback.");
// //           setForm({ food: "Detected Food Item", qty: "2.0", expiry: "4", window: "30" });
// //       } finally {
// //           setScanning(false);
// //           setMode("manual"); 
// //       }
// //   };

// //   // --- 3. VOICE TO TEXT (WITH GEMINI + LOCAL FALLBACK) ---
// //   const handleVoiceCommand = () => {
// //     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       toast.error("Voice recognition not supported.");
// //       return;
// //     }

// //     const recognition = new SpeechRecognition();
// //     recognition.lang = 'en-US';
// //     recognition.start();
// //     setIsListening(true);
// //     toast.info("Listening... Say e.g., '5kg Rice'");

// //     recognition.onresult = async (event: any) => {
// //       const transcript = event.results[0][0].transcript;
// //       toast.success("Processing Voice...");
      
// //       try {
// //         // Try Gemini Backend First
// //         const res = await fetch(`${API_URL}/api/analyze-voice`, {
// //              method: "POST",
// //              headers: { "Content-Type": "application/json" },
// //              body: JSON.stringify({ text: transcript })
// //         });
        
// //         if (res.ok) {
// //             const data = await res.json();
// //             setForm({
// //                 food: data.food || form.food,
// //                 qty: data.qty ? data.qty.toString().replace(/[^0-9.]/g, '') : form.qty,
// //                 expiry: data.expiry ? data.expiry.toString().replace(/[^0-9]/g, '') : form.expiry,
// //                 window: data.window ? data.window.toString().replace(/[^0-9]/g, '') : form.window
// //             });
// //             toast.success("Gemini processed your voice!");
// //         } else {
// //             throw new Error("Backend unavailable");
// //         }
// //       } catch (err) {
// //         // Use Smart Local Parser if backend fails
// //         console.warn("Using local parser");
// //         parseVoiceLocally(transcript);
// //       } finally {
// //         setIsListening(false);
// //       }
// //     };

// //     recognition.onerror = () => { toast.error("Voice Error. Try again."); setIsListening(false); };
// //     recognition.onend = () => { setIsListening(false); };
// //   };

// //   // --- 4. SMART LOCAL PARSER (With Auto-Expiry) ---
// //   const parseVoiceLocally = (text: string) => {
// //       let food = text;
// //       let qty = "";
// //       let expiry = "";

// //       // Extract Quantity (Strict Number)
// //       const qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|g|liters|packets|servings)/i);
// //       if (qtyMatch) {
// //           qty = qtyMatch[1];
// //           food = food.replace(qtyMatch[0], "");
// //       } else {
// //           // Look for loose number at start
// //           const startNum = text.match(/^(\d+(?:\.\d+)?)/);
// //           if (startNum) { qty = startNum[1]; food = food.replace(startNum[0], ""); }
// //       }

// //       // Extract Expiry (Strict Number)
// //       const expiryMatch = text.match(/(\d+)\s*(?:hour|hr|day)/i);
// //       if (expiryMatch) {
// //           expiry = expiryMatch[1];
// //           food = food.replace(expiryMatch[0], "");
// //       }

// //       // Clean Food Name
// //       const removeWords = ["i", "have", "want", "to", "donate", "some", "my", "of", "is", "expired", "expiry", "in", "for", "please", "take", "available", "a", "an", "the"];
// //       const regex = new RegExp(`\\b(${removeWords.join("|")})\\b`, "gi");
// //       food = food.replace(regex, " ").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
// //       if(food) food = food.charAt(0).toUpperCase() + food.slice(1);

// //       // AUTO-PREDICT EXPIRY (Logic Simulation)
// //       if (!expiry) {
// //           const lowerFood = food.toLowerCase();
// //           if (lowerFood.includes("milk") || lowerFood.includes("curd") || lowerFood.includes("dairy")) expiry = "2"; 
// //           else if (lowerFood.includes("rice") || lowerFood.includes("curry") || lowerFood.includes("cooked")) expiry = "4"; 
// //           else if (lowerFood.includes("bread") || lowerFood.includes("veg") || lowerFood.includes("fruit")) expiry = "24"; 
// //           else expiry = "4"; // Default
          
// //           toast.info(`Auto-predicted Expiry: ${expiry} hours`);
// //       }

// //       setForm({
// //           food: food || "Unknown Item",
// //           qty: qty || "",
// //           expiry: expiry,
// //           window: form.window
// //       });
// //   };

// //   // --- GENERAL FUNCTIONS ---
// //   const fetchDonations = async () => {
// //     try {
// //       const res = await fetch(`${API_URL}/api/donations?userId=${user?.id}`);
// //       if(res.ok) setHistory(await res.json());
// //     } catch (err) { console.error("History Error"); } 
// //     finally { setLoadingHistory(false); }
// //   };

// //   const handleSearch = async () => {
// //     if (!searchQuery) return;
// //     setIsSearching(true);
// //     try {
// //         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
// //         const data = await res.json();
// //         if (data && data.length > 0) {
// //             const newLoc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
// //             setMapCenter(newLoc);
// //             setLocation(newLoc);
// //             toast.success(`Found: ${data[0].display_name.split(",")[0]}`);
// //         } else { toast.error("Location not found"); }
// //     } catch (error) { toast.error("Search failed"); } 
// //     finally { setIsSearching(false); }
// //   };

// //   const initiateDonation = () => {
// //     if (!form.food || !form.qty) return toast.error("Please fill in food details first");
// //     setShowLocModal(true);
// //     setPickerMode(false);
// //   };

// //   const useCurrentLocation = () => {
// //     if (!navigator.geolocation) return toast.error("Geolocation not supported");
// //     toast.info("Fetching GPS...");
// //     navigator.geolocation.getCurrentPosition(
// //         (pos) => {
// //             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //             setLocation(loc);
// //             submitDonation(loc);
// //         },
// //         () => {
// //             toast.error("GPS Denied. Please pick on map.");
// //             setPickerMode(true);
// //         }
// //     );
// //   };

// //   const submitDonation = async (finalLoc: { lat: number, lng: number }) => {
// //     setShowLocModal(false);
// //     setIsSubmitting(true);
// //     try {
// //       const response = await fetch(`${API_URL}/api/donate`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           foodType: form.food,
// //           quantity: form.qty,
// //           expiry: form.expiry,
// //           pickupTime: form.window,
// //           donorId: user?.id,      
// //           donorName: user?.name || user?.organization,
// //           location: finalLoc 
// //         }),
// //       });

// //       if (response.ok) {
// //         toast.success("Donation Broadcasted to Network!");
// //         fetchDonations(); 
// //         setForm({ food: "", qty: "", expiry: "", window: "30" });
// //         setLocStatus("Donation Sent");
// //         setMode("scan"); 
// //       }
// //     } catch (error) { toast.error("Connection Failed"); } 
// //     finally { setIsSubmitting(false); }
// //   };

// //   return (
// //     <div className="min-h-screen pt-20 pb-12 px-4 max-w-2xl mx-auto relative">
      
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-display font-bold">Donate <span className="gradient-text">Food</span></h1>
// //         <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
// //             <MapPin className={`w-3 h-3 ${location ? "text-emerald-400" : "text-yellow-400"}`} />
// //             {locStatus}
// //         </div>
// //       </div>

// //       {/* --- LOCATION MODAL --- */}
// //       <AnimatePresence>
// //         {showLocModal && (
// //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
// //             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <MapPin className="text-primary" /> Select Pickup Location
// //               </h2>

// //               {!pickerMode ? (
// //                 <div className="space-y-3">
// //                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
// //                     <Navigation className="w-5 h-5" /> Use My Current Location
// //                   </button>
// //                   <div className="text-center text-muted-foreground text-xs font-bold my-2">- OR -</div>
// //                   <button onClick={() => setPickerMode(true)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold flex items-center justify-center gap-2">
// //                     <MapPin className="w-5 h-5" /> Select on Map
// //                   </button>
// //                   <button onClick={() => setShowLocModal(false)} className="w-full py-2 text-sm text-muted-foreground hover:text-white mt-2">Cancel</button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   <div className="flex gap-2">
// //                     <input type="text" placeholder="Search location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
// //                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
// //                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
// //                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
// //                       <ChangeView center={mapCenter} />
// //                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
// //                       <LocationMarker setPos={setLocation} pos={location} />
// //                     </MapContainer>
// //                   </div>
// //                   <div className="flex gap-3">
// //                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
// //                     <button onClick={() => location && submitDonation(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>Confirm Location</button>
// //                   </div>
// //                 </div>
// //               )}
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* --- TOGGLE TABS --- */}
// //       <div className="glass-card p-1 flex mb-8 max-w-xs">
// //         {(["scan", "manual"] as const).map((m) => (
// //           <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-primary text-black" : "text-muted-foreground"}`}>
// //             {m === "scan" ? <Camera className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {m === "scan" ? "AI Vision" : "Manual Entry"}
// //           </button>
// //         ))}
// //       </div>

// //       <AnimatePresence mode="wait">
// //         {/* --- CAMERA SCAN UI --- */}
// //         {mode === "scan" && (
// //           <motion.div key="scan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 mb-8">
// //             <div className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden mb-6 flex flex-col items-center justify-center">
// //                 <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
// //                 <canvas ref={canvasRef} className="hidden" />
// //                 {scanning && (
// //                     <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center z-10">
// //                         <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
// //                         <span className="text-primary font-bold text-lg animate-pulse tracking-wider">Analyzing Food...</span>
// //                     </div>
// //                 )}
// //             </div>
// //             <button onClick={handleCapture} disabled={scanning} className="btn-glow-solid w-full py-4 text-lg font-bold flex justify-center gap-2">
// //                 <Camera className="w-5 h-5" /> {scanning ? "Processing Image..." : "Capture & Analyze"}
// //             </button>
// //           </motion.div>
// //         )}

// //         {/* --- MANUAL / VOICE UI --- */}
// //         {mode === "manual" && (
// //           <motion.div key="manual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 mb-8 space-y-4">
// //             <div className="flex justify-between items-center mb-2">
// //               <h3 className="font-display font-semibold text-lg flex items-center gap-2">
// //                   <Edit3 className="w-5 h-5 text-primary" /> Verify Details
// //               </h3>
              
// //               <button 
// //                 onClick={handleVoiceCommand}
// //                 disabled={isListening}
// //                 className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
// //                   isListening 
// //                     ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" 
// //                     : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
// //                 }`}
// //               >
// //                 <Mic className="w-3.5 h-3.5" />
// //                 {isListening ? "Listening..." : "Voice Autofill"}
// //               </button>
// //             </div>

// //             {[
// //               { label: "Food Type", key: "food", placeholder: "e.g., Rice, Bread", type: "text" },
// //               { label: "Quantity (kg)", key: "qty", placeholder: "e.g., 5.2", type: "number" },
// //               { label: "Expiry (hours)", key: "expiry", placeholder: "e.g., 4", type: "number" },
// //               { label: "Pickup Window (mins)", key: "window", placeholder: "e.g., 30", type: "number" },
// //             ].map((field) => (
// //               <div key={field.key}>
// //                 <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
// //                 <input 
// //                   type={field.type} 
// //                   value={form[field.key as keyof typeof form]} 
// //                   onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} 
// //                   placeholder={field.placeholder} 
// //                   min="0"
// //                   step={field.key === "qty" ? "0.1" : "1"}
// //                   className="w-full bg-muted/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary transition-colors outline-none" 
// //                 />
// //               </div>
// //             ))}

// //             <button onClick={initiateDonation} disabled={isSubmitting} className="btn-glow-solid w-full mt-4 py-4 text-lg font-bold flex items-center justify-center gap-2">
// //               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
// //               Confirm & Pin Location
// //             </button>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* --- REWARDS CARD (MY IMPACT GARDEN) --- */}
// //       <div className="w-full mb-8">
// //         <Link to="/rewards">
// //             <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-1 shadow-xl transition-all hover:shadow-emerald-500/40 hover:-translate-y-1">
// //             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
// //             <div className="relative flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4">
// //                 <div className="flex items-center gap-4">
// //                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
// //                     <Sprout size={24} fill="currentColor" className="opacity-80" />
// //                 </div>
// //                 <div className="text-left">
// //                     <h3 className="text-lg font-bold text-white">My Impact Garden</h3>
// //                     <p className="text-xs font-medium text-emerald-50 opacity-90">Grow your forest with every donation.</p>
// //                 </div>
// //                 </div>
// //                 <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-emerald-700">
// //                 View Progress <ArrowRight size={16} />
// //                 </div>
// //             </div>
// //             </div>
// //         </Link>
// //       </div>

// //       {/* --- HISTORY LIST --- */}
// //       <div className="space-y-3">
// //         <h3 className="font-semibold text-lg mb-4">Donation History</h3>
// //         {loadingHistory ? <p className="text-muted-foreground text-center">Loading...</p> : 
// //           history.length === 0 ? <p className="text-muted-foreground text-center p-4 glass-card">No donations yet.</p> :
// //           history.map((item) => {
// //              const statusKey = item.status || 'pending';
// //              const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
// //              const StatusIcon = cfg.icon;
// //              return (
// //                 <div key={item._id} className={`glass-card p-4 border-l-2 ${cfg.border} flex justify-between items-center`}>
// //                     <div>
// //                         <p className="font-bold">{item.foodType}</p>
// //                         <p className="text-xs text-muted-foreground">{item.quantity}kg • {item.expiry}h</p>
// //                     </div>
// //                     <div className="text-right flex flex-col items-end">
// //                         <div className={`flex items-center gap-1 text-xs justify-end ${cfg.color}`}>
// //                             <StatusIcon className="w-3 h-3" /> {cfg.label}
// //                         </div>
// //                         {(item.status === "assigned" || item.status === "transit") && (
// //                             <button 
// //                                 onClick={() => navigate(`/agent/${item._id}`)}
// //                                 className="mt-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
// //                             >
// //                                 <Truck className="w-3 h-3" /> Track
// //                             </button>
// //                         )}
// //                     </div>
// //                 </div>
// //              )
// //           })
// //         }
// //       </div>
// //     </div>
// //   );
// // };

// // export default Donor;
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Camera, Edit3, Package, Clock, CheckCircle2, AlertTriangle, Truck, Loader2, MapPin, Navigation, Search, Mic, Plus, Trash2, Sprout, ArrowRight } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "@/context/AuthContext"; 
// import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
// import { useNavigate, Link } from "react-router-dom";
// import "leaflet/dist/leaflet.css";

// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//   iconUrl: icon, shadowUrl: iconShadow,
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // --- API CONFIGURATION ---
// const API_URL = "http://localhost:5000";

// const statusConfig = {
//   pending: { color: "text-blue-400", border: "border-blue-400/30", icon: Clock, label: "Pending" },
//   searching_agent: { color: "text-orange-400", border: "border-orange-400/30", icon: Loader2, label: "Finding Driver" },
//   assigned: { color: "text-purple-400", border: "border-purple-400/30", icon: Truck, label: "Driver Assigned" },
//   transit: { color: "text-yellow-400", border: "border-yellow-400/30", icon: Truck, label: "In Transit" },
//   delivered: { color: "text-emerald-400", border: "border-emerald-400/30", icon: CheckCircle2, label: "Delivered" },
//   expired: { color: "text-destructive", border: "border-destructive/30", icon: AlertTriangle, label: "Expired" },
// };

// // --- HELPER: Expiry Prediction Logic ---
// const predictExpiry = (foodName: string) => {
//     const lowerFood = foodName.toLowerCase();
    
//     // 1. Highly Perishable (Dairy, Milk-based)
//     if (lowerFood.match(/milk|curd|paneer|cream|dairy|shake|smoothie|tea|coffee/)) return "2";
    
//     // 2. Cooked Meals (Rice, Curry, Pasta, etc.)
//     if (lowerFood.match(/rice|curry|dal|sambar|cooked|meal|pasta|biryani|chicken|meat|fish|egg|gravy|soup/)) return "4";
    
//     // 3. Bakery & Dry Items (Bread, Roti, Bun)
//     if (lowerFood.match(/bread|roti|chapati|bun|cake|biscuit|pastry|muffin/)) return "24";
    
//     // 4. Raw / Fresh (Fruits, Veg)
//     if (lowerFood.match(/fruit|veg|apple|banana|tomato|potato|onion|salad/)) return "48";
    
//     // Default fallback
//     return "4"; 
// };

// // --- LEAFLET HELPERS ---
// const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
//   useMapEvents({ click(e) { setPos(e.latlng); } });
//   return pos ? <Marker position={pos} /> : null;
// };

// const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
//   const map = useMap();
//   useEffect(() => { map.setView(center, 15); }, [center, map]);
//   return null;
// };

// const Donor = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate(); 
  
//   // UI & FORM STATE
//   const [mode, setMode] = useState<"scan" | "manual">("scan");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isListening, setIsListening] = useState(false);
  
//   // Initialize form
//   const [form, setForm] = useState({ food: "", qty: "", expiry: "", window: "30" });

//   // CAMERA & AI STATE
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [scanning, setScanning] = useState(false);
  
//   // LOCATION STATE
//   const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
//   const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 }); 
//   const [showLocModal, setShowLocModal] = useState(false);
//   const [pickerMode, setPickerMode] = useState(false);
//   const [locStatus, setLocStatus] = useState("Ready to Donate");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearching, setIsSearching] = useState(false);

//   // DATA STATE
//   const [history, setHistory] = useState<any[]>([]);
//   const [loadingHistory, setLoadingHistory] = useState(true);

//   useEffect(() => {
//     fetchDonations();
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => { setLocStatus("Location Secured"); },
//             () => { setLocStatus("Location Denied"); toast.error("Location access denied."); }
//         );
//     }
//   }, [user]);

//   // --- 1. CAMERA ENGINE ---
//   const startCamera = async () => {
//       try {
//           const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
//           setStream(mediaStream);
//           if (videoRef.current) videoRef.current.srcObject = mediaStream;
//       } catch (err) {
//           toast.error("Camera access denied. Switch to manual mode.");
//       }
//   };

//   const stopCamera = () => {
//       if (stream) {
//           stream.getTracks().forEach(track => track.stop());
//           setStream(null);
//       }
//   };

//   useEffect(() => {
//       if (mode === "scan") startCamera();
//       else stopCamera();
//       return () => stopCamera(); 
//   }, [mode]);

//   // --- 2. AI CAMERA SCAN (UPDATED) ---
//   const handleCapture = async () => {
//       if (!videoRef.current || !canvasRef.current) return;
      
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext("2d");
//       if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const base64Image = canvas.toDataURL("image/jpeg", 0.8);

//       setScanning(true);
//       // CHANGED: Removed "Gemini" reference
//       toast.info("AI Vision analyzing food...", { duration: 4000 });

//       try {
//           const res = await fetch(`${API_URL}/api/analyze-food`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ image: base64Image })
//           });

//           if (!res.ok) throw new Error("AI Backend Failed");

//           const aiData = await res.json();
          
//           // Determine Expiry: Use API result if available, otherwise predict based on food name
//           const foodName = aiData.food || "Unknown Food";
//           const predictedExpiry = aiData.expiry 
//                 ? aiData.expiry.toString().replace(/[^0-9]/g, '') 
//                 : predictExpiry(foodName);

//           setForm({ 
//               food: foodName, 
//               qty: aiData.qty ? aiData.qty.toString().replace(/[^0-9.]/g, '') : "", 
//               expiry: predictedExpiry, 
//               window: "30" 
//           });
//           toast.success("Analysis Complete! Details auto-filled.");

//       } catch (error) {
//           console.error(error);
//           toast.error("Network Error. Using fallback.");
//           setForm({ food: "Detected Food Item", qty: "2.0", expiry: "4", window: "30" });
//       } finally {
//           setScanning(false);
//           setMode("manual"); 
//       }
//   };

//   // --- 3. VOICE TO TEXT (UPDATED) ---
//   const handleVoiceCommand = () => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       toast.error("Voice recognition not supported.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.start();
//     setIsListening(true);
//     toast.info("Listening... Say e.g., '5kg Rice'");

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       toast.success("Processing Voice...");
      
//       try {
//         // Try Backend First
//         const res = await fetch(`${API_URL}/api/analyze-voice`, {
//              method: "POST",
//              headers: { "Content-Type": "application/json" },
//              body: JSON.stringify({ text: transcript })
//         });
        
//         if (res.ok) {
//             const data = await res.json();
            
//             // Calculate Expiry Logic
//             const foodName = data.food || form.food;
//             const finalExpiry = data.expiry 
//                 ? data.expiry.toString().replace(/[^0-9]/g, '') 
//                 : (form.expiry || predictExpiry(foodName)); // Use form value if exists, else predict

//             setForm({
//                 food: foodName,
//                 qty: data.qty ? data.qty.toString().replace(/[^0-9.]/g, '') : form.qty,
//                 expiry: finalExpiry,
//                 window: data.window ? data.window.toString().replace(/[^0-9]/g, '') : form.window
//             });
//             toast.success("Voice processed successfully!");
//         } else {
//             throw new Error("Backend unavailable");
//         }
//       } catch (err) {
//         console.warn("Using local parser");
//         parseVoiceLocally(transcript);
//       } finally {
//         setIsListening(false);
//       }
//     };

//     recognition.onerror = () => { toast.error("Voice Error. Try again."); setIsListening(false); };
//     recognition.onend = () => { setIsListening(false); };
//   };

//   // --- 4. SMART LOCAL PARSER (With Auto-Expiry) ---
//   const parseVoiceLocally = (text: string) => {
//       let food = text;
//       let qty = "";
//       let expiry = "";

//       // Extract Quantity
//       const qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|g|liters|packets|servings)/i);
//       if (qtyMatch) {
//           qty = qtyMatch[1];
//           food = food.replace(qtyMatch[0], "");
//       } else {
//           const startNum = text.match(/^(\d+(?:\.\d+)?)/);
//           if (startNum) { qty = startNum[1]; food = food.replace(startNum[0], ""); }
//       }

//       // Extract Expiry
//       const expiryMatch = text.match(/(\d+)\s*(?:hour|hr|day)/i);
//       if (expiryMatch) {
//           expiry = expiryMatch[1];
//           food = food.replace(expiryMatch[0], "");
//       }

//       // Clean Food Name
//       const removeWords = ["i", "have", "want", "to", "donate", "some", "my", "of", "is", "expired", "expiry", "in", "for", "please", "take", "available", "a", "an", "the"];
//       const regex = new RegExp(`\\b(${removeWords.join("|")})\\b`, "gi");
//       food = food.replace(regex, " ").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
//       if(food) food = food.charAt(0).toUpperCase() + food.slice(1);

//       // AUTO-PREDICT EXPIRY (Fallback if voice didn't mention it)
//       if (!expiry && food) {
//           expiry = predictExpiry(food);
//           toast.info(`Auto-predicted Expiry: ${expiry} hours`);
//       }

//       setForm({
//           food: food || "Unknown Item",
//           qty: qty || "",
//           expiry: expiry || "4",
//           window: form.window
//       });
//   };

//   // --- GENERAL FUNCTIONS ---
//   const fetchDonations = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/donations?userId=${user?.id}`);
//       if(res.ok) setHistory(await res.json());
//     } catch (err) { console.error("History Error"); } 
//     finally { setLoadingHistory(false); }
//   };

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     setIsSearching(true);
//     try {
//         const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
//         const data = await res.json();
//         if (data && data.length > 0) {
//             const newLoc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
//             setMapCenter(newLoc);
//             setLocation(newLoc);
//             toast.success(`Found: ${data[0].display_name.split(",")[0]}`);
//         } else { toast.error("Location not found"); }
//     } catch (error) { toast.error("Search failed"); } 
//     finally { setIsSearching(false); }
//   };

//   const initiateDonation = () => {
//     if (!form.food || !form.qty) return toast.error("Please fill in food details first");
//     setShowLocModal(true);
//     setPickerMode(false);
//   };

//   const useCurrentLocation = () => {
//     if (!navigator.geolocation) return toast.error("Geolocation not supported");
//     toast.info("Fetching GPS...");
//     navigator.geolocation.getCurrentPosition(
//         (pos) => {
//             const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//             setLocation(loc);
//             submitDonation(loc);
//         },
//         () => {
//             toast.error("GPS Denied. Please pick on map.");
//             setPickerMode(true);
//         }
//     );
//   };

//   const submitDonation = async (finalLoc: { lat: number, lng: number }) => {
//     setShowLocModal(false);
//     setIsSubmitting(true);
//     try {
//       const response = await fetch(`${API_URL}/api/donate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           foodType: form.food,
//           quantity: form.qty,
//           expiry: form.expiry,
//           pickupTime: form.window,
//           donorId: user?.id,      
//           donorName: user?.name || user?.organization,
//           location: finalLoc 
//         }),
//       });

//       if (response.ok) {
//         toast.success("Donation Broadcasted to Network!");
//         fetchDonations(); 
//         setForm({ food: "", qty: "", expiry: "", window: "30" });
//         setLocStatus("Donation Sent");
//         setMode("scan"); 
//       }
//     } catch (error) { toast.error("Connection Failed"); } 
//     finally { setIsSubmitting(false); }
//   };

//   return (
//     <div className="min-h-screen pt-20 pb-12 px-4 max-w-2xl mx-auto relative">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-display font-bold">Donate <span className="gradient-text">Food</span></h1>
//         <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
//             <MapPin className={`w-3 h-3 ${location ? "text-emerald-400" : "text-yellow-400"}`} />
//             {locStatus}
//         </div>
//       </div>

//       {/* --- LOCATION MODAL --- */}
//       <AnimatePresence>
//         {showLocModal && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MapPin className="text-primary" /> Select Pickup Location
//               </h2>

//               {!pickerMode ? (
//                 <div className="space-y-3">
//                   <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
//                     <Navigation className="w-5 h-5" /> Use My Current Location
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
//                     <input type="text" placeholder="Search location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
//                     <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
//                         {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
//                     <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
//                       <ChangeView center={mapCenter} />
//                       <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
//                       <LocationMarker setPos={setLocation} pos={location} />
//                     </MapContainer>
//                   </div>
//                   <div className="flex gap-3">
//                     <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
//                     <button onClick={() => location && submitDonation(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>Confirm Location</button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- TOGGLE TABS --- */}
//       <div className="glass-card p-1 flex mb-8 max-w-xs">
//         {(["scan", "manual"] as const).map((m) => (
//           <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-primary text-black" : "text-muted-foreground"}`}>
//             {m === "scan" ? <Camera className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {m === "scan" ? "AI Vision" : "Manual Entry"}
//           </button>
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
//         {/* --- CAMERA SCAN UI --- */}
//         {mode === "scan" && (
//           <motion.div key="scan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 mb-8">
//             <div className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden mb-6 flex flex-col items-center justify-center">
//                 <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
//                 <canvas ref={canvasRef} className="hidden" />
//                 {scanning && (
//                     <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center z-10">
//                         <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
//                         {/* CHANGED TEXT HERE */}
//                         <span className="text-primary font-bold text-lg animate-pulse tracking-wider">Analyzing Food Details...</span>
//                     </div>
//                 )}
//             </div>
//             <button onClick={handleCapture} disabled={scanning} className="btn-glow-solid w-full py-4 text-lg font-bold flex justify-center gap-2">
//                 <Camera className="w-5 h-5" /> {scanning ? "Processing Image..." : "Capture & Analyze"}
//             </button>
//           </motion.div>
//         )}

//         {/* --- MANUAL / VOICE UI --- */}
//         {mode === "manual" && (
//           <motion.div key="manual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 mb-8 space-y-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-display font-semibold text-lg flex items-center gap-2">
//                   <Edit3 className="w-5 h-5 text-primary" /> Verify Details
//               </h3>
              
//               <button 
//                 onClick={handleVoiceCommand}
//                 disabled={isListening}
//                 className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
//                   isListening 
//                     ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" 
//                     : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
//                 }`}
//               >
//                 <Mic className="w-3.5 h-3.5" />
//                 {isListening ? "Listening..." : "Voice Autofill"}
//               </button>
//             </div>

//             {[
//               { label: "Food Type", key: "food", placeholder: "e.g., Rice, Bread", type: "text" },
//               { label: "Quantity (kg)", key: "qty", placeholder: "e.g., 5.2", type: "number" },
//               { label: "Expiry (hours)", key: "expiry", placeholder: "e.g., 4", type: "number" },
//               { label: "Pickup Window (mins)", key: "window", placeholder: "e.g., 30", type: "number" },
//             ].map((field) => (
//               <div key={field.key}>
//                 <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
//                 <input 
//                   type={field.type} 
//                   value={form[field.key as keyof typeof form]} 
//                   onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} 
//                   placeholder={field.placeholder} 
//                   min="0"
//                   step={field.key === "qty" ? "0.1" : "1"}
//                   className="w-full bg-muted/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary transition-colors outline-none" 
//                 />
//               </div>
//             ))}

//             <button onClick={initiateDonation} disabled={isSubmitting} className="btn-glow-solid w-full mt-4 py-4 text-lg font-bold flex items-center justify-center gap-2">
//               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
//               Confirm & Pin Location
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- REWARDS CARD --- */}
//       <div className="w-full mb-8">
//         <Link to="/rewards">
//             <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-1 shadow-xl transition-all hover:shadow-emerald-500/40 hover:-translate-y-1">
//             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
//             <div className="relative flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4">
//                 <div className="flex items-center gap-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
//                     <Sprout size={24} fill="currentColor" className="opacity-80" />
//                 </div>
//                 <div className="text-left">
//                     <h3 className="text-lg font-bold text-white">My Impact Garden</h3>
//                     <p className="text-xs font-medium text-emerald-50 opacity-90">Grow your forest with every donation.</p>
//                 </div>
//                 </div>
//                 <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-emerald-700">
//                 View Progress <ArrowRight size={16} />
//                 </div>
//             </div>
//             </div>
//         </Link>
//       </div>

//       {/* --- HISTORY LIST --- */}
//       <div className="space-y-3">
//         <h3 className="font-semibold text-lg mb-4">Donation History</h3>
//         {loadingHistory ? <p className="text-muted-foreground text-center">Loading...</p> : 
//           history.length === 0 ? <p className="text-muted-foreground text-center p-4 glass-card">No donations yet.</p> :
//           history.map((item) => {
//              const statusKey = item.status || 'pending';
//              const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
//              const StatusIcon = cfg.icon;
//              return (
//                 <div key={item._id} className={`glass-card p-4 border-l-2 ${cfg.border} flex justify-between items-center`}>
//                     <div>
//                         <p className="font-bold">{item.foodType}</p>
//                         <p className="text-xs text-muted-foreground">{item.quantity}kg • {item.expiry}h</p>
//                     </div>
//                     <div className="text-right flex flex-col items-end">
//                         <div className={`flex items-center gap-1 text-xs justify-end ${cfg.color}`}>
//                             <StatusIcon className="w-3 h-3" /> {cfg.label}
//                         </div>
//                         {(item.status === "assigned" || item.status === "transit") && (
//                             <button 
//                                 onClick={() => navigate(`/agent/${item._id}`)}
//                                 className="mt-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
//                             >
//                                 <Truck className="w-3 h-3" /> Track
//                             </button>
//                         )}
//                     </div>
//                 </div>
//              )
//           })
//         }
//       </div>
//     </div>
//   );
// };

// export default Donor;
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Edit3, Package, Clock, CheckCircle2, AlertTriangle, Truck, Loader2, MapPin, Navigation, Search, Mic, Plus, Trash2, Sprout, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext"; 
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useNavigate, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon, shadowUrl: iconShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- API CONFIGURATION ---
const API_URL = "http://localhost:5000";

const statusConfig = {
  pending: { color: "text-blue-400", border: "border-blue-400/30", icon: Clock, label: "Pending" },
  searching_agent: { color: "text-orange-400", border: "border-orange-400/30", icon: Loader2, label: "Finding Driver" },
  assigned: { color: "text-purple-400", border: "border-purple-400/30", icon: Truck, label: "Driver Assigned" },
  transit: { color: "text-yellow-400", border: "border-yellow-400/30", icon: Truck, label: "In Transit" },
  delivered: { color: "text-emerald-400", border: "border-emerald-400/30", icon: CheckCircle2, label: "Delivered" },
  expired: { color: "text-destructive", border: "border-destructive/30", icon: AlertTriangle, label: "Expired" },
};

// --- HELPER: Expiry Prediction Logic ---
const predictExpiry = (foodName: string) => {
    const lowerFood = foodName.toLowerCase();
    
    // 1. Highly Perishable (Dairy, Milk-based) -> 2 Hours
    if (lowerFood.match(/milk|curd|paneer|cream|dairy|shake|smoothie|tea|coffee|ice/)) return "2";
    
    // 2. Cooked Meals (Rice, Curry, etc.) -> 4 Hours
    if (lowerFood.match(/rice|curry|dal|sambar|cooked|meal|pasta|biryani|chicken|meat|fish|egg|gravy|soup|roti|chapati|naan/)) return "4";
    
    // 3. Bakery & Dry Items -> 24 Hours
    if (lowerFood.match(/bread|bun|cake|biscuit|pastry|muffin|donut|bagel/)) return "24";
    
    // 4. Raw / Fresh (Fruits, Veg) -> 48 Hours
    if (lowerFood.match(/fruit|veg|apple|banana|tomato|potato|onion|salad|carrot|spinach/)) return "48";
    
    // 5. Packaged/Canned -> 72 Hours
    if (lowerFood.match(/canned|packet|chips|snack|biscuit|cookie/)) return "72";

    // Default fallback for cooked food
    return "4"; 
};

// --- LEAFLET HELPERS ---
const LocationMarker = ({ setPos, pos }: { setPos: (latlng: { lat: number, lng: number }) => void, pos: { lat: number, lng: number } | null }) => {
  useMapEvents({ click(e) { setPos(e.latlng); } });
  return pos ? <Marker position={pos} /> : null;
};

const ChangeView = ({ center }: { center: { lat: number, lng: number } }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, 15); }, [center, map]);
  return null;
};

const Donor = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  
  // UI & FORM STATE
  const [mode, setMode] = useState<"scan" | "manual">("scan");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Initialize form
  const [form, setForm] = useState({ food: "", qty: "", expiry: "", window: "30" });

  // CAMERA & AI STATE
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanning, setScanning] = useState(false);
  
  // LOCATION STATE
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 17.3850, lng: 78.4867 }); 
  const [showLocModal, setShowLocModal] = useState(false);
  const [pickerMode, setPickerMode] = useState(false);
  const [locStatus, setLocStatus] = useState("Ready to Donate");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // DATA STATE
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchDonations();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => { setLocStatus("Location Secured"); },
            () => { setLocStatus("Location Denied"); toast.error("Location access denied."); }
        );
    }
  }, [user]);

  // --- 1. CAMERA ENGINE ---
  const startCamera = async () => {
      try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          setStream(mediaStream);
          if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
          toast.error("Camera access denied. Switch to manual mode.");
      }
  };

  const stopCamera = () => {
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
      }
  };

  useEffect(() => {
      if (mode === "scan") startCamera();
      else stopCamera();
      return () => stopCamera(); 
  }, [mode]);

  // --- 2. AI CAMERA SCAN ---
  const handleCapture = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg", 0.8);

      setScanning(true);
      toast.info("AI Vision analyzing food...", { duration: 4000 });

      try {
          const res = await fetch(`${API_URL}/api/analyze-food`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: base64Image })
          });

          if (!res.ok) throw new Error("AI Backend Failed");

          const aiData = await res.json();
          
          // Force prediction if API returns null/empty for expiry
          const foodName = aiData.food || "Unknown Food";
          const finalExpiry = aiData.expiry 
                ? aiData.expiry.toString().replace(/[^0-9]/g, '') 
                : predictExpiry(foodName);

          setForm({ 
              food: foodName, 
              qty: aiData.qty ? aiData.qty.toString().replace(/[^0-9.]/g, '') : "", 
              expiry: finalExpiry, 
              window: "30" 
          });
          toast.success("Analysis Complete! Details auto-filled.");

      } catch (error) {
          console.error(error);
          toast.error("Network Error. Using fallback.");
          setForm({ food: "Detected Food Item", qty: "2.0", expiry: "4", window: "30" });
      } finally {
          setScanning(false);
          setMode("manual"); 
      }
  };

  // --- 3. VOICE TO TEXT (FIXED) ---
  const handleVoiceCommand = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);
    toast.info("Listening... Say e.g., '5kg Rice'");

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      toast.success("Processing Voice...");
      
      try {
        // Try Backend First
        const res = await fetch(`${API_URL}/api/analyze-voice`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ text: transcript })
        });
        
        if (res.ok) {
            const data = await res.json();
            
            const foodName = data.food || form.food;
            // FIX: Don't fallback to 'form.expiry'. Always recalculate if data.expiry is missing.
            const finalExpiry = data.expiry 
                ? data.expiry.toString().replace(/[^0-9]/g, '') 
                : predictExpiry(foodName);

            setForm({
                food: foodName,
                qty: data.qty ? data.qty.toString().replace(/[^0-9.]/g, '') : form.qty,
                expiry: finalExpiry,
                window: data.window ? data.window.toString().replace(/[^0-9]/g, '') : form.window
            });
            toast.success("Voice processed successfully!");
        } else {
            throw new Error("Backend unavailable");
        }
      } catch (err) {
        console.warn("Using local parser");
        parseVoiceLocally(transcript);
      } finally {
        setIsListening(false);
      }
    };

    recognition.onerror = () => { toast.error("Voice Error. Try again."); setIsListening(false); };
    recognition.onend = () => { setIsListening(false); };
  };

  // --- 4. SMART LOCAL PARSER ---
  const parseVoiceLocally = (text: string) => {
      let food = text;
      let qty = "";
      let expiry = "";

      // Extract Quantity
      const qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:kg|g|liters|packets|servings)/i);
      if (qtyMatch) {
          qty = qtyMatch[1];
          food = food.replace(qtyMatch[0], "");
      } else {
          const startNum = text.match(/^(\d+(?:\.\d+)?)/);
          if (startNum) { qty = startNum[1]; food = food.replace(startNum[0], ""); }
      }

      // Extract Expiry
      const expiryMatch = text.match(/(\d+)\s*(?:hour|hr|day)/i);
      if (expiryMatch) {
          expiry = expiryMatch[1];
          food = food.replace(expiryMatch[0], "");
      }

      // Clean Food Name
      const removeWords = ["i", "have", "want", "to", "donate", "some", "my", "of", "is", "expired", "expiry", "in", "for", "please", "take", "available", "a", "an", "the"];
      const regex = new RegExp(`\\b(${removeWords.join("|")})\\b`, "gi");
      food = food.replace(regex, " ").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
      if(food) food = food.charAt(0).toUpperCase() + food.slice(1);

      // Force Prediction if expiry missing
      if (!expiry && food) {
          expiry = predictExpiry(food);
          toast.info(`Auto-predicted Expiry: ${expiry} hours`);
      }

      setForm({
          food: food || "Unknown Item",
          qty: qty || "",
          expiry: expiry || "4",
          window: form.window
      });
  };

  // --- GENERAL FUNCTIONS ---
  const fetchDonations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/donations?userId=${user?.id}`);
      if(res.ok) setHistory(await res.json());
    } catch (err) { console.error("History Error"); } 
    finally { setLoadingHistory(false); }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data && data.length > 0) {
            const newLoc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            setMapCenter(newLoc);
            setLocation(newLoc);
            toast.success(`Found: ${data[0].display_name.split(",")[0]}`);
        } else { toast.error("Location not found"); }
    } catch (error) { toast.error("Search failed"); } 
    finally { setIsSearching(false); }
  };

  const initiateDonation = () => {
    if (!form.food || !form.qty) return toast.error("Please fill in food details first");
    setShowLocModal(true);
    setPickerMode(false);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    toast.info("Fetching GPS...");
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setLocation(loc);
            submitDonation(loc);
        },
        () => {
            toast.error("GPS Denied. Please pick on map.");
            setPickerMode(true);
        }
    );
  };

  const submitDonation = async (finalLoc: { lat: number, lng: number }) => {
    setShowLocModal(false);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodType: form.food,
          quantity: form.qty,
          expiry: form.expiry,
          pickupTime: form.window,
          donorId: user?.id,      
          donorName: user?.name || user?.organization,
          location: finalLoc 
        }),
      });

      if (response.ok) {
        toast.success("Donation Broadcasted to Network!");
        fetchDonations(); 
        setForm({ food: "", qty: "", expiry: "", window: "30" });
        setLocStatus("Donation Sent");
        setMode("scan"); 
      }
    } catch (error) { toast.error("Connection Failed"); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 max-w-2xl mx-auto relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Donate <span className="gradient-text">Food</span></h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className={`w-3 h-3 ${location ? "text-emerald-400" : "text-yellow-400"}`} />
            {locStatus}
        </div>
      </div>

      {/* --- LOCATION MODAL --- */}
      <AnimatePresence>
        {showLocModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-[#0B0F1A] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-primary" /> Select Pickup Location
              </h2>

              {!pickerMode ? (
                <div className="space-y-3">
                  <button onClick={useCurrentLocation} className="w-full py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 font-bold">
                    <Navigation className="w-5 h-5" /> Use My Current Location
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
                    <input type="text" placeholder="Search location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
                    <button onClick={handleSearch} disabled={isSearching} className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
                        {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="h-64 rounded-xl overflow-hidden border border-white/10 relative">
                    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <ChangeView center={mapCenter} />
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                      <LocationMarker setPos={setLocation} pos={location} />
                    </MapContainer>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setPickerMode(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5">Back</button>
                    <button onClick={() => location && submitDonation(location)} className="flex-1 py-3 rounded-lg bg-primary text-black font-bold disabled:opacity-50 hover:bg-primary/90" disabled={!location}>Confirm Location</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOGGLE TABS --- */}
      <div className="glass-card p-1 flex mb-8 max-w-xs">
        {(["scan", "manual"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${mode === m ? "bg-primary text-black" : "text-muted-foreground"}`}>
            {m === "scan" ? <Camera className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {m === "scan" ? "AI Vision" : "Manual Entry"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* --- CAMERA SCAN UI --- */}
        {mode === "scan" && (
          <motion.div key="scan" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass-card p-6 mb-8">
            <div className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden mb-6 flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                {scanning && (
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                        <span className="text-primary font-bold text-lg animate-pulse tracking-wider">Analyzing Food Details...</span>
                    </div>
                )}
            </div>
            <button onClick={handleCapture} disabled={scanning} className="btn-glow-solid w-full py-4 text-lg font-bold flex justify-center gap-2">
                <Camera className="w-5 h-5" /> {scanning ? "Processing Image..." : "Capture & Analyze"}
            </button>
          </motion.div>
        )}

        {/* --- MANUAL / VOICE UI --- */}
        {mode === "manual" && (
          <motion.div key="manual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" /> Verify Details
              </h3>
              
              <button 
                onClick={handleVoiceCommand}
                disabled={isListening}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  isListening 
                    ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" 
                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {isListening ? "Listening..." : "Voice Autofill"}
              </button>
            </div>

            {[
              { label: "Food Type", key: "food", placeholder: "e.g., Rice, Bread", type: "text" },
              { label: "Quantity (kg)", key: "qty", placeholder: "e.g., 5.2", type: "number" },
              { label: "Expiry (hours)", key: "expiry", placeholder: "e.g., 4", type: "number" },
              { label: "Pickup Window (mins)", key: "window", placeholder: "e.g., 30", type: "number" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                <input 
                  type={field.type} 
                  value={form[field.key as keyof typeof form]} 
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} 
                  placeholder={field.placeholder} 
                  min="0"
                  step={field.key === "qty" ? "0.1" : "1"}
                  className="w-full bg-muted/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary transition-colors outline-none" 
                />
              </div>
            ))}

            <button onClick={initiateDonation} disabled={isSubmitting} className="btn-glow-solid w-full mt-4 py-4 text-lg font-bold flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
              Confirm & Pin Location
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- REWARDS CARD --- */}
      <div className="w-full mb-8">
        <Link to="/rewards">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-1 shadow-xl transition-all hover:shadow-emerald-500/40 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
            <div className="relative flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4">
                <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Sprout size={24} fill="currentColor" className="opacity-80" />
                </div>
                <div className="text-left">
                    <h3 className="text-lg font-bold text-white">My Impact Garden</h3>
                    <p className="text-xs font-medium text-emerald-50 opacity-90">Grow your forest with every donation.</p>
                </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-emerald-700">
                View Progress <ArrowRight size={16} />
                </div>
            </div>
            </div>
        </Link>
      </div>

      {/* --- HISTORY LIST --- */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg mb-4">Donation History</h3>
        {loadingHistory ? <p className="text-muted-foreground text-center">Loading...</p> : 
          history.length === 0 ? <p className="text-muted-foreground text-center p-4 glass-card">No donations yet.</p> :
          history.map((item) => {
             const statusKey = item.status || 'pending';
             const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
             const StatusIcon = cfg.icon;
             return (
                <div key={item._id} className={`glass-card p-4 border-l-2 ${cfg.border} flex justify-between items-center`}>
                    <div>
                        <p className="font-bold">{item.foodType}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity}kg • {item.expiry}h</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className={`flex items-center gap-1 text-xs justify-end ${cfg.color}`}>
                            <StatusIcon className="w-3 h-3" /> {cfg.label}
                        </div>
                        {(item.status === "assigned" || item.status === "transit") && (
                            <button 
                                onClick={() => navigate(`/agent/${item._id}`)}
                                className="mt-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                                <Truck className="w-3 h-3" /> Track
                            </button>
                        )}
                    </div>
                </div>
             )
          })
        }
      </div>
    </div>
  );
};

export default Donor;
