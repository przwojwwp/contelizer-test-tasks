export type PeselParseResult = {
  valid: boolean;
  reason?: string;
  birthDate?: Date;
  gender?: "male" | "female";
};

const DIGITS_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

export function validatePesel(pesel: string): PeselParseResult {
  if (!/^\d{11}$/.test(pesel)) {
    return { valid: false, reason: "PESEL musi zawierać dokładnie 11 cyfr" };
  }

  const digits = pesel.split("").map(Number);
  const sum = DIGITS_WEIGHTS.reduce(
    (acc, weight, i) => acc + weight * digits[i],
    0
  );
  const checkDigit = (10 - (sum % 10)) % 10;
  if (checkDigit !== digits[10]) {
    return {
      valid: false,
      reason: "PESEL nieprawidłowy! (Nieprawidłowa cyfra kontrolna)",
    };
  }

  const yy = parseInt(pesel.slice(0, 2));
  let mm = parseInt(pesel.slice(2, 4));
  const dd = parseInt(pesel.slice(4, 6));
  const year = 1900 + yy;

  if (mm > 20) mm -= 20;

  const birthDate = new Date(year, mm - 1, dd);
  const gender = digits[9] % 2 === 1 ? "male" : "female";

  return { valid: true, birthDate, gender };
}
