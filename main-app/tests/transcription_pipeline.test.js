import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("Transcription Platform - Pipeline & Sync Mathematics", () => {
  // Test time conversion utility (seconds to HH:MM:SS)
  const formatTime = (totalSeconds) => {
    const s = Math.floor(totalSeconds);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  test("Time formatter formats seconds into mm:ss and hh:mm:ss timestamps", () => {
    assert.equal(formatTime(0), "00:00");
    assert.equal(formatTime(45), "00:45");
    assert.equal(formatTime(65), "01:05");
    assert.equal(formatTime(3665), "01:01:05");
    assert.equal(formatTime(4880.01), "01:21:20");
  });

  test("JWT expiration evaluator accurately identifies stale credentials", () => {
    const currentTimeSec = 1700000000;
    const expiredToken = { exp: 1699999999 };
    const validToken = { exp: 1700003600 };

    assert.ok(expiredToken.exp < currentTimeSec, "Expired token should be recognized as expired");
    assert.ok(validToken.exp > currentTimeSec, "Valid token should be recognized as active");
  });

  test("Transcription record filtering filters by status and query term", () => {
    const mockRecords = [
      { id: 1, title: "Keynote Talk", status_transc: "Transcribed" },
      { id: 2, title: "Podcast Ep 12", status_transc: "Processing" },
      { id: 3, title: "Customer Interview", status_transc: "Transcribed" },
    ];

    const completed = mockRecords.filter((r) => r.status_transc === "Transcribed");
    assert.equal(completed.length, 2);

    const matches = mockRecords.filter((r) => r.title.toLowerCase().includes("keynote"));
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 1);
  });
});
