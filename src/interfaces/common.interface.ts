/**
 * Interfaces básicas y tipos comunes de Figma
 */

// Tipos de nodos en Figma
export type FigmaNodeType = 
    | 'DOCUMENT' 
    | 'CANVAS' 
    | 'FRAME' 
    | 'TEXT' 
    | 'RECTANGLE' 
    | 'ELLIPSE' 
    | 'POLYGON' 
    | 'STAR' 
    | 'VECTOR' 
    | 'LINE' 
    | 'GROUP' 
    | 'COMPONENT' 
    | 'COMPONENT_SET' 
    | 'INSTANCE';

// Tipos de scroll behavior
export type ScrollBehavior = 'SCROLLS' | 'FIXED';

// Tipos de blend mode
export type BlendMode = 
    | 'PASS_THROUGH' 
    | 'NORMAL' 
    | 'DARKEN' 
    | 'MULTIPLY' 
    | 'LINEAR_BURN' 
    | 'COLOR_BURN' 
    | 'LIGHTEN' 
    | 'SCREEN' 
    | 'LINEAR_DODGE' 
    | 'COLOR_DODGE' 
    | 'OVERLAY' 
    | 'SOFT_LIGHT' 
    | 'HARD_LIGHT' 
    | 'DIFFERENCE' 
    | 'EXCLUSION' 
    | 'HUE' 
    | 'SATURATION' 
    | 'COLOR' 
    | 'LUMINOSITY';

// Tipos de alineación de stroke
export type StrokeAlign = 'INSIDE' | 'OUTSIDE' | 'CENTER';

// Tipos de constraints
export type ConstraintType = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';

// Tipos de layout
export type LayoutMode = 'NONE' | 'HORIZONTAL' | 'VERTICAL';
export type LayoutAlign = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
export type LayoutSizing = 'FIXED' | 'HUG' | 'FILL';

// Estructura básica de color RGBA
export interface RGBA {
    r: number; // 0-1
    g: number; // 0-1
    b: number; // 0-1
    a: number; // 0-1
}

// Estructura de posición y tamaño
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Constraints de posicionamiento
export interface LayoutConstraint {
    vertical: ConstraintType;
    horizontal: ConstraintType;
}
