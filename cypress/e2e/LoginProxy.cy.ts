describe("Input Login tests", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });
  
    it("Should submit the form with valid data", () => {
        cy.visit("/login");
        cy.get('input[name="username"]').type("miguel1"); 
        cy.get('input[name="password"]').type("miguel1"); 
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/files");
      });
  });