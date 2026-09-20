import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <NavBar />

      <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#f5efe6] via-[#faf6f0] to-[#ede4d4]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-block bg-[#d7ccc8] text-[#4e342e] px-6 py-2 rounded-full text-sm font-semibold mb-4">
              📬 Contáctanos
            </div>
            <p className="text-[#5d4037] mt-3 text-lg max-w-2xl mx-auto font-serif">
              Estamos aquí para ayudarte, comunícate con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información de contacto */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-[#d7ccc8]">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📍</span>
                <h3 className="text-2xl font-bold text-[#4e342e]">
                  Información de contacto
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-[#f5efe6] rounded-2xl hover:bg-[#ede4d4] transition-colors duration-300">
                  <div className="bg-[#d7ccc8] p-3 rounded-full">
                    <FaEnvelope className="text-[#4e342e] text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6d4c41] font-medium">Correo electrónico</p>
                    <p className="text-[#4e342e] font-semibold">capritech@gmail.com</p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start gap-4 p-4 bg-[#f5efe6] rounded-2xl hover:bg-[#ede4d4] transition-colors duration-300">
                  <div className="bg-[#d7ccc8] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-[#4e342e] text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6d4c41] font-medium">Ubicación</p>
                    <p className="text-[#4e342e] font-semibold">
                      SENA Centro Agropecuario La Granja, Espinal - Tolima
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps?q=SENA%20Centro%20Agropecuario%20La%20Granja%20Espinal%20Tolima&output=embed"
                    className="w-full h-64 rounded-2xl shadow-inner border-2 border-[#d7ccc8]"
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación SENA La Granja"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-gradient-to-br from-[#6d4c41] to-[#4e342e] rounded-3xl shadow-xl p-8 md:p-10 text-[#f5efe6]">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🌐</span>
                <h3 className="text-2xl font-bold">
                  Redes sociales
                </h3>
              </div>

              <div className="space-y-4">
                <a 
                  href="#" 
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-2xl group"
                >
                  <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaFacebook size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">Facebook</p>
                    <p className="text-[#d7ccc8] text-sm">CapriTech Oficial</p>
                  </div>
                  <span className="ml-auto text-white/50 group-hover:text-white transition-colors">→</span>
                </a>

                <a 
                  href="#" 
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-2xl group"
                >
                  <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaInstagram size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">Instagram</p>
                    <p className="text-[#d7ccc8] text-sm">@capritech</p>
                  </div>
                  <span className="ml-auto text-white/50 group-hover:text-white transition-colors">→</span>
                </a>

                <a 
                  href="https://wa.me/573208730189" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-2xl group"
                >
                  <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-[#d7ccc8] text-sm">+57 320 873 0189</p>
                  </div>
                  <span className="ml-auto text-white/50 group-hover:text-white transition-colors">→</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-[#d7ccc8] mt-1">
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
        className="fixed bottom-6 right-6 bg-[#6d4c41] hover:bg-[#4e342e] p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <FaWhatsapp size={28} className="text-[#f5efe6]" />
        <span className="absolute right-full mr-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Escríbenos
        </span>
      </a>
    </>
  );
}