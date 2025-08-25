import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import Vision from '../components/home/Vision';
import Focus from '../components/home/Focus';   
import Footer from '../components/general/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>PortoFlow - Shape Your Future</title>
        <meta name="description" content="Career-Focused and Skill-Driven Education" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main>
        <Hero />
        <Partners />
        <Vision />
        <Focus />
      </main>

      <Footer />
    </div>
  );
}