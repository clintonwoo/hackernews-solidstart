/** @jest-environment jsdom */

import Page from "../routes/newest";

describe("Newest Posts Page", () => {
  it("has default export", () => {
    expect(Page).toBeDefined();
  });
});
