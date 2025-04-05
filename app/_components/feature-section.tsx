import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import React from "react";

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const features: Feature[] = [
  {
    title: "Smart Learning",
    desc: "Adaptive AI that personalizes your learning journey.",
    icon: <Sparkles className="w-8 h-8 text-white" />,
    color: "bg-pink-600",
  },
  {
    title: "Instant Insights",
    desc: "Track progress and receive real-time feedback.",
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: "bg-blue-600",
  },
  {
    title: "Next-Gen Tech",
    desc: "Harness the power of next-gen AI tools.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    color: "bg-purple-600",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.h3
          className="text-4xl font-bold text-center text-gray-900 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`p-6 rounded-xl text-white transition-colors shadow-lg ${feature.color}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div>{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
