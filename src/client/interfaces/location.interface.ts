import { MakeGenerics } from "@tanstack/react-location";
import { Github } from "../../shared/interfaces/github.interface";
import { Gitlab } from "../../shared/interfaces/gitlab.interface";
import { Twitter } from "../../shared/interfaces/twitter.interface";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    data: {
      github?: Github;
      gitlab?: Gitlab;
      twitter?: Twitter;
    };
    error: {
      message: string;
      response: {
        status: number;
      };
    };
  };
  Search: {
    github: string;
    gitlab: string;
    twitter: string;
  };
}>;
