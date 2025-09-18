describe('OrangeHRM Data-Driven Login Tests', () => {
  const testCases = [
    {
      username: 'Admin',
      password: 'admin123',
      expected: 'success',
      description: 'Valid credentials'
    },
    {
      username: 'InvalidUser',
      password: 'wrongpassword',
      expected: 'failure',
      description: 'Invalid credentials'
    },
    {
      username: '',
      password: 'admin123',
      expected: 'failure',
      description: 'Empty username'
    },
    {
      username: 'Admin',
      password: '',
      expected: 'failure',
      description: 'Empty password'
    }
  ];

  testCases.forEach((testCase) => {
    it(`should handle login for: ${testCase.description}`, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

      // Fill username and password conditionally
      if (testCase.username) {
        cy.get('input[name="username"]').type(testCase.username);
      }

      if (testCase.password) {
        cy.get('input[name="password"]').type(testCase.password);
      }

      // Submit the form
      cy.get('button[type="submit"]').click();

      if (testCase.expected === 'success') {
        // Expect dashboard URL and elements
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
        cy.get('.oxd-userdropdown-tab').should('be.visible');
      } else {
        // Expect to remain on login or error message
        cy.url().should('include', '/auth/login');

        // Error message may or may not show depending on the scenario
        cy.get('body').then(($body) => {
          if ($body.find('.oxd-alert-content-text').length > 0) {
            cy.get('.oxd-alert-content-text')
              .should('be.visible')
              .and('contain.text', 'Invalid credentials');
          } else {
            cy.log('No error message shown – likely due to empty fields');
          }
        });
      }
    });
  });
});
