import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Users, BarChart3, Shield, Heart, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acerca de ProClubs Stats | Estadísticas de EA SPORTS FC Pro Clubs',
  description: 'Información sobre ProClubs Stats, tu plataforma de confianza para consultar estadísticas de clubes en EA SPORTS FC 26 Pro Clubs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <Trophy className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Acerca de ProClubs Stats
              </h1>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tu plataforma de confianza para consultar estadísticas de clubes en EA SPORTS FC 26 Pro Clubs
            </p>
          </div>

          {/* Qué es ProClubs Stats */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              ¿Qué es ProClubs Stats?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <strong>ProClubs Stats</strong> es una aplicación web gratuita diseñada para ayudar a los jugadores 
                de EA SPORTS FC 26 Pro Clubs a rastrear y analizar el rendimiento de sus clubes virtuales. 
                Conectamos con la API pública de EA Sports para traerte estadísticas actualizadas de clubes, 
                jugadores y partidos de manera clara y accesible.
              </p>
              <p>
                Nuestra plataforma está diseñada con pasión por jugadores para jugadores, con el objetivo de 
                proporcionar una experiencia intuitiva y completa para el análisis de estadísticas de Pro Clubs.
              </p>
            </div>
          </section>

          {/* Características */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Características Detalladas
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Análisis Completo de Clubes</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Consulta la división actual, récord de victorias, habilidad del club, estadio, 
                      y mucho más. Toda la información que necesitas para evaluar el rendimiento de tu equipo.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Estadísticas de Jugadores</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Rankings completos de goleadores, asistentes, valoración promedio y tabla 
                      detallada con filtros por posición y rendimiento individual de cada miembro.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Historial de Partidos</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Revisa cada partido jugado con detalles completos: resultado, goles, asistencias, 
                      tarjetas y estadísticas individuales de cada jugador en el encuentro.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Multiplataforma</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Compatible con PlayStation 5, Xbox Series X|S, PlayStation 4, Xbox One y Nintendo 
                      Switch. Busca clubes en cualquier plataforma desde un solo lugar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Por qué usar ProClubs Stats */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              ¿Por Qué Usar ProClubs Stats?
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  ⚡ Rápido y Eficiente
                </h3>
                <p>
                  Nuestra plataforma utiliza caché inteligente y optimizaciones avanzadas para que 
                  obtengas los datos lo más rápido posible. Sin esperas innecesarias, directamente 
                  a las estadísticas que necesitas.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  📱 Diseño Responsive
                </h3>
                <p>
                  Accede desde cualquier dispositivo: móvil, tablet o computadora. Nuestra interfaz 
                  se adapta perfectamente a cualquier tamaño de pantalla para una experiencia óptima.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  🎨 Interfaz Moderna
                </h3>
                <p>
                  Diseñada con los últimos estándares de UX/UI, inspirada en el diseño de EA FC. 
                  Animaciones fluidas, colores vibrantes y una experiencia visual de primera clase.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  🔒 Sin Registro
                </h3>
                <p>
                  No necesitas crear cuenta ni proporcionar información personal. Simplemente busca 
                  tu club y consulta las estadísticas. Tu privacidad es importante para nosotros.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  💰 Completamente Gratuito
                </h3>
                <p>
                  ProClubs Stats es y siempre será gratuito. Sin suscripciones premium, sin costos 
                  ocultos, sin limitaciones. Acceso total a todas las funciones sin pagar nada.
                </p>
              </div>
            </div>
          </section>

          {/* Tecnología */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Tecnología de Vanguardia
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                ProClubs Stats está construido con las tecnologías web más modernas y eficientes 
                del mercado para garantizar el mejor rendimiento y experiencia de usuario:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">⚛️ React & Next.js 14</h4>
                  <p className="text-sm">
                    Framework de React para aplicaciones web modernas con renderizado optimizado y 
                    rutas dinámicas para máxima velocidad.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">⚙️ NestJS Backend</h4>
                  <p className="text-sm">
                    API robusta construida con NestJS, con sistema de caché y rate limiting para 
                    proteger los servicios de EA Sports.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">🎨 Tailwind CSS</h4>
                  <p className="text-sm">
                    Framework CSS utility-first para un diseño responsive perfecto en todos los 
                    dispositivos, desde móviles hasta pantallas 4K.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">🔄 TanStack Query</h4>
                  <p className="text-sm">
                    Gestión avanzada de estado de servidor con caché automático, revalidación y 
                    sincronización en tiempo real de datos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Equipo y Contacto */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Características Principales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <Users className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">Búsqueda de Clubes</h3>
                <p className="text-slate-600 text-sm">
                  Busca cualquier club de Pro Clubs en PlayStation, Xbox o PC con resultados 
                  instantáneos y precisos.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <BarChart3 className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">Estadísticas Detalladas</h3>
                <p className="text-slate-600 text-sm">
                  Visualiza estadísticas completas: división, récord, goles, jugadores destacados 
                  y mucho más.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <Trophy className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">Historial de Partidos</h3>
                <p className="text-slate-600 text-sm">
                  Revisa el historial completo de partidos con estadísticas detalladas de cada 
                  encuentro y rendimiento individual.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <Shield className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-slate-800 mb-2">100% Gratuito</h3>
                <p className="text-slate-600 text-sm">
                  Acceso completo sin costos ocultos, sin suscripciones y sin necesidad de 
                  registro de cuenta.
                </p>
              </div>
            </div>
          </section>

          {/* Nuestra Misión */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Nuestra Misión
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <Heart className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-slate-600 leading-relaxed">
                Nuestra misión es proporcionar a la comunidad de Pro Clubs una herramienta profesional, 
                accesible y fácil de usar para analizar estadísticas. Creemos que todos los jugadores 
                merecen acceso a información clara sobre su rendimiento, sin importar su nivel de 
                experiencia o plataforma de juego.
              </p>
            </div>
          </section>

          {/* Tecnología */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Tecnología
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="flex items-start gap-3">
                <Code className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>
                  ProClubs Stats está construido con tecnologías web modernas como Next.js, React, 
                  TypeScript y NestJS, garantizando una experiencia rápida, confiable y responsive 
                  en todos los dispositivos.
                </span>
              </p>
              <p>
                Nos conectamos directamente con la API pública de EA Sports para ofrecerte datos 
                actualizados y precisos. No almacenamos información personal de los usuarios ni 
                requerimos inicio de sesión.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Aviso Legal
            </h2>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                <strong>ProClubs Stats</strong> es un proyecto independiente de la comunidad y 
                <strong> NO está afiliado, asociado, autorizado, respaldado por, o de ninguna manera 
                oficialmente conectado con Electronic Arts Inc., EA Sports, o cualquiera de sus 
                subsidiarias o afiliadas.</strong>
              </p>
              <p>
                Los nombres oficiales <strong>EA SPORTS FC</strong>, <strong>Pro Clubs</strong>, 
                y todos los logos relacionados son marcas registradas de Electronic Arts Inc.
              </p>
              <p>
                Este sitio web utiliza la API pública de EA Sports para mostrar datos que son de 
                dominio público. No recopilamos, almacenamos ni vendemos información personal de 
                los usuarios.
              </p>
            </div>
          </section>

          {/* Contacto y Enlaces */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Más Información
            </h2>
            <div className="space-y-3">
              <Link 
                href="/contact" 
                className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                → Página de Contacto
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
            <p className="mt-2">Hecho con ❤️ por la comunidad de Pro Clubs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
