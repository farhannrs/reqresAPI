describe('POST /api/users', () => {

    const apiUrl = 'https://reqres.in/api/users';
    const requestData = {
        name: 'Farhan Qazi',
        job: 'leader',
    };

    it('should return a 201 status code when creating a new user', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('should return the correct user data in the response body', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.body.name).to.eq(requestData.name);
            expect(response.body.job).to.eq(requestData.job);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('createdAt');
        });
    });

    it('should generate a valid ID for the new user', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            const userId = response.body.id;
            expect(userId).to.be.a('string'); // ID should be a string
            expect(userId).to.have.length.greaterThan(0); // ID should not be empty
        });
    });

    it('should return the correct createdAt timestamp in ISO 8601 format', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            const createdAt = response.body.createdAt;
            expect(createdAt).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/); // Validates ISO 8601 format
        });
    });

    it('should return the same name and job that was sent in the request', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.body.name).to.eq(requestData.name);
            expect(response.body.job).to.eq(requestData.job);
        });
    });

    it('should not return any unexpected fields in the response', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            const expectedKeys = ['name', 'job', 'id', 'createdAt'];
            const responseKeys = Object.keys(response.body);
            expect(responseKeys).to.have.members(expectedKeys); // Ensure only expected fields are returned
        });
    });

    it('should handle an empty request body correctly (edge case)', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {},
            failOnStatusCode: false, // Prevent test failure on error status
        }).then((response) => {
            expect(response.status).to.eq(400); // Expect a 400 Bad Request
        });
    });

    it('should return 400 for an invalid request with missing required fields', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                name: 'morpheus', // Missing "job" field
            },
            failOnStatusCode: false, // Prevent test failure on error status
        }).then((response) => {
            expect(response.status).to.eq(400); // Expect a 400 Bad Request
        });
    });

    it('should validate that the response is JSON', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

    it('should return a response time within acceptable limits', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Response time should be under 1 second
        });
    });

    it('should validate the "location" header contains the created user resource URL', () => {
        cy.request('POST', apiUrl, requestData).then((response) => {
            expect(response.headers).to.have.property('location');
            expect(response.headers['location']).to.include(`/api/users/${response.body.id}`);
        });
    });

    it('should not allow creating a user with invalid name or job format (e.g., numbers)', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                name: '12345', // Invalid name (numeric)
                job: 'leader',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Expect 400 Bad Request
        });
    });

    it('should check if the user ID is unique and different for multiple creations', () => {
        cy.request('POST', apiUrl, requestData).then((response1) => {
            const userId1 = response1.body.id;
            cy.request('POST', apiUrl, requestData).then((response2) => {
                const userId2 = response2.body.id;
                expect(userId1).to.not.eq(userId2); // Ensure different IDs for different requests
            });
        });
    });

    it('should handle invalid request methods gracefully (e.g., PUT on POST endpoint)', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404); // Expect 405 Method Not Allowed
        });
    });
});