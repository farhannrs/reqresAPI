describe('POST /api/login Successful Login', () => {

    const apiUrl = 'https://reqres.in/api/login';
    const validLoginPayload = {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    };

    it('should return 200 status code on successful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.status).to.eq(200); // Ensure the response status is 200
        });
    });

    it('should return a valid token on successful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body.token).to.be.a('string'); // Ensure the token is a string
            expect(response.body.token).to.have.length.greaterThan(0); // Ensure the token is not empty
        });
    });

    it('should return a valid JSON object on successful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body).to.be.an('object'); // Ensure the response body is a JSON object
            expect(response.body).to.have.property('token'); // Ensure the response contains a token property
        });
    });

    it('should ensure the token field exists in the response body', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body).to.have.property('token'); // Ensure the token property exists
        });
    });

    it('should return the token value as a valid JWT-like string', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body.token).to.match(/^[A-Za-z0-9-_]+$/); // Check if the token follows a valid JWT-like pattern
        });
    });

    it('should return 200 status code when valid credentials are provided', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.status).to.eq(200); // Ensure the response status is 200
        });
    });

    it('should handle successful login with valid credentials and no extra fields', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body).to.not.have.property('error'); // Ensure there is no error property in the response
        });
    });

    it('should validate the response headers for successful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json'); // Ensure the response content-type is JSON
            // expect(response.headers).to.have.property('x-request-id'); // Ensure the response contains an x-request-id header
        });
    });

    it('should return a valid token in the response body', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body.token).to.be.a('string'); // Ensure token is a string
            expect(response.body.token).to.have.length.greaterThan(0); // Ensure the token is not empty
        });
    });

    it('should test that the API does not expose sensitive information in the response body', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.body).to.not.have.property('password'); // Ensure password is not returned in the response
            expect(response.body).to.not.have.property('email'); // Ensure email is not returned in the response
        });
    });

    it('should test response time for successful login', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validLoginPayload,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Ensure the response time is under 1 second
        });
    });


    it('should not allow login with invalid credentials (negative test case)', () => {
        const invalidLoginPayload = {
            email: "wrong.email@reqres.in",
            password: "wrongpassword"
        };
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: invalidLoginPayload,
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(400); // Ensure the response status is 400 for invalid credentials
            expect(response.body).to.have.property('error', 'Invalid credentials'); // Ensure the error message is correct
        });
    });

    it('should ensure no unnecessary fields are sent in the request', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "eve.holt@reqres.in", password: "cityslicka", extraField: "value" },
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(200); // Ensure the response status is 200
            expect(response.body).to.not.have.property('extraField'); // Ensure the response does not contain extra fields
        });
    });
});
