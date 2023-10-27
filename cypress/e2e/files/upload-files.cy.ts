import { faker } from "@faker-js/faker";

describe("File Upload Tests", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });

  it("Uploads a file", () => {
    cy.visit("/register");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Open the modal to upload a file
    cy.get("button").contains("Upload File").click();

    cy.get("div[role=dialog]").should("be.visible");
    cy.get("div[role=dialog]").should("contain", "Select the files to upload");

    // Select the file input element
    cy.get("input[type=file]").selectFile({
      contents: Cypress.Buffer.from("file contents"),
      fileName: "file.txt",
      lastModified: Date.now()
    });

    // Submit the form
    cy.get("button").contains("Upload files").click();
    cy.get("div[role=dialog]").should("not.exist");
    // Verify that the file is listed in the table
    cy.get("div").should("contain", "file.txt");
  });
});
