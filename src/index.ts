import * as detectionFunctions from "./detection";
import * as validationFunctions from "./validation";

const fileTypeChecker = {
  ...detectionFunctions,
  ...validationFunctions,
};

export = fileTypeChecker;
