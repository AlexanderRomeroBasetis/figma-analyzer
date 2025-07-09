# Figma Response Interfaces

Este directorio contiene las interfaces TypeScript para las respuestas de la API de Figma, basadas en la estructura real del JSON obtenido de los endpoints de Figma.

## Estructura de archivos

### `common.ts`
- Tipos básicos y comunes utilizados en toda la API
- Tipos de nodos, colores, posicionamiento y constraints
- Enums para valores específicos de Figma

### `styles.ts`
- Interfaces para estilos, rellenos y efectos
- Tipografía y propiedades de texto
- Efectos como sombras y blur

### `nodes.ts`
- Interfaces para todos los tipos de nodos de Figma
- Mixins para propiedades compartidas (layout, blend, geometry)
- Nodos específicos: Document, Canvas, Frame, Text

### `file.ts`
- Interfaces para respuestas de archivos completos
- Información de componentes y conjuntos de componentes
- Metadatos del archivo

### `user.ts`
- Interfaces para información del usuario
- Respuesta del endpoint `/v1/me`

### `index.ts`
- Archivo principal que exporta todas las interfaces
- Re-exporta los tipos más utilizados para fácil acceso

## Uso

```typescript
import { 
    FigmaFileResponse, 
    FigmaNode, 
    TextNode, 
    RGBA 
} from './indexinterface.js';

// Use interfaces with Figma data
const fileData: FigmaFileResponse = await getFigmaFile();
const textNodes: TextNode[] = findTextNodes(fileData.document);
```

## Características

- **Tipado completo**: Todas las propiedades importantes están tipadas
- **Basado en datos reales**: Las interfaces se crearon analizando JSON real de Figma
- **Modular**: Separado en archivos lógicos para fácil mantenimiento
- **Extensible**: Fácil de extender para nuevos tipos de nodos o propiedades

## Notas

- Algunas propiedades complejas están simplificadas (como `reactions`, `pluginData`)
- Los tipos están basados en la versión actual de la API de Figma
- Se pueden añadir más tipos de nodos según sea necesario
