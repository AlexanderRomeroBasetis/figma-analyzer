import * as dotenv from 'dotenv';

// Load environment variables
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
        console.log('🔍 Inspecting /v1/me endpoint...\n');

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

                // Structure analysis
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
            console.log('⚠️  PROJECT_URL is not configured, skipping file inspection');
            return;
        }

        // Extract the file key from the URL (supports both /file/ and /design/)
        const fileKeyMatch = projectUrl.match(/(?:file|design)\/([a-zA-Z0-9]+)/);
        if (!fileKeyMatch) {
            console.log('❌ Could not extract file key from PROJECT_URL');
            console.log(`   Current URL: ${projectUrl}`);
            console.log('   Expected format: https://www.figma.com/file/ABC123... or https://www.figma.com/design/ABC123...');
            return;
        }

        const fileKey = fileKeyMatch[1];
        console.log(`\n🔍 Inspecting file: ${fileKey}...\n`);

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
                console.log('\n📄 File JSON Response (first 500 characters):');
                console.log('==============================================');
                const jsonString = JSON.stringify(data, null, 2);
                console.log(jsonString.substring(0, 500) + '...');
                console.log('==============================================\n');

                // File structure analysis
                this.analyzeStructure(data, `/v1/files/${fileKey}`);

                // Save complete response to file
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
            console.log('⚠️  PROJECT_URL is not configured, skipping node inspection');
            return;
        }

        const fileKeyMatch = projectUrl.match(/(?:file|design)\/([a-zA-Z0-9]+)/);
        if (!fileKeyMatch) {
            console.log('❌ Could not extract file key from PROJECT_URL');
            return;
        }

        const fileKey = fileKeyMatch[1];
        
        // First get the file information to find nodes
        console.log(`\n🔍 Getting nodes from file: ${fileKey}...\n`);

        try {
            // Get file structure first
            const fileResponse = await fetch(`${this.baseUrl}/v1/files/${fileKey}`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            if (fileResponse.ok) {
                const fileData = await fileResponse.json();
                
                // Extract some node IDs for the demo
                const nodeIds = this.extractNodeIds(fileData, 3); // Get up to 3 nodes
                
                if (nodeIds.length > 0) {
                    console.log(`📋 Nodes found: ${nodeIds.join(', ')}`);
                    
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
                    console.log('⚠️  No nodes found in the file');
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
        console.log(`🔬 Structure analysis for ${endpoint}:`);
        console.log('─'.repeat(50));

        if (typeof data === 'object' && data !== null) {
            console.log(`📋 Main properties: ${Object.keys(data).join(', ')}`);
            
            // Specific analysis by endpoint
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
        console.log('\n👤 User data:');
        if (data.id) console.log(`   🆔 ID: ${data.id}`);
        if (data.email) console.log(`   📧 Email: ${data.email}`);
        if (data.handle) console.log(`   🏷️  Handle: ${data.handle}`);
        if (data.img_url) console.log(`   🖼️  Avatar URL: ${data.img_url}`);
    }

    /**
     * Analiza los datos del archivo
     */
    private analyzeFileData(data: any): void {
        console.log('\n📁 File data:');
        if (data.name) console.log(`   📝 Name: ${data.name}`);
        if (data.role) console.log(`   👥 Role: ${data.role}`);
        if (data.lastModified) console.log(`   📅 Last modified: ${data.lastModified}`);
        if (data.version) console.log(`   🔢 Version: ${data.version}`);
        
        if (data.document) {
            console.log('   📄 Document found');
            if (data.document.children) {
                console.log(`   📊 Pages: ${data.document.children.length}`);
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
            
            // Save to src/json-data/ instead of root directory
            const outputPath = path.join(process.cwd(), 'src', 'json-data', filename);
            
            // Create directory if it doesn't exist
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
            console.log(`💾 JSON saved to: ${outputPath}`);
        } catch (error) {
            console.log('⚠️  Could not save JSON file:', error);
        }
    }

    /**
     * Ejecuta todas las inspecciones
     */
    async runAllInspections(): Promise<void> {
        console.log('🔍 Figma JSON Inspector');
        console.log('========================\n');

        if (!this.token) {
            console.log('❌ TOKEN is not configured');
            return;
        }

        await this.inspectUserEndpoint();
        await this.inspectFileEndpoint();
        await this.inspectNodesEndpoint();

        console.log('\n✅ Inspection completed');
        console.log('========================');
    }
}

// Main function
async function main() {
    const inspector = new FigmaJsonInspector();
    await inspector.runAllInspections();
}

// Run if the file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default FigmaJsonInspector;
