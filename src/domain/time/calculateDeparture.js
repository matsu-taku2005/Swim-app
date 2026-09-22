export function calculateDeparture({
  setStartElapsedMs,
  roundIndex,
  cycleMs,
  orderIndex,
  startIntervalMs,
}) {
  const numericInputs = [
    setStartElapsedMs,
    roundIndex,
    cycleMs,
    orderIndex,
    startIntervalMs,
  ];
  if (!numericInputs.every((value) => Number.isFinite(value))) {
    throw new TypeError("calculateDeparture inputs must be finite numbers");
  }
  return (
    setStartElapsedMs + roundIndex * cycleMs + orderIndex * startIntervalMs
  );
}
