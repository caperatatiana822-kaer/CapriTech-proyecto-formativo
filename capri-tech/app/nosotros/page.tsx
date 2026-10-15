import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function Nosotros() {
    return (
        <>
            <NavBar />

            <section className="min-h-screen px-6 md:px-16 py-20 bg-white">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#844243]/10 text-[#844243] px-6 py-2 rounded-full text-sm font-semibold mb-4">
                        👥 Conócenos
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                        Sobre Nosotros
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
                        Somos estudiantes de análisis y desarrollo de software.
                        Este proyecto hace parte de nuestro proceso de aprendizaje, donde estamos
                        poniendo en práctica lo que hemos aprendido en clase.
                    </p>
                </div>

                {/* Tarjetas de preguntas */}

                {/* Tarjetas de preguntas */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-[#844243]/10 flex items-center justify-center mb-5 text-3xl">
                            🎯
                        </div>
                        <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900">
                            ¿Qué estamos haciendo?
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Aprendiendo a crear aplicaciones y mejorar nuestras habilidades en programación.
                        </p>
                    </div>

                    <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-[#844243]/10 flex items-center justify-center mb-5 text-3xl">
                            🚀
                        </div>
                        <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900">
                            ¿Qué queremos lograr?
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Terminar nuestro proyecto funcionando correctamente y seguir mejorando como desarrolladores.
                        </p>
                    </div>

                    <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-[#844243]/10 flex items-center justify-center mb-5 text-3xl">
                            🤝
                        </div>
                        <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900">
                            ¿Cómo trabajamos?
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Trabajamos en equipo, aprendiendo de los errores y apoyándonos entre nosotros.
                        </p>
                    </div>
                </div>



                {/* Equipo de desarrollo */}

                {/* Equipo de desarrollo */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
                            Equipo de desarrollo
                        </h2>
                        <div className="w-16 h-1 bg-[#844243] mx-auto mt-3 rounded-full"></div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="text-center">
                            <img
                                src="/tatiana.jpeg"
                                alt="Tatiana Capera"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Kelly Tatiana Capera Montiel</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Gerente de proyecto</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="/andres.jpeg"
                                alt="Johan Andres Diaz"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Johan Andres Diaz Ospina</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Analista y desarrollador</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="/camilo.jpeg"
                                alt="Camilo Betancourt"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Camilo Andres Betancourt Buitrago</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Analista y desarrollador</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="/sebastian.jpeg"
                                alt="Jhoan Sebastian Cabezas"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Jhoan Sebastian Cabezas Ruiz</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Analista y desarrollador</p>
                        </div>
                    </div>
                </div>

                {/* Instructores técnicos */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
                            Instructores técnicos
                        </h2>
                        <div className="w-16 h-1 bg-[#844243] mx-auto mt-3 rounded-full"></div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="text-center">
                            <img
                                src="https://ui-avatars.com/api/?name=Myriam+Gonzales&background=844243&color=fff&size=256"
                                alt="Myriam Gonzales"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Myriam Janeth Gonzales Reyes</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">
                                Ing. software, especialista en base de datos
                            </p>
                        </div>

                        <div className="text-center">
                            <img
                                src="https://ui-avatars.com/api/?name=Euclidez+Basto&background=844243&color=fff&size=256"
                                alt="Euclidez Basto"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Euclidez Norbey Basto Ortiz</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Ing. de sistemas</p>
                        </div>

                        <div className="text-center">
                            <img
                                src="https://ui-avatars.com/api/?name=Sandra+Forero&background=844243&color=fff&size=256"
                                alt="Sandra Forero"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Sandra Consuelo Forero</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">
                                Médico Veterinario y Zootecnista - Instructora a cargo de la unidad
                            </p>
                        </div>

                        <div className="text-center">
                            <img
                                src="https://ui-avatars.com/api/?name=Jorge+Andrade&background=844243&color=fff&size=256"
                                alt="Jorge Andrade"
                                className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition duration-300 border-4 border-gray-100"
                            />
                            <p className="mt-5 font-semibold text-gray-900 text-base">Jorge Eliecer Andrade</p>
                            <p className="text-sm text-[#844243] font-medium mt-1">Ing. informático</p>
                        </div>
                    </div>
                </div>

        </section >

            <Footer />
        </>
    );
}