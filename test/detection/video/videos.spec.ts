import FileTypeChecker from "../../../src/index";

import { DetectedFileInfo } from "../../../src/core";

describe("detectFile", () => {
  it("should detect the file type of an Array<number> as a mp4 file", () => {
    const file: Array<number> = [
      0, 0, 0, 32, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0, 105, 115,
      111, 109, 105, 115, 111, 50, 97, 118, 99, 49, 109, 112, 52, 49, 0, 0, 53,
      183, 109, 111, 111, 118, 0, 0, 0, 108, 109, 118, 104, 100, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 232,
    ];
    const detectedFile = FileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("mp4");
    expect(detectedFile.mimeType).toBe("video/mp4");
    expect(detectedFile.signature.sequence).toEqual([
      "66",
      "74",
      "79",
      "70",
      "69",
      "73",
      "6f",
      "6d",
    ]);
  });

  it("should detect the file type of an Array<number> as a m4v file", () => {
    const file: Array<number> = [
      0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86, 32, 0, 0, 2, 0, 105, 115,
      111, 109, 105, 115, 111, 50, 97, 118, 99, 49, 0, 0, 0, 8,
    ];
    const detectedFile = FileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("m4v");
    expect(detectedFile.mimeType).toBe("video/x-m4v");
    expect(detectedFile.signature.sequence).toEqual([
      "66",
      "74",
      "79",
      "70",
      "4d",
      "34",
      "56",
      "20",
    ]);
  });
});
