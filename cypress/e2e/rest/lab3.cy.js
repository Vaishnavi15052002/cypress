describe('GitHub Search Flow with Robust Input Typing', () => {
  it('searches for "cypress", opens a repo, then navigates back and forward', () => {
    cy.viewport(1440, 900);
 
    // 1. Go directly to the search page
    cy.visit('https://github.com/search?q=cypress&type=repositories');
 
    // 2. Verify search results loaded
    cy.url().should('include', 'search?q=cypress');
    cy.get('div.search-title a', { timeout: 15000 }).should('have.length.greaterThan', 0);
 
    // 3. Click first repo link
    cy.get('div.search-title a', { timeout: 15000 }).first().click();
 
    // 4. Verify repo page
    cy.url().should('include', '/cypress');
    cy.get('p.f4.my-3, span.f4.my-3, div.BorderGrid-cell p.f4.my-3', { timeout: 15000 })
      .should('be.visible');
 
    // 5. Back to results
    cy.go('back');
    cy.url().should('include', 'search?q=cypress');
    cy.get('div.search-title a', { timeout: 15000 }).should('have.length.greaterThan', 1);
 
    // 6. Forward again
    cy.go('forward');
    cy.get('p.f4.my-3, span.f4.my-3, div.BorderGrid-cell p.f4.my-3', { timeout: 15000 })
      .should('be.visible');
  });
});