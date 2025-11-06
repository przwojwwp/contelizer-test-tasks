export type PeselParseResult = {
  valid: boolean;
  reason?: string;
};

export function validatePesel(pesel: string): PeselParseResult {
  if (!/^\d{11}$/.test(pesel)) {
    return { valid: false, reason: "PESEL musi zawierać dokładnie 11 cyfr" };
  }

  console.log("validatePesel called with:", pesel);
  return { valid: true };
}
