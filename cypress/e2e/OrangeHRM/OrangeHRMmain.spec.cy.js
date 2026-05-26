import OrangeHRMLoginPage from "../../Pages/OrangeHRM/OrangeHRMLoginPage.js";
import OrangeHRMMyinfoPage from "../../Pages/OrangeHRM/OrangeHRMMyInfoPage.js";
import commonActions from "../../Pages/OrangeHRM/commonActions.js";
import { createFakeUser } from '../../support/DataGenerator/generateUser';

const loginPage = new OrangeHRMLoginPage();
const myInfoPage = new OrangeHRMMyinfoPage();
const common = new commonActions();

describe('OrangeHRM Automation Test Suite', ()=> {
let DynamicUserData;
     beforeEach(function() {
      DynamicUserData = createFakeUser();
         cy.fixture('OrangeHRM/OrangeHRMLoginFolder/LoginData.json').then((data) =>{
             this.data = data;
           });
         loginPage.visitSite();
      });

     xit('TC01 : Verify the contents and UI elements of Login Screen', function(){
        
        loginPage.VerificationOfLoginPage();
     });

     xit('TC02 : Verify the error message for invalid username', function(){
        loginPage.LoginWithInvalidUsername(this.data.InvalidUsername, this.data.Password);
        loginPage.AlertMessage(this.data.InvalidUsername, this.data.Password);
     });
    
     xit('TC03 : Verify the error message for invalid password', function(){
        loginPage.LoginWithInvalidPassword(this.data.Username, this.data.InvalidPassword);
        loginPage.AlertMessage(this.data.Username, this.data.InvalidPassword);
     });

     xit('TC04 : Verify the successful login with valid credentials', function(){
        loginPage.enterUsername(this.data.Username);
        loginPage.enterPassword(this.data.Password);
        loginPage.clickSubmit();
        cy.url().should('include', '/dashboard/index');
     });

     xit('TC05 : Verify the My Info side menu and its contents', function(){
        loginPage.Login(this.data.Username, this.data.Password);
        common.SidePanelTitle();
        common.sidePanelOption('My Info');
        myInfoPage.VerifyTitle();
        myInfoPage.VerifySectionHeaders();
        myInfoPage.VerifyPersonalDetailsSection();
     });
  
     //Directly Editing because the data already exists due to Open website where others are using to and no Add button as well.
     xit('TC06 : Verify the ability to edit Personal Details in My Info page', function(){
        loginPage.Login(this.data.Username, this.data.Password);
        common.SidePanelTitle();
        common.sidePanelOption('My Info');
        myInfoPage.EnterEmployeeFullName(DynamicUserData.firstName, DynamicUserData.MiddleName, DynamicUserData.lastName);
        myInfoPage.FindAndInputValues(DynamicUserData.EmployeeId, 'Employee Id');
        myInfoPage.FindAndInputValues(DynamicUserData.OtherId, 'Other Id');
        myInfoPage.FindAndInputValues(DynamicUserData.DriversLicenseNumber, "Driver's License Number");
        myInfoPage.FindAndInputValues(DynamicUserData.licenseExpiryFormat1, 'License Expiry Date');
        myInfoPage.SelectValueFromDropdown(DynamicUserData.Nationality, 'Nationality');
        myInfoPage.SelectValueFromDropdown(DynamicUserData.MaritalStatus, 'Marital Status');
        myInfoPage.FindAndInputValues(DynamicUserData.dobType, 'Date of Birth');
        myInfoPage.SelectRadiobutton(DynamicUserData.Gender)
        myInfoPage.ClickSaveButton();
        myInfoPage.SuccessMessage();

        /***************************** Notes *********************************************/
        /*Verification after saving the details Reason : Because when user do login logout 
         new data will get displayed so verifying details after saving data.*/
        /********************************************************************************/
        //TC07 : Verify that the changes made in Personal Details are retained after saving
         
         myInfoPage.VerifyEmployeeNameRetained(DynamicUserData.firstName, DynamicUserData.MiddleName, DynamicUserData.lastName);
         myInfoPage.VerifyInputFieldRetainedChanges(DynamicUserData.EmployeeId, 'Employee Id');
         myInfoPage.VerifyInputFieldRetainedChanges(DynamicUserData.OtherId, 'Other Id');
         myInfoPage.VerifyInputFieldRetainedChanges(DynamicUserData.DriversLicenseNumber, "Driver's License Number");
         myInfoPage.validateFlexibleDateFieldByLabel('License Expiry Date', DynamicUserData.licenseExpiryFormat1, DynamicUserData.licenseExpiryFormat2, DynamicUserData.licenseExpiryFormat3);
         myInfoPage.VerifyDropdownRetainedChanges(DynamicUserData.Nationality, 'Nationality')    
         myInfoPage.VerifyDropdownRetainedChanges(DynamicUserData.MaritalStatus, 'Marital Status')
         myInfoPage.validateFlexibleDateFieldByLabel('Date of Birth', DynamicUserData.dobType, DynamicUserData.dobVerify);
         myInfoPage.VerifyRadiobutton(DynamicUserData.Gender)
    })

    xit('TC08 : Verify the contents of Custom Fields section in My Info page', function(){
        loginPage.Login(this.data.Username, this.data.Password);
        common.SidePanelTitle();
        common.sidePanelOption('My Info');
        myInfoPage.VerifyCustomFieldSection();
     })

    xit('TC09 : Verify the ability to edit Custom Fields in My Info page', function(){
        loginPage.Login(this.data.Username, this.data.Password);
        common.SidePanelTitle();
        common.sidePanelOption('My Info');
        myInfoPage.SelectBloodType(DynamicUserData.BloodType, 'Blood Type');
        myInfoPage.EnterValueInTestField(DynamicUserData.TestInput, 'Test_Field');
        myInfoPage.ClickSaveButton();
        myInfoPage.SuccessMessage();

        /***************************** Notes *********************************************/
        /*Verification after saving the details Reason : Because when user do login logout 
         new data will get displayed so verifying details after saving data.*/
        /********************************************************************************/
        //TC10: Verify that the changes made in Custome Fields Details are retained after saving
        myInfoPage.VerifyCustomFieldDropdownRetainedChanges(DynamicUserData.BloodType, 'Blood Type');
        myInfoPage.VerifyCustomFieldInputRetainedChanges(DynamicUserData.TestInput, 'Test_Field');
     })

    xit('TC11 : Verify the contents of Attachmentsection in My Info page ', function(){
         loginPage.Login(this.data.Username, this.data.Password);
         common.SidePanelTitle();
         common.sidePanelOption('My Info');
         myInfoPage.VerifyAttachmentSection();
    })

    xit('TC12 : Verify the contents of add attachment in Attachment section of My Info page', function(){
         loginPage.Login(this.data.Username, this.data.Password);
         common.SidePanelTitle();
         common.sidePanelOption('My Info');
         myInfoPage.ClickOnAddFileButton();
         myInfoPage.VerifyTitleAfter();
         myInfoPage.VerifyFileuploadsection();
     })

    xit('TC13 : Verify the Add Attachment section Upload File functionality with large file', function(){

        const FilePath = 'cypress/fixtures/TestFiles/2mb.pdf';

         loginPage.Login(this.data.Username, this.data.Password);
         common.SidePanelTitle();
         common.sidePanelOption('My Info');
         myInfoPage.VerifyTitleBefore();
         myInfoPage.ClickOnAddFileButton();
         myInfoPage.VerifyTitleAfter();
         myInfoPage.UploadFile(FilePath);
         myInfoPage.verifyValidationMessage('Attachment Size Exceeded');
         myInfoPage.CancelButton();
         myInfoPage.VerifyTitleBefore();
     })

     it('TC14 : Verify the Add Attachment section upload file functionality with Valid File', function(){

       const FilePath = 'cypress/fixtures/TestFiles/1mb.pdf';

        loginPage.Login(this.data.Username, this.data.Password);
         common.SidePanelTitle();
         common.sidePanelOption('My Info');
         myInfoPage.VerifyTitleBefore();
         myInfoPage.captureBeforeCount().then(($capturedCount) => {
         myInfoPage.ClickOnAddFileButton();
         myInfoPage.VerifyTitleAfter();
         myInfoPage.UploadFile(FilePath);
         myInfoPage.AddComments(DynamicUserData.Comments)
         myInfoPage.SaveButton();
         myInfoPage.verifyCountIncremented($capturedCount);
      })
   })
})