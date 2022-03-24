import { Application, Request, Response } from "express";

import CoursesData from "../../data/courses.json";
import sequelize from "../db_sequelize"

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
};



