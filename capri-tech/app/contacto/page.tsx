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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 md:p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📍</span>
                <h3 className="text-xl font-heading font-bold text-gray-900">
                  Información de contacto
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="bg-[#844243]/10 p-3 rounded-full">
                    <FaEnvelope className="text-[#844243] text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Correo electrónico</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">capritech@gmail.com</p>
                  </div>
                </div>

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
                    className="w-full h-64 rounded-xl shadow-sm border border-gray-100"
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación SENA La Granja"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="bg-[#844243] rounded-2xl shadow-md p-8 md:p-10 text-white flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🐐</span>
                <h3 className="text-xl font-heading font-bold">
                  Sobre CapriTech
                </h3>
              </div>

              <p className="text-sm text-white/90 leading-relaxed">
                Si tienes dudas, sugerencias o necesitas soporte técnico, no dudes en contactarnos.
                Estamos comprometidos con el mejoramiento continuo del sistema.
              </p>

              <a
                href="https://wa.me/573208730189"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-all duration-300 p-4 rounded-xl group"
              >
                <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm">WhatsApp</p>
                  <p className="text-white/70 text-xs">+57 320 873 0189</p>
                </div>
                <span className="ml-auto text-white/50 group-hover:text-white transition-colors">→</span>
              </a>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-xs text-white/70">
                  📍 Espinal, Tolima - Colombia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <a
        href="https://wa.me/573000000000"
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