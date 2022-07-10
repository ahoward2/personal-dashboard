import { Request, Response } from "express";
import { Logger } from "@nestjs/common";

// Create new NestJS loggers
const routeLogger = new Logger("DETAIL_ROUTE");
const cleanupLogger = new Logger("DETAIL_CLEANUP");

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type CacheObject = {
  key: any;
  ttl: number;
  startTime: number;
  cacheSetOnce: boolean;
  data: JSONValue;
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
  handler: (req: Request, res: Response) => Promise<any>
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
    routeLogger.log(`Value set to cache: ${targetCacheObject.key}`);
    const data = await handler(req, res);
    targetCacheObject.data = data;
    targetCacheObject.startTime = Date.now();
    targetCacheObject.cacheSetOnce = true;
  } else {
    routeLogger.log(`Value pulled from cache: ${targetCacheObject.key}`);
  }
  res.json(targetCacheObject.data);
}

/**
 * Cleans up the cache based on the time passed since the cache entry was set.
 * This will ideally ensure that memory is not being used up for old / unused cache entries.
 * @param ttlDelta Time past cache ttl in ms to be eligible for cleanup.
 */
export async function cleanCache(ttlDelta: number) {
  try {
    const cacheToRemove = cache.filter(
      (cacheobj) =>
        Math.floor(Date.now() - cacheobj.startTime) >= cacheobj.ttl + ttlDelta
    );

    cacheToRemove.forEach((cacheobj) => {
      cleanupLogger.log(`Removing cache entry: ${cacheobj.key}`);
      cache.splice(cache.indexOf(cacheobj), 1);
    });
  } catch (error) {
    console.error(error);
  }
}
