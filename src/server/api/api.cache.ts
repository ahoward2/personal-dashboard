import { Request, Response } from "express";
import { Logger } from "@nestjs/common";

// Create new NestJS logger
const logger = new Logger("DETAIL_ROUTE");

export type CacheObject = {
  key: any;
  ttl: number;
  startTime: number;
  cacheSetOnce: boolean;
  data: Object;
};

const cache: CacheObject[] = [];

/**
 * Cache adapter to use handler function in.
 * Must have reference to a cache array.
 * @param req Express request.
 * @param res Express response.
 */
export async function useCache(
  req: Request,
  res: Response,
  handler: (req: Request, res: Response) => any
) {
  let targetCacheObject;

  if (
    cache.length === 0 ||
    cache.find((cacheobj) => cacheobj.key === req.url) === undefined
  ) {
    targetCacheObject = {
      key: req.url,
      // Seconds (1/2 day).
      ttl: 43200,
      // Should be refreshed every time the cache entry is set.
      startTime: Date.now(),
      // Boolean for first time cache is set.
      cacheSetOnce: false,
      // Data object for the cached values and their keys.
      data: {},
    };
    cache.push(targetCacheObject);
  } else {
    targetCacheObject = cache.find((cacheobj) => cacheobj.key === req.url);
  }
  const timePassed = Date.now() - targetCacheObject.startTime;
  if (
    Math.floor(timePassed / 1000) >= targetCacheObject.ttl ||
    targetCacheObject.cacheSetOnce === false
  ) {
    logger.log(`Value set to cache: ${targetCacheObject.key}`);
    const data = await handler(req, res);
    targetCacheObject.data = data;
    targetCacheObject.startTime = Date.now();
    targetCacheObject.cacheSetOnce = true;
  } else {
    logger.log(`Value pulled from cache: ${targetCacheObject.key}`);
  }
  res.json(targetCacheObject.data);
}
