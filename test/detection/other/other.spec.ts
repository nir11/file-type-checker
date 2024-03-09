import fileTypeChecker from "../../../src/index";

import { DetectedFileInfo } from "../../../src/core";

describe("detectFile", () => {
  it("should detect the file type of an Array<number> as a orc file", () => {
    const file: Array<number> = [
      79, 82, 67, 10, 5, 18, 3, 8, 136, 39, 10, 21, 10, 2, 0, 0, 18, 15, 8, 136,
      39, 18, 10, 8, 2, 16, 144, 78, 24, 200, 151, 246, 11, 10, 20, 10, 2, 0, 0,
      18, 14, 8, 136, 39, 34, 9,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("orc");
    expect(detectedFile.mimeType).toBe("application/x-orc");
    expect(detectedFile.signature.sequence).toEqual(["4f", "52", "43"]);
  });

  it("should detect the file type of an Array<number> as a parquet file", () => {
    const file: Array<number> = [
      80, 65, 82, 49, 21, 0, 21, 238, 45, 21, 128, 20, 44, 21, 220, 5, 21, 0,
      21, 6, 21, 6, 0, 0, 247, 22, 28, 3, 0, 0, 0, 220,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("parquet");
    expect(detectedFile.mimeType).toBe("application/vnd.apache.parquet");
    expect(detectedFile.signature.sequence).toEqual(["50", "41", "52", "31"]);
  });
});
