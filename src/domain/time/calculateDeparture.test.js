import { describe, expect, test } from "vitest";

import { calculateDeparture } from "./calculateDeparture.js";

describe("calculateDeparture", () => {
  const validInput = {
    setStartElapsedMs: 0,
    roundIndex: 0,
    cycleMs: 60_000,
    orderIndex: 0,
    startIntervalMs: 5_000,
  };

  test("1本目の2番目の選手はセット開始から5秒後に出発する", () => {
    const result = calculateDeparture({
      setStartElapsedMs: 0,
      roundIndex: 0,
      cycleMs: 60_000,
      orderIndex: 1,
      startIntervalMs: 5_000,
    });

    expect(result).toBe(5_000);
  });

  test.each([
    ["1本目・1番目", 0, 0, 60_000, 0, 5_000, 0],
    ["1本目・4番目", 0, 0, 60_000, 3, 5_000, 15_000],
    ["2本目・1番目", 0, 1, 60_000, 0, 5_000, 60_000],
    ["2本目・2番目", 0, 1, 60_000, 1, 5_000, 65_000],
    ["開始30秒・2本目・3番目", 30_000, 1, 90_000, 2, 10_000, 140_000],
  ])(
    "%sの予定出発時刻を計算する",
    (
      _caseName,
      setStartElapsedMs,
      roundIndex,
      cycleMs,
      orderIndex,
      startIntervalMs,
      expectedDepartureMs,
    ) => {
      const result = calculateDeparture({
        setStartElapsedMs,
        roundIndex,
        cycleMs,
        orderIndex,
        startIntervalMs,
      });

      expect(result).toBe(expectedDepartureMs);
    },
  );

  test.each([
    ["セット開始時刻が未定義", { setStartElapsedMs: undefined }],
    ["ラウンド番号がNaN", { roundIndex: Number.NaN }],
    ["サークルが文字列", { cycleMs: "60000" }],
    ["泳順番号がInfinity", { orderIndex: Number.POSITIVE_INFINITY }],
    ["選手間隔がNaN", { startIntervalMs: Number.NaN }],
  ])("%sならTypeErrorを投げる", (_caseName, invalidPart) => {
    expect(() =>
      calculateDeparture({
        ...validInput,
        ...invalidPart,
      }),
    ).toThrow(TypeError);
  });
});
