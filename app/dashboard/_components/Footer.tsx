import Link from "next/link"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, XIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="bg-gradient-to-r from-sky-500 to-violet-600 text-transparent bg-clip-text font-bold text-2xl">
                CreatextAI
              </span>
            </Link>
            <p className="text-gray-600 mb-4">AI-powered content creation for social media and marketing.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                <XIcon className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Careers
                </Link>
              </li> */}
              {/* <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Contact
                </Link>
              </li> */}
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CreatextAI. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-600 hover:text-violet-600 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
