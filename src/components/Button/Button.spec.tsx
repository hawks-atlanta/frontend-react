import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Button } from "./Button";

afterEach(() => cleanup());

describe("Button component", () => {
  test("Should render a button with the given text", () => {
    render(<Button text="Save" type="button" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  test("Should render an anchor with the given text", () => {
    render(<Button text="Save" type="anchor" />);
    expect(screen.getByRole("link", { name: "Save" })).toBeDefined();
  });
});
