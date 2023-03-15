import { FileSignature } from "./file-signature";

/**
 * Information about a file
 */
export class FileInfo {
  extension: string;
  mimeType: string;
  description: string;
  signatures: Array<FileSignature>;
}
