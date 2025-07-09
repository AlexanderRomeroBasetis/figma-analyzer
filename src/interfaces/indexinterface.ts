/**
 * Interfaces principales para las respuestas de la API de Figma
 * 
 * Este módulo contiene todas las interfaces TypeScript necesarias para trabajar
 * con las respuestas JSON de la API de Figma, basadas en la estructura real
 * obtenida de los endpoints de la API.
 */

// Export user interfaces
export * from './user.interface.js';

// Export common types and interfaces
export * from './common.interface.js';

// Export style interfaces
export * from './styles.interface.js';

// Export node interfaces
export * from './nodes.interface.js';

// Export file interfaces
export * from './file.interface.js';

// Re-export most commonly used types for easy access
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
