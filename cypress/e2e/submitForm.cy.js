import SubmitForm from '../support/pageObjects/submitForm';
import SubmitFormResult from '../support/pageObjects/submitFormResult';
const submitForm = new SubmitForm();
const submitFormResult = new SubmitFormResult();
let validUserData;

describe('Submit form verification', () => {
  
  function solveCaptcha() {
    let trackWidth;
    submitForm.sliderCapchaTrack.should('be.visible').then(($element) => {
       trackWidth = parseInt($element.width());
    });
    submitForm.sliderCapchaThumb.should('be.visible').then(() => {
      submitForm.sliderCapchaThumb.trigger('mousedown').trigger('mousemove', trackWidth, 0,{ force: true }).trigger('mouseup');
    });
  }

  before(() => {
    cy.fixture('validUserData').then((userData) => {
      validUserData = userData;
    });
    
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Submit form with valid data and avatar', () => {

    submitForm.firstName.should('be.visible').type( validUserData.firstName);
    submitForm.lastName.should('be.visible').type( validUserData.lastName);
    submitForm.email.should('be.visible').type( validUserData.email);
    submitForm.password.should('be.visible').type( validUserData.password);
    submitForm.confirmPassword.should('be.visible').type( validUserData.password);
    submitForm.avatar.should('be.visible').selectFile( validUserData.avatar);
    
    solveCaptcha();
    
    submitForm.submit.should('be.visible').click();

    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
  })
  
  it('Submit form with valid data and no avatar', () => {
    submitForm.firstName.should('be.visible').type(validUserData.firstName);
    submitForm.lastName.should('be.visible').type(validUserData.lastName);
    submitForm.email.should('be.visible').type(validUserData.email);
    submitForm.password.should('be.visible').type(validUserData.password);
    submitForm.confirmPassword.should('be.visible').type(validUserData.password);
    solveCaptcha();
    submitForm.submit.should('be.visible').click();

    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
  })
  
  it('Submit form with invalid data', () => {
    submitForm.firstName.should('be.visible');
    submitForm.submit.should('be.visible').click();
    submitForm.firstName.then(($input) => {
      expect($input[0].validationMessage).to.eq(submitForm.errorMessages.fieldIsRequered);
    });
    submitForm.firstName.should('be.visible').type(validUserData.firstName);
    submitForm.submit.should('be.visible').click();

    submitForm.lastName.should('be.visible');
    submitForm.submit.should('be.visible').click();
    submitForm.lastName.then(($input) => {
      expect($input[0].validationMessage).to.eq(submitForm.errorMessages.fieldIsRequered);
    });
    submitForm.lastName.should('be.visible').type( validUserData.lastName);
    
    submitForm.email.should('be.visible');
    submitForm.submit.should('be.visible').click();
    submitForm.email.then(($input) => {
      expect($input[0].validationMessage).to.eq(submitForm.errorMessages.fieldIsRequered);
    });
    submitForm.email.should('be.visible').type('asd');
    submitForm.email.then(($input) => {
      expect($input[0].validationMessage).to.contain(submitForm.errorMessages.emailIsMissingAt);
    });
    submitForm.email.should('be.visible').clear().type('asd@');
    submitForm.email.then(($input) => {
      expect($input[0].validationMessage).to.contain(submitForm.errorMessages.emailIsMissingDomain);
    });
    submitForm.email.should('be.visible').clear().type(validUserData.email);
    submitForm.submit.should('be.visible').click();

    submitForm.password.should('be.visible');
    submitForm.submit.should('be.visible').click();
    submitForm.password.then(($input) => {
      expect($input[0].validationMessage).to.eq(submitForm.errorMessages.fieldIsRequered);
    });
    submitForm.password.should('be.visible').type( validUserData.password);
    submitForm.submit.should('be.visible').click();

    submitForm.confirmPassword.should('be.visible');
    submitForm.submit.should('be.visible').click();
    submitForm.confirmPassword.then(($input) => {
      expect($input[0].validationMessage).to.eq(submitForm.errorMessages.fieldIsRequered);
    });
    submitForm.confirmPassword.should('be.visible').type('1');
    submitForm.submit.should('be.visible').click();
    
    submitForm.submit.should('be.visible').click();
    cy.get('li').should('be.visible').and('have.text', submitForm.errorMessages.solveCaptcha);
    solveCaptcha();
    submitForm.submit.should('be.visible').click();
    cy.get('li').should('be.visible').and('have.text', submitForm.errorMessages.passwordsDoNotMatch);
    submitForm.confirmPassword.should('be.visible').clear().type(validUserData.password);
    
    submitForm.avatar.should('be.visible').selectFile('cypress/fixtures/files/largeFile.jpeg');
    
    solveCaptcha();
    submitForm.submit.should('be.visible').click();
    cy.get('li').should('be.visible').and('have.text', submitForm.errorMessages.fileSizeIsTooBig);
    submitForm.avatar.should('be.visible').selectFile('cypress/fixtures/validUserData.json');
    solveCaptcha();
    submitForm.submit.should('be.visible').click();
    cy.get('li').should('be.visible').and('have.text', submitForm.errorMessages.invalidImageType);
    solveCaptcha();
    submitForm.submit.should('be.visible').click();

    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
  })

  it('Verify capcha slider', () => {
    submitForm.firstName.should('be.visible').type( validUserData.firstName);
    submitForm.lastName.should('be.visible').type( validUserData.lastName);
    submitForm.email.should('be.visible').type( validUserData.email);
    submitForm.password.should('be.visible').type( validUserData.password);
    submitForm.confirmPassword.should('be.visible').type( validUserData.password);
    submitForm.avatar.should('be.visible').selectFile( validUserData.avatar);
    
    let trackWidth;
    submitForm.sliderCapchaTrack.should('be.visible').then(($element) => {
       trackWidth = parseInt($element.width());
    });
    submitForm.sliderCapchaThumb.should('be.visible').then(() => {
      submitForm.sliderCapchaThumb.trigger('mousedown').trigger('mousemove', trackWidth/2, 0,{ force: true }).trigger('mouseup');
    });
    
    submitForm.submit.should('be.visible').click();

    cy.get('li').should('be.visible').and('have.text', submitForm.errorMessages.solveCaptcha);

    solveCaptcha();
    submitForm.submit.should('be.visible').click();
    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
  });

  it('Verify invalid avatar image', () => { // EXPECTED TO FAIL
    submitForm.firstName.should('be.visible').type( validUserData.firstName);
    submitForm.lastName.should('be.visible').type( validUserData.lastName);
    submitForm.email.should('be.visible').type( validUserData.email);
    submitForm.password.should('be.visible').type( validUserData.password);
    submitForm.confirmPassword.should('be.visible').type( validUserData.password);
    submitForm.avatar.should('be.visible').selectFile( 'cypress/fixtures/files/invalidAvatar.jpg');
    
    solveCaptcha();
    
    submitForm.submit.should('be.visible').click();

    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
    cy.get('img').compareSnapshot('img');
  });

  it('Verify valid avatar image', () => {
    submitForm.firstName.should('be.visible').type( validUserData.firstName);
    submitForm.lastName.should('be.visible').type( validUserData.lastName);
    submitForm.email.should('be.visible').type( validUserData.email);
    submitForm.password.should('be.visible').type( validUserData.password);
    submitForm.confirmPassword.should('be.visible').type( validUserData.password);
    submitForm.avatar.should('be.visible').selectFile( validUserData.avatar);
    
    solveCaptcha();
    
    submitForm.submit.should('be.visible').click();

    submitFormResult.getResultsFormHeader().should('be.visible').and('have.text', 'Successful Form Submissions');
    submitFormResult.getResultsList().should('be.visible').then(($list) => {
      const text = $list[0].innerText;
      expect(text).to.include(validUserData.firstName);
      expect(text).to.include(validUserData.lastName);
      expect(text).to.include(validUserData.email);
    });
    cy.get('img').compareSnapshot('img');
  });
})