# Installation & Testing Guide

This guide provides step-by-step instructions for installing, building, and testing the n8n-nodes-plaid package on your local n8n instance.

## Prerequisites

- Node.js 18.10 or higher
- pnpm 9.1 or higher (recommended) or npm
- n8n installed locally
- Git (for version control)

## Step 1: Extract the Package

```bash
# Extract the zip file
unzip n8n-nodes-plaid.zip
cd n8n-nodes-plaid
```

## Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

## Step 3: Build the Package

```bash
# Build TypeScript and copy icons
pnpm build

# Verify the build
ls -la dist/
```

You should see:
- `dist/credentials/PlaidApi.credentials.js`
- `dist/nodes/Plaid/Plaid.node.js`
- `dist/nodes/Plaid/PlaidTrigger.node.js`
- `dist/icons/plaid.svg`

## Step 4: Run Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

Expected output:
```
PASS  test/GenericFunctions.test.ts
PASS  test/Plaid.node.test.ts
PASS  test/PlaidTrigger.node.test.ts
PASS  test/PlaidApi.credentials.test.ts

Test Suites: 4 passed, 4 total
Tests:       XX passed, XX total
```

## Step 5: Link to Local n8n

### Option A: Using pnpm link (Recommended)

```bash
# From the n8n-nodes-plaid directory
pnpm link --global

# Navigate to your n8n installation
cd ~/.n8n

# Link the package
pnpm link --global n8n-nodes-plaid
```

### Option B: Manual Installation

```bash
# Copy the built package to n8n custom nodes
mkdir -p ~/.n8n/custom
cp -r dist ~/.n8n/custom/n8n-nodes-plaid

# Or install directly
cd ~/.n8n/custom
npm install /path/to/n8n-nodes-plaid
```

### Option C: Docker Installation

If using n8n with Docker, mount the custom nodes:

```bash
# Build the package first
pnpm build

# Add to your docker-compose.yml or docker run command
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v /path/to/n8n-nodes-plaid/dist:/home/node/.n8n/custom/n8n-nodes-plaid \
  n8nio/n8n
```

## Step 6: Restart n8n

```bash
# If running n8n locally
n8n start

# If using pm2
pm2 restart n8n

# If using Docker
docker restart n8n
```

## Step 7: Verify Installation

1. Open n8n in your browser (usually http://localhost:5678)
2. Create a new workflow
3. Search for "Plaid" in the nodes panel
4. You should see:
   - **Plaid** - Regular node for API operations
   - **Plaid Trigger** - Webhook trigger node

## Step 8: Configure Credentials

1. Click on a Plaid node
2. Create new credentials
3. Enter your Plaid credentials:
   - **Client ID**: From Plaid Dashboard
   - **Secret**: Environment-specific secret
   - **Environment**: sandbox/development/production

## Step 9: Test with Sandbox

1. Use the **sandbox** environment for testing
2. Plaid provides test credentials for sandbox:
   - Username: `user_good`
   - Password: `pass_good`

### Quick Test Workflow

Create a simple workflow to test:

```
[Manual Trigger] → [Plaid: Transfer Configuration Get]
```

If credentials are valid, this will return your transfer configuration.

## Troubleshooting

### Node Not Appearing

1. Check n8n logs for loading errors
2. Verify the dist folder structure
3. Ensure credentials file is properly compiled

```bash
# Check n8n logs
tail -f ~/.n8n/logs/n8n.log

# Or with Docker
docker logs -f n8n
```

### Build Errors

```bash
# Clean and rebuild
pnpm clean
pnpm build
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit
```

### Test Failures

```bash
# Run tests with verbose output
pnpm test -- --verbose
```

## Development Workflow

For ongoing development:

```bash
# Watch mode for TypeScript
pnpm dev

# In another terminal, restart n8n after changes
n8n start
```

## Uninstalling

```bash
# If linked globally
pnpm unlink --global n8n-nodes-plaid
cd ~/.n8n
pnpm unlink n8n-nodes-plaid

# If installed manually
rm -rf ~/.n8n/custom/n8n-nodes-plaid
```

## Next Steps

1. Review the [README.md](./README.md) for usage examples
2. Check [Plaid API Documentation](https://plaid.com/docs/transfer/) for Transfer API details
3. Explore the example workflows in the documentation

## Support

For issues and questions:
- GitHub Issues: https://github.com/Velocity-BPA/n8n-nodes-plaid/issues
- Email: licensing@velobpa.com
- Website: https://velobpa.com
