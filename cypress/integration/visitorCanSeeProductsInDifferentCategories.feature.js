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
      cy.get('h3').should('contain', "Main Course")
      cy.get('h3').should('contain', "Desert")
    });
})