import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Target, Users, Trophy, TrendingUp, Zap, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guías y Tutoriales | ProClubs Stats - Cómo Usar y Mejorar en Pro Clubs',
  description: 'Guías completas para usar ProClubs Stats y mejorar tu rendimiento en EA SPORTS FC 26 Pro Clubs. Aprende a interpretar estadísticas, buscar clubes y optimizar tu juego.',
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-lg shadow-blue-100/50">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              Guías y Tutoriales
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-600 font-semibold">
            Aprende a usar ProClubs Stats y mejora tu rendimiento en Pro Clubs
          </p>
        </div>

        {/* Guía: Cómo usar ProClubs Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Cómo Usar ProClubs Stats
            </h2>
          </div>

          <div className="space-y-6">
            {/* Paso 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Selecciona tu Plataforma</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    En la página principal, verás tres opciones de plataforma:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Current Gen:</strong> PlayStation 5, Xbox Series X|S (la más popular)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Last Gen:</strong> PlayStation 4, Xbox One</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Switch:</strong> Nintendo Switch</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-500 mt-3 italic">
                    💡 Tip: Si no estás seguro, prueba con "Current Gen" primero, es donde está la mayoría de clubes.
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Busca tu Club</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    Escribe el nombre de tu club en el cuadro de búsqueda. Algunos consejos:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>Escribe <strong>al menos 2 caracteres</strong> para que comience la búsqueda</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>La búsqueda es <strong>automática</strong>, no necesitas presionar Enter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>Los resultados aparecen mientras escribes (búsqueda en tiempo real)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold mt-1">⚠</span>
                      <span>Si no encuentras tu club, verifica la <strong>plataforma correcta</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Explora las Estadísticas</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    Una vez que hagas clic en tu club, verás tres pestañas principales:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-2">📊 Resumen General</h4>
                      <p className="text-sm text-slate-600">
                        División actual, habilidad del club, récord de victorias/derrotas/empates, 
                        porcentaje de victorias, y racha reciente de los últimos 10 partidos.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-2">👥 Jugadores</h4>
                      <p className="text-sm text-slate-600">
                        Tabla completa de todos los miembros del club con goles, asistencias, 
                        partidos jugados, valoración promedio, y filtros por posición.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-2">🏆 Partidos</h4>
                      <p className="text-sm text-slate-600">
                        Historial completo de partidos recientes con resultado, goles, y 
                        estadísticas individuales de cada jugador en el encuentro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guía: Interpretar Estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Cómo Interpretar las Estadísticas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* División */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <Trophy className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">División y Habilidad</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                La <strong>División</strong> va del 1 al 10 (1 es la élite). La <strong>Habilidad</strong> 
                es un número que refleja tu nivel competitivo. Cuanto más alto, mejor.
              </p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-2">Rangos aproximados:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><strong>Div 1, Habilidad 2000+:</strong> Nivel profesional/élite</li>
                  <li><strong>Div 2-3, Habilidad 1500+:</strong> Nivel avanzado</li>
                  <li><strong>Div 4-6, Habilidad 1000+:</strong> Nivel intermedio</li>
                  <li><strong>Div 7-10, Habilidad &lt;1000:</strong> Nivel principiante</li>
                </ul>
              </div>
            </div>

            {/* Récord */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <Star className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Récord y % de Victorias</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                El récord muestra <strong>Victorias-Derrotas-Empates</strong>. El porcentaje de 
                victorias es el indicador más claro de éxito.
              </p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-2">Interpretación:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><strong>&gt;60% victorias:</strong> Club excelente</li>
                  <li><strong>50-60% victorias:</strong> Club competitivo</li>
                  <li><strong>40-50% victorias:</strong> Club promedio</li>
                  <li><strong>&lt;40% victorias:</strong> Club en desarrollo</li>
                </ul>
              </div>
            </div>

            {/* Goles */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <Zap className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Goles y Asistencias</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                Analiza el rendimiento ofensivo de tu club. Un buen promedio es <strong>2+ goles 
                por partido</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-2">Consejos de análisis:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>Compara goles a favor vs. goles en contra</li>
                  <li>Identifica a tus máximos goleadores</li>
                  <li>Revisa quién da más asistencias</li>
                  <li>Analiza la distribución de goles en el equipo</li>
                </ul>
              </div>
            </div>

            {/* Valoración */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <Shield className="w-10 h-10 text-orange-600 mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Valoración Promedio</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                La <strong>valoración</strong> es una nota del 1 al 10 que EA asigna según el 
                rendimiento en cada partido. Promedio general: <strong>6.5-7.5</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-2">Escala de valoración:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><strong>8.0+:</strong> Rendimiento excepcional</li>
                  <li><strong>7.0-8.0:</strong> Muy buen rendimiento</li>
                  <li><strong>6.0-7.0:</strong> Rendimiento promedio</li>
                  <li><strong>&lt;6.0:</strong> Rendimiento por debajo del promedio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Consejos para Mejorar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Consejos para Mejorar tu Club
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">1. Analiza tus Partidos Regularmente</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Usa la pestaña "Partidos" para revisar tus últimos encuentros. Identifica patrones: 
                ¿cuándo ganas más? ¿Qué formación funciona mejor? ¿Qué jugadores rinden más?
              </p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">2. Equilibra tu Plantilla</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Revisa las estadísticas de jugadores. Si un jugador tiene muy pocos partidos o 
                bajo rendimiento, considera rotaciones. Un club equilibrado es más difícil de vencer.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">3. Establece Objetivos Claros</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Usa las estadísticas para fijar metas: "Subir a División 5 este mes", "Alcanzar 
                60% de victorias", "Promediar 2.5 goles por partido". Monitorea tu progreso en ProClubs Stats.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">4. Aprende de los Mejores</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Busca clubes de División 1 o 2 en ProClubs Stats. Analiza sus estadísticas: 
                ¿cómo distribuyen los goles? ¿Qué promedio de valoración tienen sus jugadores? 
                Aprende de sus patrones de éxito.
              </p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">5. Comunicación y Química</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Las estadísticas son importantes, pero la comunicación y la química del equipo son 
                fundamentales. Juega con amigos que se entiendan bien en el campo. ¡Los números 
                mejorarán naturalmente!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-slate-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <summary className="font-bold text-slate-900 cursor-pointer">
                ¿Con qué frecuencia se actualizan las estadísticas?
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Las estadísticas se obtienen directamente de la API de EA Sports, por lo que se 
                actualizan en tiempo real. Cada vez que buscas un club, obtienes los datos más 
                recientes disponibles desde los servidores de EA.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <summary className="font-bold text-slate-900 cursor-pointer">
                ¿Por qué no encuentro mi club?
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Asegúrate de haber seleccionado la plataforma correcta (Current Gen, Last Gen, Switch). 
                También verifica que el nombre esté escrito correctamente. Si tu club es muy nuevo o 
                no ha jugado partidos, puede que aún no aparezca en la API de EA.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <summary className="font-bold text-slate-900 cursor-pointer">
                ¿Puedo comparar dos clubes?
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Actualmente no tenemos una función de comparación directa, pero puedes abrir dos pestañas 
                del navegador y buscar cada club en una pestaña diferente para compararlos manualmente. 
                ¡Estamos considerando añadir esta función en el futuro!
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <summary className="font-bold text-slate-900 cursor-pointer">
                ¿Es gratis usar ProClubs Stats?
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                ¡Sí! ProClubs Stats es completamente gratuito y siempre lo será. No hay suscripciones, 
                no hay costos ocultos, y no necesitas crear cuenta. Nos financiamos con anuncios de 
                Google AdSense para mantener el servicio gratis para todos.
              </p>
            </details>

            <details className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <summary className="font-bold text-slate-900 cursor-pointer">
                ¿Funciona en móviles?
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                ¡Absolutamente! ProClubs Stats está completamente optimizado para dispositivos móviles, 
                tablets y computadoras. Puedes consultar las estadísticas de tu club desde cualquier 
                dispositivo con acceso a internet.
              </p>
            </details>
          </div>
        </div>

        {/* Links de navegación */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
            ¿Listo para Empezar?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link 
              href="/"
              className="block p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow text-center"
            >
              <h4 className="font-bold text-blue-900 mb-2">🔍 Buscar Mi Club</h4>
              <p className="text-sm text-slate-600">Comienza a explorar estadísticas</p>
            </Link>
            
            <Link 
              href="/about"
              className="block p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow text-center"
            >
              <h4 className="font-bold text-blue-900 mb-2">ℹ️ Acerca de Nosotros</h4>
              <p className="text-sm text-slate-600">Conoce más sobre ProClubs Stats</p>
            </Link>
            
            <Link 
              href="/contact"
              className="block p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow text-center"
            >
              <h4 className="font-bold text-blue-900 mb-2">✉️ Contacto</h4>
              <p className="text-sm text-slate-600">¿Preguntas? Escríbenos</p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ProClubs Stats · Guías y Tutoriales</p>
          <p className="mt-2">Ayudando a la comunidad de Pro Clubs a mejorar sus estadísticas</p>
        </div>
      </div>
    </div>
  );
}
