import { describe, expect, test } from "vitest";
import { scenario100 } from "@/test/scenarios/scenario100.js";
import { calculateSwimTime } from "./calculateSwimTime.js";

describe("calculateSwimTime", () => {
  test("到着経過時刻から予定出発経過時刻を引く", () => {
    const result = calculateSwimTime({
      arrivalElapsedMs: 65_000,
      departureElapsedMs: 10_000,
    });

    expect(result).toBe(55_000);
  });

  test.each([
    ["予定出発が0ms", 55_000, 0, 55_000],
    ["到着と出発が同時", 10_000, 10_000, 0],
    ["1分を超えるタイム", 125_000, 60_000, 65_000],
  ])(
    "%s",
    (_caseName, arrivalElapsedMs, departureElapsedMs, expectedSwimTimeMs) => {
      const result = calculateSwimTime({
        arrivalElapsedMs,
        departureElapsedMs,
      });

      expect(result).toBe(expectedSwimTimeMs);
    },
  );

  test.each(scenario100.map((event) => [event.eventId, event]))(
    "%sのタイムを正しく計算する",
    (_eventId, event) => {
      const result = calculateSwimTime({
        arrivalElapsedMs: event.arrivalElapsedMs,
        departureElapsedMs: event.departureElapsedMs,
      });

      expect(result).toBe(event.expectedSwimTimeMs);
    },
  );

  test("到着時刻が予定出発時刻より前ならRangeErrorを投げる", () => {
    expect(() =>
      calculateSwimTime({
        arrivalElapsedMs: 9_000,
        departureElapsedMs: 10_000,
      }),
    ).toThrow(RangeError);
  });

  test.each([
    ["到着時刻が文字列", "65000", 10_000],
    ["予定出発時刻が未定義", 65_000, undefined],
    ["到着時刻がNaN", Number.NaN, 10_000],
    ["予定出発時刻がInfinity", 65_000, Number.POSITIVE_INFINITY],
  ])(
    "%sならTypeErrorを投げる",
    (_caseName, arrivalElapsedMs, departureElapsedMs) => {
      expect(() =>
        calculateSwimTime({
          arrivalElapsedMs,
          departureElapsedMs,
        }),
      ).toThrow(TypeError);
    },
  );

  test.each([
    ["到着時刻が負数", -1, 0],
    ["予定出発時刻が負数", 0, -1],
    ["両方の時刻が負数", -1_000, -2_000],
  ])(
    "%sならRangeErrorを投げる",
    (_caseName, arrivalElapsedMs, departureElapsedMs) => {
      expect(() =>
        calculateSwimTime({
          arrivalElapsedMs,
          departureElapsedMs,
        }),
      ).toThrow(RangeError);
    },
  );
});
