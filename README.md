# File Type Checker

<p align="center">
  Detect and validate file types by their signatures (✨magic numbers✨)
</p>

- Supports a wide range of file types.
- Detects the type of a given file using a detection mechanism.
- Validates files against their requested types using signatures.
- Provides flexibility for the file data type: choose from `Array<number>`, `ArrayBuffer`, or `Uint8Array`.
- Written in TypeScript for full typing support.
- Works on both server and client sides.
- ⚠️ Note: For optimized handling of large files, refer to the [Optimization](#optimization) section.

```js
import fileTypeChecker from "file-type-checker";

// ... Read file as `Array<number>`, `ArrayBuffer`, or `Uint8Array`.

fileTypeChecker.detectFile(file); // Returns the detected file info
fileTypeChecker.validateFileType(file, ["png", "gif", "jpeg"]); // Returns true if the file includes an image signature from the accepted list
fileTypeChecker.isPNG(file); // Returns true if the file includes a valid PNG image signature

// ... And many more validator functions for each supported type.
```

## Installation

Using npm:

    npm i file-type-checker

## Quick Overview

### Detection sample:

![Detection GIF](https://github.com/nir11/file-type-checker/blob/main/src/assets/detection.gif)

### Validation sample:

![Detection GIF](https://github.com/nir11/file-type-checker/blob/main/src/assets/validation.gif)

## Resources

- [GCK'S File Signatures Table](https://www.garykessler.net/library/file_sigs.html)
- [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)

## Supported Files

| Type   |
| :----- |
| 7z     |
| aac    |
| amr    |
| avi    |
| bmp    |
| bpg    |
| blend  |
| cr2    |
| doc    |
| elf    |
| exe    |
| exr    |
| flac   |
| flv    |
| gif    |
| heic   |
| ico    |
| indd   |
| jpeg   |
| lzh    |
| m4a    |
| m4v    |
| mach-o |
| mkv    |
| mov    |
| mp3    |
| mp4    |
| ogg    |
| pcap   |
| pdf    |
| pbm    |
| pgm    |
| png    |
| ppm    |
| psd    |
| ps     |
| rar    |
| rtf    |
| sqlite |
| stl    |
| swf    |
| ttf    |
| wav    |
| webm   |
| webp   |
| zip    |

## Note

- Only file signatures are checked; additional validation may be necessary.
- To ensure optimal performance all files should be at least 64 bytes in size.
- For large files, pass only a chunk from the beggining of the file to ensure optimal performance.
- To ensure optimal performance with ZIP files, it is recommended to utilize the 'chunkSize' optional parameter and pass the first 30000 bytes.
- This package assumes little-endian byte order; adjust code for big-endian.

## Example Usage

⚠️ Note: These examples demonstrate reading the entire file, which may be slow for large files.
For optimized handling of large files, refer to the [Optimization](#optimization) section.

### Browser (`React`, `Angular`, `Vanilla JS`, etc.):

Validate file signature against a list if file types (React app example):

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    const types = ["jpeg", "png", "gif"];

    // When the file is loaded, validate its type
    reader.onload = () => {
      const isImage = fileTypeChecker.validateFileType(reader.result, types);
      console.log(isImage); // Returns true if the file includes an image signature from the accepted list
    };

    // Use the FileReader API to read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  } catch (err) {
    console.error("Error: ", err.message);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileInputChange} />
  </div>
);
```

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    const types = ["mp4", "avi", "mov"];

    // When the file is loaded, validate its type
    reader.onload = () => {
      const isVideo = fileTypeChecker.validateFileType(
        reader.result,
        types,
        { excludeSimilarTypes: true } // (optional parameter) if we don't want to validate 'm4a' signature as 'mp4' type
      );
      console.log(isVideo); // Returns true if the file includes a video signature from the accepted list
    };

    // Use the FileReader API to read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  } catch (err) {
    console.error("Error: ", err.message);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileInputChange} />
  </div>
);
```

Validate file signature against a single file type (React app example):

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    // When the file is loaded, check if its type is PNG
    reader.onload = () => {
      const isPNG = fileTypeChecker.isPNG(reader.result);
      console.log(isPNG); // Returns true if the file includes a vali PNG image signature
    };

    // Use the FileReader API to read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  } catch (err) {
    console.error("Error validating file type: ", err.message);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileInputChange} />
  </div>
);
```

Detect file by its signature (React app example):

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    // When the file is loaded, detect its type
    reader.onload = () => {
      const detectedFile = fileTypeChecker.detectFile(reader.result);
      console.log(detectedFile) >
        {
          extension: "png",
          mimeType: "image/png",
          description:
            "PNG (Portable Network Graphics) is a lossless image compression format that supports a wide range of color depths and transparency and is widely used for high-quality graphics.",
          signature: {
            sequence: ["89", "50", "4e", "47", "d", "a", "1a", "a"],
          },
        };
    };

    // Use the FileReader API to read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  } catch (err) {
    console.error("Error: ", err.message);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileInputChange} />
  </div>
);
```

### Node.js:

Detect file by its signature (synchronously, will be slow with large files):

```js
import fileTypeChecker from "file-type-checker";
import fs from "fs";

// Read a file as an ArrayBuffer
const file = fs.readFileSync("/path/to/my/file.mp4").buffer;

const detectedFile = fileTypeChecker.detectFile(file);

console.log(detectedFile)
>  {
      "extension": "mp4",
      "mimeType": "video/mp4",
      "description": "A multimedia container format widely used for storing audio, video, and other data, and is known for its high compression efficiency and compatibility with many devices",
      "signature": {
        "sequence": ["66","74","79","70","69","73","6f","6d"],
        "description" (optional): "ISO Base Media file (MPEG-4) v1",
        "offset" (optional): 4
      }
  }
```

Validate file signature against a list of file types:

```js
import fileTypeChecker from "file-type-checker";
import fs from "fs";
//const fileTypeChecker = require("file-type-checker"); // legacy way
//const fs = require("fs"); // legacy way

// Read a file as an ArrayBuffer
const file = fs.readFileSync("/path/to/my/file.png").buffer;

// A list of accepted image file types
const types = ["jpeg", "png", "gif"];

const isImage = fileTypeChecker.validateFileType(
  file,
  types,
  { chunkSize: 32 } // (optional parameter) all images signatures exists in the first 32 bytes
);

console.log(isImage); // Returns true the file includes an image signature from the accepted list
```

Validate file signature against a single file type:

```js
import fileTypeChecker from "file-type-checker";
import fs from "fs";
//const fileTypeChecker = require("file-type-checker"); // legacy way
//const fs = require("fs"); // legacy way

// Read a file as an ArrayBuffer
const file = fs.readFileSync("/path/to/my/file.png").buffer;

const isPNG = fileTypeChecker.isPNG(file);

console.log(isPNG); // Returns true if the file includes a valid PNG image signature
```

## Optimization

### 📌 How to use `file-type-checker` efficiently

To ensure the best performance and avoid excessive memory usage, follow these best practices:

1.  Read only the first X bytes when detecting file type.

    - Most file signatures exist in the first 64 bytes, except ZIP files that require 32,000 bytes.
    - Before calling `detectFile`, `validateFile` or any other validation function, make sure you only pass a chunk from the beginning of the file content.
    - This reduces unnecessary file I/O and memory consumption.
    - ✅ Node.js example (read first 64 bytes for detection)

      ```
      import fileTypeChecker from "file-type-checker";
      import fs from "fs";
      import path from "path";

      const file = path.resolve("/path/to/my/large/file.mp4");
      const CHUNK_SIZE = 64; // All file signatures except ZIP exist in the first 64 bytes
      const fileHandle = await fs.promises.open(file, "r");

      const buffer = Buffer.alloc(CHUNK_SIZE);
      await fileHandle.read(buffer, 0, CHUNK_SIZE, 0); // Read only the first 64 bytes

      // Detect file type using the first chunk
      const detectedFileInfo = fileTypeChecker.detectFile(buffer, {
        chunkSize: 64,
      });
      ```

    - ✅ Browser example (read first 64 bytes using file.slice() ):

      ```
      import fileTypeChecker from "file-type-checker";

      const handleFileInputChange = async (event) => {
        try {
          const file = event.target.files[0];

          // Read only the first 64 bytes for file type detection (optimization)
          const buffer = await file.slice(0, 64).arrayBuffer();

          const detectedFile = fileTypeChecker.detectFile(buffer);
          console.log("Detected File Type:", detectedFile);
        } catch (err) {
          console.error("Error: ", err.message);
        }
      };

      return <input type="file" onChange={handleFileInputChange} />;
      ```

2.  Process large files in chunks.

    - Avoid loading the entire file into memory at once.
    - Most file signatures exist in the first 64 bytes, except ZIP files that require 32,000 bytes.
    - Process files in small chunks instead of reading everything at once.
    - ✅ Node.js example (read large files in chunks)

      ```
      import fileTypeChecker from "file-type-checker";
      import fs from "fs";

      const readFileInChunks = (filePath, chunkSize = 64 * 1024) => {
        const stream = fs.createReadStream(filePath, { highWaterMark: chunkSize });
        let isFirstChunk = true; // Flag to track the first chunk

        stream.on("data", (chunk) => {
          console.log("Chunk read:", chunk);

          if (isFirstChunk) {
            const detectedFile = fileTypeChecker.detectFile(chunk);
            console.log("Detected File Type:", detectedFile);
            isFirstChunk = false; // Prevent further calls to detectFile
          }
        });

        stream.on("end", () => console.log("Finished reading file."));
      };

      readFileInChunks("/path/to/my/large/file.mp4");
      ```

    - ✅ Browser example (read large files using streams)

      ```
      import fileTypeChecker from "file-type-checker";

      const readFileInChunks = async (file, chunkSize = 64 * 1024) => {
      console.log(`Reading file in chunks of ${chunkSize} bytes`);

      const stream = file.stream();
      const reader = stream.getReader();
      let isFirstChunk = true;
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone; // Update loop condition

        if (value) {
          console.log("Chunk read:", value);

          if (isFirstChunk) {
            const detectedFile = fileTypeChecker.detectFile(value);
            console.log("Detected File Type:", detectedFile);
            isFirstChunk = false; // Prevent further calls to detectFile
          }
        }
      }

      console.log("Finished reading file.");
      };

      const handleFileInputChange = (event) => {
      if (!event.target.files.length) return;
      readFileInChunks(event.target.files[0]);
      };

      return <input type="file" onChange={handleFileInputChange} />;
      ```

## API

### detectFile(file, options?)

Detect the file type of a given file.

```js
import fileTypeChecker from "file-type-checker";

// ...

const detectedFile = fileTypeChecker.detectFile(file);
> {
      "extension": "png",
      "mimeType": "image/png",
      "description": "PNG (Portable Network Graphics) is a lossless image compression format that supports a wide range of color depths and transparency and is widely used for high-quality graphics.",
      "signature": {
        "sequence": ["89","50","4e","47","d","a","1a","a"]
      }
  }
```

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array`- Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For ZIP files, it is recommended to set this to 30,000 bytes for accurate detection. The default value is 64. The default value is 64.

    ⚠️ Note: For optimized handling of large files, refer to the [Optimization](#optimization) section.

Returns:

- `object` - An object with information about a file, including its file extension, MIME type, and file signature. The returned object has the following properties:
  - `extension` - A string that represents file extension (e.g., "png").
  - `mimeType` - A string that represents the MIME type of the file (e.g., "image/png").
  - `description` - A string that provides a short description of the file.
  - `signature` - An object that contains information about the file signature, with the following properties:
    - `sequence` - An array of hexadecimal strings that represents the bytes in the file signature.
    - `description` (optional) - A string that provides a short description of the file signature.
    - `offset` (optional) - A number that indicates the offset of the file signature.
    - `skippedBytes` (optional) - An array of numbers that indicates the number of bytes that were skipped.
    - `compatibleExtensions` (optional): An array of strings that indicates file compatible extensions.
- `undefined` - If no file has found.

### validateFileType(file, types, options?)

Validates the requested file signature against a list of accepted file types.

```js
import fileTypeChecker from "file-type-checker";

// ...

const isImage = fileTypeChecker.validateFileType(file, ["jpeg", "png", "gif"]);
console.log(isImage); // Returns true the file includes an image signature from the accepted list
```

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `types` : `Array<string>` - A list of accepted file types (from our [supported files](#supported-files)).
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For compressed files, it is recommended to set this to 30,000 bytes when validating ZIP files. The default value is 64.

    ⚠️ Note: For optimized handling of large files, refer to the [Optimization](#optimization) section.

  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. When validating a `m4a` file, the `aac` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file is valid.

### Validator functions for a single file type:

All supported files have validator functions that determine if a given file matched the requested type signature.

```js
import fileTypeChecker from "file-type-checker";

// ...

const is7z = fileTypeChecker.is7z(file); // Returns true if the file includes a valid 7z archive signature
const isAAC = fileTypeChecker.isAAC(file); // Returns true if the file includes a valid AAC audio file signature
const isAMR = fileTypeChecker.isAMR(file); // Returns true if the file includes a valid AMR audio file signature
const isAVI = fileTypeChecker.isAVI(file); // Returns true if the file includes a valid AVI video file signature
const isBMP = fileTypeChecker.isBMP(file); // Returns true if the file includes a valid BMP image signature
const isBPG = fileTypeChecker.isBPG(file); // Returns true if the file includes a valid BPG image signature
const isBLEND = fileTypeChecker.isBLEND(file); // Returns true if the file includes a valid Blender 3D file signature
const isCR2 = fileTypeChecker.isCR2(file); // Returns true if the file includes a valid Canon CR2 raw image signature
const isDOC = fileTypeChecker.isDOC(file); // Returns true if the file includes a valid DOC file signature
const isELF = fileTypeChecker.isELF(file); // Returns true if the file includes a valid ELF executable file signature
const isEXR = fileTypeChecker.isEXR(file); // Returns true if the file includes a valid EXR image signature
const isEXE = fileTypeChecker.isEXE(file); // Returns true if the file includes a valid EXE image signature
const isFLAC = fileTypeChecker.isFLAC(file); // Returns true if the file includes a valid FLAC audio file signature
const isFLV = fileTypeChecker.isFLV(file); // Returns true if the file includes a valid FLV video file signature
const isGIF = fileTypeChecker.isGIF(file); // Returns true if the file includes a valid GIF image signature
const isHEIC = fileTypeChecker.isHEIC(file); // Returns true if the file includes a valid HEIC image signature
const isICO = fileTypeChecker.isICO(file); // Returns true if the file includes a valid ICO image signature
const isINDD = fileTypeChecker.isINDD(file); // Returns true if the file includes a valid Adobe InDesign document signature
const isJPEG = fileTypeChecker.isJPEG(file); // Returns true if the file includes a valid JPEG image signature
const isLZH = fileTypeChecker.isLZH(file); // Returns true if the file includes a valid LZH archive signature
const isM4A = fileTypeChecker.isM4A(file); // Returns true if the file includes a valid M4A audio file signature
const isM4V = fileTypeChecker.isM4V(file); // Returns true if the file includes a valid M4V video file signature
const isMACHO = fileTypeChecker.isMACHO(file); // Returns true if the file includes a valid MACH-O video file
const isMKV = fileTypeChecker.isMKV(file); // Returns true if the file includes a valid MKV video file signature
const isMOV = fileTypeChecker.isMOV(file); // Returns true if the file includes a valid MOV video file signature
const isMP3 = fileTypeChecker.isMP3(file); // Returns true if the file includes a valid MP3 audio file signature
const isMP4 = fileTypeChecker.isMP4(file); // Returns true if the file includes a valid MP4 video file signature
const isOGG = fileTypeChecker.isOGG(file); // Returns true if the file includes a valid OGG audio file signature
const isORC = fileTypeChecker.isORC(file); // Returns true if the file includes a valid ORC file signature
const isPARQUET = fileTypeChecker.isPARQUET(file); // Returns true if the file includes a valid Parquet file signature
const isPBM = fileTypeChecker.isPBM(file); // Returns true if the file includes a valid PBM image signature
const isPCAP = fileTypeChecker.isPCAP(file); // Returns true if the file includes a valid PCAP file signature
const isPDF = fileTypeChecker.isPDF(file); // Returns true if the file includes a valid PDF document signature
const isPGM = fileTypeChecker.isPGM(file); // Returns true if the file includes a valid PGM image signature
const isPNG = fileTypeChecker.isPNG(file); // Returns true if the file includes a valid PNG image signature
const isPPM = fileTypeChecker.isPPM(file); // Returns true if the file includes a valid PPM image
const isPSD = fileTypeChecker.isPSD(file); // Returns true if the file includes a valid PSD image signature
const isPS = fileTypeChecker.isPS(file); // Returns true if the file includes a valid PostScript file signature
const isRAR = fileTypeChecker.isRAR(file); // Returns true if the file includes a valid RAR archive signature
const isRTF = fileTypeChecker.isRTF(file); // Returns true if the file includes a valid RTF document signature
const isSQLite = fileTypeChecker.isSQLite(file); // Returns true if the file includes a valid SQLite database file signature
const isSTL = fileTypeChecker.isSTL(file); // Returns true if the file includes a valid STL 3D model file signature
const isSWF = fileTypeChecker.isSWF(file); // Returns true if the file includes a valid SWF file signature
const isTTF = fileTypeChecker.isTTF(file); // Returns true if the file includes a valid TrueType font file signature
const isWAV = fileTypeChecker.isWAV(file); // Returns true if the file includes a valid WAV audio file signature
const isWEBM = fileTypeChecker.isWEBM(file); // Returns true if the file includes a valid WebM video file signature
const isWEBP = fileTypeChecker.isWEBP(file); // Returns true if the file includes a valid WebP image file signature
const isZIP = fileTypeChecker.isZIP(file); // Returns true if the file includes a valid ZIP archive signature
```

#### Image:

<details><summary>fileTypeChecker.isBMP(file)</summary>

Checks whether a file is a BMP image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid BMP image signature.

</details>
    
<details><summary>fileTypeChecker.isBPG(file)</summary>

Checks whether a file is a BPG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid BPG image signature.

</details>

<details><summary>fileTypeChecker.isCR2(file)</summary>

Checks whether a file is a CR2 image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid CR2 image signature.

</details>

<details><summary>fileTypeChecker.isEXR(file)</summary>

Checks whether a file is a EXR image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid EXR image signature.

</details>

<details><summary>fileTypeChecker.isGIF(file)</summary>

Checks whether a file is a GIF image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid GIF image signature.

</details>

<details><summary>fileTypeChecker.isHEIC(file)</summary>

Checks whether a file is a HEIC image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid HEIC image signature.

</details>

<details><summary>fileTypeChecker.isICO(file)</summary>

Checks whether a file is an ICO image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid ICO image signature.

</details>

<details><summary>fileTypeChecker.isJPEG(file)</summary>

Checks whether a file is a JPEG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid JPEG image signature.

</details>

<details><summary>fileTypeChecker.isPBM(file)</summary>

Checks whether a file is a PBM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PBM image signature.

</details>

<details><summary>fileTypeChecker.isPGM(file)</summary>

Checks whether a file is a PGM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PGM image signature.

</details>

<details><summary>fileTypeChecker.isPNG(file)</summary>

Checks whether a file is a PNG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PNG image signature.

</details>

<details><summary>fileTypeChecker.isPPM(file)</summary>

Checks whether a file is a PPM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PPM image signature.

</details>

<details><summary>fileTypeChecker.isPSD(file)</summary>

Checks whether a file is a PSD image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PSD image signature.

</details>

<details><summary>fileTypeChecker.isTTF(file)</summary>

Checks whether a file is a TTF image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid TTF image signature.

</details>

#### Video:

<details><summary>fileTypeChecker.isAVI(file)</summary>

Checks whether a file is an AVI video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid AVI video signature.

</details>

<details><summary>fileTypeChecker.isFLV(file)</summary>

Checks whether a file is a FLV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid FLV video signature.

</details>

<details><summary>fileTypeChecker.isM4V(file)</summary>

Checks whether a file is a M4v video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid M4v video signature.

</details>

<details><summary>fileTypeChecker.isMKV(file)</summary>

Checks whether a file is a MKV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid MKV video signature.

</details>

<details><summary>fileTypeChecker.isMOV(file)</summary>

Checks whether a file is a MOV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid MOV video signature.

</details>

<details><summary>fileTypeChecker.isMP4(file, options?)</summary>

Checks whether a file is a MP4 video by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file includes a valid MP4 video signature.

</details>

<details><summary>fileTypeChecker.isOGG(file)</summary>

Checks whether a file is an OGG video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid OGG video signature.

</details>

<details><summary>fileTypeChecker.isSWF(file)</summary>

Checks whether a file is a SWF video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid SWF video signature.

</details>

<details><summary>fileTypeChecker.isWEBM(file)</summary>

Checks whether a file is a WEBM video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid WEBM video signature.

</details>

#### Audio:

<details><summary>fileTypeChecker.isAAC(file, options?)</summary>

Checks whether a file is an AAC audio by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `aac` file, the `m4a` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file includes a valid AAC audio signature.

</details>

<details><summary>fileTypeChecker.isAMR(file)</summary>

Checks whether a file is an AMR audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid AMR audio signature.

</details>

<details><summary>fileTypeChecker.isFLAC(file)</summary>

Checks whether a file is a FLAC audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid FLAC audio signature.

</details>

<details><summary>fileTypeChecker.isM4A(file)</summary>

Checks whether a file is a M4A audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid M4A audio signature.

</details>

<details><summary>fileTypeChecker.isMP3(file)</summary>

Checks whether a file is a MP3 audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid MP3 audio signature.

</details>

<details><summary>fileTypeChecker.isWAV(file)</summary>

Checks whether a file is a WAV audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid WAV audio signature.

</details>

#### Compressed:

<details><summary>fileTypeChecker.is7z(file)</summary>

Checks whether a file is a 7z compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid 7z file signature.

</details>

<details><summary>fileTypeChecker.isLZH(file)</summary>

Checks whether a file is a LZH compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid LZH file signature.

</details>

<details><summary>fileTypeChecker.isRAR(file)</summary>

Checks whether a file is a RAR compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid RAR file signature.

</details>

<details><summary>fileTypeChecker.isZIP(file, options?)</summary>

Checks whether a file is a ZIP compressed archive by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For ZIP files, it is recommended to set this to 30,000 bytes. The default value is 64.

Returns a `boolean` indicating whether the file includes a valid ZIP file signature.

</details>

#### Other:

<details><summary>fileTypeChecker.isBLEND(file)</summary>

Checks whether a file is a BLEND file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid BLEND file signature.

</details>

<details><summary>fileTypeChecker.isDOC(file)</summary>

Checks whether a file is a DOC file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid DOC file signature.

</details>

<details><summary>fileTypeChecker.isELF(file)</summary>

Checks whether a file is an ELF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid ELF file signature.

</details>

<details><summary>fileTypeChecker.isEXE(file)</summary>

Checks whether a file is an EXE file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid EXE file signature.

</details>

<details><summary>fileTypeChecker.isINDD(file)</summary>

Checks whether a file is an INDD file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is an INDD file.

</details>

<details><summary>fileTypeChecker.isMACHO(file)</summary>

Checks whether a file is an MACH-O file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is an MACH-O file.

</details>

<details><summary>fileTypeChecker.isORC(file)</summary>

Checks whether a file is a ORC file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid ORC file signature.

</details>

<details><summary>fileTypeChecker.isPARQUET(file)</summary>

Checks whether a file is a PARQUET file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PARQUET file signature.

</details>

<details><summary>fileTypeChecker.isPCAP(file)</summary>

Checks whether a file is a PCAP file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PCAP file signature.

</details>

<details><summary>fileTypeChecker.isPDF(file)</summary>

Checks whether a file is a PDF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PDF file signature.

</details>

<details><summary>fileTypeChecker.isPS(file)</summary>

Checks whether a file is a PS file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid PS file signature.

</details>

<details><summary>fileTypeChecker.isRTF(file)</summary>

Checks whether a file is a RTF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid RTF file signature.

</details>

<details><summary>fileTypeChecker.isSQLITE(file)</summary>

Checks whether a file is a SQLITE file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid SQLITE file signature.

</details>

<details><summary>fileTypeChecker.isSTL(file)</summary>

Checks whether a file is a STL file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid STL file signature.

</details>

<details><summary>fileTypeChecker.isTTF(file)</summary>

Checks whether a file is a TTF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file includes a valid TTF file signature.

</details>

# License

[MIT](https://github.com/nir11/file-type-checker/blob/main/LICENSE)
