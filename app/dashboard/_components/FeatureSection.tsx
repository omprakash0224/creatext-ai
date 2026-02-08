"use client"

import { motion } from "framer-motion"
import { Instagram, Twitter, Facebook, Linkedin, Palette, Wand2, BarChart3, Layers, Youtube, XIcon } from "lucide-react"

const features = [
  {
    icon: <Layers className="w-10 h-10 text-sky-500" />,
    title: "Platform-Specific Content",
    description: "Automatically optimize your content for different social media platforms with AI-powered formatting.",
    color: "from-sky-500 to-sky-300",
  },
  {
    icon: <Wand2 className="w-10 h-10 text-violet-500" />,
    title: "Smart AI Templates",
    description: "Choose from numbers of templates designed to boost engagement and conversions.",
    color: "from-violet-500 to-violet-300",
  },
  {
    icon: <Palette className="w-10 h-10 text-pink-500" />,
    title: "Customization Tools",
    description: "Personalize every aspect of your content to match your brand's unique voice and style.",
    color: "from-pink-500 to-pink-300",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-green-500" />,
    title: "Marketing Templates Library",
    description: "Access a rich collection of AI-ready templates for ads, promotions, campaigns, and more.",
    color: "from-green-500 to-green-300",
  },
]

const platforms = [
  { icon: <Instagram className="w-6 h-6" />, name: "Instagram" },
  { icon: <XIcon className="w-6 h-6" />, name: "Twitter" },
  { icon: <Youtube className="w-6 h-6" />, name: "Youtube" },
  { icon: <Linkedin className="w-6 h-6" />, name: "LinkedIn" },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Create Content for Any Platform</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI understands the unique requirements of each social media platform to help you create the perfect
            content.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm"
              >
                {platform.icon}
                <span>{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
