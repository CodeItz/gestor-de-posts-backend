import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required().min(3),
  auth: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(3),
  }),
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
