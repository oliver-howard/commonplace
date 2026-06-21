import type { Post } from '../types';

export const POSTS: Post[] = [
  { id: 'leaving-city', category: 'Updates', title: 'On Leaving the City for a While', deck: 'I traded the noise for a town with one good bakery and far too much sky.', author: 'Mara Lindqvist', initials: 'ML', date: 'May 28, 2026', read: '7 min', bodyIndex: 0 },
  { id: 'inbox-zero', category: 'Opinions', title: 'The Case Against Inbox Zero', deck: 'A tidy inbox is not the same as a life in order. I checked.', author: 'Devon Okafor', initials: 'DO', date: 'May 24, 2026', read: '5 min', bodyIndex: 1 },
  { id: 'tide-pools', category: 'Ponderings', title: 'What the Tide Pools Taught Me', deck: 'Everything interesting was hiding, and only the patient ever got to see it.', author: 'Priya Nair', initials: 'PN', date: 'May 19, 2026', read: '6 min', bodyIndex: 2 },
  { id: 'smaller-things', category: 'Updates', title: 'A Year of Saying Yes to Smaller Things', deck: 'No grand resolutions. Just a hundred tiny doors left open.', author: 'June Park', initials: 'JP', date: 'May 14, 2026', read: '8 min', bodyIndex: 0 },
  { id: 'long-walk', category: 'Ponderings', title: 'In Defense of the Long Walk', deck: 'The problem was never my legs. It was that I kept arriving.', author: 'Theo Almeida', initials: 'TA', date: 'May 9, 2026', read: '4 min', bodyIndex: 2 },
  { id: 'not-behind', category: 'Opinions', title: 'We Are Not Behind', deck: 'On the quiet tyranny of the timeline everyone else seems to be on.', author: 'Mara Lindqvist', initials: 'ML', date: 'May 3, 2026', read: '9 min', bodyIndex: 1 },
  { id: 'march-rain', category: 'Field Notes', title: 'Field Notes: March, Mostly Rain', deck: 'A month measured in puddles, library books, and reheated coffee.', author: 'Devon Okafor', initials: 'DO', date: 'Apr 28, 2026', read: '5 min', bodyIndex: 2 },
  { id: 'letters', category: 'Ponderings', title: "Letters I Didn't Send", deck: 'A drawer full of almosts, and what they turned out to mean.', author: 'Priya Nair', initials: 'PN', date: 'Apr 22, 2026', read: '6 min', bodyIndex: 0 },
  { id: 'quiet-apartment', category: 'Updates', title: 'The Apartment Is Finally Quiet', deck: 'The boxes are gone. So is the person who packed half of them.', author: 'June Park', initials: 'JP', date: 'Apr 16, 2026', read: '7 min', bodyIndex: 1 },
];

export const CATEGORIES = ['All', 'Updates', 'Ponderings', 'Opinions', 'Field Notes'] as const;
