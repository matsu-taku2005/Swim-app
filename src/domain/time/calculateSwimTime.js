export function calculateSwimTime({ arrivalElapsedMs, departureElapsedMs }) {
  if (
    !Number.isFinite(arrivalElapsedMs) ||
    !Number.isFinite(departureElapsedMs)
  ) {
    throw new TypeError(
      "arrivalElapsedMs and departureElapsedMs must be finite numbers",
    );
  }

  if (arrivalElapsedMs < departureElapsedMs) {
    throw new RangeError(
      "arrivalElapsedMs must be greater than or equal to departureElapsedMs",
    );
  }

  if (arrivalElapsedMs < 0 || departureElapsedMs < 0) {
    throw new RangeError(
      "arrivalElapsedMs and departureElapsedMs must be non-negative",
    );
  }

  return arrivalElapsedMs - departureElapsedMs;
}
