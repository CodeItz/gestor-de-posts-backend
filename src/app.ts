import express from "express";
import moment from "moment";
import { createSchedule } from "./controllers/Schedule";
import { dateToScheduleDate } from "./utils/Schedule";

const port = process.env.PORT || 3333;
const app = express();

app.listen(port, () => {
  console.log(`O servidor está escutando na porta ${port}`);
  //exemplaAgendamento();
});

function exemplaAgendamento() {
  const dateBD = "2021-05-30";
  const hourBD = "18:57";
  const [hour, minute] = hourBD.split(":");

  const date = moment(dateBD);

  date.hour(Number(hour));
  date.minute(Number(minute));

  const dateSchedule = dateToScheduleDate(date);

  const cron = createSchedule(dateSchedule, () =>
    console.log("hehehe deu bom CJ")
  );

  console.log(cron);
}
