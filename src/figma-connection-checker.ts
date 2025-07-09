import * as dotenv from 'dotenv';
import { FigmaUser, FigmaUserResponse } from './interfaces/indexinterface.js';

// Load environment variables
dotenv.config();

export class FigmaConnectionChecker {
    private readonly token: string;
    private readonly baseUrl: string;

    constructor() {
        this.token = process.env.TOKEN || '';
        this.baseUrl = process.env.BASE_URL || 'https://api.figma.com';
    }

    /**
     * Validates that the necessary environment variables are configured
     */
    private validateEnvironment(): boolean {
        console.log('🔍 Checking configuration...');
        
        const checks = [
            { name: 'BASE_URL', value: this.baseUrl, required: true },
            { name: 'TOKEN', value: this.token, required: true },
            { name: 'PROJECT_URL', value: process.env.PROJECT_URL, required: false },
            { name: 'FRONTEND_URL', value: process.env.FRONTEND_URL, required: false }
        ];

        let allValid = true;

        checks.forEach(check => {
            if (check.required && !check.value) {
                console.log(`❌ ${check.name} is not configured (required)`);
                allValid = false;
            } else if (check.value) {
                console.log(`✅ ${check.name} configured correctly`);
            } else {
                console.log(`⚠️  ${check.name} is not configured (optional)`);
            }
        });

        return allValid;
    }

    /**
     * Makes a test request to the Figma API to verify the connection
     */
    async checkConnection(): Promise<boolean> {
        console.log('\n🚀 Starting Figma API connection test...\n');

        // Validate configuration before making the request
        if (!this.validateEnvironment()) {
            console.log('\n❌ Incomplete configuration. Cannot continue.');
            return false;
        }

        try {
            console.log('\n📡 Connecting to Figma API...');
            
            const response = await fetch(`${this.baseUrl}/v1/me`, {
                method: 'GET',
                headers: {
                    'X-Figma-Token': this.token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(`📊 Response code: ${response.status}`);

            if (response.status === 200) {
                const data = await response.json() as FigmaUserResponse;
                
                console.log('✅ Connection successful!');
                console.log('\n👤 User information:');
                
                if (data.user) {
                    console.log(`   📧 Email: ${data.user.email}`);
                    console.log(`   🆔 ID: ${data.user.id}`);
                    console.log(`   👤 Handle: ${data.user.handle}`);
                    console.log(`   🖼️  Avatar: ${data.user.img_url}`);
                }

                return true;
            } else {
                console.log('❌ Connection error');
                
                try {
                    const errorData = await response.json() as any;
                    console.log(`   Error: ${errorData.error || 'Unknown error'}`);
                } catch {
                    const errorText = await response.text();
                    console.log(`   Error: ${errorText || 'Unknown error'}`);
                }

                this.suggestSolutions(response.status);
                return false;
            }

        } catch (error) {
            console.log('❌ Connection error:', error);
            console.log('\n💡 Possible solutions:');
            console.log('   - Check internet connection');
            console.log('   - Verify that the base URL is correct');
            console.log('   - Check proxy/firewall configuration');
            
            return false;
        }
    }

    /**
     * Suggests solutions based on the HTTP error code
     */
    private suggestSolutions(statusCode: number): void {
        console.log('\n💡 Possible solutions:');
        
        switch (statusCode) {
            case 401:
                console.log('   - Verify that the Figma token is valid');
                console.log('   - Check that the token has not expired');
                console.log('   - Regenerate the token in Figma settings');
                break;
            case 403:
                console.log('   - Verify token permissions');
                console.log('   - Check that the token has access to the resource');
                break;
            case 404:
                console.log('   - Verify that the base URL is correct');
                console.log('   - Check the API endpoint');
                break;
            case 429:
                console.log('   - Rate limiting reached');
                console.log('   - Wait before making another request');
                break;
            case 500:
            case 502:
            case 503:
                console.log('   - Figma server error');
                console.log('   - Try again later');
                break;
            default:
                console.log('   - Review Figma API documentation');
                console.log('   - Verify token configuration');
        }
    }

    /**
     * Runs all connection checks
     */
    async runAllChecks(): Promise<void> {
        console.log('🔧 Figma Connection Checker');
        console.log('==========================\n');

        const isConnected = await this.checkConnection();

        console.log('\n📋 Summary:');
        console.log(`   Connection status: ${isConnected ? '✅ CONNECTED' : '❌ ERROR'}`);
        console.log(`   Timestamp: ${new Date().toISOString()}`);
        console.log('\n==========================');
    }
}

// Main function to run the tests
async function main() {
    const checker = new FigmaConnectionChecker();
    await checker.runAllChecks();
}

// Run if the file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default FigmaConnectionChecker;
