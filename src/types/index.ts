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
  bodyIndex: number;
}

export interface Author {
  role: string;
  text: string;
}

export interface Currently {
  who: string;
  where: string;
  weather: string;
  doing: string;
}

export type BlockType = 'p' | 'h' | 'q';

export interface Block {
  type: BlockType;
  text: string;
}
