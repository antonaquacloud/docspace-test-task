# DocSpace

The project contains a set of automated UI tests developed using Playwright and TypeScript to test key user scenarios in the DocSpace system. The main focused scenario is to create a room from an existing file and verify that the details are displayed correctly.

## Tech Stack
* Framework: Playwright Test (v1.55.1 or higher)
* Language: TypeScript (v5.x)
* Execution environment: Node.js (v20.19.5, see nvmrc)
* Configuration: dotenv (for secure storage of credentials)

## Prerequisites
Install Node.js (it is recommended to use nvm for automatic version switching: nvm install and nvm use).

## Install the project dependencies:
npm install

## .env
* Create a file .env in the root of the project based on the provided **env.example**.
* Fill in the environment variables for authorization and the base URL.

## Running tests
* npm run test - Run all tests in Headless mode.
* npm run test:ui - Run the Playwright UI to interactively view the tests.
* npm run codegen - Run a code generator (Codegen).

## Project structure 
* **fixtures/**: Contains fixtures (auth.ts) for automatic authorization.
* **src/**
    * **assertions/**: Modules for complex checks ('ToastAssertions.ts').
    * **pages/**: Page Object Model classes (BasePage, DocumentsPage).
* **tests/**: Files with test cases ('docspace.spec.ts').
* **utils/**: Test data generators.
* 'playwright.config.ts': The main configuration file of Playwright.
