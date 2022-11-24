export interface PostT {
  id: number;
  creationTime: string;
  title: string;
  content: string;
  user: UserT;
  comments: CommentT[];
  likes: Like[];
  dislikes: Dislike[];
}

export interface CommentT {
  id: number;
  creationTime: string;
  content: string;
  post: PostT;
  user: UserT;
  comments: CommentT[];
}

export interface UserT {
  id: number;
  username: string;
}

export interface Like {
  id: number;
  creationTime: string;
  user: UserT;
  post: PostT;
}

export interface Dislike {
  id: number;
  creationTime: string;
  user: UserT;
  post: PostT;
}


