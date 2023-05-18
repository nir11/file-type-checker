/**
 * Information about a unique file signature
 */
export type FileSignature = {
  sequence: Array<number | string>;
  offset?: number;
  skippedBytes?: Array<number>;
  description?: string;
  compatibleExtensions?: Array<string>;
};
