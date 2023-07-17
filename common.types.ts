import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    genre: string;
    episode: string;
    liveSiteUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    genre: string;
    episode: string;
    liveSiteUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}



export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    category: {
      edges: { node: CategoryInterface }[];
    };
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}



export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  genre: string;
  episode: string;
  liveSiteUrl: string;
  category: string;
}


export interface CategoryForm {
  title: string;
  description: string;
}

export interface CategoryInterface {
  id:string;
  title: string;
  description: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}