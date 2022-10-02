import { rest } from "msw";
import detailsMockData from "./data/details.json";

export const handlers = [
  rest.get("/api/details", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(detailsMockData));
  }),
];
