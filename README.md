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

```js
import fileTypeChecker from "file-type-checker";

// ... Read file as `Array<number>`, `ArrayBuffer`, or `Uint8Array`.

fileTypeChecker.detectFile(file); // Returns the detected file info
fileTypeChecker.validateFileType(file, ["png", "gif", "jpeg"]); // Returns true if the file is an image from the accepted list
fileTypeChecker.isPNG(file); // Returns true if the file is a valid PNG image

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
| elf    |
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
| mkv    |
| mov    |
| mp3    |
| mp4    |
| ogg    |
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
- To ensure optimal performance with ZIP files, it is recommended to utilize the 'chunkSize' optional parameter and pass the first 30000 bytes.
- This package assumes little-endian byte order; adjust code for big-endian.

## Example Usage

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
      console.log(isImage); // Returns true if the file is an image from the accepted list
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
      console.log(isVideo); // Returns true if the file is a video from the accepted list
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
      console.log(isPNG); // Returns true if the file is a valid PNG image
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

console.log(isImage); // Returns true the file is an image from the accepted list
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

console.log(isPNG); // Returns true if the file is a valid PNG image
```

Detect file by its signature:

```js
import fileTypeChecker from "file-type-checker";
import fs from "fs";
//const fileTypeChecker = require("file-type-checker"); // legacy way
//const fs = require("fs"); // legacy way

// Read a file as an ArrayBuffer
const file = fs.readFileSync("/path/to/my/file.mp4").buffer;

const detectedFIle = fileTypeChecker.detectFile(file);

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
  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For ZIP files, it is recommended to set this to 30,000 bytes. The default value is 64.

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
console.log(isImage); // Returns true the file is an image from the accepted list
```

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `types` : `Array<string>` - A list of accepted file types (from our [supported files](#supported-files)).
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:
  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For compressed files, it is recommended to set this to 30,000 bytes. The default value is 64.
  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. When validating a `m4a` file, the `aac` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file is valid.

### Validator functions for a single file type:

All supported files have validator functions that determine if a given file matched the requested type signature.

```js
import fileTypeChecker from "file-type-checker";

// ...

const is7z = fileTypeChecker.is7z(file); // Returns true if the file is a valid 7z archive
const isAAC = fileTypeChecker.isAAC(file); // Returns true if the file is a valid AAC audio file
const isAMR = fileTypeChecker.isAMR(file); // Returns true if the file is a valid AMR audio file
const isAVI = fileTypeChecker.isAVI(file); // Returns true if the file is a valid AVI video file
const isBMP = fileTypeChecker.isBMP(file); // Returns true if the file is a valid BMP image
const isBPG = fileTypeChecker.isBPG(file); // Returns true if the file is a valid BPG image
const isBLEND = fileTypeChecker.isBLEND(file); // Returns true if the file is a valid Blender 3D file
const isCR2 = fileTypeChecker.isCR2(file); // Returns true if the file is a valid Canon CR2 raw image
const isELF = fileTypeChecker.isELF(file); // Returns true if the file is a valid ELF executable file
const isEXR = fileTypeChecker.isEXR(file); // Returns true if the file is a valid EXR image
const isFLAC = fileTypeChecker.isFLAC(file); // Returns true if the file is a valid FLAC audio file
const isFLV = fileTypeChecker.isFLV(file); // Returns true if the file is a valid FLV video file
const isGIF = fileTypeChecker.isGIF(file); // Returns true if the file is a valid GIF image
const isICO = fileTypeChecker.isICO(file); // Returns true if the file is a valid ICO image
const isINDD = fileTypeChecker.isINDD(file); // Returns true if the file is a valid Adobe InDesign document
const isJPEG = fileTypeChecker.isJPEG(file); // Returns true if the file is a valid JPEG image
const isLZH = fileTypeChecker.isLZH(file); // Returns true if the file is a valid LZH archive
const isM4A = fileTypeChecker.isM4A(file); // Returns true if the file is a valid M4A audio file
const isM4V = fileTypeChecker.isM4V(file); // Returns true if the file is a valid M4V video file
const isMKV = fileTypeChecker.isMKV(file); // Returns true if the file is a valid MKV video file
const isMOV = fileTypeChecker.isMOV(file); // Returns true if the file is a valid MOV video file
const isMP3 = fileTypeChecker.isMP3(file); // Returns true if the file is a valid MP3 audio file
const isMP4 = fileTypeChecker.isMP4(file); // Returns true if the file is a valid MP4 video file
const isOGG = fileTypeChecker.isOGG(file); // Returns true if the file is a valid OGG audio file
const isPDF = fileTypeChecker.isPDF(file); // Returns true if the file is a valid PDF document
const isPBM = fileTypeChecker.isPBM(file); // Returns true if the file is a valid PBM image
const isPGM = fileTypeChecker.isPGM(file); // Returns true if the file is a valid PGM image
const isPNG = fileTypeChecker.isPNG(file); // Returns true if the file is a valid PNG image
const isPPM = fileTypeChecker.isPPM(file); // Returns true if the file is a valid PPM image
const isPSD = fileTypeChecker.isPSD(file); // Returns true if the file is a valid PSD image
const isPS = fileTypeChecker.isPS(file); // Returns true if the file is a valid PostScript file
const isRAR = fileTypeChecker.isRAR(file); // Returns true if the file is a valid RAR archive
const isRTF = fileTypeChecker.isRTF(file); // Returns true if the file is a valid RTF document
const isSQLite = fileTypeChecker.isSQLite(file); // Returns true if the file is a valid SQLite database file
const isSTL = fileTypeChecker.isSTL(file); // Returns true if the file is a valid STL 3D model file
const isSWF = fileTypeChecker.isSWF(file); // Returns true if the file is a valid SWF file
const isTTF = fileTypeChecker.isTTF(file); // Returns true if the file is a valid TrueType font file
const isWAV = fileTypeChecker.isWAV(file); // Returns true if the file is a valid WAV audio file
const isWEBM = fileTypeChecker.isWEBM(file); // Returns true if the file is a valid WebM video file
const isWEBP = fileTypeChecker.isWEBP(file); // Returns true if the file is a valid WebP image file
const isZIP = fileTypeChecker.isZIP(file); // Returns true if the file is a valid ZIP archive
const isHEIC = fileTypeChecker.isHEIC(file); // Returns true if the file is a valid HEIC image
```

#### Image:

<details><summary>fileTypeChecker.isBMP(file)</summary>

Checks whether a file is a BMP image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid BMP image.

</details>
    
<details><summary>fileTypeChecker.isBPG(file)</summary>

Checks whether a file is a BPG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid BPG image.

</details>

<details><summary>fileTypeChecker.isCR2(file)</summary>

Checks whether a file is a CR2 image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid CR2 image.

</details>

<details><summary>fileTypeChecker.isEXR(file)</summary>

Checks whether a file is a EXR image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid EXR image.

</details>

<details><summary>fileTypeChecker.isGIF(file)</summary>

Checks whether a file is a GIF image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid GIF image.

</details>

<details><summary>fileTypeChecker.isICO(file)</summary>

Checks whether a file is an ICO image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid ICO image.

</details>

<details><summary>fileTypeChecker.isJPEG(file)</summary>

Checks whether a file is a JPEG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid JPEG image.

</details>

<details><summary>fileTypeChecker.isPBM(file)</summary>

Checks whether a file is a PBM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PBM image.

</details>

<details><summary>fileTypeChecker.isPGM(file)</summary>

Checks whether a file is a PGM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PGM image.

</details>

<details><summary>fileTypeChecker.isPNG(file)</summary>

Checks whether a file is a PNG image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PNG image.

</details>

<details><summary>fileTypeChecker.isPPM(file)</summary>

Checks whether a file is a PPM image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PPM image.

</details>

<details><summary>fileTypeChecker.isPSD(file)</summary>

Checks whether a file is a PSD image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PSD image.

</details>

<details><summary>fileTypeChecker.isTTF(file)</summary>

Checks whether a file is a TTF image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid TTF image.

</details>

<details><summary>fileTypeChecker.isHEIC(file)</summary>

Checks whether a file is a HEIC image by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid HEIC image.

</details>

#### Video:

<details><summary>fileTypeChecker.isAVI(file)</summary>

Checks whether a file is an AVI video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid AVI video.

</details>

<details><summary>fileTypeChecker.isFLV(file)</summary>

Checks whether a file is a FLV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid FLV video.

</details>

<details><summary>fileTypeChecker.isM4V(file)</summary>

Checks whether a file is a M4v video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid M4v video.

</details>

<details><summary>fileTypeChecker.isMKV(file)</summary>

Checks whether a file is a MKV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid MKV video.

</details>

<details><summary>fileTypeChecker.isMOV(file)</summary>

Checks whether a file is a MOV video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid MOV video.

</details>

<details><summary>fileTypeChecker.isMP4(file, options?)</summary>

Checks whether a file is a MP4 video by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file is a valid MP4 video.

</details>

<details><summary>fileTypeChecker.isOGG(file)</summary>

Checks whether a file is an OGG video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid OGG video.

</details>

<details><summary>fileTypeChecker.isSWF(file)</summary>

Checks whether a file is a SWF video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid SWF video.

</details>

<details><summary>fileTypeChecker.isWEBM(file)</summary>

Checks whether a file is a WEBM video by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid WEBM video.

</details>

#### Audio:

<details><summary>fileTypeChecker.isAAC(file, options?)</summary>

Checks whether a file is an AAC audio by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `aac` file, the `m4a` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file is a valid AAC audio.

</details>

<details><summary>fileTypeChecker.isAMR(file)</summary>

Checks whether a file is an AMR audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid AMR audio.

</details>

<details><summary>fileTypeChecker.isFLAC(file)</summary>

Checks whether a file is a FLAC audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid FLAC audio.

</details>

<details><summary>fileTypeChecker.isM4A(file)</summary>

Checks whether a file is a M4A audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid M4A audio.

</details>

<details><summary>fileTypeChecker.isMP3(file)</summary>

Checks whether a file is a MP3 audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid MP3 audio.

</details>

<details><summary>fileTypeChecker.isWAV(file)</summary>

Checks whether a file is a WAV audio by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid WAV audio.

</details>

#### Compressed:

<details><summary>fileTypeChecker.is7z(file)</summary>

Checks whether a file is a 7z compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid 7z file.

</details>

<details><summary>fileTypeChecker.isLZH(file)</summary>

Checks whether a file is a LZH compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid LZH file.

</details>

<details><summary>fileTypeChecker.isRAR(file)</summary>

Checks whether a file is a RAR compressed archive by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid RAR file.

</details>

<details><summary>fileTypeChecker.isZIP(file, options?)</summary>

Checks whether a file is a ZIP compressed archive by inspecting its file signature.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:

  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For ZIP files, it is recommended to set this to 30,000 bytes. The default value is 64.

Returns a `boolean` indicating whether the file is a valid ZIP file.

</details>

#### Other:

<details><summary>fileTypeChecker.isBLEND(file)</summary>

Checks whether a file is a BLEND file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid BLEND file.

</details>

<details><summary>fileTypeChecker.isELF(file)</summary>

Checks whether a file is an ELF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid ELF file.

</details>

<details><summary>fileTypeChecker.isINDD(file)</summary>

Checks whether a file is an INDD file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is an INDD file.

</details>

<details><summary>fileTypeChecker.isPDF(file)</summary>

Checks whether a file is a PDF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PDF file.

</details>

<details><summary>fileTypeChecker.isPS(file)</summary>

Checks whether a file is a PS file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid PS file.

</details>

<details><summary>fileTypeChecker.isRTF(file)</summary>

Checks whether a file is a RTF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid RTF file.

</details>

<details><summary>fileTypeChecker.isSQLITE(file)</summary>

Checks whether a file is a SQLITE file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid SQLITE file.

</details>

<details><summary>fileTypeChecker.isSTL(file)</summary>

Checks whether a file is a STL file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid STL file.

</details>

<details><summary>fileTypeChecker.isTTF(file)</summary>

Checks whether a file is a TTF file by inspecting its file signature.

Parameters: - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

Returns a `boolean` indicating whether the file is a valid TTF file.

</details>

# License

[MIT](https://github.com/nir11/file-type-checker/blob/main/LICENSE)
