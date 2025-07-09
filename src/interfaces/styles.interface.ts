import { RGBA, BlendMode } from './common.interface.js';

/**
 * Interfaces para estilos y rellenos de Figma
 */

// Tipos de relleno
export type PaintType = 
    | 'SOLID' 
    | 'GRADIENT_LINEAR' 
    | 'GRADIENT_RADIAL' 
    | 'GRADIENT_ANGULAR' 
    | 'GRADIENT_DIAMOND' 
    | 'IMAGE' 
    | 'EMOJI';

// Estructura básica de paint/relleno
export interface Paint {
    blendMode: BlendMode;
    type: PaintType;
    color?: RGBA;
    gradientHandlePositions?: Array<{x: number, y: number}>;
    gradientStops?: Array<{
        color: RGBA;
        position: number;
    }>;
    scaleMode?: 'FILL' | 'FIT' | 'CROP' | 'TILE';
    imageTransform?: number[][];
    scalingFactor?: number;
    rotation?: number;
    imageRef?: string;
    filters?: {
        exposure?: number;
        contrast?: number;
        saturation?: number;
        temperature?: number;
        tint?: number;
        highlights?: number;
        shadows?: number;
    };
    visible?: boolean;
    opacity?: number;
}

// Efectos (sombras, blur, etc.)
export interface Effect {
    type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    visible: boolean;
    radius: number;
    color?: RGBA;
    blendMode?: BlendMode;
    offset?: {x: number, y: number};
    spread?: number;
    showShadowBehindNode?: boolean;
}

// Estilos de tipografía
export interface TypeStyle {
    fontFamily: string;
    fontPostScriptName?: string | null;
    fontStyle: string;
    fontWeight: number;
    fontSize: number;
    textAutoResize?: 'NONE' | 'HEIGHT' | 'WIDTH_AND_HEIGHT' | 'TRUNCATE';
    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    letterSpacing: number;
    lineHeightPx: number;
    lineHeightPercent: number;
    lineHeightPercentFontSize?: number;
    lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
    textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE' | 'SMALL_CAPS' | 'SMALL_CAPS_FORCED';
    textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
    textStyleId?: string;
    fillStyleId?: string;
}
