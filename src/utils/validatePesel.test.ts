import { describe, it, expect } from "vitest";
import { validatePesel } from "./validatePesel";

describe("validatePesel - basic cases", () => {
  it("accepts a known valid PESEL (example)", () => {
    const res = validatePesel("44051401359");
    expect(res.valid).toBe(true);
    expect(res.birthDate).toBeDefined();

    if (res.birthDate) {
      expect(res.birthDate.toISOString().slice(0, 10)).toBe("1944-05-14");
    }

    expect(res.gender).toBe("male");
  });

  it("rejects wrong length (not 11 digits)", () => {
    expect(validatePesel("123").valid).toBe(false);
    expect(validatePesel("1234567890").valid).toBe(false);
    expect(validatePesel("123456789012").valid).toBe(false);
  });

  it("rejects input containing non-digit characters", () => {
    expect(validatePesel("abcdefghijk").valid).toBe(false);
    expect(validatePesel("44051401A58").valid).toBe(false);
  });

  it("rejects invalid checksum", () => {
    const res = validatePesel("44051401358");
    expect(res.valid).toBe(false);
    expect(res.reason).toContain("Cyfra kontrolna");
  });
});
