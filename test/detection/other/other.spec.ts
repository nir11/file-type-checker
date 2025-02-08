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

  it("should detect the file type of an Array<number> as a doc file", () => {
    const file: Array<number> = [
      208, 207, 17, 224, 161, 177, 26, 225, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 59, 0, 3, 0, 254, 255, 9, 0,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("doc");
    expect(detectedFile.mimeType).toBe("application/msword");
    expect(detectedFile.signature.sequence).toEqual([
      "d0",
      "cf",
      "11",
      "e0",
      "a1",
      "b1",
      "1a",
      "e1",
    ]);
  });

  it("should detect the file type of an Array<number> as a pcap file", () => {
    const file: Array<number> = [
      212, 195, 178, 161, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 1,
      0, 0, 0, 72, 244, 159, 69, 105, 94, 3, 0,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("pcap");
    expect(detectedFile.mimeType).toBe("application/vnd.tcpdump.pcap");
    expect(detectedFile.signature.sequence).toEqual(["d4", "c3", "b2", "a1"]);
  });

  it("should detect the file type of an Array<number> as an exe file", () => {
    const file: Array<number> = [
      77, 90, 144, 0, 3, 0, 0, 0, 4, 0, 0, 0, 255, 255, 0, 0, 184, 0, 0, 0, 0,
      0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0,
    ];
    const detectedFile = fileTypeChecker.detectFile(file) as DetectedFileInfo;
    expect(detectedFile.extension).toBe("exe");
    expect(detectedFile.mimeType).toBe("application/x-msdownload");
    expect(detectedFile.signature.sequence).toEqual(["4d", "5a"]);
  });
});
