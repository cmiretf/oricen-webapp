import { useState } from 'react';
import Layout from '../components/Layout';
import logo from '../assets/logo.avif';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <img src={logo} alt="Oricen Logo" className="h-20 w-auto mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600 mt-2">Accede a tu área personal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <button type="button" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <text x="5" y="18" fontSize="20" fill="currentColor">G</text>
                  </svg>
                  Continuar con Google
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Recuérdame
                </label>
                <a href="#" className="text-sm text-[#2B4C7E] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-lg font-medium">
                Iniciar sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{' '}
                <a href="#" className="text-[#2B4C7E] font-medium hover:underline">
                  Regístrate aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
