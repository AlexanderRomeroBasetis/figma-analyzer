import { 
    FigmaNodeType, 
    ScrollBehavior, 
    BlendMode, 
    StrokeAlign, 
    Rectangle, 
    LayoutConstraint,
    LayoutMode,
    LayoutAlign,
    LayoutSizing,
    RGBA
} from './common.interface.js';
import { Paint, Effect, TypeStyle } from './styles.interface.js';

/**
 * Interfaces para los nodos de Figma
 */

// Propiedades base que todos los nodos tienen
export interface BaseNode {
    id: string;
    name: string;
    type: FigmaNodeType;
    scrollBehavior?: ScrollBehavior;
    children?: FigmaNode[];
    visible?: boolean;
    locked?: boolean;
    reactions?: any[]; // Simplificado por ahora
    pluginData?: Record<string, any>;
    sharedPluginData?: Record<string, Record<string, any>>;
}

// Propiedades de nodos que pueden tener layout
export interface LayoutMixin {
    absoluteBoundingBox?: Rectangle;
    absoluteRenderBounds?: Rectangle | null;
    constraints?: LayoutConstraint;
    relativeTransform?: number[][];
    size?: {x: number, y: number};
    layoutAlign?: LayoutAlign;
    layoutGrow?: number;
    layoutSizingHorizontal?: LayoutSizing;
    layoutSizingVertical?: LayoutSizing;
}

// Propiedades de nodos que pueden tener blend y efectos
export interface BlendMixin {
    opacity?: number;
    blendMode?: BlendMode;
    isMask?: boolean;
    effects?: Effect[];
    effectStyleId?: string;
}

// Propiedades de nodos que pueden tener geometría
export interface GeometryMixin {
    fills?: Paint[];
    strokes?: Paint[];
    strokeWeight?: number;
    strokeMiterLimit?: number;
    strokeAlign?: StrokeAlign;
    strokeCap?: 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW';
    strokeJoin?: 'MITER' | 'BEVEL' | 'ROUND';
    strokeDashes?: number[];
    fillStyleId?: string;
    strokeStyleId?: string;
}

// Propiedades de frames y grupos
export interface FrameMixin {
    background?: Paint[];
    backgroundColor?: RGBA;
    clipsContent?: boolean;
    layoutMode?: LayoutMode;
    primaryAxisSizingMode?: 'FIXED' | 'AUTO';
    counterAxisSizingMode?: 'FIXED' | 'AUTO';
    primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
    counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    itemSpacing?: number;
    layoutWrap?: 'NO_WRAP' | 'WRAP';
    strokesIncludedInLayout?: boolean;
    layoutGrids?: any[]; // Simplificado
    overflowDirection?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'BOTH';
}

// Nodo de documento
export interface DocumentNode extends BaseNode {
    type: 'DOCUMENT';
}

// Nodo canvas (página)
export interface CanvasNode extends BaseNode, BlendMixin {
    type: 'CANVAS';
    backgroundColor?: RGBA;
    prototypeStartNodeID?: string | null;
    flowStartingPoints?: any[]; // Simplificado
    prototypeDevice?: {
        type: 'PRESET' | 'CUSTOM';
        size?: {width: number, height: number};
        presetIdentifier?: string;
        rotation?: 'NONE' | 'CCW_90';
    };
}

// Nodo frame
export interface FrameNode extends BaseNode, LayoutMixin, BlendMixin, GeometryMixin, FrameMixin {
    type: 'FRAME';
}

// Nodo de texto
export interface TextNode extends BaseNode, LayoutMixin, BlendMixin, GeometryMixin {
    type: 'TEXT';
    characters: string;
    style: TypeStyle;
    characterStyleOverrides?: number[];
    styleOverrideTable?: Record<string, TypeStyle>;
    lineTypes?: Array<'NONE' | 'ORDERED' | 'UNORDERED'>;
    lineIndentations?: number[];
    layoutVersion?: number;
    interactions?: any[]; // Simplificado
}

// Union type para todos los tipos de nodos
export type FigmaNode = 
    | DocumentNode 
    | CanvasNode 
    | FrameNode 
    | TextNode;
