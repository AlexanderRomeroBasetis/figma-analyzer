import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

interface FigmaUser {
    id: string;
    email: string;
    handle: string;
    img_url: string;
}

interface FigmaApiResponse {
    user?: FigmaUser;
    error?: string;
}

export class FigmaConnectionChecker {
    private readonly token: string;
    private readonly baseUrl: string;

    constructor() {
        this.token = process.env.TOKEN || '';
        this.baseUrl = process.env.BASE_URL || 'https://api.figma.com';
    }

    /**
     * Valida que las variables de entorno necesarias estén configuradas
     */
    private validateEnvironment(): boolean {
        console.log('🔍 Verificando configuración...');
        
        const checks = [
            { name: 'BASE_URL', value: this.baseUrl, required: true },
            { name: 'TOKEN', value: this.token, required: true },
            { name: 'PROJECT_URL', value: process.env.PROJECT_URL, required: false },
            { name: 'FRONTEND_URL', value: process.env.FRONTEND_URL, required: false }
        ];

        let allValid = true;

        checks.forEach(check => {
            if (check.required && !check.value) {
                console.log(`❌ ${check.name} no está configurado (requerido)`);
                allValid = false;
            } else if (check.value) {
                console.log(`✅ ${check.name} configurado correctamente`);
            } else {
                console.log(`⚠️  ${check.name} no está configurado (opcional)`);
            }
        });

        return allValid;
    }

    /**
     * Realiza una petición de prueba a la API de Figma para verificar la conexión
     */
    async checkConnection(): Promise<boolean> {
        console.log('\n🚀 Iniciando prueba de conexión a Figma API...\n');

        // Validar configuración antes de hacer la petición
        if (!this.validateEnvironment()) {
            console.log('\n❌ Configuración incompleta. No se puede continuar.');
            return false;
        }

        try {
            console.log('\n📡 Conectando a Figma API...');
            
            const response = await fetch(`${this.baseUrl}/v1/me`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`📊 Código de respuesta: ${response.status}`);

            if (response.status === 200) {
                const data = await response.json() as FigmaApiResponse;
                
                console.log('✅ ¡Conexión exitosa!');
                console.log('\n👤 Información del usuario:');
                
                if (data.user) {
                    console.log(`   📧 Email: ${data.user.email}`);
                    console.log(`   🆔 ID: ${data.user.id}`);
                    console.log(`   👤 Handle: ${data.user.handle}`);
                    console.log(`   🖼️  Avatar: ${data.user.img_url}`);
                }

                return true;
            } else {
                console.log('❌ Error en la conexión');
                
                try {
                    const errorData = await response.json() as any;
                    console.log(`   Error: ${errorData.error || 'Error desconocido'}`);
                } catch {
                    const errorText = await response.text();
                    console.log(`   Error: ${errorText || 'Error desconocido'}`);
                }

                this.suggestSolutions(response.status);
                return false;
            }

        } catch (error) {
            console.log('❌ Error de conexión:', error);
            console.log('\n💡 Posibles soluciones:');
            console.log('   - Verificar conexión a internet');
            console.log('   - Comprobar que la URL base sea correcta');
            console.log('   - Verificar configuración de proxy/firewall');
            
            return false;
        }
    }

    /**
     * Sugiere soluciones basadas en el código de error HTTP
     */
    private suggestSolutions(statusCode: number): void {
        console.log('\n💡 Posibles soluciones:');
        
        switch (statusCode) {
            case 401:
                console.log('   - Verificar que el token de Figma sea válido');
                console.log('   - Comprobar que el token no haya expirado');
                console.log('   - Regenerar el token en la configuración de Figma');
                break;
            case 403:
                console.log('   - Verificar permisos del token');
                console.log('   - Comprobar que el token tenga acceso al recurso');
                break;
            case 404:
                console.log('   - Verificar que la URL base sea correcta');
                console.log('   - Comprobar el endpoint de la API');
                break;
            case 429:
                console.log('   - Límite de rate limiting alcanzado');
                console.log('   - Esperar antes de hacer otra petición');
                break;
            case 500:
            case 502:
            case 503:
                console.log('   - Error del servidor de Figma');
                console.log('   - Intentar más tarde');
                break;
            default:
                console.log('   - Revisar documentación de la API de Figma');
                console.log('   - Verificar configuración del token');
        }
    }

    /**
     * Ejecuta todas las verificaciones de conexión
     */
    async runAllChecks(): Promise<void> {
        console.log('🔧 Figma Connection Checker');
        console.log('==========================\n');

        const isConnected = await this.checkConnection();

        console.log('\n📋 Resumen:');
        console.log(`   Estado de conexión: ${isConnected ? '✅ CONECTADO' : '❌ ERROR'}`);
        console.log(`   Timestamp: ${new Date().toISOString()}`);
        console.log('\n==========================');
    }
}

// Función principal para ejecutar las pruebas
async function main() {
    const checker = new FigmaConnectionChecker();
    await checker.runAllChecks();
}

// Ejecutar si el archivo se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default FigmaConnectionChecker;
