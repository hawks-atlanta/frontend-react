describe("Navbar Test", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("toggle menu when the menu button is clicked", () => {
    cy.visit("/");
    cy.get(".md\\:hidden").should("not.be.hidden");
    cy.get('button[aria-label="Open Menu"]').click();
    cy.get(".md\\:hidden").should("be.visible");  
    cy.get('button[aria-label="Close Menu"]').click();
    cy.get(".md\\:hidden").should("not.be.hidden");
  });
  
  
  it("should navigate to the Login page when Login is clicked", () => {
    cy.visit("/");
    cy.get('button[aria-label="Open Menu"]').click();
    cy.get(".md\\:hidden").should("be.visible");
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to the Register page when Register is clicked", () => {
    cy.visit("/");
    cy.get('button[aria-label="Open Menu"]').click();
    cy.get(".md\\:hidden").should("be.visible");
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
  });
});

