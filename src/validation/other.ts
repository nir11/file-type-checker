import { FileTypes } from "../core";
import { getFileChunk } from "../utils";

/**
 * Determine if file content contains a valid 'blend' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'blend' in file content, otherwise false
 */
export function isBLEND(
  file: Array<number> | ArrayBuffer | Uint8Array
): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "blend");
}

/**
 * Determine if file content contains a valid 'elf' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'elf' in file content, otherwise false
 */
export function isELF(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "elf");
}

/**
 * Determine if file content contains a valid 'indd' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'indd' in file content, otherwise false
 */
export function isINDD(
  file: Array<number> | ArrayBuffer | Uint8Array
): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "indd");
}

/**
 * Determine if file content contains a valid 'orc' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'orc' in file content, otherwise false
 */
export function isORC(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "orc");
}

/**
 * Determine if file content contains a valid 'parquet' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'parquet' in file content, otherwise false
 */
export function isPARQUET(
  file: Array<number> | ArrayBuffer | Uint8Array
): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "parquet");
}

/**
 * Determine if file content contains a valid 'pdf' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'pdf' in file content, otherwise false
 */
export function isPDF(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "pdf");
}

/**
 * Determine if file content contains a valid 'ps' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'ps' in file content, otherwise false
 */
export function isPS(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "ps");
}

/**
 * Determine if file content contains a valid 'rtf' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'rtf' in file content, otherwise false
 */
export function isRTF(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "rtf");
}

/**
 * Determine if file content contains a valid 'sqlite' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'sqlite' in file content, otherwise false
 */
export function isSQLITE(
  file: Array<number> | ArrayBuffer | Uint8Array
): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "sqlite");
}

/**
 * Determine if file content contains a valid 'stl' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'stl' in file content, otherwise false
 */
export function isSTL(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "stl");
}

/**
 * Determine if file content contains a valid 'ttf' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'ttf' in file content, otherwise false
 */
export function isTTF(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "ttf");
}

/**
 * Determine if file content contains a valid 'doc' file signature
 *
 * @param file File content represents in Array<number> / ArrayBuffer / Uint8Array
 *
 * @returns {boolean} True if found a signature of type 'doc' in file content, otherwise false
 */
export function isDOC(file: Array<number> | ArrayBuffer | Uint8Array): boolean {
  const fileChunk: Array<number> = getFileChunk(file);
  return FileTypes.checkByFileType(fileChunk, "doc");
}
