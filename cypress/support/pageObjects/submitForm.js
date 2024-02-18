class SubmitForm {
    get firstName() {
        return cy.get('input[name="first_name"]')
    }
    get lastName() {
        return cy.get('input[name="last_name"]')
    }
    get password() {
        return cy.get('input[name="password"]')
    }
    get email() {
        return cy.get('input[type="email"]')
    }
    get password() {
        return cy.get('input[name="password"]') 
    }

    get confirmPassword() {
        return cy.get('input[name="confirm_password"]')
    }

    get avatar() {
        return cy.get('input[type="file"]')
    }

    get sliderCapchaTrack() {
        return cy.get('#slider-track')
    
    }

    get sliderCapchaThumb() {
        return cy.get('#slider-thumb')
    }
    get submit() {
        return cy.get('input[type="submit"]')
    }
    
    get errorMessages () {
        const message = {
            fieldIsRequered: 'Please fill out this field.',
            emailIsInvalid: 'This field must be a valid email',
            emailIsRequired: 'This field must be a valid email',
            emailIsMissingAt: "Please include an '@' in the email address",
            emailIsMissingDomain: "Please enter a part following '@'",
            solveCaptcha: 'Please solve the captcha!',
            passwordsDoNotMatch: 'Passwords do not match!',
            fileSizeIsTooBig: 'File size must be less than 2 MB.',
            invalidImageType: 'Invalid image file.'
        }

        return message;
    }
       
}

export default SubmitForm