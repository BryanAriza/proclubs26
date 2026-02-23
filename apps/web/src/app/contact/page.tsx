import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, Github, AlertCircle, Shield, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | ProClubs Stats',
  description: 'Ponte en contacto con el equipo de ProClubs Stats. Reporta problemas, sugiere mejoras o haz preguntas sobre la plataforma.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Contacto
              </h1>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              Estamos aquí para ayudarte con cualquier pregunta o sugerencia
            </p>
          </div>

          {/* Opciones de Contacto */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              ¿Cómo podemos ayudarte?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Email */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                <Mail className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">Correo Electrónico</h3>
                <p className="text-slate-600 text-sm mb-3">
                  Para consultas generales, reportar problemas o sugerencias de mejora.
                </p>
                <a 
                  href="mailto:support@proclubsstats.com" 
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  support@proclubsstats.com
                </a>
              </div>

              {/* GitHub Issues */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                <Github className="w-10 h-10 text-slate-800 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">GitHub Issues</h3>
                <p className="text-slate-600 text-sm mb-3">
                  Reporta bugs técnicos o sugiere nuevas funcionalidades en nuestro repositorio.
                </p>
                <a 
                  href="https://github.com/yourusername/proclubs/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  Abrir Issue en GitHub →
                </a>
              </div>
            </div>
          </section>

          {/* Preguntas Frecuentes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              <HelpCircle className="w-7 h-7 text-blue-600" />
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">
                  ¿Por qué no encuentro mi club?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Asegúrate de seleccionar la plataforma correcta (PlayStation, Xbox o PC) y verifica 
                  que el nombre del club esté escrito correctamente. Los datos provienen directamente 
                  de EA Sports, por lo que si tu club es nuevo, puede tardar unas horas en aparecer.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">
                  ¿Las estadísticas están actualizadas?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Sí, nos conectamos directamente con la API pública de EA Sports para obtener datos 
                  actualizados. Las estadísticas se refrescan automáticamente y pueden tener un pequeño 
                  retraso de sincronización con los servidores de EA.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">
                  ¿Necesito crear una cuenta?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  No, ProClubs Stats es completamente gratuito y no requiere registro. No recopilamos 
                  información personal de los usuarios. Simplemente busca tu club y consulta las 
                  estadísticas.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">
                  ¿Puedo usar esta herramienta en mi móvil?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Absolutamente. ProClubs Stats está totalmente optimizado para dispositivos móviles, 
                  tablets y computadoras de escritorio. Funciona en cualquier navegador moderno.
                </p>
              </div>
            </div>
          </section>

          {/* Reportar Problemas */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              <AlertCircle className="w-7 h-7 text-blue-600" />
              Reportar un Problema
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
              <p className="text-slate-700 leading-relaxed mb-4">
                Si encuentras algún error, comportamiento inesperado o tienes sugerencias para 
                mejorar ProClubs Stats, por favor contáctanos. Tu feedback es muy valioso para 
                mejorar la plataforma.
              </p>
              
              <p className="text-sm text-slate-600 mb-3">
                <strong>Al reportar un problema, por favor incluye:</strong>
              </p>
              <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                <li>Descripción detallada del problema</li>
                <li>Pasos para reproducir el error</li>
                <li>Navegador y dispositivo que estás usando</li>
                <li>Capturas de pantalla (si es posible)</li>
              </ul>
            </div>
          </section>

          {/* Política de Respuesta */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Tiempo de Respuesta
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <Shield className="w-10 h-10 text-blue-600 mb-3" />
              <p className="text-slate-700 leading-relaxed">
                Nos esforzamos por responder a todas las consultas en un plazo de <strong>24-48 horas 
                hábiles</strong>. Para problemas críticos que afecten el funcionamiento de la plataforma, 
                priorizamos la respuesta y solución lo antes posible.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-sm text-slate-600 leading-relaxed">
              <p className="mb-3">
                <strong>Nota importante:</strong> ProClubs Stats es un proyecto independiente de la 
                comunidad y no está afiliado con Electronic Arts Inc. o EA Sports.
              </p>
              <p>
                Para soporte oficial de EA SPORTS FC o problemas con tu cuenta de EA, por favor 
                visita{' '}
                <a 
                  href="https://help.ea.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://help.ea.com
                </a>
              </p>
            </div>
          </section>

          {/* Enlaces útiles */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Enlaces Útiles
            </h2>
            <div className="space-y-3">
              <Link 
                href="/about" 
                className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                → Acerca de ProClubs Stats
              </Link>
              <Link 
                href="/privacy" 
                className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                → Política de Privacidad
              </Link>
              <Link 
                href="/" 
                className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                → Volver a la Búsqueda
              </Link>
            </div>
          </section>

          {/* Footer de página */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} ProClubs Stats · Proyecto comunitario independiente</p>
            <p className="mt-2">Gracias por usar ProClubs Stats</p>
          </div>
        </div>
      </div>
    </div>
  );
}
