describe('GET /api/unknown/2', () => {

    const apiUrl = 'https://reqres.in/api/unknown/2';

    it('should return 200 status code', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return the correct structure for the response body', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body).to.have.keys('data', 'support');
            expect(response.body.data).to.have.keys('id', 'name', 'year', 'color', 'pantone_value');
            expect(response.body.support).to.have.keys('url', 'text');
        });
    });

    it('should return the correct data for the specified resource', () => {
        cy.request(apiUrl).then((response) => {
            const data = response.body.data;
            expect(data.id).to.eq(2);
            expect(data.name).to.eq('fuchsia rose');
            expect(data.year).to.eq(2001);
            expect(data.color).to.eq('#C74375');
            expect(data.pantone_value).to.eq('17-2031');
        });
    });

    it('should return the correct support information', () => {
        cy.request(apiUrl).then((response) => {
            const support = response.body.support;
            expect(support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
            expect(support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');
        });
    });

    it('should validate the color field is a valid hex color code', () => {
        cy.request(apiUrl).then((response) => {
            const color = response.body.data.color;
            expect(color).to.match(/^#[0-9A-F]{6}$/i); // Validates hex color format
        });
    });

    it('should validate the pantone_value field format', () => {
        cy.request(apiUrl).then((response) => {
            const pantoneValue = response.body.data.pantone_value;
            expect(pantoneValue).to.match(/^\d{2}-\d{4}$/); // Validates Pantone format (e.g., 17-2031)
        });
    });

    it('should validate response time is within acceptable limits', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as needed
        });
    });

    it('should validate response headers', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.headers['access-control-allow-origin']).to.eq('*');
        });
    });

    it('should return data for only the requested ID', () => {
        cy.request(apiUrl).then((response) => {
            const data = response.body.data;
            expect(data.id).to.eq(2); // Validate the requested ID matches the response ID
        });
    });

    it('should verify that the response body does not contain unexpected fields', () => {
        cy.request(apiUrl).then((response) => {
            const unexpectedFields = Object.keys(response.body).filter(
                (key) => !['data', 'support'].includes(key)
            );
            expect(unexpectedFields).to.be.empty;
        });
    });
});
