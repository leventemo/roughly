export class Validators {
  // validation for Firefox & Safari: can't use non-numeric characters comma for floats
  public static isValidForNonNumeric(inputValue: string): boolean {
    if (!/[-+]?[0-9]*\.?[0-9]+/.test(inputValue)) {
      return false;
    }
    return true;
  }

  // validation: can't be equal to the other input value
  public static isValidForEqualValues([inputValueA, inpitValueB]: string[], [starterPlayer, assumedPlayer]: string[]): boolean {
    if (inputValueA === inpitValueB && starterPlayer === assumedPlayer) {
      return false;
    }
    return true;
  }
}
