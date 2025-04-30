import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import FeaturedRooms from '../components/home/FeaturedRooms';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  useEffect(() => {
    // Set document title
    document.title = 'Hôtel Horizon - Luxe et Confort';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <FeaturedRooms />
      <Testimonials />
    </div>
  );
};

export default HomePage;