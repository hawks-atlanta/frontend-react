import { TESTS_DATA } from "./tests-data";

describe("Login tests", () => {
  it("Register test user", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(TESTS_DATA.LOGIN.username);
    cy.get("input[name=password]").type(TESTS_DATA.LOGIN.password);
    cy.get("input[name=confirmPassword]").type(TESTS_DATA.LOGIN.password);
    cy.get("button").contains("Submit").click();
  });

  it("Should show a toast if the credentials are wrong", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type(TESTS_DATA.LOGIN.username);
    cy.get("input[name=password]").type("wrong");

    cy.get("button").contains("Submit").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("An user can login", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type(TESTS_DATA.LOGIN.username);
    cy.get("input[name=password]").type(TESTS_DATA.LOGIN.password);

    // An alert is shown
    cy.get("button").contains("Submit").click();
    cy.contains("Login successful");

    // The user is redirected to the files view
    cy.url().should("include", "/files");
  });
});
