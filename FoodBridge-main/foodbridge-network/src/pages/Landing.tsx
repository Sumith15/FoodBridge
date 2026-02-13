import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Truck, Heart, Zap, ShieldCheck, Brain } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SceneWrapper from "@/components/three/SceneWrapper";
import Globe from "@/components/three/Globe";
import FloatingShapes from "@/components/three/FloatingShapes";
import Particles from "@/components/three/Particles";

const stats = [
  { label: "Meals Saved", value: 1240, icon: Utensils },
  { label: "CO₂ Prevented", value: 450, suffix: "kg", icon: ShieldCheck },
  { label: "Deliveries", value: 312, icon: Truck },
  { label: "Avg Pickup", value: 18, suffix: " mins", icon: Zap },
];

const features = [
  {
    icon: Brain,
    title: "AI Spoilage Prediction",
    description: "Machine learning predicts food expiry windows to minimize waste and maximize impact.",
  },
  {
    icon: Truck,
    title: "Smart Route Optimization",
    description: "AI-powered logistics ensure the fastest, most efficient delivery routes for volunteers.",
  },
  {
    icon: Heart,
    title: "Impact Tracking",
    description: "Real-time dashboards measuring meals saved, carbon reduced, and lives impacted.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <SceneWrapper>
          <Globe />
          <FloatingShapes />
          <Particles />
        </SceneWrapper>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Bridging the Gap Between{" "}
            <span className="gradient-text">Surplus</span> and{" "}
            <span className="glow-text-primary">Hunger</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            AI-powered logistics turning surplus into survival. Every meal counts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/donor">
              <button className="btn-glow-solid flex items-center gap-2 text-lg animate-pulse-glow">
                <Utensils className="w-5 h-5" />
                Donate Food
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/volunteer">
              <button className="btn-glow-secondary flex items-center gap-2 text-lg">
                <Truck className="w-5 h-5" />
                Volunteer
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="section-padding max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="stat-card"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-display font-bold glow-text-primary">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-12"
        >
          Powered by <span className="gradient-text">Intelligence</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card-hover p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© 2026 FoodBridge — Bridging Surplus to Survival</p>
      </footer>
    </div>
  );
};

export default Landing;
