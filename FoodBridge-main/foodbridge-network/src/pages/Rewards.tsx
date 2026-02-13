import Navbar from "@/components/Navbar";
import NourishGarden from "@/components/rewards/NourishGarden";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Spacer for Navbar */}
      <div className="h-20" /> 
      
      <div className="container mx-auto max-w-6xl py-10">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Your Impact Garden
            </h1>
            <p className="text-gray-600 mt-2">
                Grow your forest by saving food. Harvest wood. Redeem real rewards.
            </p>
        </div>

        <NourishGarden />
      </div>
    </div>
  );
}