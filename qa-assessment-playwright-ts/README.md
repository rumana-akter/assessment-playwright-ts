# QA Automation Engineer Assessment

This project implements a small, structured **test automation framework** using **Playwright (TypeScript)** to cover the UI testing tasks outlined in the assessment.

---

## Framework Overview

The framework is designed to be **modular, scalable, and easy to extend**. It follows the **Page Object Model (POM)** pattern, keeping test logic clean and reusable.

### Project Structure
qa-assessment-playwright-ts/
├── playwright.config.ts # Test runner configuration (Chromium only)
├── package.json # Project dependencies and scripts
├── src/
│ ├── pages/ # Page Object classes
│ │ ├── HomePage.ts
│ │ ├── ContactPage.ts
│ │ ├── ProductPage.ts
│ │ └── CartPage.ts
│ └── tests/
│ └── ui/ # UI test cases
│ ├── contact.spec.ts
│ └── cart.spec.ts
└── README.md # Documentation




### Key Features
- **Playwright (TypeScript)** with Page Object Model (POM).
- **UI-only tests** (Chromium browser).
- Configurable `baseURL` in `playwright.config.ts`.
- Reports with **screenshots**, **videos**, and **trace files**.

---

## Test Scenarios Implemented

### 1. Contact Form Validation & Submission
- Navigate to the **Contact** form.
- Submit with empty fields → verify validation errors.
- Fill required fields (First Name, Last Name, Email, Subject, Message).
- Submit and verify success message.

### 2. Cart Add & Update
- Navigate to a product (e.g., **Combination Pliers**).
- Add to cart and verify it appears.
- Navigate to the cart page and update quantity to **3**.
- Verify the updated quantity and product presence.

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)

### Steps
```bash
# Install dependencies
npm install

# Install Playwright browsers (Chromium)
npm run prepare

npm test

npm run report
