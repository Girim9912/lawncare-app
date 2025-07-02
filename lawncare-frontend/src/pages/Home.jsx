// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="hero-section mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Professional Lawn Care Services</h1>
          <p className="text-lg mb-6">Beautiful lawns start with proper care</p>
          <Link 
            to="/quote" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Get a Free Quote
          </Link>
        </section>
        
        {/* Other sections */}
      </main>
      <Footer />
    </div>
  );
}   