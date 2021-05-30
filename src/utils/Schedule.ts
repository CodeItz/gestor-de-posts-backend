import moment from "moment";
import { settingNumberLessThan10 } from "./Number";

const dateToScheduleDate = (date: moment.Moment) => {
  const year = date.year();
  const month = date.month() + 1; // No BR tem mais um
  const day = date.date();
  const hour = date.hour();
  const minute = date.minute();

  const scheduleDateCustom = [year, month, day, hour, minute].map((element) =>
    settingNumberLessThan10(element)
  );

  const scheduleDate = scheduleDateCustom.join(" ");
  return scheduleDate;
};

export { dateToScheduleDate };
