describe('PATCH /api/users/2', () => {

    const apiUrl = 'https://reqres.in/api/users/2';
    const requestPayload = {
        name: "Farhan Qazi",
        job: "SQA Engineer"
    };

    it('should return 200 status code', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return the updated name and job', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body.name).to.eq(requestPayload.name);
            expect(response.body.job).to.eq(requestPayload.job);
        });
    });

    it('should include updatedAt field in the response but ignore its value for comparisons', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body).to.have.property('updatedAt');
            expect(response.body.updatedAt).to.be.a('string');
        });
    });

    it('should handle requests with only partial data (e.g., only name)', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: { name: "morpheus" },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq("morpheus");
            expect(response.body).not.to.have.property('job'); // `job` should not be in the response
        });
    });

    it('should handle requests with empty name and job fields', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: { name: "", job: "" },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming the API rejects empty fields
        });
    });

    it('should not allow PATCH requests with missing payload', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming the API expects at least one field to be updated
        });
    });

    it('should verify the response contains only updated fields and updatedAt', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: { job: "zion resident" },
        }).then((response) => {
            expect(response.body).to.have.property('job', "zion resident");
            expect(response.body).to.have.property('updatedAt');
            expect(response.body).not.to.have.property('name'); // `name` should not be returned if not included in the payload
        });
    });

    it('should check idempotency when sending the same data multiple times', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response1) => {
            const firstResponse = response1.body;
            cy.request({
                method: 'PATCH',
                url: apiUrl,
                body: requestPayload,
            }).then((response2) => {
                expect(response2.body.name).to.eq(firstResponse.name);
                expect(response2.body.job).to.eq(firstResponse.job);
            });
        });
    });

    it('should handle invalid JSON in the request body', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: '{ "name": "morpheus", "job": "zion resident" ', // Invalid JSON
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // Assuming the API rejects invalid JSON
        });
    });

    it('should validate the response content type as JSON', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

    it('should ensure the API response time is within acceptable limits', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust as per performance criteria
        });
    });

    it('should return 401 for unauthorized access', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
            auth: { username: 'invalid', password: 'invalid' }, // Simulating unauthorized request
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('should ensure updated data persists on subsequent GET requests', () => {
        cy.request({
            method: 'PATCH',
            url: apiUrl,
            body: requestPayload,
        }).then(() => {
            cy.request(apiUrl).then((response) => {
                expect(response.body.name).to.eq(requestPayload.name);
                expect(response.body.job).to.eq(requestPayload.job);
            });
        });
    });

});
