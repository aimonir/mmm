import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto flex justify-center">
        <div className="text-center">
            {/* Founder Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Founder</h3>
              <p>Monirul Islam</p>
              <p>
                <Link href="http://www.pythonhubs.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  www.pythonhubs.com
                </Link>
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {/* Add social media links here */}
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
