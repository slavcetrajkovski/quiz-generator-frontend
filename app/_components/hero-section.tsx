"use client";

import { Rocket, Brain, Bot, BarChart, WandSparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] bg-white flex items-center">
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Elevate Learning with AI
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            Quizzy helps you learn smarter, faster, and deeper with AI-crafted
            quizzes and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-pink-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-800 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Get Started</span>
              </Button>
            </Link>

            <Link href="/quiz/create">
              <Button
                size="lg"
                className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>Generate Quiz</span>
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            {
              icon: <Bot className="text-pink-600" />,
              title: "AI-Powered",
              desc: "Generate quizzes in seconds",
            },
            {
              icon: <BarChart className="text-blue-600" />,
              title: "Smart Analytics",
              desc: "See what you mastered",
            },
            {
              icon: <WandSparkles className="text-pink-600" />,
              title: "Personalized",
              desc: "Questions tailored to you",
            },
            {
              icon: <Star className="text-blue-600" />,
              title: "Progress Tracking",
              desc: "Stay motivated with goals",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-5 sm:p-6 rounded-2xl shadow-xl bg-white border border-gray-100 transition-all hover:shadow-2xl flex flex-col items-start space-y-3"
            >
              <div className="w-10 h-10">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
