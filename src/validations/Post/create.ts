import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

const schema = Yup.object().shape({
  subClientId: Yup.string().required().min(3),
  photoURL: Yup.string().required().min(3),
  hourScheduled: Yup.string().required().min(5),
  description: Yup.string(),
  dateScheduled: Yup.date().required(),
});

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
}
