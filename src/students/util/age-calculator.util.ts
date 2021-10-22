export class AgeCalculator {
  calculate(dob: Date): number {
    const monthDifference: number = Date.now() - dob.getTime();
    const calculatedDifference: Date = new Date(monthDifference);
    const year: number = calculatedDifference.getUTCFullYear();
    return Math.abs(year - 1970);
  }
}
