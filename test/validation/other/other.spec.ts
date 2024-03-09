import fileTypeChecker from "../../../src/index";

describe("validateFileType", () => {
  it("should detect the type of a given Array<number> to be a orc file", () => {
    const fileArrayNumber: Array<number> = [
      79, 82, 67, 10, 5, 18, 3, 8, 136, 39, 10, 21, 10, 2, 0, 0, 18, 15, 8, 136,
      39, 18, 10, 8, 2, 16, 144, 78, 24, 200, 151, 246, 11, 10, 20, 10, 2, 0, 0,
      18, 14, 8, 136, 39, 34, 9,
    ];

    const isORC: boolean = fileTypeChecker.isORC(fileArrayNumber);
    expect(isORC).toBeTruthy();
  });
  it("should detect the type of a given Array<number> to be a parquet file", () => {
    const fileArrayNumber: Array<number> = [
      80, 65, 82, 49, 21, 0, 21, 238, 45, 21, 128, 20, 44, 21, 220, 5, 21, 0,
      21, 6, 21, 6, 0, 0, 247, 22, 28, 3, 0, 0, 0, 220,
    ];
    const isPARQUET: boolean = fileTypeChecker.isPARQUET(fileArrayNumber);
    expect(isPARQUET).toBeTruthy();
  });
});
