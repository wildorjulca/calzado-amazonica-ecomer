import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full flex justify-center items-center mt-14 mb-14">
            <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
                <p className="font-semibold text-base">Zuela Amazónica</p>
                <p>Tienda online de zapatillas.</p>

                <p className="mt-3">
                    © {year} Zuela Amazónica — Desarrollado con ❤️
                </p>
            </div>
        </footer>
    );
};

export default Footer;