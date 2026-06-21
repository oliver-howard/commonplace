export type Theme = 'light' | 'dark';
export type Screen = 'home' | 'article';

export interface Post {
  id: string;
  category: string;
  title: string;
  deck: string;
  author: string;
  initials: string;
  date: string;
  read: string;
  coverImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}
