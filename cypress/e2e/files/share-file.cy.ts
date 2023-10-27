import { faker } from "@faker-js/faker";

describe("Share File Tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const username2 = faker.internet.userName();
  const password2 = faker.internet.password({ length: 8 });
  const folderName = faker.system.commonFileName();

  it("Tests to share a file", () => {
    // Register a test user
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Register a second test user
    cy.clearAllLocalStorage();
    cy.visit("/register");
    cy.get("input[name=username]").type(username2);
    cy.get("input[name=password]").type(password2);
    cy.get("input[name=confirmPassword]").type(password2);
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
    cy.get("button").contains("Share").should("exist");
    cy.get("button:contains('Share')").click();

    cy.get("div[role=dialog]").should("contain", "Share file");
    cy.get("input[aria-label='Edit access permissions']").type(username);
    // Click the "Share" button
    cy.get("#share-file").click({ force: true });
    // Verify that the success message is displayed
    cy.contains("File shared successfully");
    // Share fails if the file is already shared with the user
    cy.get("#share-file").click({ force: true });
    // Click the "Share" button to share the element
    cy.contains("The file is already shared with the user");

    // Click the "Un-Share" button to rename the folder
    cy.get("button").contains("Un-share").should("exist");
    cy.get("button:contains('Un-share')").click();
    cy.contains("File unshared successfully");
    cy.get("div").should("not.contain", "username");
  });
});
