import { faker } from "@faker-js/faker";

describe("Users can create new folders", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const folderName = faker.system.commonFileName();

  it("Register test user", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
  });

  it("Create new folder", () => {
    // Login with the test user
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Open the modal to create a new folder
    cy.get("button").contains("New Folder").click();

    // Assert the modal is open
    cy.get("div[role=dialog]").should("be.visible");
    cy.get("div[role=dialog]").should(
      "contain",
      "Enter a name for the new folder"
    );

    // Create the new folder
    cy.get("input[aria-label='New folder name']").type(folderName);
    cy.get("button").contains("Create folder").click();

    // Assert the modal is removed
    cy.get("div[role=dialog]").should("not.exist");

    // Assert the new folder is visible in the list
    cy.get("div").should("contain", folderName);
  });

  it("Delete a element", () => {
    // Click the dropdown dots
    cy.get(`button[aria-label='Open options menu for ${folderName}']`).click();

    // Click the delete button
    cy.get("button[aria-label='Delete']").click();

    // Assert the delete modal is open
    cy.get("div[role=dialog]").should("be.visible");
    cy.get("div[role=dialog]").should("contain", `Delete: ${folderName}`);

    // Click the confirm button
    cy.get("button").contains("Confirm").click();

    // Assert that the file is no longer visible in the UI
    cy.get("div").should("not.contain", "File name");
  });
});
