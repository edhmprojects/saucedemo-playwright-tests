# SauceDemo Playwright Tests

This project is an end‑to‑end test suite for the SauceDemo web application, built using Playwright and JavaScript. It’s the first project in my journey into browser automation, and I created it to practise clean test structure, reusable helpers, and readable selectors while working with a realistic demo site.

---

## Project overview

The suite covers a complete purchase flow on SauceDemo, including:

- logging in with standard user credentials
- adding items to the cart from both the inventory page and product details pages
- starting the checkout process
- completing the checkout form
- finishing the order

The tests are supported by a small set of helper functions designed to keep the spec file tidy and focused on behaviour rather than implementation details.

---

## Tech stack

- **Playwright** for browser automation and test running
- **JavaScript** with JSDoc for lightweight type hints
- **Node.js** for dependency management and scripts

---

## Getting started

### Install dependencies

```bash
npm install
```

### Run the test suite

```bash
npx playwright test
```

### View the HTML report

```bash
npx playwright show-report
```

---

## Project structure

```
saucedemo-playwright-tests/
  helpers/
    saucedemo-helpers.js
  tests/
    saucedemo.spec.js
  .gitignore
  package.json
  package-lock.json
  playwright.config.js
  README.md
```

- **helpers/** contains reusable functions for login, adding items, and checkout steps.
- **tests/** contains the main test specification for the SauceDemo purchase flow.
- **playwright.config.js** holds Playwright settings such as browser options and test directory.

Generated folders like `node_modules/`, `playwright-report/`, and `test-results/` are ignored in version control.

---

## Notes

This project is intentionally small and focused. My aim was to build something clean, readable, and representative of how I approach automation: clear naming, minimal duplication, and helpers that make the test flow easy to follow.