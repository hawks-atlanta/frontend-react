describe("Home Page", () => {
  it("Should increment the counter", () => {
    // Initial state
    cy.visit("http://localhost:5173/");
    cy.contains("p", "Count: 0");

    // Updated state
    cy.contains("button", "Increase").click();
    cy.contains("p", "Count: 1");
  });
});
