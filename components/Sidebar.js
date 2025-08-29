import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/AdminPanel" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Requests</a>
            </Link>
          </li>
          <li>
            <Link href="/Feedbacks" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Feedbacks</a>
            </Link>
          </li>
          <li>
<<<<<<< HEAD
            <Link href="/" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Logout</a>
=======
            <Link href="/admin/suggestions" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Suggestions</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/programs" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Programs</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/subjects" legacyBehavior>
              <a className="block text-lg hover:text-gray-200">Subjects</a>
>>>>>>> dev
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
