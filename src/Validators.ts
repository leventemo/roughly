import { Utils } from "./Utils";

export class Validators {
  // validation for Firefox & Safari: can't use non-numeric characters comma for floats
  public static validateForNonNumeric(inputValue: string): boolean {
    if (!/[-+]?[0-9]*\.?[0-9]+/.test(inputValue)) {
      return true;
    }
    return false;
  }

  // validation: can't be equal to the other input value
  public static validateForEqualValues([inputValueA, inpitValueB]: string[], [starterPlayer, assumedPlayer]: string[]): boolean {
    if (inputValueA === inpitValueB && starterPlayer === assumedPlayer) {
      return true;
    }
    return false;
  }
}
