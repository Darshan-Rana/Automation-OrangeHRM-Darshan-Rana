const locator = require('../../fixtures/OrangeHRM/CommonActionLocators.json');

class CommonActions {

    
    SidePanelTitle(){
        cy.get(locator.SidePanelTitle).should('be.visible');
    }

  sidePanelOption(text) {
    cy.get(locator.sidePanel.SearchField).type(text);
    cy.get(locator.sidePanel.Locator).contains(text).should('be.visible').click();
   }
}

export default CommonActions;