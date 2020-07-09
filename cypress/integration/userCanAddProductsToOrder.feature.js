describe("User can add a product to their order", () => {
  before(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json"
    })

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:registration_response.json",
      headers: {
        uid: "user@mail.com"
      }
    })
  })

  it("user can see add to order button when logged in", () => {
    cy.visit("/")
    
    cy.get("#product-1").within(() => {
      cy.get("button").contains("Add to order").click()
    })
  })
})