import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Eye, Cookie, Database, Lock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | ProClubs Stats',
  description: 'Política de privacidad de ProClubs Stats. Información sobre cómo manejamos tus datos, cookies y Google AdSense.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Política de Privacidad
              </h1>
            </div>
            <p className="text-lg text-slate-600">
              Tu privacidad es importante para nosotros
            </p>
            <p className="text-sm text-slate-500 mt-2">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        
          {/* Resumen ejecutivo */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Resumen de Privacidad
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>NO recopilamos</strong> información personal identificable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>NO almacenamos</strong> datos de usuarios en nuestras bases de datos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>NO requerimos</strong> registro de cuenta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">⚠</span>
                <span>Utilizamos <strong>Google AdSense</strong> (cookies de terceros)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">ℹ</span>
                <span>Solo mostramos <strong>datos públicos</strong> de la API de EA Sports</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            {/* 1. Información General */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                1. Información General
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Esta aplicación web, <strong>ProClubs Stats</strong>, muestra estadísticas públicas 
                de clubes de EA SPORTS FC 26 Pro Clubs obtenidas de la API oficial de Electronic Arts. 
                Nos comprometemos a proteger tu privacidad y a ser completamente transparentes sobre 
                cómo utilizamos cualquier información relacionada con tu visita a nuestro sitio.
              </p>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Esta política describe qué información recopilamos (o no recopilamos), cómo la usamos, 
                y tus derechos respecto a tu privacidad. Al utilizar ProClubs Stats, aceptas las 
                prácticas descritas en esta política.
              </p>
            </section>

            {/* 2. Información que NO Recopilamos */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                2. Información que NO Recopilamos
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <Database className="w-10 h-10 text-green-600 mb-4" />
                <p className="mb-4 text-slate-600 leading-relaxed font-semibold">
                  ProClubs Stats NO recopila ni almacena la siguiente información:
                </p>
                <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                  <li><strong>NO recopilamos</strong> nombres, direcciones de correo electrónico, o cualquier información personal identificable</li>
                  <li><strong>NO almacenamos</strong> datos de usuario en bases de datos propias</li>
                  <li><strong>NO requerimos</strong> creación de cuentas de usuario</li>
                  <li><strong>NO guardamos</strong> tus búsquedas o historial de navegación</li>
                  <li><strong>NO rastreamos</strong> tu ubicación geográfica precisa</li>
                  <li><strong>NO vendemos</strong> ni compartimos información personal con terceros (excepto Google AdSense, ver sección 3)</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-green-800">En resumen:</strong> ProClubs Stats es un visor 
                  de estadísticas públicas. Solo mostramos datos que EA Sports ya hace públicos a través 
                  de su API. No tenemos acceso a tu información personal.
                </p>
              </div>
            </section>

            {/* 3. Google AdSense */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                3. Google AdSense y Cookies
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <Cookie className="w-10 h-10 text-blue-600 mb-4" />
                <p className="mb-4 text-slate-600 leading-relaxed">
                  Este sitio utiliza <strong>Google AdSense</strong> para mostrar anuncios publicitarios 
                  y mantener el servicio gratuito para todos. Google AdSense utiliza cookies y tecnologías 
                  similares (como web beacons, identificadores de dispositivos) para:
                </p>
                <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                  <li><strong>Personalizar anuncios</strong> según tus intereses de navegación</li>
                  <li><strong>Limitar la frecuencia</strong> con la que ves un anuncio específico</li>
                  <li><strong>Medir la efectividad</strong> de las campañas publicitarias</li>
                  <li><strong>Proporcionar anuncios más relevantes</strong> basados en tu historial de navegación en otros sitios</li>
                </ul>
                
                <div className="bg-white rounded-lg p-4 mt-4 border border-blue-100">
                  <h3 className="font-bold text-slate-800 mb-2">¿Qué son las cookies?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo. 
                    Google utiliza cookies de terceros para rastrear tu comportamiento de navegación en 
                    múltiples sitios web y mostrarte anuncios personalizados.
                  </p>
                  <h3 className="font-bold text-slate-800 mb-2">¿Cómo desactivar anuncios personalizados?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    Puedes optar por no recibir anuncios personalizados visitando:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2 pl-4">
                    <li>
                      <a 
                        href="https://www.google.com/settings/ads" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      >
                        → Configuración de anuncios de Google
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://optout.aboutads.info/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      >
                        → Digital Advertising Alliance (DAA)
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.networkadvertising.org/choices/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      >
                        → Network Advertising Initiative (NAI)
                      </a>
                    </li>
                  </ul>
                </div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  <strong>Nota importante:</strong> Desactivar los anuncios personalizados NO significa 
                  que dejarás de ver anuncios. Simplemente verás anuncios menos relevantes para tus 
                  intereses. Google seguirá mostrando anuncios basados en factores generales como la 
                  ubicación aproximada o el contenido de la página.
                </p>
              </div>
            </section>

            {/* 4. Datos Públicos de EA */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                4. Datos Públicos de EA Sports
              </h2>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <Eye className="w-10 h-10 text-indigo-600 mb-4" />
                <p className="mb-4 text-slate-600 leading-relaxed">
                  ProClubs Stats se conecta a la <strong>API pública de Electronic Arts</strong> para 
                  obtener estadísticas de clubes y jugadores de Pro Clubs. Los datos que mostramos incluyen:
                </p>
                <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                  <li>Nombres de clubes y jugadores (información ya pública en EA FC)</li>
                  <li>Estadísticas de rendimiento: goles, asistencias, partidos jugados, victorias</li>
                  <li>División, habilidad del club, y récord de victorias/derrotas</li>
                  <li>Historial de partidos con resultados y estadísticas por jugador</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Importante:</strong> Toda esta información es de dominio público y está 
                  disponible directamente en los servidores de EA Sports. ProClubs Stats simplemente 
                  presenta estos datos de una manera más accesible y visual. No añadimos ni modificamos 
                  los datos originales.
                </p>
              </div>
            </section>

            {/* 5. Cookies Técnicas */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                5. Cookies Técnicas Esenciales
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Además de las cookies de Google AdSense, ProClubs Stats puede utilizar cookies técnicas 
                esenciales para el funcionamiento básico del sitio, tales como:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                <li>
                  <strong>Cookies de sesión:</strong> Para mantener tu sesión activa mientras navegas 
                  (se eliminan al cerrar el navegador)
                </li>
                <li>
                  <strong>Cookies de preferencias:</strong> Para recordar tu configuración de plataforma 
                  seleccionada (Current Gen, Last Gen, Switch)
                </li>
                <li>
                  <strong>Cookies de rendimiento:</strong> Para optimizar la carga de datos y mejorar 
                  la velocidad del sitio
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Estas cookies son necesarias para el funcionamiento técnico del sitio y no recopilan 
                información personal identificable.
              </p>
            </section>

            {/* 6. Seguridad */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                6. Seguridad de la Información
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <Lock className="w-10 h-10 text-red-600 mb-4" />
                <p className="mb-4 text-slate-600 leading-relaxed">
                  Aunque no recopilamos información personal, tomamos medidas de seguridad para proteger 
                  nuestro sitio y a nuestros usuarios:
                </p>
                <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                  <li><strong>HTTPS:</strong> Conexión cifrada para todas las comunicaciones</li>
                  <li><strong>Rate limiting:</strong> Protección contra ataques de denegación de servicio (DDoS)</li>
                  <li><strong>Validación de datos:</strong> Sanitización de todas las entradas de usuario</li>
                  <li><strong>Sin almacenamiento de credenciales:</strong> No guardamos contraseñas ni información sensible</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Nota:</strong> Ningún método de transmisión por Internet es 100% seguro. 
                  Aunque implementamos medidas de seguridad estándar de la industria, no podemos 
                  garantizar la seguridad absoluta de la información transmitida.
                </p>
              </div>
            </section>

            {/* 7. Enlaces a Terceros */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-yellow-600 rounded-full"></div>
                7. Enlaces a Sitios de Terceros
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                ProClubs Stats puede contener enlaces a sitios web de terceros, incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                <li>Sitios web oficiales de EA Sports</li>
                <li>Anunciantes a través de Google AdSense</li>
                <li>Recursos educativos o de la comunidad</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                No somos responsables de las prácticas de privacidad o el contenido de estos sitios 
                externos. Te recomendamos leer las políticas de privacidad de cualquier sitio web 
                de terceros que visites.
              </p>
            </section>

            {/* 8. Derechos de Usuarios */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-cyan-600 rounded-full"></div>
                8. Tus Derechos de Privacidad
              </h2>
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                <Users className="w-10 h-10 text-cyan-600 mb-4" />
                <p className="mb-4 text-slate-600 leading-relaxed">
                  Aunque ProClubs Stats no recopila información personal, tienes los siguientes derechos:
                </p>
                <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
                  <li>
                    <strong>Derecho a la información:</strong> Puedes solicitar información sobre qué 
                    datos (si los hay) tenemos sobre ti
                  </li>
                  <li>
                    <strong>Derecho a eliminar cookies:</strong> Puedes borrar todas las cookies de 
                    tu navegador en cualquier momento
                  </li>
                  <li>
                    <strong>Derecho a optar por no participar:</strong> Puedes desactivar anuncios 
                    personalizados de Google (ver sección 3)
                  </li>
                  <li>
                    <strong>Derecho a la portabilidad:</strong> Como no almacenamos tus datos, no hay 
                    datos que exportar
                  </li>
                  <li>
                    <strong>Derecho a presentar una queja:</strong> Puedes contactarnos si tienes 
                    preocupaciones sobre privacidad
                  </li>
                </ul>
              </div>
            </section>

            {/* 9. Menores de Edad */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-pink-600 rounded-full"></div>
                9. Protección de Menores
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                ProClubs Stats no está dirigido específicamente a menores de 13 años. No recopilamos 
                intencionadamente información personal de menores. Si eres padre o tutor y crees que 
                tu hijo nos ha proporcionado información personal, contáctanos inmediatamente.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>Nota:</strong> EA SPORTS FC 26 tiene su propia clasificación por edades. 
                ProClubs Stats simplemente muestra estadísticas públicas del juego y no verifica 
                la edad de los visitantes.
              </p>
            </section>

            {/* 10. Cambios en la Política */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-gray-600 rounded-full"></div>
                10. Cambios en esta Política de Privacidad
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. 
                Te recomendamos revisar periódicamente esta política para estar informado sobre cómo 
                protegemos tu privacidad.
              </p>
              <p className="text-slate-600 leading-relaxed">
                La fecha de "Última actualización" al inicio de este documento indica cuándo se 
                modificó por última vez esta política. Tu uso continuado del sitio después de cualquier 
                cambio constituye tu aceptación de la nueva Política de Privacidad.
              </p>
            </section>

            {/* 11. Contacto */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                11. Contacto y Preguntas
              </h2>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Si tienes preguntas, comentarios o inquietudes sobre esta Política de Privacidad o 
                nuestras prácticas de manejo de datos, por favor contáctanos a través de nuestra{' '}
                <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                  página de contacto
                </Link>.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Haremos nuestro mejor esfuerzo para responder a todas las consultas en un plazo 
                razonable.
              </p>
            </section>

            {/* Enlaces relacionados */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Enlaces Relacionados</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link 
                  href="/terms"
                  className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-blue-900 mb-2">Términos y Condiciones</h4>
                  <p className="text-sm text-slate-600">Reglas de uso del servicio</p>
                </Link>
                
                <Link 
                  href="/about"
                  className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-blue-900 mb-2">Acerca de Nosotros</h4>
                  <p className="text-sm text-slate-600">Conoce más sobre ProClubs Stats</p>
                </Link>
                
                <Link 
                  href="/contact"
                  className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-blue-900 mb-2">Contacto</h4>
                  <p className="text-sm text-slate-600">¿Preguntas? Escríbenos</p>
                </Link>
              </div>
            </div>

            {/* Recursos Externos */}
            <div className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-3">Recursos Externos Útiles</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a 
                    href="https://policies.google.com/technologies/ads" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    → Política de Anuncios de Google
                  </a>
                </li>
                <li>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    → Política de Privacidad de Google
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.google.com/adsense/answer/7549925" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    → Cómo gestiona Google AdSense tus datos
                  </a>
                </li>
              </ul>
            </div>

            {/* Volver al inicio */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                ← Volver a la Búsqueda de Clubes
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
              <p>© {new Date().getFullYear()} ProClubs Stats · Todos los derechos reservados</p>
              <p className="mt-2">Tu privacidad es nuestra prioridad · Proyecto comunitario independiente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
