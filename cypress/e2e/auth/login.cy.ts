import { faker } from "@faker-js/faker";

describe("Login tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });

  it("Register test user", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
  });

  it("Should show a toast if the credentials are wrong", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type("wrong");

    cy.get("button").contains("Submit").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("An user can login", () => {
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);

    // An alert is shown
    cy.get("button").contains("Submit").click();
    cy.contains("Login successful");

    // The user is redirected to the files view
    cy.url().should("include", "/files");
  });
});
