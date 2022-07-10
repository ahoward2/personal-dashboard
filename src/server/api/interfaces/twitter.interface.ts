export interface ITwitterResponse {
  twitter: Twitter;
}

export interface Twitter {
  username: string;
  followers_count: number;
  total_likes: number;
  total_retweets: number;
  total_replies: number;
  timeline_items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  public_metrics: PublicMetrics;
  text: string;
}

export interface PublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}
