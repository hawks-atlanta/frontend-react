describe("Button tests", () => {


  it("Should render an anchor with the given text and redirect to Login page", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.contains("button", "Login")
  });

  it("Should render an anchor with the given text and redirect to Register page", () => {
    cy.visit("/");
    cy.contains("Register").click();
    cy.contains("button", "Register")
  });

  it("Should render an anchor with the given text and redirect to Create An Account page (Register)", () => {
    cy.visit("/");
    cy.contains("Create an Account").click();
    cy.contains("button", "Register")
  });
});
