describe('GET /api/unknown/23', () => {

    const apiUrl = 'https://reqres.in/api/unknown/23';

    it('should return 404 status code', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false, // Prevent Cypress from failing on 404
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('should return an empty response body', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body).to.deep.eq({});
        });
    });

    it('should validate response headers', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.headers['access-control-allow-origin']).to.eq('*');
        });
    });

    it('should validate that no unexpected fields are present in the response body', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            const responseKeys = Object.keys(response.body);
            expect(responseKeys).to.be.empty; // Ensure no unexpected fields exist
        });
    });

    it('should validate response time is within acceptable limits', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as needed
        });
    });

    it('should verify the API handles non-existing resources gracefully', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.deep.eq({});
        });
    });

    it('should validate CORS headers are present', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.headers).to.have.property('access-control-allow-origin', '*');
        });
    });

    it('should confirm no data is returned for a non-existent resource', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body).to.deep.eq({});
        });
    });
});