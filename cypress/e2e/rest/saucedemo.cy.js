describe('SauceDemo Login Test', () => {
  const baseUrl = 'https://www.saucedemo.com/';
  const username = 'standard_user';
  const password = 'secret_sauce';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should log in successfully and display products', () => {
    // Check login form visibility
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('exist').and('be.visible');

    // Perform login
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    // Verify successful login
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_item').should('exist').and('be.visible');

    // Exact text match for first item name
    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack');

    // Partial text match for item description
    cy.get('.inventory_item_desc').first().should('include.text', 'Sauce Labs');

    // Negative test: ensure unexpected text is not present
    cy.get('.inventory_item_name').first().should('not.have.text', 'Sauce Labs Bike');
  });

  it('should show error for locked out user', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();

    // Verify error message
    cy.get('[data-test="error"]').should('exist').and('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
  });
});