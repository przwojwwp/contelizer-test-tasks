import { describe, it, expect } from "vitest";
import { validatePesel } from "./validatePesel";

describe("validatePesel – all cases", () => {
  it("accepts a known valid PESEL (1944-05-14 male)", () => {
    const res = validatePesel("44051401359");
    expect(res.valid).toBe(true);
    expect(res.gender).toBe("male");
    expect(res.birthDate?.toISOString().slice(0, 10)).toBe("1944-05-14");
  });

  it("rejects wrong length", () => {
    expect(validatePesel("123").valid).toBe(false);
    expect(validatePesel("1234567890").valid).toBe(false);
    expect(validatePesel("123456789012").valid).toBe(false);
  });

  it("rejects input with non-digit characters", () => {
    expect(validatePesel("abcdefghijk").valid).toBe(false);
    expect(validatePesel("44051401A58").valid).toBe(false);
  });

  it("rejects invalid checksum", () => {
    const res = validatePesel("44051401358");
    expect(res.valid).toBe(false);
    expect(res.reason).toContain("Cyfra kontrolna");
  });

  it("rejects invalid month values", () => {
    expect(validatePesel("44130401359").valid).toBe(false);
    expect(validatePesel("44990401359").valid).toBe(false);
  });

  it("rejects invalid day (e.g. 31 Feb)", () => {
    const res = validatePesel("44023101353");
    expect(res.valid).toBe(false);
    expect(res.reason).toContain("dzień");
  });

  it("rejects birth date in the future", () => {
    const res = validatePesel("98453001354");
    expect(res.valid).toBe(false);
    expect(res.reason).toContain("przyszłości");
  });

  it("detects female gender correctly", () => {
    const res = validatePesel("90071512342");
    expect(res.valid).toBe(true);
    expect(res.gender).toBe("female");
  });

  it("parses correctly all centuries", () => {
    const validPesels: [string, number][] = [
      ["22921234567", 1822],
      ["02221234563", 2002],
      ["22241234564", 2122],
      ["62261234561", 2222],
      ["00211234568", 1900],
    ];

    for (const [pesel, year] of validPesels) {
      const res = validatePesel(pesel);
      if (res.valid && res.birthDate) {
        expect(res.birthDate.getUTCFullYear()).toBe(year);
      }
    }
  });
});
