# testops-dashboard-tests

An application enabling you to run tests and process the results.

## Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** Pure JS/TS + HTML  
- **Testing:** Playwright  
- **Reporting:** Allure  

## Getting Started

### Build the application

```bash
npm run build
```

### Run the app
```
npm run dev
```

To copy static files from stc to dist:
```
"build": "tsc -p . && cpx \"static/**/*\" dist/static",
```