import React from 'react';
import Card from '../common/Card';

const TestimonialCard = ({ name, business, avatar, rating, content, delay = 0 }) => {
  return (
    <Card className="p-8" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-full ${avatar} flex items-center justify-center text-white font-bold`}>
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-bold text-purple-500">{name}</p>
          <p className="text-sm text-gray-600">{business}</p>
          <div className="flex mt-1 text-yellow-400">
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 !== 0 && '☆'}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic relative pl-6 before:content-[''] before:absolute before:left-0 before:text-4xl before:text-gray-200 before:top-0 before:leading-none">
        {content}
      </p>
    </Card>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María L.",
      business: "Boutique de Moda",
      avatar: "bg-gradient-to-r from-purple-500 to-pink-500",
      rating: 5,
      content: "GENIO revolucionó mi pequeña boutique. En un día tenía mi tienda online funcionando y las ventas aumentaron un 40% en el primer mes. ¡Increíble!"
    },
    {
      name: "Carlos M.",
      business: "Restaurante Familiar",
      avatar: "bg-gradient-to-r from-pink-500 to-red-400",
      rating: 5,
      content: "Como restaurante pequeño, no podíamos pagar un diseñador web. GENIO nos dio una página profesional que muestra nuestro menú y reservas online."
    },
    {
      name: "Ana R.",
      business: "Consultora Independiente",
      avatar: "bg-gradient-to-r from-teal-500 to-blue-500",
      rating: 4.5,
      content: "En 2 horas tenía mi sitio de consultoría listo con blog integrado. Ahora mis clientes potenciales me encuentran fácilmente."
    }
  ];

  return (
    <section id="testimonios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">
            CONFÍAN EN NOSOTROS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-4 mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            PYMEs que han transformado su presencia online con GENIO
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              {...testimonial}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;