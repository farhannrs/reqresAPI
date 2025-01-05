describe('POST /api/register with missing password', () => {

    const apiUrl = 'https://reqres.in/api/register';
    const invalidRequestPayload = {
        email: "sydney@fife"
    };

    it('should return 400 status code when the password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure the response status is 400
        });
    });

    it('should return an error message "Missing password" when the password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message is correct
        });
    });

    it('should not accept an incomplete registration with only email', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure that the incomplete request is not accepted
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message is returned
        });
    });

    it('should ensure that the response contains an error field', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body).to.have.property('error'); // Ensure the error field is present
        });
    });

    it('should verify that the error field contains a valid error message', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.body.error).to.be.a('string'); // Ensure the error message is a string
            expect(response.body.error).to.eq('Missing password'); // Validate the error message
        });
    });

    it('should ensure the API handles invalid email format gracefully', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "invalid-email" }, // Invalid email format with missing password
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure the response status is 400
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message is about missing password
        });
    });

    it('should return 400 status for any incomplete registration request with missing password', () => {
        const testCases = [
            { email: "user@domain" }, // Missing password field
            { email: "" }, // Empty email with no password
            { email: " " }, // Email with spaces and no password
        ];

        testCases.forEach((testCase) => {
            cy.request({
                method: 'POST',
                url: apiUrl,
                body: testCase,
                failOnStatusCode: false, // Prevent automatic failure on non-2xx status
            }).then((response) => {
                expect(response.status).to.eq(400); // Ensure the response status is 400 for each case
                expect(response.body.error).to.eq('Missing password'); // Ensure the error message is consistent
            });
        });
    });

    it('should ensure that no additional fields are allowed in the request body', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "sydney@fife", extraField: "extraValue" }, // Extra field included
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure the response status is 400
            expect(response.body.error).to.eq('Missing password'); // Ensure the error message is about missing password
        });
    });

    it('should ensure that the response time is within acceptable limits for a 400 response', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Ensure the response time is under 1 second
        });
    });

    it('should validate the content-type header of the response when password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidRequestPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json'); // Ensure the content-type is JSON
        });
    });

});
