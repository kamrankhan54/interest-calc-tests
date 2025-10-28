# 💰 Interest Calculator Test Framework

## 🧩 Overview

This project contains automated end-to-end tests for the **Interest Calculator** web application.

### Why I chose Playwright with TypeScript

I chose **Playwright** for its fast and straightforward setup, which was ideal given my time constraints.  
Using **TypeScript** further enhanced the development process by catching potential issues during compile time rather than at runtime.

This approach helped me save time and ensure more reliable, maintainable test code — without needing to repeatedly run the tests to find errors.

---

## 🧰 Tech Stack

- **TypeScript**
- **Playwright**
- **Node.js**

---

## 🧱 Framework Architecture

The diagram below shows how the Interest Calculator Test Framework is structured, including the components, data handling, and browser setup.

https://freeimage.host/i/screenshot-2025-10-28-at-000107.K6AqMve


## 🚀 Getting Started

### 1️⃣ Install dependencies

npm install

### 2️⃣ Run tests in headless mode

#### Chrome
npm run test:chromium

#### Firefox
npm run test:firefox

#### Safari
npm run test:safari

#### All browsers (headless) in parallel
npm run test:headless

#### Open Playwright GUI and run tests manually
npm run test:ui

### 3️⃣ Run tests with browser UI (headed mode)

npx playwright test --headed

### 4️⃣ View the HTML report

npx playwright show-report

### 🐞 Bugs Found

You can view and track identified bugs for the Interest Calculator on Trello:

🔗 [Interest Calculator Bugs Board](https://trello.com/b/8ZA3kWCl/interest-calculator-bugs)

