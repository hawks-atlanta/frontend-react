describe("Home Page", () => {
  it("Should increment the counter", () => {
    // Initial state
    cy.visit("/");
    cy.contains("p", "Count: 0");

    // Updated state
    cy.contains("button", "Increase").click();
    cy.contains("p", "Count: 1");
  });
});
