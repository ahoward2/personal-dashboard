import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { cleanCache } from "./api.cache";

@Injectable()
export class ApiService {
  constructor() {}

  // Run every day a 1:00 AM EST.
  @Cron("0 0 1 * * *", {
    timeZone: "America/New_York",
  })
  async runCacheJob() {
    // If cached objects are 1/2 day older than the set TTL, clean them.
    return cleanCache(43200);
  }
}
