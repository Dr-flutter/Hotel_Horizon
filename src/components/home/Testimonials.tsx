import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    location: 'Yaounde, Cameroun',
    rating: 5,
    comment: "Notre séjour à l'Hôtel Horizon a été exceptionnel! La vue depuis notre chambre était à couper le souffle, et le service était impeccable. Je recommande vivement!",
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: 2,
    name: 'Jean Dupont',
    location: 'Bafoussam, Cameroun',
    rating: 5,
    comment: "Un hôtel de luxe avec un personnel attentionné. Le restaurant gastronomique vaut vraiment le détour. Nous reviendrons sans hésiter.",
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 3,
    name: 'Marie Lefevre',
    location: 'Douala, Cameroun',
    rating: 4,
    comment: "Chambre spacieuse et confortable, spa relaxant et petit-déjeuner délicieux. Seul petit bémol, le parking un peu étroit.",
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: 4,
    name: 'Pierre Moreau',
    location: 'Kribi, Cameroun',
    rating: 5,
    comment: "La visite virtuelle 360° sur le site m'a convaincu de réserver, et je n'ai pas été déçu! L'hôtel est aussi beau en réalité que sur les photos.",
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  }
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Handle responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const nextSlide = () => {
    setActiveIndex((prev) => 
      prev + visibleCount >= testimonials.length 
        ? 0 
        : prev + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev === 0 
        ? Math.max(0, testimonials.length - visibleCount) 
        : prev - 1
    );
  };
  
  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (activeIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <section className="py-16 md:py-24 bg-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-semibold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('home.testimonials.title')}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-secondary-600 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        
        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className={`w-full md:w-1/2 lg:w-1/3 px-4 flex-shrink-0`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-primary-700 rounded-lg p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-300">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex text-secondary-600 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-200 italic flex-grow">{testimonial.comment}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 w-10 h-10 bg-white text-primary-800 rounded-full flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 w-10 h-10 bg-white text-primary-800 rounded-full flex items-center justify-center shadow-md focus:outline-none hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;