import timexe from "timexe";

const createSchedule = (scheduleDate: string, callback: any) => {
  return timexe(scheduleDate, callback);
};

const removeSchedule = (id: number) => {
  return timexe.remove(id);
};

export { createSchedule, removeSchedule };
