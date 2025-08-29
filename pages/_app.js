import Layout from '../components/Layout';
import '../styles/globals.css'; // Import global styles
import '../firebase/config'; // Import Firebase initialization
<<<<<<< HEAD

export default function App({ Component, pageProps }) {
=======
import withAuth from '../components/withAuth';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter();

  const isAdminRoute = router.pathname.startsWith('/AdminPanel') || router.pathname.startsWith('/Feedbacks') || router.pathname.startsWith('/admin/suggestions');

  if (isAdminRoute) {
    const AuthenticatedComponent = withAuth(Component);
    return (
      <Layout>
        <AuthenticatedComponent {...pageProps} />
      </Layout>
    );
  }

>>>>>>> dev
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
<<<<<<< HEAD
=======

export default App;
>>>>>>> dev
