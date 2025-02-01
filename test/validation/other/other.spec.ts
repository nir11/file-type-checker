import fileTypeChecker from "../../../src/index";

describe("validateFileType", () => {
  it("should return true when given an Array<number> of a orc file and using the isORC() function", () => {
    const fileArrayNumber: Array<number> = [
      79, 82, 67, 10, 5, 18, 3, 8, 136, 39, 10, 21, 10, 2, 0, 0, 18, 15, 8, 136,
      39, 18, 10, 8, 2, 16, 144, 78, 24, 200, 151, 246, 11, 10, 20, 10, 2, 0, 0,
      18, 14, 8, 136, 39, 34, 9,
    ];

    const isORC: boolean = fileTypeChecker.isORC(fileArrayNumber);
    expect(isORC).toBeTruthy();
  });

  it("should return true when given an Array<number> of a parquet file and using the isPARQUET() function", () => {
    const fileArrayNumber: Array<number> = [
      80, 65, 82, 49, 21, 0, 21, 238, 45, 21, 128, 20, 44, 21, 220, 5, 21, 0,
      21, 6, 21, 6, 0, 0, 247, 22, 28, 3, 0, 0, 0, 220,
    ];
    const isPARQUET: boolean = fileTypeChecker.isPARQUET(fileArrayNumber);
    expect(isPARQUET).toBeTruthy();
  });

  it("should return true when given an Array<number> of a doc file and using the isDoc() function", () => {
    const fileArrayNumber: Array<number> = [
      208, 207, 17, 224, 161, 177, 26, 225, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 59, 0, 3, 0, 254, 255, 9, 0,
    ];
    const isDOC: boolean = fileTypeChecker.isDOC(fileArrayNumber);
    expect(isDOC).toBeTruthy();
  });

  it("should return true when given an Array<number> of a pcap file and using the isPCAP() function", () => {
    const fileArrayNumber: Array<number> = [
      212, 195, 178, 161, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 1,
      0, 0, 0, 72, 244, 159, 69, 105, 94, 3, 0,
    ];
    const isPCAP: boolean = fileTypeChecker.isPCAP(fileArrayNumber);
    expect(isPCAP).toBeTruthy();
  });
});
