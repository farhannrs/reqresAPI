describe('POST /api/register', () => {

    const apiUrl = 'https://reqres.in/api/register';
    const validRequestPayload = {
        email: "eve.holt@reqres.in",
        password: "pistol"
    };

    it('should return 200 status code when the registration is successful', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validRequestPayload,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return a valid id and token in the response', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validRequestPayload,
        }).then((response) => {
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('token');
            expect(response.body.id).to.be.a('number');
            expect(response.body.token).to.be.a('string');
        });
    });

    it('should return 400 status code when email is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { password: "pistol" },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming email is required and should return 400
        });
    });

    it('should return 400 status code when password is missing', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "eve.holt@reqres.in" },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming password is required and should return 400
        });
    });

    it('should return 400 status code when email is invalid', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "invalid-email", password: "pistol" },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming invalid email format returns 400
        });
    });

    it('should return 400 status code when password is too short', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "eve.holt@reqres.in", password: "p" }, // Password too short
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming password must meet certain length requirements
        });
    });

    it('should return an error when the email is already registered', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: { email: "eve.holt@reqres.in", password: "pistol" },
        }).then(() => {
            cy.request({
                method: 'POST',
                url: apiUrl,
                body: { email: "eve.holt@reqres.in", password: "pistol" },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400); // Assuming duplicate email returns 400
            });
        });
    });

    it('should return a response with correct token format', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validRequestPayload,
        }).then((response) => {
            expect(response.body.token).to.match(/^[A-Za-z0-9-_]+$/); // Check if token format is valid (base64 URL encoding)
        });
    });

    it('should handle missing fields gracefully with 400 status code', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {}, // Empty body
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Missing fields should return a 400 error
        });
    });

    it('should ensure that the response time is within acceptable limits', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validRequestPayload,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust the threshold as per your performance requirement
        });
    });

    it('should validate the content-type header of the response', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: validRequestPayload,
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

});
