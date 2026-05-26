const locators = require('../../fixtures/OrangeHRM/OrangeHRMLoginFolder/LoginLoctors.json');

class OrangeHRMLoginPage {
     
     
      visitSite(){
          cy.visit(locators.Values.URL);
      }

      enterUsername(username){
        cy.get(locators.Username).type(username).should('have.value',username);
      }

      enterPassword(password){
        cy.get(locators.Password).type(password).should('have.value',password);
      }

      clickSubmit(){
        cy.get(locators.Submitbutton).click();
      }

      VerificationOfLoginPage(){
         cy.get(locators.FieldVerification.CompanyLogo).should('be.visible');
         cy.get(locators.FieldVerification.ScreenTitle).should('be.visible');
         cy.get(locators.FieldVerification.ScreenFields).should('contain.text', locators.Values.FieldNames[0]);
         cy.get(locators.FieldVerification.ScreenFields).should('contain.text', locators.Values.FieldNames[1]);
         cy.get(locators.Submitbutton).should('be.visible');
      }
     
     LoginWithInvalidUsername(name, password){
        this.enterUsername(name);
        this.enterPassword(password);
        cy.get(locators.Username).clear();
        this.clickSubmit();
        cy.get(locators.FieldVerification.FieldErrorMessage).should('be.visible').and('contain.text', locators.ErrorMessage);
     }

     LoginWithInvalidPassword(name, password){
        this.enterPassword(password);
        this.enterUsername(name);
        cy.get(locators.Password).clear();
        this.clickSubmit();
        cy.get(locators.FieldVerification.FieldErrorMessage).should('be.visible').and('contain.text', locators.ErrorMessage);
     }


     AlertMessage(name, password){
        cy.get(locators.Username).clear();
        cy.get(locators.Password).clear();
        this.enterUsername(name);
        this.enterPassword(password);
        this.clickSubmit();
        cy.get(locators.Alert.AlertSection).should('be.visible');
        cy.get(locators.Alert.AlertContainer).should('be.visible').and('contain.text', locators.AlertMessage);
      }

   Login(name, password){
        this.enterUsername(name);
        this.enterPassword(password);
        this.clickSubmit();
     }
}

export default OrangeHRMLoginPage;