describe('Lab 4: The Internet HerokuApp - Form Validation & Messages', () => {
  it('should test login form with invalid and valid credentials', () => {
    // 1. Visit Login Page
    cy.visit('https://the-internet.herokuapp.com/login')

    // 2. Verify form elements exist
    cy.get('#username').should('exist').and('be.visible')
    cy.get('#password').should('exist').and('be.visible')
    cy.get('[type="submit"]').should('exist').and('be.visible')

    // 3. Perform Invalid Login
    cy.get('#username').type('invalidUser')
    cy.get('#password').type('invalidPass!')
    cy.get('[type="submit"]').click()

    // 4. Check for Error Message
    cy.get('#flash')
      .should('exist')
      .and('be.visible')
      .and('include.text', 'Your username is invalid!')

    // 5. Perform Valid Login
    cy.get('#username').clear().type('tomsmith')
    cy.get('#password').clear().type('SuperSecretPassword!')
    cy.get('[type="submit"]').click()

    // 6. Check for Success Message
    cy.get('#flash')
      .should('exist')
      .and('be.visible')
      .and('include.text', 'You logged into a secure area!')
  })
})
