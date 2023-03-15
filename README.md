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

## Installation

Using npm:

    npm i file-type-checker

## Note

- Only file signatures are checked; additional validation may be necessary.
- To ensure optimal performance all files should be at least 64 bytes in size.
- To ensure optimal performance with ZIP files, it is recommended to utilize the 'chunkSize' optional parameter and pass the first 30000 bytes.
- This package assumes little-endian byte order; adjust code for big-endian.

## Example Usage

### Node.js:

Detect file by its signature:

```js
import fileTypeChecker from "file-type-checker";

// File content as an array of numbers representing the bytes
const file = [0, 0, 0, 32, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115, 111, 50, 97, 118, 99, 49, 109, 112, 52, 49, ...]

const detectedFIle = fileTypeChecker.detectFile(file);

console.log(detectedFile)  // returns {
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

// File content as an array of numbers representing the bytes
const file = [71, 73, 70, 56, 57, 97, 56, 1, 56, 1, 247, 49, 0, 98, 57, 49, 57, 32, 32, 0, 8, 0, 57, 41, 32, 8, 0, 0, 57, 41, 41, 8, ...]

// A list of accepted image file types
const types = ["jpeg", "png", "gif"];

const isImage = fileTypeChecker.validateFileType(file, types);

console.log(isImage); // Returns true the file is an image from the accepted list
```

Validate file signature against a single file type:

```js
import fileTypeChecker from "file-type-checker";

// File content as an array of numbers representing the bytes
const file = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 5, 4, 0, 0, 10, 218, 8, 6, 0, 0, 0, 84, 226, 16, ...];

const isPNG = fileTypeChecker.isPNG(file);

console.log(isPNG); // Returns true if the file is a valid PNG image
```

### Browser (`React`, `Angular`, `Vanilla JS`, etc.):

Detect file by its signature:

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const detectedFIle = fileTypeChecker.detectFile(
        reader.result,
        { chunkSize: 32 }   // if you want to detect only images types - all images signatures exists in the first 32 bytes (optional parameter)
        );

        console.log(detectedFile)  // returns {
                                      "extension": "png",
                                      "mimeType": "image/png",
                                      "description": "PNG (Portable Network Graphics) is a lossless image compression format that supports a wide range of color depths and transparency and is widely used for high-quality graphics.",
                                      "signature": {
                                        "sequence": ["89","50","4e","47","d","a","1a","a"]
                                      }
                                    }
      };
      reader.readAsArrayBuffer(file); // use the FileReader API to read the file as an ArrayBuffer
      } catch(err) {
            console.error("Error: ", err.message);
    }
};
```

Validate file signature against a list if file types:

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    const types = ["jpeg", "png", "gif"];

    reader.onload = () => {
      const isImage = fileTypeChecker.validateFileType(
        reader.result,
        types,
        { chunkSize: 32 } // all images signatures exists in the first 32 bytes (optional parameter)
      );
      console.log(isImage); // Returns true if the file is an image from the accepted list
    };

    reader.readAsArrayBuffer(file); // use the FileReader API to read the file as an ArrayBuffer
  } catch (err) {
    console.error("Error: ", err.message);
  }
};
```

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    const types = ["mp4", "avi", "mov"];

    reader.onload = () => {
      const isVideo = fileTypeChecker.validateFileType(
        reader.result,
        types,
        { excludeSimilarTypes: true } // since we don't want to validate 'm4a' signature as 'mp4' type (optional parameter)
      );
      console.log(isVideo); // Returns true if the file is a video from the accepted list
    };

    reader.readAsArrayBuffer(file); // use the FileReader API to read the file as an ArrayBuffer
  } catch (err) {
    console.error("Error: ", err.message);
  }
};
```

Validate file signature against a single file type:

```js
import fileTypeChecker from "file-type-checker";

