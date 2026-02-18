import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Términos y Condiciones</h1>
      
      <div className="space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">1. Aceptación de los Términos</h2>
          <p className="mb-4">
            Al acceder y utilizar ProClubs Stats, aceptas estar sujeto a estos términos y condiciones.
            Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">2. Uso del Servicio</h2>
          <p className="mb-4">
            ProClubs Stats proporciona estadísticas y datos relacionados con EA SPORTS FC 25 Pro Clubs.
            Este sitio no está afiliado ni respaldado por Electronic Arts Inc.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El servicio se proporciona "tal cual" sin garantías de ningún tipo</li>
            <li>Los datos mostrados son obtenidos de fuentes públicas de EA</li>
            <li>No garantizamos la disponibilidad continua del servicio</li>
            <li>Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">3. Propiedad Intelectual</h2>
          <p className="mb-4">
            El contenido, diseño y estructura del sitio web son propiedad de ProClubs Stats.
            EA SPORTS FC 25, Pro Clubs y todos los logos relacionados son marcas registradas de
            Electronic Arts Inc.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">4. Publicidad</h2>
          <p className="mb-4">
            Este sitio web muestra anuncios a través de Google AdSense. Al usar nuestro sitio,
            aceptas que se muestren anuncios y que Google pueda usar cookies para personalizar
            los anuncios. Para más información, consulta nuestra{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">5. Limitación de Responsabilidad</h2>
          <p className="mb-4">
            ProClubs Stats no será responsable de ningún daño directo, indirecto, incidental,
            especial o consecuente que resulte del uso o la imposibilidad de usar el servicio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">6. Cambios en los Términos</h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios serán efectivos inmediatamente después de su publicación en el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">7. Contacto</h2>
          <p className="mb-4">
            Si tienes preguntas sobre estos términos, puedes contactarnos a través de nuestro
            repositorio de GitHub.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Última actualización: {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
