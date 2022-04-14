import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  const apiKey = req.headers;
  const cardType = req.body.type;
  const employeeCpf = req.body.employeeCpf;

  if (
    cardType !== "groceries" &&
    cardType !== "restaurants" &&
    cardType !== "transport" &&
    cardType !== "education" &&
    cardType !== "health"
  ) {
    return res.status(422).send("Card type not valid");
  }

  //ver se existe uma empresa com essa api key
  //ver se a apiKey eh da mesma empresa q o emplyeeCpf
  return;
}
