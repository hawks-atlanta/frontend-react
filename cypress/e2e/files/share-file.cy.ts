import { faker } from "@faker-js/faker";

describe("Rename File Tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const folderName = faker.system.commonFileName();

  it("Register a test user", () => {
    // Register a test user
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");
  });

  it("Create a folder", () => {
    // Login with the test user
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Create a folder
    cy.get("button").contains("New Folder").click();
    cy.get("input[aria-label='New folder name']").type(folderName);
    cy.get("button").contains("Create folder").click();
    cy.get("div").should("contain", folderName);

    // Click the three dots to open the dropdown menu
    cy.get(`button[aria-label='Open options menu for ${folderName}']`).click();

    // Click the "Share" button to rename the folder
    cy.get("button[aria-label='Share']").click();

    cy.get("div[role=dialog]").should("contain", "Share file");

    cy.get("input[aria-label='Edit access permissions']").type("username");
    // Click the "Share" button
    cy.get("button:contains('Save')").click();
    // Verify that the success message is displayed
    cy.contains("File shared successfully");
  });
});
