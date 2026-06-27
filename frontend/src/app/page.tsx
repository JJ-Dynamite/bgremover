import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>One-click background removal</title>
        <meta name="description" content="One-click background removal" />
      </Head>
      <main className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">One-click background removal</h1>
          <p className="text-gray-400 text-lg">
            Built with Rust (Axum) + Next.js
          </p>
          <div className="mt-8 p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li>✓ High-performance Rust backend</li>
              <li>✓ Modern Next.js frontend</li>
              <li>✓ Type-safe API contracts</li>
              <li>✓ Production-ready CI/CD</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
