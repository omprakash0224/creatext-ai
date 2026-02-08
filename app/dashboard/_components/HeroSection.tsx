"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();

  return (
    <section className="pt-32 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Turn Ideas into{" "}
              <span className="bg-gradient-to-r from-sky-500 to-violet-600 text-transparent bg-clip-text">
                Scroll-Stopping Content
              </span>{" "}
              with AI
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Generate engaging social media posts, marketing templates, and captivating content in seconds with our
              AI-powered platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="rounded-full bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => router.push('/dashboard')}
              >
                Try for Free
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-sky-100 to-violet-100 rounded-2xl p-2 shadow-xl">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-sky-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-violet-500/20 rounded-full blur-xl"></div>
              <img
                src="/dashboard.png?height=600&width=800"
                alt="CreatextAI Platform Preview"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-sky-300/30 to-violet-300/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
