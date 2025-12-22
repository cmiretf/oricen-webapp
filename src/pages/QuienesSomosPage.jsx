import Layout from '../components/Layout';

export default function QuienesSomosPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Quiénes Somos
        </h1>

        <div className="prose prose-lg max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Filosofía</h2>
          <p className="text-gray-600 mb-6">
            En Oricen creemos que cada persona tiene un potencial único. Nuestro objetivo es ayudarte a descubrirlo, desarrollarlo y convertirlo en una carrera satisfactoria.
          </p>
          <p className="text-gray-600 mb-6">
            Somos una organización dedicada a la orientación vocacional profesional, trabajando con estudiantes, centros educativos y profesionales que buscan redefinir su futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#2B4C7E] mb-4">Nuestra Misión</h3>
            <p className="text-gray-700">
              Proporcionar orientación vocacional de calidad que empodere a las personas a tomar decisiones informadas sobre su futuro profesional.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#2B4C7E] mb-4">Nuestra Visión</h3>
            <p className="text-gray-700">
              Ser el referente en orientación vocacional en España, transformando vidas a través de la guía experta y el desarrollo del potencial humano.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-12 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#2B4C7E] mb-2">Excelencia</h4>
              <p className="text-gray-600">Ofrecemos los mejores servicios con estándares de calidad internacional</p>
            </div>
            <div>
              <h4 className="font-bold text-[#2B4C7E] mb-2">Integridad</h4>
              <p className="text-gray-600">Trabajamos con honestidad y ética en todas nuestras acciones</p>
            </div>
            <div>
              <h4 className="font-bold text-[#2B4C7E] mb-2">Compromiso</h4>
              <p className="text-gray-600">Nos dedicamos completamente al éxito y bienestar de nuestros clientes</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
