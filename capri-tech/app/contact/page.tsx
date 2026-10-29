import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <NavBar />

      <section className="min-h-screen px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#844243]/10 text-[#844243] px-6 py-2 rounded-full text-sm font-semibold mb-4">
              📬 Contáctanos
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
              Estamos aquí para ayudarte
            </h1>
            <p className="text-gray-600 mt-3 text-base max-w-2xl mx-auto">
              Comunícate con nosotros.
            </p>
          </div>
          <div className="bg-[#844243] rounded-2xl shadow-md p-8 md:p-10 text-white flex flex-col max-w-lg mx-auto mb-10">
            <div className="flex items-center gap-3 mb-4">  
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              🐐 Si tienes dudas, sugerencias o necesitas soporte técnico, no dudes en contactarnos.
              Estamos comprometidos con el mejoramiento continuo del sistema.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📍</span>
                <h3 className="text-xl font-heading font-bold text-gray-900">
                  Información de contacto
                </h3>
              </div>

              <div className="space-y-5">
                                <a
                  href="mailto:capritechunidaddcaprina@gmail.com"
                  className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-[#844243]/5 rounded-xl transition-colors duration-300 group"
                >
                  <div className="bg-[#844243]/10 p-3 rounded-full">
                    <FaEnvelope className="text-[#844243] text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Correo electrónico</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5 group-hover:text-[#844243] transition-colors break-all">
                      capritechunidaddcaprina@gmail.com
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#844243] transition-colors mt-2">→</span>
                </a>
                <a
                  href="https://wa.me/573208730189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-[#844243]/5 rounded-xl transition-colors duration-300 group"
                >
                  <div className="bg-[#25D366]/10 p-3 rounded-full">
                    <FaWhatsapp className="text-[#25D366] text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">WhatsApp</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5 group-hover:text-[#844243] transition-colors">
                      +57 320 873 0189
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#844243] transition-colors mt-2">→</span>
                </a>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="bg-[#844243]/10 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-[#844243] text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Ubicación</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">
                      SENA Centro Agropecuario La Granja, Espinal - Tolima
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <iframe
                    src="https://www.google.com/maps?q=SENA%20Centro%20Agropecuario%20La%20Granja%20Espinal%20Tolima&output=embed"
                    className="w-full h-96 rounded-xl shadow-sm border border-gray-100"
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación SENA La Granja"
                  ></iframe>
                </div>
                <div className="pt-6 mt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500">
                  <FaMapMarkerAlt className="text-[#844243]" />
                  <p className="text-sm font-medium">Espinal, Tolima - Colombia</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <a
        href="https://wa.me/573208730189"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1EBE5A] p-4 rounded-full shadow-xl hover:scale-125 transition-all duration-300 flex items-center justify-center z-50 group animate-pulso-whatsapp"
      >
        <FaWhatsapp size={24} className="text-white" />
        <span className="absolute right-full mr-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Escríbenos
        </span>
      </a>
    </>
  );
}