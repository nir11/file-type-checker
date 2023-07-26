import { FileSignature } from "../../types";

/**
 * Information about a detected file based on its signature
 */
export interface DetectedFileInfo {
  extension: string;
  mimeType: string;
  description: string;
  signature: FileSignature;
}
