// Older documents predate the timestamps option on their schemas, so these
// fields can be missing. Calling .substring() on undefined took down whole
// screens, so date rendering always goes through these helpers.

export const formatDate = (value) =>
  typeof value === "string" ? value.substring(0, 10) : "-";

export const formatTime = (value) =>
  typeof value === "string" ? value.substring(11, 16) : "";
