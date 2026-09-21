import { laneAssignments } from "../fixtures/laneAssignments.js";

export const scenario100Config = Object.freeze({
  eventCount: 100,
  slotsPerLane: 40,
  cycleMs: 60_000,
  startIntervalMs: 5_000,
  baseSwimTimeMs: 55_000,
});

function createLaneEvents({ laneNumber, athleteIds }) {
  return Array.from(
    { length: scenario100Config.slotsPerLane },
    (_, laneSlotIndex) => {
      const athleteIndex = laneSlotIndex % athleteIds.length;
      const roundIndex = Math.floor(laneSlotIndex / athleteIds.length);

      const departureElapsedMs =
        roundIndex * scenario100Config.cycleMs +
        athleteIndex * scenario100Config.startIntervalMs;

      const expectedSwimTimeMs =
        scenario100Config.baseSwimTimeMs +
        ((laneSlotIndex + laneNumber - 1) % 10) * 100;

      return {
        laneNumber,
        laneSlotIndex,
        athleteId: athleteIds[athleteIndex],
        roundNumber: roundIndex + 1,
        departureElapsedMs,
        arrivalElapsedMs: departureElapsedMs + expectedSwimTimeMs,
        expectedSwimTimeMs,
      };
    },
  );
}

export const scenario100 = laneAssignments
  .flatMap(createLaneEvents)
  .sort(
    (first, second) =>
      first.arrivalElapsedMs - second.arrivalElapsedMs ||
      first.laneNumber - second.laneNumber,
  )
  .slice(0, scenario100Config.eventCount)
  .map((event, index) => ({
    eventId: `event-${String(index + 1).padStart(3, "0")}`,
    ...event,
  }));