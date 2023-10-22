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

  it("Show error when creating a folder with an existing name", () => {
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

    // Create the new folder
    cy.get("input[aria-label='New folder name']").type(folderName);
    cy.get("button").contains("Create folder").click();

    // Assert an alert is shown
    cy.get("div[role=status]").contains(
      "A file with the same name already exists in the given directory"
    );
  });
});
