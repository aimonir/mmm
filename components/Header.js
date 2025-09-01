import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          <h1 className="text-xl md:text-3xl font-bold">সহজপাঠ</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/ExamSuggestions">Exam Suggestions</Link>
          <Link href="/Availability">Availability</Link>
          <Link href="/RequestForm">Request Suggestions</Link>
          <Link href="/FeedbackForm">Feedback</Link>
          <Link href="/Contact">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-700">
          <Link href="/" className="block p-4 text-white hover:bg-blue-800">Home</Link>
          <Link href="/ExamSuggestions" className="block p-4 text-white hover:bg-blue-800">Exam Suggestions</Link>
          <Link href="/Availability" className="block p-4 text-white hover:bg-blue-800">Availability</Link>
          <Link href="/RequestForm" className="block p-4 text-white hover:bg-blue-800">Request Suggestions</Link>
          <Link href="/FeedbackForm" className="block p-4 text-white hover:bg-blue-800">Feedback</Link>
          <Link href="/Contact" className="block p-4 text-white hover:bg-blue-800">Contact</Link>
        </nav>
      )}
    </header>
  );
}
