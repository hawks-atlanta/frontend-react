describe("Users can create new folders", () => {
  const username = "username2";
  const password2 = "Contra123#";
  const password = "Contraseña123#";

  it("Update password", () => {
    // Login with the test user
    cy.visit("/login");
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("button").contains("Submit").click();
    cy.url().should("include", "/files");

    // Open the profile menu
    cy.get("button").contains("username2").click();

    // Assert the modal is open
    cy.get("button").should("contain", "Update Password");
    cy.get("a").should("contain", "Logout");

    cy.get("button").contains("Update Password").click();

    // Update the password
    cy.get("input[aria-label='Current password']").type(password);
    cy.get("input[aria-label='New password']").type(password2);
    cy.get("button").contains("Save Changes").click();

    // Assert the success message is shown in the toast
    cy.contains("Password updated successfully").should("be.visible");

    // Make the password change fail
    cy.get("button").should("contain", "Update Password");
    cy.get("a").should("contain", "Logout");

    cy.get("button").contains("Update Password").click();

    // Update the password
    cy.get("input[aria-label='Current password']").type(password);
    cy.get("input[aria-label='New password']").type(password2);
    cy.get("button").contains("Save Changes").click();

    // Assert the success message is shown in the toast
    cy.contains("Failed to update password").should("be.visible");

    // Return the password to the original
    // Update the password
    cy.get("input[aria-label='Current password']").type(password2);
    cy.get("input[aria-label='New password']").type(password);
    cy.get("button").contains("Save Changes").click();

    // Assert the success message is shown in the toast
    cy.contains("Password updated successfully").should("be.visible");
  });
});
