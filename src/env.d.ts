/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SCREENSHOT_API_KEY: string;
    // Puedes añadir más variables aquí si las usas
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}