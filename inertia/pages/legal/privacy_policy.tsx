import { Head } from '@inertiajs/react'
import LegalLayout from '~/layouts/legal'

export default function PrivacyPolicy() {
  return (
    <>
      <Head title="Política de privacidad" />

      <LegalLayout
        title="Política de privacidad"
        description="Este aviso explica qué datos personales trata Vetcita, para qué los utiliza y cómo puedes ejercer tus derechos."
        updatedAt="21 de agosto de 2026"
      >
        <section>
          <h2>1. Responsable y contacto</h2>
          <p>
            Matthieu WARNAULT, quien opera en México bajo el nombre comercial Vetcita, es responsable del tratamiento de
            los datos personales obtenidos directamente para administrar cuentas, seguridad, soporte y operación de la
            plataforma.
          </p>
          <p>
            Para cualquier cuestión relacionada con privacidad o para ejercer tus derechos, puedes escribir a{' '}
            <a href="mailto:contacto@vetcita.com">contacto@vetcita.com</a>.
          </p>
        </section>

        <section>
          <h2>2. Papel de Vetcita y de las clínicas</h2>
          <p>
            Cuando una clínica incorpora o consulta datos de sus clientes, mascotas, citas y expedientes veterinarios,
            la clínica determina las finalidades y el uso de esa información. En esos casos, Vetcita actúa como
            prestador tecnológico y trata los datos por cuenta e instrucciones de la clínica.
          </p>
          <p>
            Si reservaste una cita o deseas ejercer derechos sobre información contenida en el expediente de una
            mascota, debes contactar primero a la clínica correspondiente. Vetcita colaborará con la clínica para
            atender la solicitud cuando sea necesario.
          </p>
        </section>

        <section>
          <h2>3. Datos que tratamos</h2>
          <p>Según la forma en que utilices Vetcita, podemos tratar las siguientes categorías:</p>
          <ul>
            <li>
              <strong>Usuarios profesionales:</strong> nombre, apellidos, correo electrónico, teléfono, contraseña
              protegida mediante hash, rol, clínica, agenda y datos de acceso.
            </li>
            <li>
              <strong>Clínicas:</strong> nombre comercial, datos de contacto, dirección, horarios, servicios, precios,
              equipo, logotipo, portada y especies atendidas.
            </li>
            <li>
              <strong>Clientes de las clínicas:</strong> nombre, apellidos, teléfono, correo electrónico y notas
              introducidas por la clínica.
            </li>
            <li>
              <strong>Mascotas:</strong> nombre, especie, raza, fecha de nacimiento, sexo, esterilización, color, peso,
              grupo sanguíneo, alergias y notas.
            </li>
            <li>
              <strong>Citas y expediente veterinario:</strong> fechas, servicios, profesional asignado, estado de la
              cita, motivo de consulta, síntomas, diagnóstico, tratamiento, prescripciones y vacunas.
            </li>
            <li>
              <strong>Datos técnicos:</strong> sesión, dirección IP, fecha y hora de acceso, identificadores técnicos,
              registros de seguridad, navegador y datos necesarios para diagnosticar errores.
            </li>
          </ul>
          <p>
            Vetcita no solicita datos médicos de personas. Las referencias clínicas incluidas en la plataforma se
            refieren a animales y son gestionadas por profesionales veterinarios.
          </p>
        </section>

        <section>
          <h2>4. Cómo obtenemos los datos</h2>
          <p>La información puede ser proporcionada:</p>
          <ul>
            <li>directamente por ti al crear o actualizar una cuenta;</li>
            <li>por una clínica al invitar a su equipo o administrar sus registros;</li>
            <li>por una persona al completar una solicitud de cita;</li>
            <li>automáticamente mediante registros técnicos y cookies necesarias.</li>
          </ul>
        </section>

        <section>
          <h2>5. Finalidades necesarias</h2>
          <p>Utilizamos los datos para:</p>
          <ul>
            <li>crear, autenticar y proteger cuentas;</li>
            <li>administrar clínicas, agendas, servicios, disponibilidad y miembros del equipo;</li>
            <li>registrar, confirmar, modificar y recordar citas;</li>
            <li>permitir a las clínicas gestionar clientes, mascotas y expedientes veterinarios;</li>
            <li>enviar invitaciones, avisos de seguridad y comunicaciones operativas;</li>
            <li>prestar soporte, resolver errores y prevenir fraude o accesos no autorizados;</li>
            <li>cumplir obligaciones legales y atender solicitudes de autoridades competentes.</li>
          </ul>
          <p>
            Estas finalidades son necesarias para prestar el servicio solicitado. No utilizamos los datos para
            publicidad, creación de perfiles comerciales ni venta de información personal.
          </p>
        </section>

        <section>
          <h2>6. Consentimiento y tratamiento</h2>
          <p>
            El tratamiento se realiza con base en el consentimiento informado, la relación contractual o las
            obligaciones legales aplicables, según corresponda. Cuando Vetcita actúa por cuenta de una clínica, esta
            última es responsable de contar con las autorizaciones necesarias y de informar a sus clientes sobre el uso
            de sus datos.
          </p>
          <p>
            Puedes retirar tu consentimiento cuando el tratamiento dependa de él. La revocación no tendrá efectos
            retroactivos y puede impedir que continuemos prestando determinadas funciones.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Vetcita utiliza únicamente cookies técnicas necesarias para autenticar usuarios, mantener la sesión,
            proteger formularios y preservar la seguridad de la plataforma. No utilizamos cookies publicitarias ni de
            analítica de terceros.
          </p>
          <p>
            Desactivar estas cookies desde el navegador puede impedir el inicio de sesión o el funcionamiento correcto
            de algunas áreas de Vetcita.
          </p>
        </section>

        <section>
          <h2>8. Proveedores e infraestructura</h2>
          <p>
            Para operar Vetcita utilizamos proveedores que tratan información únicamente para prestar sus servicios:
          </p>
          <ul>
            <li>
              <strong>Hetzner:</strong> alojamiento del servidor y de la base de datos autohospedada, actualmente en
              Estados Unidos.
            </li>
            <li>
              <strong>Cloudflare:</strong> almacenamiento de imágenes y archivos mediante Cloudflare R2.
            </li>
            <li>
              <strong>Brevo:</strong> envío de correos transaccionales, recordatorios e invitaciones.
            </li>
          </ul>
          <p>
            Estos proveedores pueden procesar datos fuera de México. Vetcita adopta medidas contractuales, técnicas y
            organizativas razonables para proteger la información durante estos tratamientos internacionales.
          </p>
          <p>
            Actualmente no utilizamos Stripe, Google o Facebook para tratar datos dentro de Vetcita. Si se incorporan
            pagos o métodos de acceso social, este aviso será actualizado antes de su activación.
          </p>
        </section>

        <section>
          <h2>9. Comunicación y transferencia de datos</h2>
          <p>
            No vendemos ni alquilamos datos personales. La información puede comunicarse a la clínica con la que se
            solicita una cita, a los proveedores descritos anteriormente, cuando sea necesario para prestar el servicio,
            o a una autoridad competente cuando exista una obligación legal.
          </p>
          <p>
            Los miembros autorizados de una clínica pueden acceder a la información de sus clientes y mascotas de
            acuerdo con los permisos y necesidades operativas definidos por esa clínica.
          </p>
        </section>

        <section>
          <h2>10. Conservación y eliminación</h2>
          <p>
            Los datos se conservan mientras la cuenta o el workspace permanezcan activos y durante el tiempo necesario
            para las finalidades descritas. La clínica determina la conservación de los expedientes veterinarios bajo su
            responsabilidad y conforme a las obligaciones que le resulten aplicables.
          </p>
          <p>
            Cualquier usuario puede solicitar la eliminación de su cuenta escribiendo a{' '}
            <a href="mailto:contacto@vetcita.com">contacto@vetcita.com</a>. Esta solicitud elimina su cuenta y sus
            accesos, pero no los registros que la clínica deba conservar bajo su responsabilidad. El propietario de un
            workspace también puede solicitar la eliminación completa de la clínica y de los datos asociados.
          </p>
          <p>
            Vetcita atenderá la eliminación en un plazo máximo de 30 días, salvo información que deba conservarse por
            una obligación legal, de seguridad o para atender una controversia. Los tokens temporales y registros
            técnicos se conservan únicamente durante el periodo necesario para su función y seguridad.
          </p>
        </section>

        <section>
          <h2>11. Seguridad</h2>
          <p>
            Aplicamos medidas administrativas, técnicas y organizativas orientadas a evitar pérdida, alteración,
            destrucción, acceso o uso no autorizado. Entre ellas se incluyen el cifrado de comunicaciones, protección de
            contraseñas mediante hash, control de acceso por roles, aislamiento de datos por clínica y supervisión de la
            infraestructura.
          </p>
          <p>
            Ningún sistema es completamente infalible. Si detectamos un incidente que pueda afectar de forma
            significativa los derechos de las personas, actuaremos y notificaremos conforme a la legislación aplicable.
          </p>
        </section>

        <section>
          <h2>12. Derechos ARCO</h2>
          <p>
            Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos personales,
            así como limitar su uso o revocar tu consentimiento, escribiendo a{' '}
            <a href="mailto:contacto@vetcita.com">contacto@vetcita.com</a>.
          </p>
          <p>La solicitud debe incluir:</p>
          <ul>
            <li>tu nombre y un medio para recibir la respuesta;</li>
            <li>una descripción clara del derecho que deseas ejercer y de los datos relacionados;</li>
            <li>los elementos que permitan acreditar tu identidad o representación;</li>
            <li>cualquier información que facilite la localización de los datos.</li>
          </ul>
          <p>
            Responderemos dentro de los plazos establecidos por la legislación mexicana. Cuando la información sea
            controlada por una clínica, remitiremos o coordinaremos la solicitud con esa clínica.
          </p>
        </section>

        <section>
          <h2>13. Personas menores de edad</h2>
          <p>
            Vetcita está dirigido a personas de 18 años o más. No buscamos recopilar conscientemente datos personales
            directamente de menores. Si consideras que un menor proporcionó información sin la autorización
            correspondiente, escríbenos para revisarla y, cuando proceda, eliminarla.
          </p>
        </section>

        <section>
          <h2>14. Cambios al aviso</h2>
          <p>
            Podemos actualizar esta política por cambios legales, técnicos o en las funciones de Vetcita. Publicaremos
            la versión vigente en esta página e indicaremos la fecha de actualización. Los cambios sustanciales se
            comunicarán mediante la plataforma, por correo electrónico o por otro medio razonable.
          </p>
        </section>

        <section>
          <h2>15. Contacto</h2>
          <p>
            Para preguntas, solicitudes o quejas relacionadas con privacidad, escribe a{' '}
            <a href="mailto:contacto@vetcita.com">contacto@vetcita.com</a>.
          </p>
        </section>
      </LegalLayout>
    </>
  )
}

PrivacyPolicy.layout = (page: React.ReactElement) => <>{page}</>
