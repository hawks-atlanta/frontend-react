import { faker } from "@faker-js/faker";

describe("Rename File Tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const folderName = faker.system.commonFileName();
  const randomNewFolderName = faker.system.commonFileName();

  it("Register a test user", () => {
  // Register a test user
  cy.visit("/register");
  cy.get("input[name=username]").type(username);
  cy.get("input[name=password]").type(password);
  cy.get("input[name=confirmPassword]").type(password);
  cy.get("button").contains("Submit").click();
  cy.url().should("include", "/files");
  });

  it("Create a folder - rename duplicate", () => {
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

  // Click the "Edit" button to rename the folder
  cy.get("button[aria-label='Edit']").click();
 
  // Assert the rename modal is open
  cy.get("div[role=dialog]").should("be.visible");
  cy.get("div[role=dialog]").should("contain", "Enter a new name for the item");
 
  // Click the "Save" button
  cy.get("button").contains("Save").click();
 
  cy.contains("A file with the same name already exists in the file directory").should("be.visible");
  });

  it("Rename the folder", () => {
  // Login with the test user
  cy.visit("/login");
  cy.get("input[name=username]").type(username);
  cy.get("input[name=password]").type(password);
  cy.get("button").contains("Submit").click();
  cy.url().should("include", "/files");

  // Click the three dots to open the dropdown menu
  cy.get(`button[aria-label='Open options menu for ${folderName}']`).click();

  // Click the "Edit" button to rename the folder
  cy.get("button[aria-label='Edit']").click();

  cy.get("div[role=dialog]").should("contain", "Enter a new name for the item");

  // Clear the input field and type the new random name
  cy.get("input[aria-label='Edit item name']").clear().type(randomNewFolderName);

  // Click the "Save" button
  cy.get("button").contains("Save").click();

  // Verify that the success message is displayed
  cy.contains("Name updated successfully");

  cy.get("div").should(($div) => {
    expect($div).not.to.contain(folderName);
  });
  
  // Verify that the new name is present
  cy.get("div").should("contain", randomNewFolderName);
  });
});
