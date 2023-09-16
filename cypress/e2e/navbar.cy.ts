describe("Navbar Test", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });

  it("Mobile menu should be hidden by default", () => {
    cy.contains("Login").should("not.be.visible");
    cy.contains("Register").should("not.be.visible");
  })

  it("toggle menu when the menu button is clicked", () => {
    cy.get('button[aria-label="Open Menu"]').click();
    cy.contains("Login").should("be.visible");
    cy.contains("Register").should("be.visible");

    cy.get('button[aria-label="Close Menu"]').click();
    cy.contains("Login").should("not.be.visible");
    cy.contains("Register").should("not.be.visible");
  });
  
  
  it("should navigate to the Login page when Login is clicked", () => {
    cy.get('button[aria-label="Open Menu"]').click();
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to the Register page when Register is clicked", () => {
    cy.get('button[aria-label="Open Menu"]').click();
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
  });
});

