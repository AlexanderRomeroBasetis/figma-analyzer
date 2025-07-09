/**
 * Interfaces para las respuestas de la API de Figma
 * Basadas en la estructura JSON obtenida del endpoint /v1/me
 */

export interface FigmaUser {
    id: string;
    email: string;
    handle: string;
    img_url: string;
}

export interface FigmaUserResponse {
    user?: FigmaUser;
    error?: string;
}
