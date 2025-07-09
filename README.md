# Figma Analyzer

A TypeScript tool for analyzing and connecting to the Figma API. This project provides utilities to inspect Figma files, extract design data, and work with Figma's REST API in a type-safe manner.

## Features

- 🔍 **Connection Testing**: Verify your Figma API token and connection
- 📊 **JSON Inspection**: Analyze and inspect Figma API responses
- 📁 **File Analysis**: Extract detailed information from Figma files
- 🎯 **Type Safety**: Complete TypeScript interfaces for Figma API responses
- 💾 **Data Export**: Save Figma data as JSON files for further analysis

## Project Structure

```
src/
├── figma-connection-checker.ts    # API connection testing utility
├── figma-json-inspector.ts        # JSON response analyzer
├── figma-api-test.ts              # API testing utilities
├── interfaces/                    # TypeScript interfaces
│   ├── indexinterface.ts          # Main exports
│   ├── common.interface.ts        # Common types and interfaces
│   ├── nodes.interface.ts         # Node type definitions
│   ├── styles.interface.ts        # Style and paint interfaces
│   ├── file.interface.ts          # File response interfaces
│   └── user.interface.ts          # User data interfaces
└── json-data/                     # Exported JSON data
    └── figma-file-*.json          # Figma file data
```

## Setup

### Prerequisites

- Node.js >= 18.0.0
- TypeScript
- A Figma account with API access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd figma-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Figma configuration:
```env
BASE_URL=https://api.figma.com
TOKEN=your_figma_token_here
PROJECT_URL=https://www.figma.com/design/YOUR_FILE_ID/filename
FRONTEND_URL=http://localhost:5173/
```

### Getting your Figma Token

1. Go to [Figma Settings](https://www.figma.com/settings)
2. Navigate to "Personal access tokens"
3. Click "Create new token"
4. Copy the token and add it to your `.env` file

## Usage

### Available Scripts

- `npm start` - Run the connection checker
- `npm run inspect` - Analyze Figma API responses and save JSON data
- `npm test` - Run API tests
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Development mode

### Connection Testing

Test your Figma API connection:

```bash
npm start
```

This will:
- Validate your environment configuration
- Test API connectivity
- Display user information
- Provide troubleshooting suggestions

### JSON Inspection

Analyze Figma file structure and export data:

```bash
npm run inspect
```

This will:
- Inspect the `/v1/me` endpoint (user data)
- Analyze your specified Figma file
- Extract node information
- Save complete JSON responses to `src/json-data/`

### Using TypeScript Interfaces

Import and use the provided TypeScript interfaces:

```typescript
import { 
    FigmaFileResponse, 
    FigmaNode, 
    TextNode, 
    RGBA 
} from './interfaces/indexinterface.js';

// Type-safe Figma data handling
const fileData: FigmaFileResponse = await getFigmaFile();
const textNodes: TextNode[] = findTextNodes(fileData.document);
const color: RGBA = textNode.fills[0].color;
```

## API Endpoints Supported

- **GET /v1/me** - User information
- **GET /v1/files/{file_key}** - File data
- **GET /v1/files/{file_key}/nodes** - Specific node data

## TypeScript Interfaces

The project includes comprehensive TypeScript interfaces for:

- **User Data**: User profile and authentication info
- **File Structure**: Complete file hierarchy and metadata
- **Nodes**: All Figma node types (Document, Canvas, Frame, Text, etc.)
- **Styles**: Colors, typography, effects, and paint styles
- **Layout**: Positioning, constraints, and auto-layout properties

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASE_URL` | Figma API base URL | Yes |
| `TOKEN` | Your Figma personal access token | Yes |
| `PROJECT_URL` | URL of the Figma file to analyze | Yes |
| `FRONTEND_URL` | Local development server URL | No |

### TypeScript Configuration

The project uses ES modules with the following key settings:
- Target: ES2022
- Module: ESNext
- Module Resolution: Node
- Strict mode enabled

## Error Handling

The tool provides detailed error messages and suggestions for common issues:

- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Invalid file ID or URL
- **429 Rate Limited**: Too many requests

## Development

### Building the Project

```bash
npm run build
```

### Running in Development Mode

```bash
npm run dev
```

### Adding New Node Types

To add support for new Figma node types:

1. Add the type to `FigmaNodeType` in `src/interfaces/common.interface.ts`
2. Create an interface in `src/interfaces/nodes.interface.ts`
3. Add it to the `FigmaNode` union type
4. Update exports in `src/interfaces/indexinterface.ts`

## Examples

### Basic File Analysis

```typescript
import FigmaJsonInspector from './figma-json-inspector.js';

const inspector = new FigmaJsonInspector();
await inspector.runAllInspections();
```

### Connection Testing

```typescript
import FigmaConnectionChecker from './figma-connection-checker.js';

const checker = new FigmaConnectionChecker();
const isConnected = await checker.checkConnection();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Troubleshooting

### Common Issues

**Token Issues**
- Ensure your token has the correct permissions
- Check that the token hasn't expired
- Verify the token is correctly set in `.env`

**File Access Issues**
- Confirm you have access to the Figma file
- Check that the PROJECT_URL format is correct
- Ensure the file ID is valid

**Connection Issues**
- Verify your internet connection
- Check if Figma's API is experiencing downtime
- Ensure no firewall/proxy is blocking requests

For more detailed troubleshooting, run the connection checker which provides specific guidance based on error codes.

## Acknowledgments

- Built for the Figma REST API
- Uses TypeScript for type safety
- Supports ES modules and modern Node.js features