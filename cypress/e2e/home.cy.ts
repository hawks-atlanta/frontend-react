describe("Button tests", () => {


  it("Should render an anchor with the given text and redirect to Login page", () => {
    cy.visit("/");
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });

  it("Should render an anchor with the given text and redirect to Register page", () => {
    cy.visit("/");
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
  });

  it("Should render an anchor with the given text and redirect to Create An Account page", () => {
    cy.visit("/");
    cy.contains("a", "Create an Account").click();
    cy.url().should("include", "/register");
  });
});
