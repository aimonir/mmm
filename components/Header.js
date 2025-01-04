import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          <h1 className="text-xl md:text-3xl font-bold">সহজপাঠ</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/ExamSuggestions">Exam Suggestions</Link>
          <Link href="/Availability">Availability</Link>
          <Link href="/RequestForm">Request Suggestions</Link>
          <Link href="/FeedbackForm">Feedback</Link>
          
          <Link href="/Contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
