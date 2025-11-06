export type PeselParseResult = {
  valid: boolean;
  reason?: string;
  birthDate?: Date;
  gender?: "male" | "female";
};

const DIGITS_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

export function validatePesel(pesel: string): PeselParseResult {
  if (!/^\d{11}$/.test(pesel))
    return {
      valid: false,
      reason: "PESEL niepoprawny! Musi składać się z 11 cyfr",
    };

  const digits = pesel.split("").map((d) => parseInt(d, 10));

  const sum = DIGITS_WEIGHTS.reduce(
    (acc, weight, i) => acc + weight * digits[i],
    0
  );
  const checkDigit = (10 - (sum % 10)) % 10;
  if (checkDigit !== digits[10])
    return {
      valid: false,
      reason:
        "PESEL nieprawidłowy! Cyfra kontrolna wskazuje, że w numerze PESEL jest błąd",
    };

  const yy = parseInt(pesel.slice(0, 2), 10);
  let mm = parseInt(pesel.slice(2, 4), 10);
  const dd = parseInt(pesel.slice(4, 6), 10);

  let year: number;
  if (mm >= 1 && mm <= 12) {
    year = 1900 + yy;
  } else if (mm >= 21 && mm <= 32) {
    year = 2000 + yy;
    mm -= 20;
  } else if (mm >= 41 && mm <= 52) {
    year = 2100 + yy;
    mm -= 40;
  } else if (mm >= 61 && mm <= 72) {
    year = 2200 + yy;
    mm -= 60;
  } else if (mm >= 81 && mm <= 92) {
    year = 1800 + yy;
    mm -= 80;
  } else {
    return { valid: false, reason: "PESEL nieprawidłowy! Niepoprawny miesiąc" };
  }

  if (mm < 1 || mm > 12)
    return { valid: false, reason: "PESEL nieprawidłowy! Niepoprawny miesiąc" };

  const monthLength = new Date(year, mm, 0).getUTCDate();

  if (dd < 1 || dd > monthLength)
    return { valid: false, reason: "PESEL nieprawidłowy! Niepoprawny dzień" };

  const birthDate = new Date(Date.UTC(year, mm - 1, dd));

  console.log(birthDate);

  if (birthDate > new Date()) {
    return {
      valid: false,
      reason: "PESEL nieprawidłowy! Data urodzenia nie może być w przyszłości",
    };
  }

  const gender = digits[9] % 2 === 1 ? "male" : "female";

  return { valid: true, birthDate, gender };
}
