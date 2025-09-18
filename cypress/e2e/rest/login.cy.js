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
      expected: 'invalid_credentials',
      description: 'Invalid credentials'
    },
    {
      username: '',
      password: 'admin123',
      expected: 'empty_username',
      description: 'Empty username'
    },
    {
      username: 'Admin',
      password: '',
      expected: 'empty_password',
      description: 'Empty password'
    }
  ];
 
  testCases.forEach((testCase) => {
    it(`should handle login for: ${testCase.description}`, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
 
      if (testCase.username) {
        cy.get('input[name="username"]').type(testCase.username);
      }
 
      if (testCase.password) {
        cy.get('input[name="password"]').type(testCase.password);
      }
 
      cy.get('button[type="submit"]').click();
 
      switch (testCase.expected) {
        case 'success':
          cy.url().should('include', '/dashboard');
          cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
          break;
 
        case 'invalid_credentials':
          cy.get('.oxd-alert-content-text', { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Invalid credentials');
          cy.url().should('include', '/auth/login');
          break;
 
        case 'empty_username':
        case 'empty_password':
          cy.url().should('include', '/auth/login');
          cy.get('button[type="submit"]').should('be.visible');
          cy.get('body').then(($body) => {
            if ($body.find('.oxd-alert-content-text').length > 0) {
              cy.get('.oxd-alert-content-text').should('be.visible');
            }
          });
          break;
      }
    });
  });
});
 
 