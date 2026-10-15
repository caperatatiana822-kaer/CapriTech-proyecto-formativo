import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <NavBar />

      <section className="min-h-screen flex items-center justify-center px-6 bg-white py-16">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            <div className="flex-1 flex justify-center relative">
              <div className="absolute w-56 md:w-64 h-56 md:h-64 rounded-2xl bg-[#844243]/20 -rotate-6"></div>
              <img
                src="/cabra.jpg.jpeg"
                alt="Cabra"
                className="w-56 md:w-64 rounded-2xl shadow-xl hover:scale-105 transition duration-300 relative z-10 border border-gray-200"
              />
            </div>

            <div className="flex-[2] text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-3">
                <span className="text-gray-900">Bienvenido a </span>
                <span className="text-[#844243]">CapriTech</span>
              </h1>
              <div className="w-20 h-1 bg-[#844243] mx-auto mb-6 rounded-full"></div>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto font-sans">
                <span className="font-bold text-gray-900">CapriTech</span> es una aplicación web desarrollada para optimizar la gestión de la información
                en la unidad de caprinos del Centro Agropecuario La Granja SENA, en Espinal - Tolima.
                El sistema permite registrar, organizar y consultar datos relacionados con los animales,
                como alimentación, sanidad, nacimientos, producción y control del inventario,
                facilitando procesos que actualmente se realizan de forma manual.
                Con esta solución se busca mejorar la eficiencia,
                reducir errores y apoyar la toma de decisiones mediante el uso de herramientas tecnológicas accesibles y de fácil uso.
              </p>

              <a href="/unidad">
                <button className="bg-[#844243] hover:bg-[#6E3536] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300 mt-8 text-sm">
                  Acerca de la unidad
                </button>
              </a>
            </div>

            <div className="flex-1 flex justify-center relative">
              <div className="absolute w-56 md:w-64 h-56 md:h-64 rounded-2xl bg-[#844243]/20 rotate-6"></div>
              <img
                src="/cabra2.jpg.jpeg"
                alt="Cabra"
                className="w-56 md:w-64 rounded-2xl shadow-xl hover:scale-105 transition duration-300 relative z-10 border border-gray-200"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}