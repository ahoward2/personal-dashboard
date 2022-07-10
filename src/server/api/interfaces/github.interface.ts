export interface IGithubResponse {
  github: GithubAccount;
}

export interface GithubAccount {
  login: string;
  followers: number;
  public_repos: number;
  total_stars: number;
}
