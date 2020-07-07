describe('Visitor can see items on menu', () => {
  before(() => {
  
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
      
    });
    cy.visit("/");
  })
  it('visitor can view products', () => {

    cy.get('h2').should('contain', "Menu")
  });

  it('visitor can see menu items', () => {
    cy.get('#product-1').within(() => {
      cy.get('h3').should('contain', 'Pizza')
      cy.get('p').should('contain', 'This is a cheesy pizza')
    })
  })
})
