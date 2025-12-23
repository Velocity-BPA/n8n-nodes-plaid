# n8n-nodes-plaid

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

---

n8n community node for Plaid API integration with comprehensive Transfer API support for ACH, RTP, and wire transfers.

![Plaid](https://img.shields.io/badge/Plaid-00D09C?style=for-the-badge&logo=plaid&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Features

This node provides comprehensive integration with Plaid's banking APIs, enabling secure financial data access and money movement capabilities within n8n workflows.

### Core Banking Operations
- **Account**: Get account information and real-time balances
- **Transaction**: Retrieve, refresh, and sync transaction history
- **Item**: Manage linked bank connections (exchange tokens, get/remove items)
- **Link Token**: Create and manage Plaid Link tokens

### Transfer API (Money Movement)
- **Transfer Authorization**: Create transfer authorizations with risk assessment
- **Transfer**: Create, get, list, and cancel ACH/RTP/Same-Day ACH transfers
- **Recurring Transfer**: Schedule and manage recurring transfers
- **Transfer Event**: List and sync transfer status updates
- **Transfer Sweep**: Track sweep operations
- **Transfer Refund**: Process transfer refunds
- **Transfer Ledger**: Manage ledger balance (deposit, withdraw, distribute)
- **Transfer Capabilities**: Check account transfer capabilities
- **Transfer Configuration**: Get transfer configuration settings
- **Originator**: Manage originators for platform use cases

### Webhook Trigger
Listen for Plaid webhook events including:
- Transfer status updates
- Recurring transfer notifications
- Transaction updates
- Item status changes

## Installation

### From npm (Recommended)

```bash
npm install n8n-nodes-plaid
```

### Manual Installation

1. Navigate to your n8n custom nodes directory:
```bash
cd ~/.n8n/custom
```

2. Install the package:
```bash
npm install n8n-nodes-plaid
```

3. Restart n8n:
```bash
n8n start
```

### Local Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-plaid.git
cd n8n-nodes-plaid

# Install dependencies
pnpm install

# Build the package
pnpm build

# Link to your n8n installation
pnpm link --global
cd ~/.n8n
pnpm link --global n8n-nodes-plaid
```

## Configuration

### Credentials

1. Create a Plaid account at [https://dashboard.plaid.com](https://dashboard.plaid.com)
2. Get your Client ID and Secret from the dashboard
3. In n8n, create new Plaid API credentials with:
   - **Client ID**: Your Plaid client ID
   - **Secret**: Your Plaid secret (environment-specific)
   - **Environment**: sandbox, development, or production

### Environment Selection

- **Sandbox**: Test environment with fake data (free)
- **Development**: Real data with limited institutions (free)
- **Production**: Full access to all institutions (paid)

## Usage Examples

### Two-Step Transfer Flow

Plaid requires a two-step process for transfers:

1. **Create Authorization** → Check if transfer is approved
2. **Create Transfer** → Execute the approved transfer

Example workflow:

```
[Plaid] Transfer Authorization: Create
  ├── access_token: {{$json.access_token}}
  ├── account_id: {{$json.account_id}}
  ├── type: debit
  ├── network: ach
  ├── amount: "100.00"
  ├── ach_class: ppd
  └── user_legal_name: "John Doe"
           │
           ▼
[IF] Check Decision
  └── Condition: {{$json.authorization.decision}} === "approved"
           │
           ▼
[Plaid] Transfer: Create
  ├── authorization_id: {{$node.Authorization.json.authorization.id}}
  ├── access_token: {{$json.access_token}}
  ├── account_id: {{$json.account_id}}
  └── description: "Payment"
```

### Get Account Balances

```
[Plaid] Account: Get Balance
  └── access_token: {{$json.access_token}}
```

### Sync Transactions

```
[Plaid] Transaction: Sync
  ├── access_token: {{$json.access_token}}
  └── cursor: "" (empty for first sync, then use next_cursor)
```

### Create Recurring Transfer

```
[Plaid] Recurring Transfer: Create
  ├── access_token: {{$json.access_token}}
  ├── account_id: {{$json.account_id}}
  ├── type: debit
  ├── network: ach
  ├── amount: "50.00"
  ├── ach_class: ppd
  ├── description: "Monthly"
  ├── user_legal_name: "John Doe"
  ├── interval_unit: month
  ├── interval_count: 1
  └── start_date: 2024-02-01
```

## API Reference

### Transfer Networks

| Network | Description | Settlement |
|---------|-------------|------------|
| `ach` | Standard ACH | 1-3 business days |
| `same-day-ach` | Same-Day ACH | Same day (cutoff applies) |
| `rtp` | Real-Time Payments | Instant |

### ACH Classes

| Class | Use Case |
|-------|----------|
| `ppd` | Consumer accounts (Prearranged Payment and Deposit) |
| `ccd` | Business accounts (Corporate Credit or Debit) |
| `web` | Consumer accounts via web authorization |

### Authorization Decisions

| Decision | Action |
|----------|--------|
| `approved` | Proceed with transfer |
| `declined` | Do not proceed, check decision_rationale |
| `user_action_required` | Additional verification needed |

## Error Handling

Plaid errors follow a structured format:

```json
{
  "error_type": "INVALID_REQUEST",
  "error_code": "INVALID_FIELD",
  "error_message": "amount must be a string",
  "display_message": "Please check the amount format"
}
```

The node handles these errors and provides clear error messages in n8n.

## Resources

- [Plaid API Documentation](https://plaid.com/docs/)
- [Transfer API Guide](https://plaid.com/docs/transfer/)
- [Plaid Dashboard](https://dashboard.plaid.com)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## Licensing

**[Velocity BPA Licensing Notice]**

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

## Author

**Velocity BPA**
- Website: [https://velobpa.com](https://velobpa.com)
- GitHub: [https://github.com/Velocity-BPA](https://github.com/Velocity-BPA)
- Email: licensing@velobpa.com

## Version History

### v3.0.0
- Added comprehensive Transfer API support
- Added Transfer Authorization resource
- Added Transfer resource (create, get, list, cancel)
- Added Recurring Transfer resource
- Added Transfer Event resource (list, sync)
- Added Transfer Sweep resource
- Added Transfer Refund resource
- Added Transfer Ledger resource
- Added Transfer Capabilities resource
- Added Transfer Configuration resource
- Added Originator resource
- Added PlaidTrigger for webhook events
- Enhanced Link Token with transfer product support

### v2.0.0
- Initial release with Auth, Transactions, Identity support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-plaid/issues) page.
