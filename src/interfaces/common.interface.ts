/**
 * Basic interfaces and common Figma types
 */

// Figma node types
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

// Scroll behavior types
export type ScrollBehavior = 'SCROLLS' | 'FIXED';

// Blend mode types
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

// Stroke alignment types
export type StrokeAlign = 'INSIDE' | 'OUTSIDE' | 'CENTER';

// Constraint types
export type ConstraintType = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';

// Layout types
export type LayoutMode = 'NONE' | 'HORIZONTAL' | 'VERTICAL';
export type LayoutAlign = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
export type LayoutSizing = 'FIXED' | 'HUG' | 'FILL';

// Basic RGBA color structure
export interface RGBA {
    r: number; // 0-1
    g: number; // 0-1
    b: number; // 0-1
    a: number; // 0-1
}

// Position and size structure
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Positioning constraints
export interface LayoutConstraint {
    vertical: ConstraintType;
    horizontal: ConstraintType;
}
