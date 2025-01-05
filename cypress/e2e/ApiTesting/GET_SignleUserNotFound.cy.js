describe('GET /api/users/2', () => {

    const apiUrl = 'https://reqres.in/api/users/32';

    it('should return 404 status code', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false, // Prevent Cypress from failing the test automatically
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('should return an empty response body', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body).to.be.empty;
        });
    });

    it('should have valid response headers', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.headers).to.have.property('content-type').that.includes('application/json');
            expect(response.headers).to.have.property('access-control-allow-origin', '*');
        });
    });

    it('should handle gracefully without errors when resource is not found', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.deep.equal({});
        });
    });

    it('should return response time within acceptable limits', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as needed
        });
    });

    
});