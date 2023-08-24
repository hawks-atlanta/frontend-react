import { Button } from "./Button";

describe("Button tests", () => {
  it("Should render a button with the given text", () => {
    cy.mount(<Button text="Submit" type="button" />);
    cy.get("button").should("have.text", "Submit");
  });

  it("Should render an anchor with the given text", () => {
    cy.mount(<Button text="Submit" type="anchor" />);
    cy.get("a").should("have.text", "Submit");
  });
});
