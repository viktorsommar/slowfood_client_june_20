describe("User can add a product to their order", () => {
  before(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:products.json"
    })

    cy.visit("/")
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:registration_response.json",
      headers: {
        uid: "user@mail.com"
      }
    })

    cy.get("#login").click()
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com")
      cy.get("#password").type("password")
      cy.get('button').contains("Submit").click()
    })
  })

  it("user can see add to order button when logged in", () => {
    cy.get("#product-1").within(() => {
      cy.get("button").contains("Add to order").click()
    })
  })
})