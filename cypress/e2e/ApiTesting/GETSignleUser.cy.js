describe('GET /api/users/2', () => {

    const apiUrl = 'https://reqres.in/api/users/2';

    it('should return 200 status code', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return the correct structure for the response body', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body).to.have.keys('data', 'support');
            expect(response.body.data).to.have.keys('id', 'email', 'first_name', 'last_name', 'avatar');
            expect(response.body.support).to.have.keys('url', 'text');
        });
    });

    it('should return the correct data for user with id 2', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body.data.id).to.eq(2);
            expect(response.body.data.email).to.eq('janet.weaver@reqres.in');
            expect(response.body.data.first_name).to.eq('Janet');
            expect(response.body.data.last_name).to.eq('Weaver');
            expect(response.body.data.avatar).to.eq('https://reqres.in/img/faces/2-image.jpg');
        });
    });

    it('should return the correct support information', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body.support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
            expect(response.body.support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');
        });
    });

    it('should verify the avatar URL is valid and returns an image', () => {
        cy.request(apiUrl).then((response) => {
            const avatarUrl = response.body.data.avatar;
            cy.request(avatarUrl).then((avatarResponse) => {
                expect(avatarResponse.status).to.eq(200);
                expect(avatarResponse.headers['content-type']).to.include('image');
            });
        });
    });

    it('should handle unexpected status codes gracefully', () => {
        cy.request({
            url: apiUrl,
            failOnStatusCode: false,
        }).then((response) => {
            expect([200, 404]).to.include(response.status);
        });
    });

    it('should ensure all values are not null or undefined', () => {
        cy.request(apiUrl).then((response) => {
            Object.values(response.body.data).forEach((value) => {
                expect(value).to.not.be.null;
                expect(value).to.not.be.undefined;
            });
            Object.values(response.body.support).forEach((value) => {
                expect(value).to.not.be.null;
                expect(value).to.not.be.undefined;
            });
        });
    });

    it('should check response time is within acceptable limits', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as per SLA
        });
    });

    it('should verify email format is valid', () => {
        cy.request(apiUrl).then((response) => {
            const email = response.body.data.email;
            expect(email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });

    it('should validate that the support URL is well-formed', () => {
        cy.request(apiUrl).then((response) => {
            const supportUrl = response.body.support.url;
            expect(supportUrl).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
        });
    });

    it('should handle CORS headers appropriately', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.headers).to.have.property('access-control-allow-origin', '*');
        });
    });

    it('should return correct data types for all fields', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body.data.id).to.be.a('number');
            expect(response.body.data.email).to.be.a('string');
            expect(response.body.data.first_name).to.be.a('string');
            expect(response.body.data.last_name).to.be.a('string');
            expect(response.body.data.avatar).to.be.a('string');
            expect(response.body.support.url).to.be.a('string');
            expect(response.body.support.text).to.be.a('string');
        });
    });

    
});