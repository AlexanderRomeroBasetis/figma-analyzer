import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export class FigmaJsonInspector {
    private readonly token: string;
    private readonly baseUrl: string;

    constructor() {
        this.token = process.env.TOKEN || '';
        this.baseUrl = process.env.BASE_URL || 'https://api.figma.com';
    }

    /**
     * Inspecciona la respuesta de la API /v1/me
     */
    async inspectUserEndpoint(): Promise<void> {
        console.log('🔍 Inspeccionando /v1/me endpoint...\n');

        try {
            const response = await fetch(`${this.baseUrl}/v1/me`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`📊 Status: ${response.status}`);
            console.log(`📋 Headers:`, Object.fromEntries(response.headers.entries()));

            if (response.ok) {
                const data = await response.json();
                console.log('\n📄 JSON Response:');
                console.log('================');
                console.log(JSON.stringify(data, null, 2));
                console.log('================\n');

                // Análisis de la estructura
                this.analyzeStructure(data, '/v1/me');
            } else {
                const errorData = await response.text();
                console.log('\n❌ Error Response:');
                console.log(errorData);
            }

        } catch (error) {
            console.log('❌ Error:', error);
        }
    }

    /**
     * Inspecciona un archivo específico de Figma (si tienes PROJECT_URL configurado)
     */
    async inspectFileEndpoint(): Promise<void> {
        const projectUrl = process.env.PROJECT_URL;
        
        if (!projectUrl) {
            console.log('⚠️  PROJECT_URL no está configurado, saltando inspección de archivo');
            return;
        }

        // Extraer el file key de la URL (soporta tanto /file/ como /design/)
        const fileKeyMatch = projectUrl.match(/(?:file|design)\/([a-zA-Z0-9]+)/);
        if (!fileKeyMatch) {
            console.log('❌ No se pudo extraer el file key de PROJECT_URL');
            console.log(`   URL actual: ${projectUrl}`);
            console.log('   Formato esperado: https://www.figma.com/file/ABC123... o https://www.figma.com/design/ABC123...');
            return;
        }

        const fileKey = fileKeyMatch[1];
        console.log(`\n🔍 Inspeccionando archivo: ${fileKey}...\n`);

        try {
            const response = await fetch(`${this.baseUrl}/v1/files/${fileKey}`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`📊 Status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log('\n📄 File JSON Response (primeros 500 caracteres):');
                console.log('==============================================');
                const jsonString = JSON.stringify(data, null, 2);
                console.log(jsonString.substring(0, 500) + '...');
                console.log('==============================================\n');

                // Análisis de la estructura del archivo
                this.analyzeStructure(data, `/v1/files/${fileKey}`);

                // Guardar respuesta completa en archivo
                await this.saveJsonToFile(data, `figma-file-${fileKey}.json`);
            } else {
                const errorData = await response.text();
                console.log('\n❌ Error Response:');
                console.log(errorData);
            }

        } catch (error) {
            console.log('❌ Error:', error);
        }
    }

    /**
     * Inspecciona los nodos específicos de un archivo
     */
    async inspectNodesEndpoint(): Promise<void> {
        const projectUrl = process.env.PROJECT_URL;
        
        if (!projectUrl) {
            console.log('⚠️  PROJECT_URL no está configurado, saltando inspección de nodos');
            return;
        }

        const fileKeyMatch = projectUrl.match(/(?:file|design)\/([a-zA-Z0-9]+)/);
        if (!fileKeyMatch) {
            console.log('❌ No se pudo extraer el file key de PROJECT_URL');
            return;
        }

        const fileKey = fileKeyMatch[1];
        
        // Primero obtener la información del archivo para encontrar nodos
        console.log(`\n🔍 Obteniendo nodos del archivo: ${fileKey}...\n`);

        try {
            // Obtener estructura del archivo primero
            const fileResponse = await fetch(`${this.baseUrl}/v1/files/${fileKey}`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            if (fileResponse.ok) {
                const fileData = await fileResponse.json();
                
                // Extraer algunos IDs de nodos para la demo
                const nodeIds = this.extractNodeIds(fileData, 3); // Obtener hasta 3 nodos
                
                if (nodeIds.length > 0) {
                    console.log(`📋 Nodos encontrados: ${nodeIds.join(', ')}`);
                    
                    const nodesResponse = await fetch(`${this.baseUrl}/v1/files/${fileKey}/nodes?ids=${nodeIds.join(',')}`, {
                        method: 'GET',
                        headers: {
                            'X-Figma-Token': this.token,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(`📊 Nodes Status: ${nodesResponse.status}`);

                    if (nodesResponse.ok) {
                        const nodesData = await nodesResponse.json();
                        console.log('\n📄 Nodes JSON Response:');
                        console.log('=======================');
                        console.log(JSON.stringify(nodesData, null, 2));
                        console.log('=======================\n');

                        this.analyzeStructure(nodesData, `/v1/files/${fileKey}/nodes`);
                    }
                } else {
                    console.log('⚠️  No se encontraron nodos en el archivo');
                }
            }

        } catch (error) {
            console.log('❌ Error:', error);
        }
    }

    /**
     * Extrae IDs de nodos del documento de Figma
     */
    private extractNodeIds(fileData: any, limit: number = 5): string[] {
        const nodeIds: string[] = [];

        const extractFromNode = (node: any): void => {
            if (nodeIds.length >= limit) return;
            
            if (node.id && typeof node.id === 'string') {
                nodeIds.push(node.id);
            }

            if (node.children && Array.isArray(node.children)) {
                for (const child of node.children) {
                    extractFromNode(child);
                    if (nodeIds.length >= limit) break;
                }
            }
        };

        if (fileData.document) {
            extractFromNode(fileData.document);
        }

        return nodeIds;
    }

    /**
     * Analiza la estructura del JSON y muestra información útil
     */
    private analyzeStructure(data: any, endpoint: string): void {
        console.log(`🔬 Análisis de estructura para ${endpoint}:`);
        console.log('─'.repeat(50));

        if (typeof data === 'object' && data !== null) {
            console.log(`📋 Propiedades principales: ${Object.keys(data).join(', ')}`);
            
            // Análisis específico por endpoint
            if (endpoint === '/v1/me') {
                this.analyzeUserData(data);
            } else if (endpoint.includes('/v1/files/')) {
                this.analyzeFileData(data);
            }
        }

        console.log('─'.repeat(50));
    }

    /**
     * Analiza los datos del usuario
     */
    private analyzeUserData(data: any): void {
        console.log('\n👤 Datos del usuario:');
        if (data.id) console.log(`   🆔 ID: ${data.id}`);
        if (data.email) console.log(`   📧 Email: ${data.email}`);
        if (data.handle) console.log(`   🏷️  Handle: ${data.handle}`);
        if (data.img_url) console.log(`   🖼️  Avatar URL: ${data.img_url}`);
    }

    /**
     * Analiza los datos del archivo
     */
    private analyzeFileData(data: any): void {
        console.log('\n📁 Datos del archivo:');
        if (data.name) console.log(`   📝 Nombre: ${data.name}`);
        if (data.role) console.log(`   👥 Rol: ${data.role}`);
        if (data.lastModified) console.log(`   📅 Última modificación: ${data.lastModified}`);
        if (data.version) console.log(`   🔢 Versión: ${data.version}`);
        
        if (data.document) {
            console.log('   📄 Documento encontrado');
            if (data.document.children) {
                console.log(`   📊 Páginas: ${data.document.children.length}`);
            }
        }
    }

    /**
     * Guarda el JSON en un archivo para inspección detallada
     */
    private async saveJsonToFile(data: any, filename: string): Promise<void> {
        try {
            const fs = await import('fs');
            const path = await import('path');
            
            // Guardar en src/json-data/ en lugar del directorio raíz
            const outputPath = path.join(process.cwd(), 'src', 'json-data', filename);
            
            // Crear directorio si no existe
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
            console.log(`💾 JSON guardado en: ${outputPath}`);
        } catch (error) {
            console.log('⚠️  No se pudo guardar el archivo JSON:', error);
        }
    }

    /**
     * Ejecuta todas las inspecciones
     */
    async runAllInspections(): Promise<void> {
        console.log('🔍 Figma JSON Inspector');
        console.log('========================\n');

        if (!this.token) {
            console.log('❌ TOKEN no está configurado');
            return;
        }

        await this.inspectUserEndpoint();
        await this.inspectFileEndpoint();
        await this.inspectNodesEndpoint();

        console.log('\n✅ Inspección completada');
        console.log('========================');
    }
}

// Función principal
async function main() {
    const inspector = new FigmaJsonInspector();
    await inspector.runAllInspections();
}

// Ejecutar si el archivo se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default FigmaJsonInspector;
