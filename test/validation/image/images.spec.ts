import fileTypeChecker from "../../../src/index";

describe("image validation", () => {
  it("should detect the type of a given Array<number> to be a bmp file", () => {
    const fileArrayNumber: Array<number> = [
      66, 77, 138, 123, 12, 0, 0, 0, 0, 0, 138, 0, 0, 0, 124, 0, 0, 0, 128, 2,
      0, 0, 170, 1, 0, 0, 1, 0, 24, 0, 0, 0, 0, 0, 0, 123, 12, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0,
    ];
    const detectedFile = fileTypeChecker.isBMP(fileArrayNumber);
    expect(detectedFile).toBeTruthy();
  });
});
