export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Política de Privacidad</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">1. Información General</h2>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Esta aplicación muestra estadísticas públicas de clubes de EA SPORTS FC 25 Pro Clubs.
            Nos comprometemos a proteger tu privacidad y a ser transparentes sobre cómo utilizamos
            la información.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">2. Google AdSense</h2>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Este sitio utiliza Google AdSense para mostrar anuncios. Google utiliza cookies
            y tecnologías similares para:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
            <li>Personalizar los anuncios según tus intereses</li>
            <li>Limitar el número de veces que ves un anuncio</li>
            <li>Medir la efectividad de los anuncios</li>
            <li>Proporcionar anuncios más relevantes</li>
          </ul>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Puedes optar por no recibir anuncios personalizados visitando:
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline ml-1"
            >
              Configuración de anuncios de Google
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">3. Datos que Recopilamos</h2>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Esta aplicación:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
            <li><strong>NO recopila</strong> información personal de los usuarios</li>
            <li><strong>NO almacena</strong> datos de usuario en bases de datos propias</li>
            <li><strong>Solo muestra</strong> datos públicos disponibles en la API de EA Sports</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Los datos que ves (estadísticas de clubes, jugadores, partidos) son públicos y
            provienen directamente de los servidores de EA Sports.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">4. Cookies</h2>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Este sitio utiliza cookies de terceros a través de Google AdSense. Las cookies son
            pequeños archivos de texto almacenados en tu dispositivo que ayudan a mejorar tu
            experiencia de navegación.
          </p>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar
            algunas funcionalidades del sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">5. Enlaces Externos</h2>
          <p className="text-slate-600 leading-relaxed">
            Este sitio puede contener enlaces a sitios web externos. No nos hacemos responsables
            de las prácticas de privacidad de dichos sitios. Te recomendamos leer sus políticas
            de privacidad antes de proporcionar cualquier información.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">6. Cambios en esta Política</h2>
          <p className="text-slate-600 leading-relaxed">
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
            Los cambios serán efectivos inmediatamente después de su publicación en esta página.
            Te recomendamos revisar esta política periódicamente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">7. Información para Usuarios de la UE (GDPR)</h2>
          <p className="mb-4 text-slate-600 leading-relaxed">
            Si te encuentras en el Espacio Económico Europeo (EEE), tienes derechos bajo el
            Reglamento General de Protección de Datos (GDPR), incluyendo:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
            <li>Derecho de acceso a tus datos personales</li>
            <li>Derecho a rectificación de datos incorrectos</li>
            <li>Derecho a eliminación de datos</li>
            <li>Derecho a restringir el procesamiento</li>
            <li>Derecho a la portabilidad de datos</li>
            <li>Derecho a oponerte al procesamiento</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Dado que no recopilamos datos personales directamente, la mayoría de estos derechos
            se aplicarían a través de Google AdSense. Para ejercer tus derechos con respecto a
            las cookies de AdSense, visita la configuración de anuncios de Google mencionada anteriormente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">8. Niños</h2>
          <p className="text-slate-600 leading-relaxed">
            Este sitio no está dirigido a niños menores de 13 años. No recopilamos conscientemente
            información personal de niños menores de 13 años. Si eres padre o tutor y crees que
            tu hijo nos ha proporcionado información personal, contáctanos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">9. Contacto</h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos:
          </p>
          <p className="text-slate-600 leading-relaxed">
            Email: <a href="mailto:tu-email@ejemplo.com" className="text-blue-600 hover:text-blue-800 underline">
              [AGREGAR TU EMAIL AQUÍ]
            </a>
          </p>
        </section>

        <section className="pt-6 border-t-2 border-slate-200">
          <p className="text-sm text-slate-500">
            Última actualización: {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </section>
      </div>
    </div>
  );
}