// Function to handle file input change
const handleFileInputChange = (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const isPNG = fileTypeChecker.isPNG(reader.result);
      console.log(isPNG); // Returns true if the file is a valid PNG image
    };

    reader.readAsArrayBuffer(file); // use the FileReader API to read the file as an ArrayBuffer
  } catch (err) {
    console.error("Error validating file type: ", err.message);
  }
};
```

## API

### fileTypeChecker.detectFile(file, options?)

Detect the file type of a given file.

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

### fileTypeChecker.validateFileType(file, types, options?)

Validates the requested file signature against a list of accepted file types.

Parameters:

- `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
- `types` : `Array<string>` - A list of accepted file types (from our [supported files](#supported-files)).
- `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:
  - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For compressed files, it is recommended to set this to 30,000 bytes. The default value is 64.
  - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. When validating a `m4a` file, the `aac` signature will be ignored. The default value is false.

Returns a `boolean` indicating whether the file is valid.

### Validator functions for a single file type:

All supported files have validator functions that determine if a given file matched the requested type signature.

- ### Image:

  - ### fileTypeChecker.isBMP(file)

    Checks whether a file is a BMP image by inspecting its file signature.

    Parameters:

    - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid BMP image.

  - ### fileTypeChecker.isBPG(file)

    Checks whether a file is a BPG image by inspecting its file signature.

    Parameters:

    - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid BPG image.

  - ### fileTypeChecker.isCR2(file)

    Checks whether a file is a CR2 image by inspecting its file signature.

    Parameters:

    - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid CR2 image.

  - ### fileTypeChecker.isEXR(file)

    Checks whether a file is a EXR image by inspecting its file signature.

    Parameters:

    - `file` : `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid EXR image.

  - ### fileTypeChecker.isGIF(file)

    Checks whether a file is a GIF image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid GIF image.

  - ### fileTypeChecker.isICO(file)

    Checks whether a file is an ICO image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns: a `boolean` - A boolean indicating whether the file is a valid ICO image.

  - ### fileTypeChecker.isJPEG(file)

    Checks whether a file is a JPEG image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid JPEG image.

  - ### fileTypeChecker.isPBM(file)

    Checks whether a file is a PBM image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PBM image.

  - ### fileTypeChecker.isPGM(file)

    Checks whether a file is a PGM image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PGM image.

  - ### fileTypeChecker.isPNG(file)

    Checks whether a file is a PNG image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PNG image.

  - ### fileTypeChecker.isPPM(file)

    Checks whether a file is a PPM image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PPM image.

  - ### fileTypeChecker.isPSD(file)

    Checks whether a file is a PSD image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PSD image.

  - ### fileTypeChecker.isTFF(file)

    Checks whether a file is a TFF image by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid TFF image.

- ### Video:

  - ### fileTypeChecker.isAVI(file)

    Checks whether a file is an AVI video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid AVI video.

  - ### fileTypeChecker.isBLEND(file)

    Checks whether a file is a BLEND video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid BLEND video.

  - ### fileTypeChecker.isFLV(file)

    Checks whether a file is a FLV video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid FLV video.

  - ### fileTypeChecker.isM4V(file)

    Checks whether a file is a M4V video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid M4v video.

  - ### fileTypeChecker.isMKV(file)

    Checks whether a file is a MKV video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid MKV video.

  - ### fileTypeChecker.isMOV(file)

    Checks whether a file is a MOV video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid MOV video.

  - ### fileTypeChecker.isMP4(file, options?)

    Checks whether a file is a MOV video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
    - `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:
      - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `mp4` file, the `m4v` signature will be ignored. The default value is false.

    Returns a `boolean` indicating whether the file is a valid MP4 video.

  - ### fileTypeChecker.isOGG(file)

    Checks whether a file is an OGG video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid OGG video.

  - ### fileTypeChecker.isSWF(file)

    Checks whether a file is a SWF video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid SWF video.

  - ### fileTypeChecker.isWEBM(file)

    Checks whether a file is a WEBM video file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid WEBM video.

- ### Audio:

  - ### fileTypeChecker.isAAC(file, options?)

    Checks whether a file is an AAC audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
    - `options` (optional) : `object` - An object that contains additional actions to perfoem on the file: - `excludeSimilarTypes` (optional) : `boolean` - Specifies whether to ignore signatures of similar file types during validation. When validating a `aac` file, the `m4a` signature will be ignored. The default value is false.

    Returns a `boolean` indicating whether the file is a valid AAC audio.

    - ### fileTypeChecker.isAMR(file)

    Checks whether a file is an AMR audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid AMR audio.

    - ### fileTypeChecker.isFLAC(file)

    Checks whether a file is a FLAC audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid FLAC audio.

  - ### fileTypeChecker.isM4A(file)

    Checks whether a file is a M4A audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid M4A audio.

  - ### fileTypeChecker.isMP3(file)

    Checks whether a file is a MP3 audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid MP3 audio.

  - ### fileTypeChecker.isWAV(file)

    Checks whether a file is a WAV audio file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

  Returns a `boolean` indicating whether the file is a valid WAV audio.

- ### Compressed:

  - ### fileTypeChecker.is7z(file)

    Checks whether a file is a 7z compressed archive by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

  Returns a `boolean` indicating whether the file is a valid 7z file.

  - ### fileTypeChecker.isLZH(file)

    Checks whether a file is a LZH compressed archive by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

  Returns a `boolean` indicating whether the file is a valid LZH file.

  - ### fileTypeChecker.isRAR(file)

    Checks whether a file is a RAR compressed archive by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid rar file.

  - ### fileTypeChecker.isZIP(file, options?)

    Checks whether a file is a ZIP compressed archive by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.
    - `options` (optional) : `object` - An object that contains additional actions to perfoem on the file:
      - `chunkSize` (optional) : `number` - Specifies the size of the file chunk to analyze, starting from the beginning of the file. For ZIP files, it is recommended to set this to 30,000 bytes. The default value is 64.

    Returns a `boolean` indicating whether the file is a valid zip file.

- ### Other:

  - ### fileTypeChecker.isELF(file)

    Checks whether a file is a ELF file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid ELF file.

  - ### fileTypeChecker.isINDD(file)

    Checks whether a file is an INDD file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content..

    Returns a `boolean` indicating whether the file is a valid INDD file.

  - ### fileTypeChecker.isPDF(file)

    Checks whether a file is a PDF file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PDF file.

  - ### fileTypeChecker.isPS(file)

    Checks whether a file is a PS file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid PS file.

  - ### fileTypeChecker.isRTF(file)

    Checks whether a file is a RTF file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid RTF file.

  - ### fileTypeChecker.isSQLITE(file)

    Checks whether a file is a SQLITE file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid SQLITE file.

  - ### fileTypeChecker.isSTL(file)

    Checks whether a file is a STL file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid STL file.

  - ### fileTypeChecker.isTTF(file)

    Checks whether a file is a TTF file by inspecting its file signature.

    Parameters:

    - `file`: `Array<number>`, `ArrayBuffer`, or `Uint8Array` - Binary data represents the file content.

    Returns a `boolean` indicating whether the file is a valid TTF file.

# License

[MIT](https://github.com/nir11/file-type-checker/blob/main/LICENSE)
