import Layout from '../components/Layout';
import logo from '../assets/logo.avif';

export default function ContactoPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Contacto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ponte en contacto</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary">
                Enviar mensaje
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                <p className="text-gray-600">+34 633 580 559</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@oricen.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                <p className="text-gray-600">
                  Camino Valdenigriales S/N<br/>
                  28223, Pozuelo de Alarcón<br/>
                  Madrid (ESIC University)
                </p>
              </div>

              <div className="pt-8 border-t">
                <img src={logo} alt="Oricen Logo" className="h-20 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
