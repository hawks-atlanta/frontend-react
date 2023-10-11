import { TESTS_DATA } from "./tests-data";

describe("Register tests", () => {
  it("Fields are validated", () => {
    cy.visit("/register");
    const submitButton = cy.get("button").contains("Submit");

    // Submit the form with no data
    submitButton.click();
    cy.contains("The username is required").should("be.visible");
    cy.contains("The password is required").should("be.visible");
    cy.contains("The password confirmation is required").should("be.visible");

    // Submit the form with not matching passwords
    const usernameInput = cy.get("input[name=username]");
    const passwordInput = cy.get("input[name=password]");
    const confirmPasswordInput = cy.get("input[name=confirmPassword]");

    usernameInput.type("username");
    passwordInput.type("password1");
    confirmPasswordInput.type("password2");

    submitButton.click();
    cy.contains("The passwords do not match").should("be.visible");

    // Clear the password inputs
    passwordInput.clear();
    confirmPasswordInput.clear();

    // Submit form with short password
    passwordInput.type("short");
    confirmPasswordInput.type("short");
    submitButton.click();
    cy.contains("The password must be at least 8 characters").should(
      "be.visible"
    );
  });

  it("An user can register", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(TESTS_DATA.REGISTER.username);
    cy.get("input[name=password]").type(TESTS_DATA.REGISTER.password);
    cy.get("input[name=confirmPassword]").type(TESTS_DATA.REGISTER.password);

    // An alert is shown
    const submitButton = cy.get("button").contains("Submit");
    submitButton.click();
    cy.contains("You have been registered successfully");

    // The user is redirected to the files view
    cy.url().should("include", "/files");
  });
});
