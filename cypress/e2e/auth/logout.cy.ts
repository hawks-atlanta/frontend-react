import { faker } from "@faker-js/faker";

describe("Logout tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });

  it("Log out test user", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Open the profile menu
    cy.get("button").contains(username).click();
    // Assert the modal is open
    cy.get("button").should("contain", "Update Password");
    cy.get("a").should("contain", "Log out");
    cy.get("a").contains("Log out").click();
    cy.url().should("include", "/");
    // The profile menu no longer exists
    cy.get("button").contains(username).should("not.exist");
    cy.get("button").contains("Update Password").should("not.exist");
    cy.get("a").contains("Log out").should("not.exist");
  });
});
