export interface IGitlabResponse {
  gitlab: Gitlab;
}

export interface Gitlab {
  username: string;
  followers: number;
  public_repos: number;
  total_stars: number;
}
