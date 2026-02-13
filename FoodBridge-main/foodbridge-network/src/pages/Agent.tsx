import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Loader2, ArrowLeft } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet Icons
const DefaultIcon = L.icon({
  iconUrl: icon, shadowUrl: iconShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- AUTO-CENTER MAP WHEN DRIVER MOVES ---
const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const Agent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<any>(null);

  // Fetch location every 3 seconds
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/donation/${id}`);
        const data = await res.json();
        setDonation(data);
      } catch (err) { console.error(err); }
    };
    
    fetchLocation();
    const interval = setInterval(fetchLocation, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!donation) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
  }

  // Safely extract Agent Location
  const agentLoc = donation.agentLocation ? 
    [donation.agentLocation.lat, donation.agentLocation.lng] as [number, number] : null;
  
  // --- DYNAMIC TARGET LOGIC ---
  // If assigned -> Go to Donor. If transit -> Go to Receiver.
  let targetLoc: [number, number] | null = null;
  let targetLabel = "Destination";

  if (donation.status === "assigned" && donation.location) {
      targetLoc = [donation.location.lat, donation.location.lng] as [number, number];
      targetLabel = "Pickup Location (Donor)";
  } else if (donation.status === "transit" && donation.receiver?.location) {
      targetLoc = [donation.receiver.location.lat, donation.receiver.location.lng] as [number, number];
      targetLabel = "Drop-off Location (Receiver)";
  } else if (donation.location) {
      targetLoc = [donation.location.lat, donation.location.lng] as [number, number];
      targetLabel = "Location";
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      
      <div className="glass-card p-6 mb-6 flex justify-between items-center border-l-4 border-primary">
        <div>
            <h1 className="text-2xl font-bold">Volunteer <span className="gradient-text">Live Tracker</span></h1>
            <p className="text-muted-foreground mt-1">Update: <span className="text-white font-medium">{donation.agent?.name || "Waiting for agent..."}</span></p>
        </div>
        
        {/* SAFEGUARD: Used optional chaining (?.) on status */}
        <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold capitalize">
            {donation.status?.replace("_", " ") || "Loading"}
        </div>
      </div>

      <div className="h-[500px] rounded-xl overflow-hidden glass-card p-1 border border-white/10 relative">
        <MapContainer center={agentLoc || targetLoc || [17.3850, 78.4867]} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            
            {/* Smoothly pans the camera when the agent's GPS coordinates change */}
            {agentLoc && <RecenterMap lat={agentLoc[0]} lng={agentLoc[1]} />}

            {/* Target Marker (Donor or Receiver) */}
            {targetLoc && (
                <Marker position={targetLoc}>
                    <Popup className="text-black font-bold">{targetLabel}</Popup>
                </Marker>
            )}
            
            {/* Agent Live Marker */}
            {agentLoc && (
                <Marker position={agentLoc}>
                    <Popup className="font-bold text-black">🚚 Volunteer is here!</Popup>
                </Marker>
            )}

            {/* Connecting Line */}
            {agentLoc && targetLoc && (
                <Polyline positions={[agentLoc, targetLoc]} pathOptions={{ color: "#00FFB2", weight: 4, dashArray: "10,10" }} />
            )}
        </MapContainer>

        {/* Floating status overlay */}
        {!agentLoc && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-xs text-yellow-400 flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Waiting for volunteer's GPS signal...
            </div>
        )}
      </div>
    </div>
  );
};

export default Agent;