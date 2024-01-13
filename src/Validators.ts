export class Validators {
  // validation for Firefox & Safari: can't use non-numeric characters comma for floats
  public static isInvalidForNonNumeric(inputValue: string): boolean {
    if (!/[-+]?[0-9]*\.?[0-9]+/.test(inputValue)) {
      return true;
    }
    return false;
  }

  // validation: can't be equal to the other input value
  public static isInvalidForEqualValues([inputValueA, inpitValueB]: string[], [starterPlayer, assumedPlayer]: string[]): boolean {
    if (inputValueA === inpitValueB && starterPlayer === assumedPlayer) {
      return true;
    }
    return false;
  }
}
