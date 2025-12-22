import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ComprarPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Selecciona tu plan
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan seleccionado: Brújula</h2>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Orientación Vocacional Profesional</span>
              <span className="text-2xl font-bold text-[#2B4C7E]">€699</span>
            </div>
            <p className="text-gray-600 text-sm">Programa completo con 4 sesiones de coaching y acceso a mentores</p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">¿Qué incluye?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Evaluaciones psicométricas avanzadas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">4 sesiones de coaching vocacional</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Plan de acción personalizado</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Acceso a mentores profesionales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Sesión de preparación laboral</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <button className="w-full btn-primary text-lg py-4">
              Continuar con el pago
            </button>
            <Link to="/servicios" className="block w-full text-center btn-secondary">
              Ver otros planes
            </Link>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p className="mb-2">¿Tienes dudas? <Link to="/contacto" className="text-[#2B4C7E] hover:underline">Contacta con nosotros</Link></p>
        </div>
      </div>
    </Layout>
  );
}
