# GitHub Commit Instructions

## Push to GitHub

```bash
# Extract and navigate
unzip n8n-nodes-plaid.zip
cd n8n-nodes-plaid

# Initialize and push
git init
git add .
git commit -m "Initial commit: n8n Plaid community node with Transfer API

Features:
- Account: Get accounts and real-time balances
- Transaction: Get, refresh, sync transaction history
- Item: Exchange tokens, get/remove linked connections
- Link Token: Create and manage Plaid Link tokens
- Transfer Authorization: Create authorizations with risk assessment
- Transfer: Create, get, list, cancel ACH/RTP transfers
- Recurring Transfer: Schedule and manage recurring transfers
- Transfer Event: List and sync transfer status updates
- Transfer Sweep: Track sweep operations
- Transfer Refund: Process transfer refunds
- Transfer Ledger: Deposit, withdraw, distribute funds
- Transfer Capabilities: Check account capabilities
- Transfer Configuration: Get configuration settings
- Originator: Manage originators for platforms
- Webhook Trigger: Listen for Plaid webhook events"

git remote add origin https://github.com/Velocity-BPA/n8n-nodes-plaid.git
git branch -M main
git push -u origin main
```

## Author
Velocity BPA
- Website: https://velobpa.com
- GitHub: https://github.com/Velocity-BPA
