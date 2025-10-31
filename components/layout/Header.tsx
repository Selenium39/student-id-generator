"use client"

import { FileText, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Website Logo and Name */}
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-white" />
          <h1 className="text-xl font-bold text-white md:text-2xl">
            <span className="font-extrabold tracking-tight">Student ID Generator</span>
          </h1>
        </div>

        {/* Right Side Links */}
        <div className="flex items-center gap-2">
          {/* GitHub Link */}
          <Link
            href="https://github.com/Selenium39/student-id-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 text-white hover:bg-white/20 rounded-md transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </Link>

          {/* Promotional Link */}
          <Link
            href="https://chat-tempmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-white/20 rounded-md transition-colors duration-200 whitespace-nowrap"
          >
            <span className="hidden sm:inline">AI-Powered Temporary Email Service</span>
            <span className="sm:hidden">TempMail</span>
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </header>
  )
}
