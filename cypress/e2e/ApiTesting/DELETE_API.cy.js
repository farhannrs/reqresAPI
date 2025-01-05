describe('DELETE /api/users/2', () => {

    const apiUrl = 'https://reqres.in/api/users/2';

    it('should return 204 status code when the user is successfully deleted', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('should return an empty response body', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then((response) => {
            expect(response.body).to.be.empty;
        });
    });

    it('should ensure the user is no longer available after deletion', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then(() => {
            cy.request({
                method: 'GET',
                url: apiUrl,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            });
        });
    });

    it('should handle deletion of a non-existent user gracefully', () => {
        cy.request({
            method: 'DELETE',
            url: '/api/users/9999',
            body: {name: "farhan"}, // Assuming user 9999 does not exist
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404); // Assuming the API returns 404 for non-existent users
        });
    });

    it('should handle unauthorized access gracefully', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
            auth: { username: 'invalid', password: 'invalid' }, // Simulate unauthorized access
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401); // Assuming the API returns 401 for unauthorized requests
        });
    });

    it('should return an error when called without proper authentication headers (if required)', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
            headers: { Authorization: '' }, // Simulate missing authorization header
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401); // Assuming the API requires authentication
        });
    });

    it('should verify that multiple DELETE requests on the same resource return consistent behavior', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then((response1) => {
            expect(response1.status).to.eq(204); // First DELETE should succeed

            cy.request({
                method: 'DELETE',
                url: apiUrl,
                failOnStatusCode: false,
            }).then((response2) => {
                expect(response2.status).to.eq(404); // Second DELETE should return 404 (user already deleted)
            });
        });
    });

    it('should ensure the response time is within acceptable limits', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as per performance requirements
        });
    });

    it('should validate that the content-type of the response is correct (if applicable)', () => {
        cy.request({
            method: 'DELETE',
            url: apiUrl,
        }).then((response) => {
            expect(response.headers['content-type']).to.not.exist; // DELETE responses often have no content type
        });
    });

});
