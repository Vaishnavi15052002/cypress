describe('Lab 1: Wikipedia History Navigation & Viewport Test', () => {
  it('should navigate history and test responsive layout', () => {
    // 1. Visit the English Wikipedia main page directly
    cy.visit('https://en.wikipedia.org/wiki/Main_Page')
 
    // 2. (Skip step 1->2 cross-origin issue: already on English Wikipedia)
 
    // 3. Click on "Today’s featured article" link
    cy.get('#mp-tfa a').eq(1).click()   // pick an article link inside featured section
    cy.url().should('include', '/wiki/')
 
    // 4. Go back in history → return to Main Page-
    cy.go('back')
    cy.url().should('include', 'Main_Page')
 
    // 6. Test mobile viewport before forward navigation
    cy.viewport('iphone-x')   // simulate mobile device
 
    // 5. Go forward in history → return to featured article page
    cy.go('forward')
    cy.get('#firstHeading').should('exist')  // heading present
  })
})