// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import './commands';
import 'cypress-iframe';
// Alternatively you can use CommonJS syntax:
// require('./commands')

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
   console.log('Caught Error:', err.message);
    if (err.message.includes('NotificationDataApi is not defined') ||
        err.message.includes("Cannot read properties of undefined") ||
        err.message.includes("rgb is undefined") ||
        err.message.includes("checkRequired is not defined") ||
        err.message.includes("errorElement is null") ||
        err.message.includes("rules is undefined") ||
        err.message.includes("$ is not defined") ||
        err.message.includes("$.blockUI is not a function") ||
        err.message.includes(" Uncaught HTML Element with id=qr-reader not found") ||
        err.message.includes('dataTable is not defined') ||
        err.message.includes('clearError is not defined') ||
        err.message.includes('checkInput is not defined') ||
        err.message.includes('HTML Element with id=qr-reader not found') ||
        err.message.includes('custRaiseIssue is not defined')) {
        return false; // Prevent the test from failing for these errors
    }

    return true;
    throw err; // Let other errors be thrown
});