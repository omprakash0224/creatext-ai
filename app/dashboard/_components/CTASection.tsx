"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";

export default function CtaSection() {

    const router = useRouter();
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-sky-500 to-violet-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Content Strategy?</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of creators and marketers who are saving time and creating better content with CreatextAI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="rounded-full bg-white text-violet-600 hover:bg-gray-100 px-8 py-6 text-lg w-full sm:w-auto"
            onClick={() => router.push('/dashboard')}
            >
              Start Creating for Free <ArrowRight className="ml-1.5 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
