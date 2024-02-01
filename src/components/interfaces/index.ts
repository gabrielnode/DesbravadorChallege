export interface Repository {
    id: number;
    name: string;
    stargazers_count: number;
    description: string;
    created_at: string;
    clone_url: string;

  }
  
  export interface User {
    name: string;
    avatar_url: string;
    login: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
  }
  