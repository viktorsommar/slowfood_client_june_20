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

  it("user can add multiple products to order and view its content", () => {
    cy.get("button").contains("View order").should("not.exist")

    cy.get("#product-1").within(() => {
      cy.get("button").contains("Add to order").click()
      cy.get("#order-message").should("contain","A product has been added to your order")
    })

    cy.get("button").contains("View order").should("exist")

    cy.get("#product-2").within(() => {
      cy.get("button").contains("Add to order").click()
      cy.get("#order-message").should("contain","Another product has been added to your order"
      )
    })

    cy.get("button").contains("View order").click()

    cy.get("#order-details").within(() => {
      cy.get("li")
        .should("have.length", 2)
        .first().should('have.text', 'Falafel x 1')
        .next().should('have.text', 'Pizza x 1')
    })

    cy.get("button").contains("View order").click()
    cy.get("#order-details").should("not.exist")
  })
})