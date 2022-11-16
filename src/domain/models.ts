import {DateTime} from "./values";

export type GitHubUser = {
  login: string
  avatar_url: string
  name: string
  email: string
  created_at: DateTime
  updated_at: DateTime
}
