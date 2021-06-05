import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import moment from "moment";
import { createSchedule } from "./controllers/Schedule";
import { dateToScheduleDate } from "./utils/Schedule";

import routes from "./routes";
const port = process.env.PORT || 3333;
const app = express();

dotenv.config();

const databaseURL = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@dev.gjyze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

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
