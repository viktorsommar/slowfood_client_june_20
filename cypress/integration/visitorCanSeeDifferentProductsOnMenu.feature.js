describe("Visitor can see items on menu", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json",
    });
    cy.visit("/");
  });
  it("visitor can see menu items", () => {
    cy.get("#product-1").should("contain", "Pizza");
    cy.get("#product-2").should("contain", "Falafel");
    cy.get("#product-3").should("contain", "Noodles");
  });
});   