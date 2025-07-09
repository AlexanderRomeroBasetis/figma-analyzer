import { FigmaNode } from './nodes.interface.js';

/**
 * Interfaces para las respuestas de archivos de Figma
 */

// Información de componente
export interface Component {
    key: string;
    name: string;
    description: string;
    documentationLinks?: Array<{uri: string}>;
    remote?: boolean;
    componentSetId?: string;
}

// Información de conjunto de componentes
export interface ComponentSet {
    key: string;
    name: string;
    description: string;
    documentationLinks?: Array<{uri: string}>;
    remote?: boolean;
}

// Información de estilo
export interface Style {
    key: string;
    name: string;
    description: string;
    remote?: boolean;
    styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

// Respuesta principal del archivo
export interface FigmaFileResponse {
    name: string;
    role: 'owner' | 'editor' | 'viewer';
    lastModified: string; // ISO date string
    editorType: 'figma' | 'figjam';
    thumbnailUrl: string;
    version: string;
    document: FigmaNode;
    components: Record<string, Component>;
    componentSets: Record<string, ComponentSet>;
    schemaVersion: number;
    styles: Record<string, Style>;
    linkAccess?: 'inherit' | 'view' | 'edit';
}

// Respuesta de nodos específicos
export interface FigmaNodesResponse {
    name: string;
    role: 'owner' | 'editor' | 'viewer';
    lastModified: string;
    editorType: 'figma' | 'figjam';
    thumbnailUrl: string;
    version: string;
    linkAccess?: 'inherit' | 'view' | 'edit';
    nodes: Record<string, {
        document: FigmaNode;
        components: Record<string, Component>;
        componentSets: Record<string, ComponentSet>;
        schemaVersion: number;
        styles: Record<string, Style>;
    }>;
}
