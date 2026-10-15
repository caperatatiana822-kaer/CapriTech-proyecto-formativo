export default function Footer() {
    const linkSections = [
        {
            title: "Navegación",
            links: ["Inicio", "Nosotros", "Contacto", "Ingresar"]
        },
        {
            title: "Módulos",
            links: ["Alimentación", "Pesaje", "Producción lechera", "Montas", "Gestión de usuarios", "Nacimientos", "Responsables", "Sanidad", "Mortalidad"]
        },
        {
            title: "Información",
            links: ["Centro Agropecuario La Granja",
            "SENA Regional Tolima",
            "Unidad caprina"]
        }
    ];

    return (
        <>
            <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 text-gray-700">

                    <div className="max-w-md">
                        <img 
                            className="w-16 md:w-20"
                            src="/logo.jpg.png"  
                            alt="logo"
                        />

                        <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                            CapriTech es un sistema de información desarrollado para apoyar la gestión de la unidad caprina del Centro Agropecuario La Granja - SENA. Su propósito es facilitar el registro, consulta y administración de la información de los animales y de los procesos realizados en la unidad.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-8">
                        {linkSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-heading font-semibold text-sm text-[#844243] uppercase tracking-wider mb-4">
                                    {section.title}
                                </h3>
                                <ul className="text-sm space-y-2">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a 
                                                href="#" 
                                                className="text-gray-600 hover:text-[#844243] transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 py-6">
                    <p className="text-center text-xs md:text-sm text-gray-500">
                        © 2026 CapriTech | Centro Agropecuario La Granja SENA.
                    </p>
                </div>
            </footer>
        </>
    );
}