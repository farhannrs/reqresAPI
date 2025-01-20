function valueInSec(sec) {
    const apiUrl = 'https://reqres.in/api/users?delay={sec}'

    return apiUrl
}


describe('GET /api/users?delay=3 Delayed Response', () => {


 

    it('should return 200 status code after delay', () => {
        cy.request({
            method: 'GET',
            url: valueInSec(29),
            failOnStatusCode: false, // Prevent automatic failure on non-2xx status
        }).then((response) => {
            expect(response.status).to.eq(200); // Ensure status is 200 after delay
            expect(response.body).to.be.an('object'); // Ensure the response body is JSON
            expect(response.body).to.have.property('data'); // Ensure the property "data" is present in JSON
            expect(response.body.data).to.have.length(6); // Ensure 6 users are returned
        });
    });

    // it('should return a JSON response body', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body).to.be.an('object'); // Ensure the response body is JSON
    //     });
    // });

    // it('should contain the "data" property in the response body', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //          // Ensure "data" is in the response body
    //     });
    // });

    // it('should return 6 users in the "data" array', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
           
    //     });
    // });

    // it('should include user properties in the response data', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         const user = response.body.data[0];
    //         expect(user).to.have.property('id');
    //         expect(user).to.have.property('email');
    //         expect(user).to.have.property('first_name');
    //         expect(user).to.have.property('last_name');
    //         expect(user).to.have.property('avatar');
    //     });
    // });

    // it('should return correct user data (first user)', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         const user = response.body.data[0];
    //         expect(user.id).to.eq(1);
    //         expect(user.email).to.eq('george.bluth@reqres.in');
    //         expect(user.first_name).to.eq('George');
    //         expect(user.last_name).to.eq('Bluth');
    //         expect(user.avatar).to.eq('https://reqres.in/img/faces/1-image.jpg');
    //     });
    // });

    // it('should return the correct number of total pages', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body.total_pages).to.eq(2); // Ensure total pages is 2
    //     });
    // });

    // it('should return correct total number of users', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body.total).to.eq(12); // Ensure total number of users is 12
    //     });
    // });

    // it('should return pagination information in the response', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body).to.have.property('page');
    //         expect(response.body.page).to.eq(1); // Ensure the current page is 1
    //         expect(response.body).to.have.property('per_page');
    //         expect(response.body.per_page).to.eq(6); // Ensure 6 items per page
    //     });
    // });

    // it('should contain the "support" property in the response body', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body).to.have.property('support'); // Ensure "support" is in the response body
    //     });
    // });

    // it('should contain the correct support URL and text', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         expect(response.body.support.url).to.eq('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
    //         expect(response.body.support.text).to.eq('Tired of writing endless social media content? Let Content Caddy generate it for you.');
    //     });
    // });

    // it('should return a response within an acceptable time despite the delay', () => {
    //     const startTime = Date.now();
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then(() => {
    //         const duration = Date.now() - startTime;
    //         expect(duration).to.be.lessThan(5000); // Ensure the response time is less than 5 seconds
    //     });
    // });

    // it('should return the correct avatar URL format for users', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: apiUrl,
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         response.body.data.forEach((user) => {
    //             expect(user.avatar).to.match(/^https:\/\/reqres.in\/img\/faces\/\d+-image\.jpg$/); // Ensure the avatar URL matches the pattern
    //         });
    //     });
    // });

});
