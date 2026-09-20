import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <NavBar />

      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-[#f5efe6] via-[#faf6f0] to-[#ede4d4] py-16">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            <div className="flex-1 flex justify-center">
              <img
                src="/cabra.jpg.jpeg"
                alt="Cabra"
                className="w-56 md:w-64 rounded-2xl shadow-xl hover:scale-105 transition duration-300 border-4 border-[#d7ccc8]"
              />
            </div>

            <div className="flex-[2] text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5d4037] tracking-wide mb-1">
                Bienvenido a CapriTech
              </h1>
              <div className="w-20 h-0.5 bg-[#8d6e63] mx-auto mb-5"></div>

              <p className="text-base md:text-lg text-[#5d4037] leading-relaxed font-serif max-w-2xl mx-auto">
                <span className="font-bold text-[#4e342e]">CapriTech</span> es una aplicación web desarrollada para optimizar la gestión de la información
                en la unidad de caprinos del Centro Agropecuario La Granja SENA, en Espinal - Tolima.
                El sistema permite registrar, organizar y consultar datos relacionados con los animales,
                como alimentación, sanidad, nacimientos, producción y control del inventario,
                facilitando procesos que actualmente se realizan de forma manual.
                Con esta solución se busca mejorar la eficiencia,
                reducir errores y apoyar la toma de decisiones mediante el uso de herramientas tecnológicas accesibles y de fácil uso.
              </p>

              <a href="/unidad">
                <button className="bg-[#6d4c41] hover:bg-[#4e342e] text-[#f5efe6] font-serif font-semibold px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-[#8d6e63] mt-5 text-sm">
                  Acerca de la unidad
                </button>
              </a>
            </div>

            {/* Imagen derecha */}
            <div className="flex-1 flex justify-center">
              <img
                src="/cabra2.jpg.jpeg"
                alt="Cabra"
                className="w-56 md:w-64 rounded-2xl shadow-xl hover:scale-105 transition duration-300 border-4 border-[#d7ccc8]"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}