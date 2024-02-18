class SubmitFormResult {
    getResultsFormHeader() {
    return cy.get('h1');
    }

    getResultsList() {
        return cy.get('li');
    }
}
export default SubmitFormResult;