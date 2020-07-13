describe('User can add a product to his/her order', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/products',
      response: "fixture:products.json",
    });
    
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

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: "fixture:order_post_response",
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: "fixture:order_put_response",
    });
  });

it("user can finalize the order", () => {
  cy.get("#product-1").within(() => {
    cy.get("button").contains("Add to order").click()
  })
  cy.get("#product-2").within(() => {
    cy.get("button").contains("Add to order").click()
  })
  cy.get("button").contains("View order").click()

  cy.route({
    method: "PUT",
    url: "http://localhost:3000/api/v1/orders/1",
    response: { message: "Your order will be ready in 30 minutes!" },
  })
  cy.get("#confirm-order").contains("Confirm!").click()
  cy.get("#confirmation-message").should("contain", "Your order will be ready in 30 minutes!"
  )
})
})