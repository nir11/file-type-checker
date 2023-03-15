/**
 * Information about a unique file signature
 */
export class FileSignature {
  sequence: Array<number | string>;
  offset?: number;
  skippedBytes?: Array<number>;
  description?: string;
  compatibleExtensions?: Array<string>;
}
