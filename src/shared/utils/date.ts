import moment from "moment";

export function formatDMMMYYYY(isoDay: string) {
  return moment(isoDay).format("D, MMM YYYY");
}
