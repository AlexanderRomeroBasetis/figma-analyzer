/**
 * Interfaces principales para las respuestas de la API de Figma
 * 
 * Este módulo contiene todas las interfaces TypeScript necesarias para trabajar
 * con las respuestas JSON de la API de Figma, basadas en la estructura real
 * obtenida de los endpoints de la API.
 */

// Exportar interfaces de usuario
export * from './user.interface.js';

// Exportar tipos y interfaces comunes
export * from './common.interface.js';

// Exportar interfaces de estilos
export * from './styles.interface.js';

// Exportar interfaces de nodos
export * from './nodes.interface.js';

// Exportar interfaces de archivos
export * from './file.interface.js';

// Re-exportar los tipos más utilizados para fácil acceso
export type { 
    FigmaUser,
    FigmaUserResponse 
} from './user.interface.js';

export type { 
    FigmaFileResponse,
    FigmaNodesResponse 
} from './file.interface.js';

export type { 
    FigmaNode,
    DocumentNode,
    CanvasNode,
    FrameNode,
    TextNode 
} from './nodes.interface.js';

export type { 
    RGBA,
    Rectangle,
    FigmaNodeType 
} from './common.interface.js';
