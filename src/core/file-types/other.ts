import { FileInfo } from "../types/file-info";

/**
 * Other files information with their unique signatures
 */
export class OtherTypes {
  static BLEND: FileInfo = {
    extension: "blend",
    mimeType: "application/x-blender",
    description: "Blender File Format",
    signatures: [
      {
        sequence: [0x42, 0x4c, 0x45, 0x4e, 0x44, 0x45, 0x52],
      },
    ],
  };

  static ELF: FileInfo = {
    extension: "elf",
    mimeType: "application/x-executable",
    description: "Executable and Linking Format executable file (Linux/Unix)",
    signatures: [
      {
        sequence: [0x7f, 0x45, 0x4c, 0x46],
      },
    ],
  };

  static INDD: FileInfo = {
    extension: "indd",
    mimeType: "application/x-indesign",
    description: "Adobe InDesign document",
    signatures: [
      {
        sequence: [
          0x06, 0x06, 0xed, 0xf5, 0xd8, 0x1d, 0x46, 0xe5, 0xbd, 0x31, 0xef,
          0xe7, 0xfe, 0x74, 0xb7, 0x1d,
        ],
        compatibleExtensions: ["indt"],
      },
    ],
  };

  static PDF: FileInfo = {
    extension: "pdf",
    mimeType: "application/pdf",
    description: "Portable Document Format",
    signatures: [
      {
        sequence: [0x25, 0x50, 0x44, 0x46, 0x2d],
      },
    ],
  };

  static ORC: FileInfo = {
    extension: "orc",
    mimeType: "application/x-orc",
    description:
      "Apache ORC (Optimized Row Columnar) file format for columnar storage",
    signatures: [
      {
        sequence: [0x4f, 0x52, 0x43],
      },
    ],
  };

  static PARQUET: FileInfo = {
    extension: "parquet",
    mimeType: "application/vnd.apache.parquet",
    description: "Apache Parquet file format for columnar storage",
    signatures: [
      {
        sequence: [0x50, 0x41, 0x52, 0x31],
      },
    ],
  };

  static PS: FileInfo = {
    extension: "ps",
    mimeType: "application/postscript",
    description: "PostScript document",
    signatures: [
      {
        sequence: [0x25, 0x21, 0x50, 0x53],
      },
    ],
  };

  static RTF: FileInfo = {
    extension: "rtf",
    mimeType: "application/rtf",
    description: "Rich Text Format word processing file",
    signatures: [
      {
        sequence: [0x7b, 0x5c, 0x72, 0x74, 0x66, 0x31],
      },
    ],
  };

  static SQLITE: FileInfo = {
    extension: "sqlite",
    mimeType: "application/x-sqlite3",
    description: "SQLite database file",
    signatures: [
      {
        sequence: [
          0x53, 0x51, 0x4c, 0x69, 0x74, 0x65, 0x20, 0x66, 0x6f, 0x72, 0x6d,
          0x61, 0x74, 0x20, 0x33, 0x00,
        ],
      },
    ],
  };

  static STL: FileInfo = {
    extension: "stl",
    mimeType: "application/sla",
    description: "ASCII STL (STereoLithography) file for 3D printing",
    signatures: [
      {
        sequence: [0x73, 0x6f, 0x6c, 0x69, 0x64],
      },
    ],
  };

  static TTF: FileInfo = {
    extension: "ttf",
    mimeType: "application/x-font-ttf",
    description: "TrueType font file",
    signatures: [
      {
        sequence: [0x74, 0x72, 0x75, 0x65, 0x00],
      },
      {
        sequence: [0x00, 0x01, 0x00, 0x00, 0x00],
        compatibleExtensions: ["tte, dfont"],
      },
    ],
  };

  static DOC: FileInfo = {
    extension: "doc",
    mimeType: "application/msword",
    description: "Old microsoft Word documents",
    signatures: [
      {
        sequence: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
        compatibleExtensions: ["xls", "ppt", "msi", "msg"],
      },
    ],
  };
}
