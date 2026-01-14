'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleResetDemo = async () => {
    setResetLoading(true);
    setResetMessage(null);
    try {
      const res = await fetch('/api/setup-demo');
      const data = await res.json();
      
      if (data.success) {
        setResetMessage({ type: 'success', text: 'Usuario demo restablecido correctamente. Intenta iniciar sesión.' });
        // Rellenar credenciales automáticamente
        setEmail('demo@smartrem.solutions');
        setPassword('demo123');
      } else {
        setResetMessage({ type: 'error', text: 'Error al restablecer: ' + (data.error || 'Error desconocido') });
      }
    } catch (e) {
      setResetMessage({ type: 'error', text: 'Error de conexión al intentar restablecer.' });
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o contraseña incorrectos');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard de Sostenibilidad
          </h1>
          <p className="text-gray-600 mt-2">By Smart REM Solutions</p>
        </div>

        {/* Formulario de Login */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {resetMessage && (
            <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${
              resetMessage.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                resetMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`} />
              <p className={`text-sm ${
                resetMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>{resetMessage.text}</p>
            </div>
          )}

          {/* Credenciales Demo */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Credenciales de Demo:
            </p>
            <p className="text-sm text-blue-800">
              Email: <span className="font-mono">demo@smartrem.solutions</span>
            </p>
            <p className="text-sm text-blue-800 mb-3">
              Contraseña: <span className="font-mono">demo123</span>
            </p>
            <button
              onClick={handleResetDemo}
              disabled={resetLoading}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded-md transition-colors border border-blue-200 font-medium"
            >
              {resetLoading ? 'Restableciendo...' : '🔄 Restablecer Usuario Demo'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 Smart REM Solutions. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

