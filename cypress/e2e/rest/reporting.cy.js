describe('OrangeHRM Login Tests', () => {
it('successful login with valid credentials', () => {
cy.visit('/web/index.php/auth/login');
cy.get('input[name="username"]').type('Admin');
cy.get('input[name="password"]').type('admin123');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/dashboard');
cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
});
it('failed login with invalid credentials', () => {
cy.visit('/web/index.php/auth/login');
cy.get('input[name="username"]').type('InvalidUser');
cy.get('input[name="password"]').type('InvalidPass');
cy.get('button[type="submit"]').click();
cy.get('.oxd-alert-content').should('be.visible');
});
});
