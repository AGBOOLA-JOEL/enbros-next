export type Author = {
  id: string;
  username: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  desc: string;
  tags: string[];
  author: Author;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
