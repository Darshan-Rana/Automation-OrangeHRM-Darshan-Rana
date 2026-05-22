// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('convertDateFormat', (dateString) => {
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return null;
});






Cypress.Commands.add('FELogin', (UserName, password) => {
    cy.get('.login-form #userName').type(UserName).should('have.value', UserName);
    cy.get('.login-form #pass').type(password).should('have.value', password);
    cy.get('.login-form input[value="Login"]').should('be.visible').click();  
});