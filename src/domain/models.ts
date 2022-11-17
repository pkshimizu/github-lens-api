import { DateTime } from './values';

export type GitHubUser = {
  login: string;
  avatarUrl: string;
  name: string;
  email: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type User = {
  id: number;
  uid: string;
  name: string;
  email: string;
  githubLoginId: string;
  avatarUrl: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};
