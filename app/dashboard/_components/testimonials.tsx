"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation";



const testimonials = [
  {
    id: 1,
    name: "Rohan",
    role: "Marketing Manager",
    company: "Mantra Innovations",
    avatar: "/review2.jpg?height=100&width=100",
    content:
      "CreatextAI has completely transformed our social media strategy. We're saving hours each week and seeing 3x more engagement!",
    stars: 5,
  },
  {
    id: 2,
    name: "Sneha",
    role: "Content Creator",
    company: "Sneha Camroll-Lifestyle vlog",
    avatar: "/review1.jpg?height=100&width=100",
    content:
      "As a solo content creator, this tool has been a game-changer. The AI understands my voice and helps me create consistent content across all platforms.",
    stars: 5,
  },
  {
    id: 3,
    name: "Piyush",
    role: "Gamer",
    company: "GamingWithPY",
    avatar: "/review3.png?height=100&width=100",
    content:
    "CreatextAI has completely changed how I engage with my YouTube audience. From catchy titles to engaging video descriptions and community posts, everything is faster and more effective!",
    stars: 4,
  },
]

export default function Testimonials() {

    const router = useRouter();
  return (
    <section className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Content Creators</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See what our users are saying about their experience with CreatextAI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-700">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-sky-50 to-violet-50 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 text-left">
                <h3 className="text-2xl font-bold">Join 1,000+ content creators today</h3>
                <p className="text-gray-600 mt-2">Start creating scroll-stopping content in minutes</p>
              </div>
              <Button className="rounded-full bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white px-8 py-6 text-lg"
              onClick={() => router.push('/dashboard')}
              >
                Try CreatextAI for Free
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
