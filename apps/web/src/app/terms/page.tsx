import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | ProClubs Stats',
  description: 'Términos y condiciones de uso de ProClubs Stats, plataforma de estadísticas de EA SPORTS FC 26 Pro Clubs.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Términos y Condiciones</h1>
          
          <div className="space-y-8 text-slate-700">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Al acceder y utilizar ProClubs Stats, aceptas estar sujeto a estos términos y condiciones. 
                Por favor, léelos cuidadosamente antes de usar nuestro servicio.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">1. Aceptación de los Términos</h2>
              <p className="mb-4 leading-relaxed">
                Al acceder y utilizar ProClubs Stats ("el Servicio"), aceptas estar legalmente vinculado 
                a estos términos y condiciones ("Términos"). Si no estás de acuerdo con alguna parte de 
                estos términos, no debes usar nuestro sitio web.
              </p>
              <p className="mb-4 leading-relaxed">
                Estos Términos se aplican a todos los visitantes, usuarios y otras personas que acceden 
                o utilizan el Servicio. Nos reservamos el derecho de actualizar o modificar estos 
                Términos en cualquier momento sin previo aviso. Es tu responsabilidad revisar periódicamente 
                estos Términos para estar informado de cualquier cambio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">2. Descripción del Servicio</h2>
              <p className="mb-4 leading-relaxed">
                ProClubs Stats proporciona estadísticas y datos relacionados con EA SPORTS FC 26 Pro Clubs, 
                obtenidos a través de la API pública de Electronic Arts. El Servicio permite a los usuarios:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Buscar clubes de Pro Clubs en diferentes plataformas (PlayStation, Xbox, Nintendo Switch)</li>
                <li>Visualizar estadísticas públicas de clubes y jugadores</li>
                <li>Consultar historiales de partidos y rendimiento</li>
                <li>Acceder a análisis de datos de rendimiento de equipos</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                <strong className="text-slate-900">Importante:</strong> ProClubs Stats es un proyecto 
                independiente de la comunidad y <strong>NO está afiliado, asociado, autorizado, 
                respaldado por, o de ninguna manera oficialmente conectado con Electronic Arts Inc., 
                EA Sports, o cualquiera de sus subsidiarias o afiliadas.</strong> Los datos mostrados 
                son de dominio público y se obtienen de fuentes oficiales de EA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">3. Uso del Servicio</h2>
              <p className="mb-4 leading-relaxed font-semibold text-slate-800">
                Al utilizar ProClubs Stats, te comprometes a:
              </p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li>
                  <strong>Uso legítimo:</strong> Utilizar el Servicio únicamente para fines personales 
                  y legales, consultando estadísticas públicas de Pro Clubs.
                </li>
                <li>
                  <strong>No automatización:</strong> No utilizar bots, scrapers, o herramientas 
                  automatizadas para acceder al Servicio sin nuestro permiso expreso por escrito.
                </li>
                <li>
                  <strong>No abuso:</strong> No intentar sobrecargar, interferir o dañar el funcionamiento 
                  del Servicio, incluyendo ataques DDoS, inyección de código, o cualquier actividad maliciosa.
                </li>
                <li>
                  <strong>Respeto a terceros:</strong> No utilizar el Servicio para acosar, difamar, 
                  o violar los derechos de otros usuarios o clubes.
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Cumplir con todas las leyes y regulaciones 
                  aplicables en tu jurisdicción al utilizar el Servicio.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">4. Disponibilidad del Servicio</h2>
              <p className="mb-4 leading-relaxed">
                El Servicio se proporciona <strong>"tal cual"</strong> y <strong>"según disponibilidad"</strong> 
                sin garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>El Servicio estará disponible de forma ininterrumpida, sin errores o libre de virus</li>
                <li>Los datos mostrados sean 100% precisos, completos o actualizados en todo momento</li>
                <li>El Servicio cumplirá con tus expectativas o necesidades específicas</li>
                <li>Cualquier error en el Servicio será corregido en un plazo determinado</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Nos reservamos el derecho de modificar, suspender o discontinuar el Servicio (o cualquier 
                parte del mismo) en cualquier momento, con o sin previo aviso. No seremos responsables 
                ante ti ni ante terceros por cualquier modificación, suspensión o interrupción del Servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">5. Propiedad Intelectual</h2>
              <p className="mb-4 leading-relaxed">
                El contenido, diseño, código fuente, estructura, gráficos y organización del sitio web 
                ProClubs Stats son propiedad de ProClubs Stats y están protegidos por las leyes de 
                propiedad intelectual aplicables.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>EA SPORTS FC 26</strong>, <strong>Pro Clubs</strong>, y todos los logos, nombres, 
                marcas comerciales y marcas de servicio relacionadas son propiedad exclusiva de 
                <strong> Electronic Arts Inc.</strong> y sus licenciantes. El uso de estas marcas no 
                implica respaldo ni afiliación con Electronic Arts.
              </p>
              <p className="mb-4 leading-relaxed">
                Los escudos de clubes, nombres de equipos y datos de jugadores que aparecen en el Servicio 
                son propiedad de sus respectivos dueños y se muestran únicamente con fines informativos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">6. Publicidad</h2>
              <p className="mb-4 leading-relaxed">
                Este sitio web muestra anuncios a través de <strong>Google AdSense</strong> para mantener 
                el Servicio gratuito para todos los usuarios. Al usar nuestro sitio, aceptas que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Se muestren anuncios publicitarios en diversas secciones del sitio</li>
                <li>Google pueda usar cookies y tecnologías similares para personalizar los anuncios</li>
                <li>Los anuncios sean proporcionados por terceros que pueden tener sus propias políticas de privacidad</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Para más información sobre cómo manejamos los anuncios y tu privacidad, consulta nuestra{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline font-semibold">
                  Política de Privacidad
                </Link>.
              </p>
              <p className="mb-4 leading-relaxed">
                No somos responsables del contenido de los anuncios de terceros mostrados en el Servicio. 
                Si haces clic en un anuncio, serás redirigido a sitios web de terceros sobre los cuales 
                no tenemos control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">7. Limitación de Responsabilidad</h2>
              <p className="mb-4 leading-relaxed">
                En la máxima medida permitida por la ley aplicable, ProClubs Stats, sus desarrolladores, 
                colaboradores y afiliados <strong>NO serán responsables</strong> por:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Daños directos, indirectos, incidentales, especiales, consecuentes o punitivos</li>
                <li>Pérdida de beneficios, ingresos, datos, uso, fondo de comercio u otras pérdidas intangibles</li>
                <li>Errores, inexactitudes o imprecisiones en los datos mostrados</li>
                <li>Interrupción o terminación del Servicio</li>
                <li>Acceso no autorizado a nuestros servidores o datos</li>
                <li>Cualquier contenido de terceros, incluidos anuncios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">8. Indemnización</h2>
              <p className="mb-4 leading-relaxed">
                Aceptas indemnizar, defender y mantener indemne a ProClubs Stats, sus desarrolladores 
                y colaboradores de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo 
                o deuda, y gasto (incluidos, entre otros, los honorarios de abogados) que surjan de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Tu uso y acceso al Servicio</li>
                <li>Tu violación de estos Términos</li>
                <li>Tu violación de derechos de terceros, incluidos derechos de propiedad intelectual</li>
                <li>Cualquier contenido que publiques o compartas a través del Servicio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">9. Enlaces a Sitios de Terceros</h2>
              <p className="mb-4 leading-relaxed">
                ProClubs Stats puede contener enlaces a sitios web o servicios de terceros que no son 
                propiedad ni están controlados por ProClubs Stats. No tenemos control sobre, y no asumimos 
                responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o 
                servicios de terceros.
              </p>
              <p className="mb-4 leading-relaxed">
                Te recomendamos leer los términos y condiciones y las políticas de privacidad de cualquier 
                sitio web de terceros que visites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">10. Modificaciones de los Términos</h2>
              <p className="mb-4 leading-relaxed">
                Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos 
                Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar 
                un aviso con al menos 30 días de antelación antes de que entren en vigencia los nuevos 
                términos.
              </p>
              <p className="mb-4 leading-relaxed">
                Lo que constituye un cambio material se determinará a nuestra sola discreción. Al 
                continuar accediendo o utilizando nuestro Servicio después de que las revisiones entren 
                en vigencia, aceptas estar vinculado por los términos revisados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">11. Ley Aplicable y Jurisdicción</h2>
              <p className="mb-4 leading-relaxed">
                Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin 
                tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
              <p className="mb-4 leading-relaxed">
                Cualquier disputa relacionada con estos Términos o el uso del Servicio se resolverá 
                mediante arbitraje o en los tribunales competentes de la jurisdicción correspondiente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">12. Divisibilidad</h2>
              <p className="mb-4 leading-relaxed">
                Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha 
                disposición se eliminará o limitará al mínimo necesario, y las disposiciones restantes 
                continuarán en pleno vigor y efecto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">13. Contacto</h2>
              <p className="mb-4 leading-relaxed">
                Si tienes preguntas sobre estos Términos y Condiciones, por favor contáctanos a través 
                de nuestra{' '}
                <Link href="/contact" className="text-blue-600 hover:underline font-semibold">
                  página de contacto
                </Link>.
              </p>
            </section>

            {/* Enlaces útiles */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Enlaces Relacionados</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link 
                  href="/privacy"
                  className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-blue-900 mb-2">Política de Privacidad</h4>
                  <p className="text-sm text-slate-600">Cómo manejamos tus datos y cookies</p>
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
                  <p className="text-sm text-slate-600">¿Necesitas ayuda? Contáctanos</p>
                </Link>
              </div>
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
              <p className="mt-2">Proyecto comunitario independiente · No afiliado con EA Sports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
