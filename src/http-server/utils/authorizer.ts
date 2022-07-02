import { Request, Response, NextFunction } from 'express'
import { jwtManager } from '../../websocket-server/utils/jwt-manager'

export function authorizer(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers['access_token'] as string
  if (!accessToken)
    res.status(401).send({ message: 'Access token not provided.' })
  const client = jwtManager.getPayload(accessToken)
  if (!client || !client.registry)
    res.status(401).send({ message: 'Invalid access token.' })
  req.headers['registry'] = client?.registry
  next()
}
