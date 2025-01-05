describe('GET https://reqres.in/api/users', () => {
    const baseUrl = 'https://reqres.in/api/users'; // Replace with the actual endpoint
  
    it('Verify API returns status code 200', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it('Verify response body contains expected structure', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        const body = response.body;
  
        // Verify top-level fields
        expect(body).to.have.property('page', 2);
        expect(body).to.have.property('per_page', 6);
        expect(body).to.have.property('total', 12);
        expect(body).to.have.property('total_pages', 2);
        expect(body).to.have.property('data').to.be.an('array').with.length(6);
        expect(body).to.have.property('support');
  
        // Verify nested support field
        expect(body.support).to.have.property('url');
        expect(body.support).to.have.property('text');
        expect(body.support.url).to.be.a('string').and.include('https://');
        expect(body.support.text).to.be.a('string');

      });
    });
  
    it('Verify each user in the data array has required fields', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        response.body.data.forEach((user) => {
          expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
          expect(user).to.have.property('id').to.be.a('number');
          expect(user).to.have.property('email').to.be.a('string');
          expect(user).to.have.property('first_name').to.be.a('string');
          expect(user).to.have.property('last_name').to.be.a('string');
          expect(user).to.have.property('avatar').to.be.a('string');
        });
      });
    });
  
    it('Verify email format for all users', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        response.body.data.forEach((user) => {
          expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
      });
    });
  
    it('Verify avatar URLs are valid', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        response.body.data.forEach((user) => {
          expect(user.avatar).to.match(/^https?:\/\/.*\.(jpg|jpeg|png)$/);
        });
      });
    });
  
    it('Verify the support section contains a valid URL and text', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        const support = response.body.support;
        expect(support.url).to.match(/^https?:\/\/.+$/);
        expect(support.text).to.be.a('string').and.not.be.empty;
      });
    });
  
    it('Verify API response time is within acceptable limits', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        expect(response.duration).to.be.lessThan(1000); // Adjust the threshold as needed
      });
    });
  
    it('Verify total records and pages calculation are consistent', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
        const { total, per_page, total_pages } = response.body;
        expect(total_pages).to.eq(Math.ceil(total / per_page));
      });
    });
  
    it('Verify pagination works correctly (page 1 and 2)', () => {
      const page1Data = [];
      cy.request(`${baseUrl}?page=1`).then((response) => {
        page1Data.push(...response.body.data);
  
        cy.request(`${baseUrl}?page=2`).then((page2Response) => {
          const page2Data = page2Response.body.data;
  
          // Check uniqueness of IDs across pages
          const allIds = page1Data.map((u) => u.id).concat(page2Data.map((u) => u.id));
          expect(new Set(allIds).size).to.eq(allIds.length);
        });
      });
    });
  
    it('Handle error gracefully for an invalid page', () => {
      cy.request({
        url: `${baseUrl}?page=9999`,
        failOnStatusCode: false, // Prevent Cypress from failing the test
      }).then((response) => {
        expect(response.status).to.eq(200); // Confirm that API handles it gracefully
        expect(response.body.data).to.be.empty;
      });
    });


  // more possible test cases for Get

    it('should return the correct content type', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
          expect(response.headers['content-type']).to.include('application/json');
      });
    });
 


    
    it('should contain 6 users in the data array', () => {
      cy.request(`${baseUrl}?page=2`).then((response) => {
          expect(response.body.data).to.have.length(6);
      });
    });  

    it('should verify the avatars are valid image URLs', () => {
        cy.request(`${baseUrl}?page=2`).then((response) => {
            response.body.data.forEach((user) => {
                expect(user.avatar).to.match(/^https:\/\/.+\.(jpg|jpeg|png)$/);
            });
        });
    });  



});