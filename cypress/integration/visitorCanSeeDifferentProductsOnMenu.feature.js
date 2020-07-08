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
    cy.get("#product-1").within(() => {
      cy.get("h3").should("contain", "Pizza");
      cy.get("p").should("contain", "This is a cheesy pizza");
    });
    cy.get("#product-2").within(() => {
      cy.get("h3").should("contain", "Falafel");
      cy.get("p").should("contain", "Veggie food is good for you and the planet");
    });
  });
});   