import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function Nosotros() {
  return (
    <>
      <NavBar />  
      <section className="min-h-screen px-6 md:px-16 py-20 bg-gradient-to-b from-[#f5efe6] via-[#faf6f0] to-[#ede4d4] text-center">
        <h1 className="text-4xl font-bold text-[#4e342e] mb-6">
            Sobre Nosotros
        </h1>   
        <p className="max-w-2xl mx-auto text-[#5d4037] text-lg font-serif leading-relaxed">
            Somos estudiantes de análisis y desarrollo de software. 
            Este proyecto hace parte de nuestro proceso de aprendizaje, donde estamos
            poniendo en práctica lo que hemos aprendido en clase. 
        </p>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:scale-105 transition border border-[#d7ccc8]">
                <h3 className="font-semibold text-xl mb-2 text-[#4e342e]">¿Qué estamos haciendo?</h3>
                <p className="text-[#6d4c41]">Aprendiendo a crear aplicaciones y mejorar nuestras habilidades en programación.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:scale-105 transition border border-[#d7ccc8]">
                <h3 className="font-semibold text-xl mb-2 text-[#4e342e]">¿Qué queremos lograr?</h3>
                <p className="text-[#6d4c41]">Terminar nuestro proyecto funcionando correctamente y seguir mejorando como desarrolladores.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:scale-105 transition border border-[#d7ccc8]">
                <h3 className="font-semibold text-xl mb-2 text-[#4e342e]">¿Cómo trabajamos?</h3>
                <p className="text-[#6d4c41]">Trabajamos en equipo, aprendiendo de los errores y apoyándonos entre nosotros.</p>
            </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-[#4e342e] mb-10">
                Equipo de desarrollo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                <div className="text-center">
                    <img src="/tatiana.jpeg" 
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Kelly Tatiana Capera Montiel</p>
                    <p className="text-sm text-[#6d4c41]">Gerente de proyecto</p>
                </div>

                <div className="text-center">
                    <img src="/andres.jpeg"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Johan Andres Diaz Ospina</p>
                    <p className="text-sm text-[#6d4c41]">Analista y desarrollador</p>
                </div>

                <div className="text-center">
                    <img src="/camilo.jpeg"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Camilo Andres Betancourt Buitrago</p>
                    <p className="text-sm text-[#6d4c41]">Analista y desarrollador</p>
                </div>

                <div className="text-center">
                    <img src="/sebastian.jpeg"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Jhoan Sebastian Cabezas Ruiz</p>
                    <p className="text-sm text-[#6d4c41]">Analista y desarrollador</p>
                </div>
            </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-[#4e342e] mb-10">
                Instructores técnicos 
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                <div className="text-center">
                    <img src="https://ui-avatars.com/api/?name=Myriam+Gonzales&background=6d4c41&color=fff"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Myriam Janeth Gonzales Reyes</p>
                    <p className="text-sm text-[#6d4c41]">Ing. software, especialista en base de datos</p>
                </div>
                <div className="text-center">
                    <img src="https://ui-avatars.com/api/?name=Euclidez+Basto&background=6d4c41&color=fff"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Euclidez Norbey Basto Ortiz</p>
                    <p className="text-sm text-[#6d4c41]">Ing. de sistemas</p>
                </div>
                <div className="text-center">
                    <img src="https://ui-avatars.com/api/?name=Sandra+Forero&background=6d4c41&color=fff"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Sandra Consuelo Forero</p>
                    <p className="text-sm text-[#6d4c41]">Medico Veterinario y Zootecnista. instructora a cargo de la unidad</p>
                </div>
                <div className="text-center">
                    <img src="https://ui-avatars.com/api/?name=Jorge+Andrade&background=6d4c41&color=fff"
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-md hover:scale-105 transition border-4 border-[#d7ccc8]"/>
                    <p className="mt-3 font-semibold text-[#4e342e]">Jorge Eliecer Andrade</p>
                    <p className="text-sm text-[#6d4c41]">ing. informático</p>
                </div>
            </div>
        </div>
      </section>  
      <Footer/>                        
    </>
  );
}