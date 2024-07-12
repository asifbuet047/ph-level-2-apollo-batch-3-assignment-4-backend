import { NextFunction, Request, Response } from "express";
import formidable from "formidable";

export const parseImageFile = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    const form = new formidable.IncomingForm();
    form.parse(request, (error, fields, files) => {
      if (error) {
        console.log(error);
        next(error);
      } else {
        console.log(files);
        next();
      }
    });
  };
};
