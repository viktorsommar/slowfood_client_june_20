describe('Visitor can see items on menu', () => {
it('visitor can view products', () => {
    cy.visit("/");
    cy.get('section[name="header"]').should('contain', "Menu")
});
})

