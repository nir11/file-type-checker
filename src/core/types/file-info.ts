import { FileSignature } from "./file-signature";

/**
 * Information about a file
 */
export type FileInfo = {
  extension: string;
  mimeType: string;
  description: string;
  signatures: Array<FileSignature>;
};
