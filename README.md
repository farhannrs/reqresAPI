# reqresAPI
Cypress API Testing
This project contains automated tests using Cypress for various RESTful APIs. The tests cover different HTTP methods (GET, POST, PUT, PATCH, DELETE) and validate status codes, response structure, and error handling.

Setup
Clone the repo:

bash
Copy code
git clone https://github.com/farhannrs/reqresAPI.git
Install dependencies:

bash
Copy code
cd cypress-api-testing
npm install
Run Cypress tests:

bash
Copy code
npx cypress open
Test Cases
GET https://reqres.in/api/users/{id} – Verifies user retrieval, error handling.
POST https://reqres.in/api/register – Checks successful registration and missing field errors.
POST https://reqres.in/api/login – Validates successful login and missing password errors.
GET https://reqres.in/api/users?delay=3 – Tests delayed responses, pagination, and status codes.
PUT https://reqres.in/api/users/{id} – Verifies user data update (ignores "updatedAt" field).
PATCH https://reqres.in/api/users/{id} – Verifies partial user data update (ignores "updatedAt").
DELETE https://reqres.in/api/users/{id} – Tests user deletion.
Running Tests



To run tests interactively:

->bash
->Copy code
npx cypress open

For headless execution:
->bash
->Copy code
npx cypress run
