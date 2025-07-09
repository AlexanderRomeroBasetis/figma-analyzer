/**
 * Interfaces for Figma API responses
 * Based on JSON structure obtained from the /v1/me endpoint
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
