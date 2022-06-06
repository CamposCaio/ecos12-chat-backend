import { NextFunction, Request, Response } from 'express'

export function route(
  route: (req: Request) => Promise<any>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  route(req)
    .then((data) => res.json(data))
    .catch((err) => {
      err instanceof Error &&
        res.status(400).json({ statusCode: 400, description: err.message })
      next(err)
    })
}
