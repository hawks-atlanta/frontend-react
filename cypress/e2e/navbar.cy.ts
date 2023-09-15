describe("Navbar Test", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("toggle menu when the menu button is clicked", () => {
    cy.visit("/");
    cy.get(".lg\\:hidden svg").click();   
    cy.get(".lg\\:hidden").should("be.visible");  
    cy.get(".lg\\:hidden svg").click(); 
    cy.get(".lg\\:hidden svg").should("not.be.hidden");
  });
  


  it("should navigate to the Login page when Login is clicked", () => {
    cy.visit("/");
    cy.get(".lg\\:hidden svg").click();   
    cy.get(".lg\\:hidden").should("be.visible");
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to the Register page when Register is clicked", () => {
    cy.visit("/");
    cy.get(".lg\\:hidden svg").click();   
    cy.get(".lg\\:hidden").should("be.visible");
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
  });
});
