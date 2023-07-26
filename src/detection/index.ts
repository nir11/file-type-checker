import {
  DetectedFileInfo,
  DetectFileOptions,
  FileInfo,
  FileSignature,
  FileTypes,
} from "../core";
import { getFileChunk } from "../utils";

/**
 * Detect a file by searching for a valid file signature inside the file content
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 * @param options Optional parameters for additional actions
 *
 * @returns {DetectedFileInfo | undefined} DetectedFileInfo if detected a valid signature inside the file contentof, otherwise undefined
 */
export function detectFile(
  file: Array<number> | ArrayBuffer | Uint8Array,
  options?: DetectFileOptions
): DetectedFileInfo | undefined {
  if (
    options &&
    Object.prototype.hasOwnProperty.call(options, "chunkSize") &&
    (options?.chunkSize ?? 0) <= 0
  )
    throw new RangeError("chunkSize must be bigger than zero");

  const fileChunk: Array<number> = getFileChunk(file, options?.chunkSize || 64); // Take chunk from the beginning of the file
  if (fileChunk.length === 0) return undefined;

  const detectedFiles: DetectedFileInfo[] = [];

  for (const type in FileTypes) {
    if (Object.prototype.hasOwnProperty.call(FileTypes, type)) {
      const signatures: Array<FileSignature> =
        FileTypes.getSignaturesByName(type);
      const matchedSignature = FileTypes.detectbySignatures(
        fileChunk,
        signatures
      );
      if (matchedSignature) {
        const fileType: FileInfo = FileTypes.getInfoByName(type);
        const fileInfo: DetectedFileInfo = {
          extension: fileType.extension,
          mimeType: fileType.mimeType,
          description: fileType.description,
          signature: {
            ...matchedSignature,
            sequence: matchedSignature.sequence.map((num) => num.toString(16)),
          },
        };
        detectedFiles.push(fileInfo);
      }
    }
  }
  if (detectedFiles.length === 0) return undefined;
  else if (detectedFiles.length === 1) return detectedFiles[0];

  // Some files share the same signature. Additional check required
  const detectedType = FileTypes.detectTypeByAdditionalCheck(
    fileChunk,
    detectedFiles
  );
  if (!detectedType) return undefined;

  return detectedFiles.find((df) => df.extension === detectedType);
}
