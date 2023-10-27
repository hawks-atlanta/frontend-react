import { faker } from "@faker-js/faker";

describe("Users can change their passwords", () => {
  const username = faker.internet.userName();
  const password = faker.internet.password({ length: 8 });
  const password2 = faker.internet.password({ length: 8 });

  it("Update password", () => {
    // Register a test user
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
    cy.get("button").contains("Update Password").click();
    // Update the password
    cy.get("input[aria-label='Current password']").type(password);
    cy.get("input[aria-label='New password']").type(password2);
    cy.get("button").contains("Save changes").click();

    // Assert the success message is shown in the toast
    cy.contains("Password updated successfully").should("be.visible");
    // Make the password change fail
    cy.get("button").should("contain", "Update Password");
    cy.get("a").should("contain", "Log out");

    cy.get("button").contains("Update Password").click();

    // Update the password
    cy.get("input[aria-label='Current password']").type(password);
    cy.get("input[aria-label='New password']").type(password2);
    cy.get("button").contains("Save changes").click();

    // Assert the success message is shown in the toast
    cy.contains("Failed to update password").should("be.visible");
    // Close the dialog
    cy.get("button").contains("Close").click();
  });
});
