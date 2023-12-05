import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DataChartService from "../../services/DataChartService";
import DataChart from "../../repos/implementation/dataChart";
import { checkSchema, matchedData } from "express-validator";
import { countProps } from "../../repos/dataProcessRepo";
import validationMiddleware from "../../util/validationMiddleware";

const chartData = Router();

const chartRepo = new DataChart();
const chartService = new DataChartService(chartRepo);

chartData.get(
  "/",
  checkSchema({
    groupBy: {
      in: "body",
      optional: true,
      custom: {
        options: (value) => {
          if (Array.isArray(value)) {
            const allIn = value.reduce((prev, current) => {
              return prev && countProps.includes(current);
            }, true);

            return allIn;
          }

          return countProps.includes(value);
        },
      },
    },
    size: {
      in: ["query"],
      isInt: {
        options: {
          gt: -1,
        },
      },
      optional: true,
    },
  }),
  validationMiddleware(),
  (req: Request, res: Response) => {
    const { groupBy } = matchedData(req);
    chartService.getChartData({ category: groupBy }, (err, data) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: true,
          msg: err.message || "Erro desconhecido!",
        });
      }

      return res.status(StatusCodes.OK).json(data);
    });
  }
);

export default chartData;
