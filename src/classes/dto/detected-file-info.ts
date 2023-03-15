import { FileSignature } from "../core/file-signature";

/**
 * Information about a detected file based on its signature
 */
export class DetectedFileInfo {
  extension: string;
  mimeType: string;
  description: string;
  signature: FileSignature;
}
