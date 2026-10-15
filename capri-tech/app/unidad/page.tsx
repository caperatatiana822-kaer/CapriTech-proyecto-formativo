import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function Unidad() {
  return (
    <>
      <NavBar />

      <section className="relative h-[70vh] flex items-end px-6 md:px-12 pt-6">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/unidad2.jpeg"
            alt="Unidad de caprinos"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 h-full flex items-end px-8 md:px-16 pb-12 text-left">
            <div>
              <div className="inline-block bg-[#844243] text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
                Centro Agropecuario La Granja SENA Regional-Tolima
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white max-w-2xl">
                Unidad de Caprinos
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
              ¿Dónde estamos?
            </h2>
            <div className="w-16 h-1 bg-[#844243] rounded-full mb-6"></div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Ubicada en el <span className="font-semibold text-[#844243]">KM5 vía Espinal - Ibagué</span>,
              junto a las unidades de ganadería y porcinos, la unidad de caprinos
              está a cargo de la instructora técnica <span className="font-semibold text-[#844243]">Sandra Consuelo Forero</span>,
              médica veterinaria zootecnista, encargada del manejo y control de los animales.
            </p>
          </div>
          <img
            src="/unidad.jpg.jpeg"
            alt="Cabra unidad caprina"
            className="rounded-2xl shadow-lg w-full h-80 object-cover border border-gray-100"
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
              Nuestra unidad en números
            </h2>
            <div className="w-16 h-1 bg-[#844243] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100 p-6 text-center">
              <p className="text-4xl font-heading font-extrabold text-[#844243]">37</p>
              <p className="text-gray-600 text-sm mt-2 font-medium">Semovientes</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100 p-6 text-center">
              <p className="text-4xl font-heading font-extrabold text-[#844243]">16</p>
              <p className="text-gray-600 text-sm mt-2 font-medium">Cabras alpinas</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100 p-6 text-center">
              <p className="text-4xl font-heading font-extrabold text-[#844243]">9</p>
              <p className="text-gray-600 text-sm mt-2 font-medium">Cabras bóer</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100 p-6 text-center">
              <p className="text-4xl font-heading font-extrabold text-[#844243]">4</p>
              <p className="text-gray-600 text-sm mt-2 font-medium">Machos reproductores</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}