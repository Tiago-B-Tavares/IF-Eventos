import { Request, Response, NextFunction } from 'express';

export const logRequestData = (req: Request, res: Response, next: NextFunction) => {


  console.log('Cabeçalhos:', req.headers);
  console.log('Parâmetros:', req.params);
  console.log('Query:', req.query);
  console.log('Body:', req.body);


  next();
};