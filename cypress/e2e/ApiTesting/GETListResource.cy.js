describe('GET /api/unknown', () => {

    const apiUrl = 'https://reqres.in/api/unknown';

    it('should return 200 status code', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return the correct structure for the response body', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body).to.have.keys('page', 'per_page', 'total', 'total_pages', 'data', 'support');
            expect(response.body.support).to.have.keys('url', 'text');
            expect(response.body.data).to.be.an('array');
        });
    });

    it('should return correct pagination details', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body.page).to.eq(1);
            expect(response.body.per_page).to.eq(6);
            expect(response.body.total).to.eq(12);
            expect(response.body.total_pages).to.eq(2);
        });
    });

    it('should return correct data for each item in the list', () => {
        cy.request(apiUrl).then((response) => {
            response.body.data.forEach((item) => {
                expect(item).to.have.keys('id', 'name', 'year', 'color', 'pantone_value');
                expect(item.id).to.be.a('number');
                expect(item.name).to.be.a('string');
                expect(item.year).to.be.a('number');
                expect(item.color).to.match(/^#[0-9A-F]{6}$/i); // Validate hex color format
                expect(item.pantone_value).to.match(/^\d{2}-\d{4}$/);
            });
        });
    });

    it('should return support information with valid URL and text', () => {
        cy.request(apiUrl).then((response) => {
            const support = response.body.support;
            expect(support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
            expect(support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');
        });
    });

    it('should validate that the number of items in data matches per_page', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.body.data.length).to.eq(response.body.per_page);
        });
    });

    it('should verify all IDs in the data array are unique', () => {
        cy.request(apiUrl).then((response) => {
            const ids = response.body.data.map((item) => item.id);
            const uniqueIds = new Set(ids);
            expect(ids.length).to.eq(uniqueIds.size);
        });
    });

    it('should verify response time is within acceptable limits', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.duration).to.be.lessThan(1000); // Adjust threshold as needed
        });
    });

    it('should verify CORS headers are present', () => {
        cy.request(apiUrl).then((response) => {
            expect(response.headers).to.have.property('access-control-allow-origin', '*');
        });
    });

    it('should gracefully handle empty data if no resources are present', () => {
        cy.request(apiUrl).then((response) => {
            const isEmpty = response.body.total === 0 || response.body.data.length === 0;
            expect(isEmpty).to.be.false; // In this specific case, we expect data
        });
    });

    it('should validate the format of all data fields', () => {
        cy.request(apiUrl).then((response) => {
            response.body.data.forEach((item) => {
                expect(item.id).to.be.a('number');
                expect(item.name).to.be.a('string');
                expect(item.year).to.be.a('number');
                expect(item.color).to.match(/^#[0-9A-F]{6}$/i);
                expect(item.pantone_value).to.match(/^\d{2}-\d{4}$/);
            });
        });
    });
});
