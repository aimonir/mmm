import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Banner() {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Banner Section */}
      <main className="relative bg-blue-800 text-white text-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/banner-bg.jpg)' }}
          aria-hidden="true"
        ></div>

        {/* Banner content */}
        <div className="relative py-24 px-6 lg:px-12">
          <h1 className="text-5xl font-extrabold tracking-wide mb-4">
            বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়
          </h1>
          <h2 className="text-3xl font-semibold mb-4">BANGLADESH OPEN UNIVERSITY</h2>

          {/* Highlight Section */}
          <div className="text-lg font-medium bg-blue-700 inline-block px-4 py-2 rounded-lg shadow mb-6">
            পরীক্ষার Suggessions | সহজে প্রশ্নের উত্তর | খবর ও বিজ্ঞপ্তি
          </div>

          {/* Mission Statement */}
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Empowering students through accessible and quality education. Join us to achieve your academic goals.
          </p>

          {/* Mission and Vision in Bangla */}
          <div className="mt-6 text-lg max-w-3xl mx-auto text-blue-100 italic space-y-2">
            <p>আমাদের লক্ষ্য: পরীক্ষা প্রস্তুতির পরামর্শ এবং প্রশ্নের উত্তর প্রদান।</p>
            <p>বিশেষ করে তাদের জন্য যারা কর্মজীবী বা বিভিন্ন কারণে শিক্ষার পথে পিছিয়ে পড়েছে।</p>
            <p>
              তারা আমাদের <span className="font-semibold underline">&quot;পড়ন্ত ফুল&quot;</span>। 
              এই বিশ্ববিদ্যালয়ে ভর্তি হয়ে তারা তাদের স্বপ্ন পুনর্জাগরণ করছে।
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/ExamSuggestions" legacyBehavior>
              <a
                className="bg-white text-blue-800 px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-gray-200"
                aria-label="Get Suggestions"
              >
                Get Suggestions
              </a>
            </Link>
            <Link href="/apply" legacyBehavior>
              <a
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-blue-700"
                aria-label="Send Request"
              >
                অনুরোধ পাঠান
              </a>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
