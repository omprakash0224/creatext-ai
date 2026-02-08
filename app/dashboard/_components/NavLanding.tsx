"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useRouter } from "next/navigation";

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter();

    return (
        <header className="py-4 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-sky-500 to-violet-600 text-transparent bg-clip-text font-bold text-2xl">
                        CreatextAI
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-gray-700 hover:text-violet-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#testimonials" className="text-gray-700 hover:text-violet-600 transition-colors">
                        Testimonials
                    </Link>
                    <Link href="#pricing" className="text-gray-700 hover:text-violet-600 transition-colors">
                        Pricing
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                        <Button variant="outline" className="rounded-full border-violet-500 text-violet-600 hover:bg-violet-50"
                        onClick={() => router.push('/dashboard')}
                        >
                            Log in
                        </Button>
                        <Button className="rounded-full bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white"
                        onClick={() => router.push('/dashboard')}
                        >
                            Try for Free
                        </Button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-50">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="#features"
                            className="text-gray-700 hover:text-violet-600 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-gray-700 hover:text-violet-600 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-gray-700 hover:text-violet-600 transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <div className="flex flex-col space-y-2 pt-2">
                            <Button variant="outline" className="rounded-full border-violet-500 text-violet-600 w-full"
                            onClick={() => router.push('/dashboard')}
                            >
                                Log in
                            </Button>
                            <Button className="rounded-full bg-gradient-to-r from-sky-500 to-violet-600 text-white w-full"
                            onClick={() => router.push('/dashboard')}
                            >
                                Try for Free
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Nav
