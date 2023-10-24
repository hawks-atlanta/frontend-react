import { faker } from "@faker-js/faker";

describe("Create Folders Tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const folderName = faker.system.commonFileName();
  const folderName2 = faker.system.commonFileName();

  it("Register a test user", () => {
    // Register a test user
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");
  });

  it("Create Folder 1 and folder 2", () => {
    // Login with the test user
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url(). should("include", "/files");

    // Create the first folder
    cy.get("button").contains("New Folder").click();
    cy.get("input[aria-label='New folder name']").type(folderName);
    cy.get("button").contains("Create folder").click();
    cy.get("div").should("contain", folderName);

    // Create the second folder
    cy.get("button").contains("New Folder").click();
    cy.get("input[aria-label='New folder name']").type(folderName2);
    cy.get("button").contains("Create folder").click();
    cy.get("div").should("contain", folderName2);
  });

  it("Move a folder inside another folder", () => {
    // Login with the test user
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url(). should("include", "/files");

    // Open the options menu for the first folder
    cy.get(`button[aria-label='Open options menu for ${folderName}']`).click();
      
    cy.get("button[aria-label='Move']").click();

    cy.get(`button[aria-label='Dialog ${folderName2}']`).click();

    cy.get("button").contains("Move here").click();
  
    cy.contains("Folder has been moved successfully");
  });
});
