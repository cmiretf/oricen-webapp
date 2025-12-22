import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ServiciosPage() {
  const services = [
    {
      name: 'Origen',
      price: '€299',
      description: 'Perfecto para comenzar tu exploración vocacional',
      features: [
        'Test de aptitudes y preferencias',
        '1 sesión de orientación individual',
        'Informe personalizado',
        'Acceso a base de datos de profesiones'
      ]
    },
    {
      name: 'Brújula',
      price: '€699',
      description: 'Programa completo de orientación vocacional',
      features: [
        'Evaluaciones psicométricas avanzadas',
        '4 sesiones de coaching vocacional',
        'Plan de acción personalizado',
        'Acceso a mentores profesionales',
        'Sesión de preparación laboral'
      ],
      featured: true
    },
    {
      name: 'Atlas',
      price: '€1299',
      description: 'Experiencia premium con seguimiento continuo',
      features: [
        'Evaluación completa y análisis profundo',
        '10 sesiones de coaching personalizado',
        'Seguimiento por 6 meses',
        'Red de profesionales mentores',
        'Preparación para entrevistas de trabajo',
        'Soporte de inserción laboral'
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Nuestros Servicios
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Tres planes diseñados para diferentes necesidades y objetivos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                service.featured
                  ? 'border-2 border-[#2B4C7E] shadow-xl'
                  : 'border border-gray-200 shadow'
              }`}
            >
              {service.featured && (
                <div className="bg-[#2B4C7E] text-white text-center py-2 font-semibold">
                  Más Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-4xl font-bold text-[#2B4C7E] mb-2">{service.price}</p>
                <p className="text-gray-600 mb-8">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/comprar" className="w-full block text-center btn-primary">
                  Elegir este plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
