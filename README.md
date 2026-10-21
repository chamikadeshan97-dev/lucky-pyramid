# WinWay Lucky Pyramid · Customer Portal

Customer-facing React + Vite demonstration based on the supplied Lucky Pyramid & Smart Bundles HTML reference.

## Run

```bash
npm install
npm run dev
```

Demo credentials: `player@luckypyramid.test` / `Player123!`

## Screens
- `/login` Customer demo login
- `/home` Customer summary, historical Lucky Pyramid, 5/10/20/100 Smart Bundles and purchase preview
- `/build` Custom 1–500-ticket bundle
- `/nlb` Fictional NLB winners and top picks
- `/my-entries` Purchases placeholder
- `/results` Customer historical winnings (demo)
- `/wallet` Demo wallet
- `/profile` Customer profile

## Business logic
`src/utils/bundleCalculator.js` implements the source reference's personal/lookalike/popularity weighting, custom 70/30 split, largest-remainder allocations and illustrative probability formulas. The sample data is in `src/data/demoData.js`. No public lottery feed or real WinWay backend is connected.

## Security / production note
The demo password and session are for frontend UI testing only. `VITE_DEMO_AUTH=false` changes login to API mode but **does not** by itself make the portal production ready. Implement backend-authenticated sessions, route authorisation, rate limits and server-side wallet and purchase checks before processing real money. Never trust client-supplied cart totals or balances. Past winnings do not influence future lottery odds. Rates and probability independence assumptions must be validated against lottery rules before any customer-facing probability claim.
