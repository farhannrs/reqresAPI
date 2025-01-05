describe('PUT /api/users/2', () => {

    const apiUrl = 'https://reqres.in/api/users/2';
    const requestPayload = {
        name: "Farhan Qazi",
        job: "QA Automation Engineer"
    };
    const invalidJson = '{ "name": "Farhan Qazi", "age": 30 '

    it('should return 200 status code', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return the updated name and job', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body.name).to.eq(requestPayload.name);
            expect(response.body.job).to.eq(requestPayload.job);
        });
    });

    it('should include updatedAt field in the response', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body).to.have.property('updatedAt');
            expect(response.body.updatedAt).to.be.a('string');
        });
    });

    it('should handle invalid data gracefully (e.g., empty name)', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: {
                name: 234,
                job: "zion resident"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should handle missing data gracefully (e.g., missing job)', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: {
                name: "morpheus"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should ensure the request payload is valid (e.g., non-empty name and job)', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body.name).to.be.a('string').and.to.have.length.greaterThan(0);
            expect(response.body.job).to.be.a('string').and.to.have.length.greaterThan(0);
        });
    });

    it('should return the same data after the update', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.body.name).to.eq(requestPayload.name);
            expect(response.body.job).to.eq(requestPayload.job);
        });
    });

    it('should check that the request is idempotent (no change with same data)', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response1) => {
            const firstResponse = response1.body;
            cy.request({
                method: 'PUT',
                url: apiUrl,
                body: requestPayload,
            }).then((response2) => {
                // Ignore 'updatedAt' field and compare other fields
                expect(response2.body.name).to.eq(firstResponse.name);
                expect(response2.body.job).to.eq(firstResponse.job);
            });
        });
    });

    it('should return 400 for invalid JSON in the request body', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: invalidJson, // Invalid JSON
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should verify the content type of the response is JSON', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

    it('should check response time is within acceptable limits', () => {
        cy.request({
            method: 'PUT',
            url: apiUrl,
            body: requestPayload,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust as per performance criteria
        });
    });


    it('should verify that the updated data persists on subsequent GET requests', () => {
        cy.request({
            method: 'PUT',
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
