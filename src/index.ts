import * as validatorsFunctions from "./validation";
import * as infoFunctions from "./detection";

const fileTypeChecker = {
  ...validatorsFunctions,
  ...infoFunctions,
};
export default fileTypeChecker;
