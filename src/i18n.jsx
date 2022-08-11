import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Dashboard": "Dashboard",
                    "Default": "Default",
                    "E-Commerce": "E-Commerce",
                    "University": "University",
                    "Server": "Server",
                    "Project": "Project",
                    "Support Ticket": "Support Ticket",
                }
            },
            es: {
                translations: {
                    "Dashboard": "Tablero",
                    "Default": "Defecto",
                    "E-Commerce": "Comercio electronico",
                    "University": "Universidad",
                    "Server": "Servidor",
                    "Project": "Proyecto",
                    "Support Ticket": "Boleto de soporte",
                }
            },
            fr: {
                translations: {
                    "Dashboard": "Tableau de bord",
                    "Default": "Défaut",
                    "E-Commerce": "E-Commerce",
                    "University": "Université",
                    "Server": "Serveur",
                    "Project": "Projet",
                    "Support Ticket": "Ticket de support",
                }
            },
            pt: {
                translations: {
                    "Dashboard": "painel de controle",
                    "Default": "Padrão",
                    "E-Commerce": "Comércio Eletrônico",
                    "University": "Universidade",
                    "Server": "Servidor",
                    "Project": "Projeto",
                    "Support Ticket": "Bilhete de Suporte",
                }
            }
        },
        fallbackLng: "en",
        debug: false,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
