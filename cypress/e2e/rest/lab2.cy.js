describe('Lab 2: Quote Scraper Reload Test', () => {
  it('should verify the title before and after reload', () => {
    // 1. Visit the website
    cy.visit('https://quotes.toscrape.com/')

    // 2. Verify the title
    cy.title().should('eq', 'Quotes to Scrape')

    // 3. Reload the page
    cy.reload()

    // 4. Verify the title again (should remain the same)
    cy.title().should('eq', 'Quotes to Scrape')
  })
})
