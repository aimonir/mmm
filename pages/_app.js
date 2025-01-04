import Layout from '../components/Layout';
import '../styles/globals.css'; // Import global styles
import '../firebase/config'; // Import Firebase initialization

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
