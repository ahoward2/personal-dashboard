export interface IGithubResponse {
  github: Github;
}

export interface Github {
  login: string;
  followers: number;
  public_repos: number;
  total_stars: number;
}
