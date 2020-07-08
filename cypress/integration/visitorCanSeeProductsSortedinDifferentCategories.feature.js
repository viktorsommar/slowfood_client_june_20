describe('Visitor can see products sorted by categories', () => {
    before(() => {
    
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/products",
        response: "fixture:products.json",
        
      });
      cy.visit("/");
    })
    it('visitor can view products sorted by categories', () => {
  
      cy.get('h3').should('contain', "Starter")
    });
  
    it('visitor can see  items', () => {
      cy.get('#product-1').within(() => {
        cy.get('h4').should('contain', 'Pizza')
        cy.get('p').should('contain', 'This is a cheesy pizza')
      })
    })
  })