const locators = require('../../fixtures/OrangeHRM/OrangeHRMMyInfoFolder/MyinfoPageLocator.json');

       
 let initialCount = 0;

class OrangeHRMMyinfoPage {
      
    VerifyTitle(){
        cy.get(locators.Profile).should('be.visible')
    }

    VerifySectionHeaders(){

        cy.get(locators.MyInfoPageContents.sectionheader.Locator).should('be.visible').and('contain', locators.MyInfoPageContents.sectionheader.Labels.PersonalDetails);
        cy.get(locators.MyInfoPageContents.sectionheader.Locator).should('be.visible').and('contain', locators.MyInfoPageContents.sectionheader.Labels.CustomFields);
        cy.get(locators.MyInfoPageContents.sectionheader.Locator).should('be.visible').and('contain', locators.MyInfoPageContents.sectionheader.Labels.Attachments);
    }
   
    //********************************************************//
    //Below is content verification of Personal Details Setions Method.

    VerifyPersonalDetailsSection(){
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.EmployeeFullName);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.EmployeeId);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.OtherId);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.DriversLicenseNumber);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.LicenseExpiryDate);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.Nationality);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.MaritalStatus);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.DateofBirth);
        cy.get(locators.MyInfoPageContents.PersonalDetails.Locator).should('contain', locators.MyInfoPageContents.PersonalDetails.Labels.Gender);
    }

    //Above is End of Personal Details Setions Content Verification Methods.
    //********************************************************//
    //Below is Editing Personal Details Setions Related Methods.

    EnterEmployeeFullName(Fname, Mname, Lname){

        cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.FullFieldLocator).should('be.visible').then(() =>{
            
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.FirstName).clear().type(Fname).should('have.value', Fname);
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.MiddleName).clear().type(Mname).should('have.value', Mname);
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.LastName).clear().type(Lname).should('have.value', Lname);
        })    
    }

    FindAndInputValues(valueToType, TextValue){ {
        cy.contains(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.formFieldWrapper, TextValue).as('targetFieldGroup');
         cy.get('@targetFieldGroup').find(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.inputField)
         .should('be.visible')
         .clear()
         .type(valueToType)
         .should('have.value', valueToType);
         cy.get('body').click();
        }     
    }

    SelectValueFromDropdown(valueToType, TextValue){ {
        cy.contains(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.formFieldWrapper, TextValue).as('targetFieldGroup');
         cy.get('@targetFieldGroup').click().then(()=>{
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.Dropdown)
             .should('be.visible')
             .contains(valueToType).click()
             cy.get('body').click();
           }
        )}     
    }

    SelectRadiobutton(valuetoSelect){
        cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.RadioButton.SectionValue)
        .should('be.visible')
        .contains(valuetoSelect).then(($element) => {
             
            cy.wrap($element).find(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.RadioButton.Radio)
            .check({force : true})
            .should('be.checked');
        })
    }
     
    ClickSaveButton(){
        cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.SaveButton).eq(0).should('be.visible').click();
    }

    SuccessMessage(){  
        cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.Success).should('be.visible').and('contain.text', 'Success');
    }

    //Above is End of Personal Details Setions Related Editing Methods.
    //********************************************************//
    //Below is Verification of Personal Details Setions Related Methods.
    
    VerifyEmployeeNameRetained(Fname, Mname, Lname){

        cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.FullFieldLocator).should('be.visible').then(() =>{
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.FirstName).should('have.value', Fname);
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.MiddleName).should('have.value', Mname);
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.EmployeeName.LastName).should('have.value', Lname);
        })    
    }

    VerifyInputFieldRetainedChanges(valueToVerify, TextValue){
        cy.contains(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.formFieldWrapper, TextValue).as('targetFieldGroup');
        cy.get('@targetFieldGroup').find(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.inputField)
        .should('have.value', valueToVerify);
    }

   validateFlexibleDateFieldByLabel(labelText, Formatofdate1, Formatofdate2, Formatofdate3) {
       const wrapper = locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.formFieldWrapper;
       const inputSelector = locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.inputField;

        // 1. Match the field header text dynamically and find its wrapper container
        cy.contains(wrapper, labelText)
       .find(inputSelector) // 2. Drill down to find the specific input field inside that group
       .invoke('val')       // 3. Extract the saved text value from the input field
       .then((actualUiDate) => {
            // 4. Evaluate against both possible formats
            const Format1 = actualUiDate === Formatofdate1;
            const Format2 = actualUiDate === Formatofdate2;
            const Format3 = actualUiDate === Formatofdate3;


            expect(Format1 || Format2 || Format3, 
            `Expected field [${labelText}] value (${actualUiDate}) to match either ${Format1}, ${Format2} or ${Format3}`
          ).to.be.true;
      });
   }
    
    VerifyDropdownRetainedChanges(valueToVerify, TextValue){
         cy.contains(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.formFieldWrapper, TextValue).as('targetFieldGroup');
         cy.get('@targetFieldGroup').then(()=>{
            cy.get(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.IDSection.DropdownText)
             .should('be.visible')
             .contains(valueToVerify).should('exist');
         })
    }

    VerifyRadiobutton(valuetoSelect){
       cy.contains(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.RadioButton.SectionValue, valuetoSelect)
        .as('selectedRadioWrapper');
       cy.get('@selectedRadioWrapper')
        .find(locators.MyInfoPageContents.PersonalDetails.FieldsLocators.RadioButton.Radio)
        .should('be.checked');
    }
    
    //Above is End of Personal Details Setions Related Methods.
    //********************************************************//
    //Custome Field section Related Methods 
    //Verifying Content related method of Custom field section.
    VerifyCustomFieldSection(){
        cy.get(locators.MyInfoPageContents.CustomeFields.Locator).should('be.visible').and('contain.text',locators.MyInfoPageContents.CustomeFields.Labels.BloodType);
        cy.get(locators.MyInfoPageContents.CustomeFields.Locator).should('be.visible').and('contain.text',locators.MyInfoPageContents.CustomeFields.Labels.Test_Field);
    }
    //Editing related methods of Custom field section.
    SelectBloodType(valueToSelect, TextValue){
        cy.contains(locators.MyInfoPageContents.CustomeFields.Dropdown.MainValue, TextValue).as('targetFieldGroup');
         cy.get('@targetFieldGroup').click().then(()=>{
            cy.get(locators.MyInfoPageContents.CustomeFields.Dropdown.List)
             .should('be.visible')
             .contains(valueToSelect).click()
             cy.get('body').click();
        }
    )} 

    EnterValueInTestField(valueToType, TextValue){ 
        cy.contains(locators.MyInfoPageContents.CustomeFields.InputField.Field, TextValue).as('targetFieldGroup');
        cy.get('@targetFieldGroup').find(locators.MyInfoPageContents.CustomeFields.InputField.TextInput)
        .should('be.visible')
        .clear()
        .type(valueToType)
        .should('have.value', valueToType);
        cy.get('body').click();
    }

    ClickCustomFieldSaveButton(){
        cy.get(locators.MyInfoPageContents.CustomeFields.SaveButton).eq(1).should('be.visible').click();
    }

    CustomFieldSuccessMessage(){
        cy.get(locators.MyInfoPageContents.CustomeFields.Success).should('be.visible').and('contain.text', 'Success');
    }
    //Verification related methods of Custom field section.
    VerifyCustomFieldDropdownRetainedChanges(valueToVerify, TextValue){
        cy.contains(locators.MyInfoPageContents.CustomeFields.Dropdown.MainValue, TextValue).as('targetFieldGroup');
         cy.get('@targetFieldGroup').then(()=>{
            cy.get(locators.MyInfoPageContents.CustomeFields.Dropdown.Dropdowntext)
             .should('be.visible')
             .contains(valueToVerify).should('exist');
         })
    }

    VerifyCustomFieldInputRetainedChanges(valueToVerify, TextValue){
        cy.contains(locators.MyInfoPageContents.CustomeFields.InputField.Field, TextValue).as('targetFieldGroup');
        cy.get('@targetFieldGroup').find(locators.MyInfoPageContents.CustomeFields.InputField.TextInput)
        .should('have.value', valueToVerify);
    }
    //Above is End of Personal Details Setions Related Methods.
    //********************************************************//
    //Attachments section Related Methods 
    //Verifying Content related method of Attachment section.
    
    VerifyAttachmentSection() {
      const tableHeaders = locators.MyInfoPageContents.Attachments.Table.TableHeader;
      cy.get(locators.MyInfoPageContents.Attachments.Section).scrollIntoView().should('be.visible');
      cy.get(locators.MyInfoPageContents.Attachments.AddButton).should('be.visible');
      cy.get(locators.MyInfoPageContents.Attachments.Table.Header).should('be.visible')
        .and('contain.text', tableHeaders.FileName)
        .and('contain.text', tableHeaders.Description)
        .and('contain.text', tableHeaders.Size)
        .and('contain.text', tableHeaders.Type)
        .and('contain.text', tableHeaders.DateAdded)
        .and('contain.text', tableHeaders.AddedBy)
        .and('contain.text', tableHeaders.Actions);
    }
    
    //Verifying Add File button in Attachment section.
    ClickOnAddFileButton(){
         cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible')
           .then(($el) => {
                cy.wrap($el).find(locators.MyInfoPageContents.Attachments.AddButton).should('be.visible').click();
        })
    }

    VerifyFileuploadsection(){
        cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
               cy.wrap($el).find(locators.MyInfoPageContents.Attachments.Labels).should('be.visible', locators.MyInfoPageContents.Attachments.Values.SelectFile);
               cy.wrap($el).find(locators.MyInfoPageContents.Attachments.Labels).should('be.visible', locators.MyInfoPageContents.Attachments.Values.Comment);
        })
    }

    UploadFile(Filepath){
        cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
                 cy.wrap($el).find(locators.MyInfoPageContents.Attachments.UploadFile.File).selectFile(Filepath, {force : true});  
        })
    }

    verifyValidationMessage(expectedMessage) {
      cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
             cy.wrap($el).find(locators.MyInfoPageContents.Attachments.UploadFile.Locator).should('exist')
              .then(($uploadSection) => {
                 cy.wrap($uploadSection).find(locators.MyInfoPageContents.Attachments.UploadFile.Error)
                 .should('be.visible')
                 .and('include.text', expectedMessage);
              })
        }) 
    }

    AddComments(comment){
          cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
              cy.wrap($el).find(locators.MyInfoPageContents.Attachments.Comment).should('exist')
               .type(comment);
        }) 
    }

    CancelButton(){
          cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
              cy.wrap($el).find(locators.MyInfoPageContents.Attachments.CancelButton)
              .should('be.visible')
              .click();
        }) 
    }
    
    VerifyTitleBefore(){
        cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
              cy.wrap($el).find(locators.MyInfoPageContents.Attachments.Checking.TitleLocator)
              .should('be.visible')
              .and('contain.text', locators.MyInfoPageContents.Attachments.Checking.TitleBefore);
        })
    }

    VerifyTitleAfter(){
        cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
              cy.wrap($el).find(locators.MyInfoPageContents.Attachments.Checking.TitleLocator)
              .should('be.visible')
              .and('contain.text', locators.MyInfoPageContents.Attachments.Checking.TitleAfter);
        })
    }
    
    SaveButton(){
       cy.get(locators.MyInfoPageContents.Attachments.Section)
           .scrollIntoView()
           .should('be.visible').then(($el) => {
                cy.wrap($el).find(locators.MyInfoPageContents.Attachments.SubmitButton).should('be.visible').click();
        })

    }
    
    constructor(){

        this.labelSelector = locators.MyInfoPageContents.Attachments.IncermentalValue;
    }
     
   captureBeforeCount() {
       return cy.get(locators.MyInfoPageContents.Attachments.Section)
            .find(this.labelSelector)
            .invoke('text')
           .then((text) => {
               const cleanText = text.replace(/\s/g, '');
               const match = cleanText.match(/\((\d+)\)/);
               const count = match ? parseInt(match[1], 10) : 0;
            
              return cy.wrap(count);
         });
     }

verifyCountIncremented(baselineCount) {
    const expectedCount = baselineCount + 1;

    cy.get(locators.MyInfoPageContents.Attachments.Section)
        .find(this.labelSelector)
        .should('be.visible')
        .should(($el) => {
            const currentText = $el.text().replace(/\s/g, ''); 
            const currentMatch = currentText.match(/\((\d+)\)/);
            const actualCount = currentMatch ? parseInt(currentMatch[1], 10) : 0;
            
            expect(actualCount).to.equal(expectedCount, 
                `Expected record count to update from ${baselineCount} to ${expectedCount}`
             );
        });
    }
}   

export default OrangeHRMMyinfoPage;