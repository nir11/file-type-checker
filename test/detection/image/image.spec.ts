import fileTypeChecker from "../../../src/index";

import { DetectedFileInfo } from "../../../src/core";

describe("detectFile", () => {
  it("should detect the file type of an Array<number> as a avif file", () => {
    const file: Array<number> = [
      0, 0, 0, 20, 66, 74, 79, 70, 61, 76, 69, 66, 0, 0,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("avif");
    expect(detectedFile.mimeType).toBe("image/avif");
    expect(detectedFile.signature.sequence).toEqual(["0", "0", "0"]);
  });

  it("should not detect a corrupted Array<number> of an avif file which does not include the 'ftypavif' string", () => {
    const file: Array<number> = [
      0, 0, 0, 20, 66, 74, 79, 72, 61, 76, 69, 66, 0, 0,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile).toBeUndefined();
  });
});
