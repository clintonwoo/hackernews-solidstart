/** @jest-environment jsdom */

import Page from "../routes/index";

describe("Home Page", () => {
  it("has default export", () => {
    expect(Page).toBeDefined();
  });
});
