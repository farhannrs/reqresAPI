describe('POST /api/login Unsuccessful Login - Missing Password', () => {

    const apiUrl = 'https://reqres.in/api/login';
    const invalidLoginPayload = {
        email: "peter@klaven" // Missing password
    };

    it('should return 400 status code when password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure the response status is 400 for missing password
        });
    });

    it('should return an error message when password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.have.property('error', 'Missing password'); // Ensure the error message is correct
        });
    });

    it('should ensure the response body contains an error message', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.have.property('error'); // Ensure error is present in the response body
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message matches
        });
    });

    it('should return a JSON response body on unsuccessful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.be.an('object'); // Ensure the response body is a JSON object
            expect(response.body).to.have.property('error'); // Ensure the error property exists in the response
        });
    });

    it('should handle missing password gracefully and not expose any unnecessary information', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.not.have.property('token'); // Ensure the token is not present in the response
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message is specific and appropriate
        });
    });

    it('should test response time for unsuccessful login with missing password', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Ensure the response time is under 1 second
        });
    });

    it('should not include the email field in the error message', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.not.have.property('email'); // Ensure email is not exposed in the error response
        });
    });

    it('should return correct error format (JSON) when login fails due to missing password', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.be.an('object'); // Ensure the response is an object
            expect(response.body).to.have.property('error', 'Missing password'); // Ensure the error message is correct
        });
    });

    it('should ensure no other status code is returned for missing password', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.not.eq(200); // Ensure status is not 200
            expect(response.status).to.eq(400); // Ensure status is 400 for missing password
        });
    });

    it('should ensure that no token is generated for missing password', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.not.have.property('token'); // Ensure that no token is generated
        });
    });

});
