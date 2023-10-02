describe("Form Validation Register Tests", () => {


    it("Should display an error message when submitting with empty fields", () => {
    cy.visit("/register"); 
    cy.get('button[type="submit"]').click(); 
    cy.contains("The username is required").should("be.visible"); 
    cy.contains("The password is required").should("be.visible"); 
    cy.contains("The password confirmation is required").should("be.visible"); 
    });


  it("Should display an error message for password mismatch", () => {
    cy.visit("/register"); 
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("mismatched"); 
    cy.get('button[type="submit"]').click(); 
    cy.contains("The passwords do not match").should("be.visible"); 
  });


  it("Should submit the form with valid data", () => {
    cy.visit("/register");
    cy.get('input[name="username"]').type("validusername"); 
    cy.get('input[name="password"]').type("validpassword"); 
    cy.get('input[name="confirmPassword"]').type("validpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("The username is required").should("not.exist");
    cy.contains("The password is required").should("not.exist");
    cy.contains("The password confirmation is required").should("not.exist");
    cy.contains("The username must be at least 8 characters").should("not.exist");
    cy.contains("The passwords do not match").should("not.exist");
  });
  

  it("Should display an error message for a password with less than 8 characters", () => {
    cy.visit("/register");
    cy.get('input[name="password"]').type("short");
    cy.get('input[name="confirmPassword"]').type("short");
    cy.get('button[type="submit"]').click();
    cy.contains("The password must be at least 8 characters").should("be.visible");
  });
});