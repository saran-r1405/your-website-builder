export type Book = {
  title: string;
  author: string;
  genre: string;
  pages: number;
  rating: number;
  match: number;
};

export const BOOKS: Book[] = [
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", pages: 658, rating: 4.7, match: 97 },
  { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", pages: 476, rating: 4.8, match: 96 },
  { title: "The Martian", author: "Andy Weir", genre: "Sci-Fi", pages: 384, rating: 4.6, match: 94 },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", genre: "Sci-Fi", pages: 320, rating: 4.1, match: 89 },
  { title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", pages: 304, rating: 4.3, match: 92 },
  { title: "The House in the Cerulean Sea", author: "TJ Klune", genre: "Fantasy", pages: 396, rating: 4.5, match: 93 },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", pages: 662, rating: 4.6, match: 91 },
  { title: "A Little Life", author: "Hanya Yanagihara", genre: "Fiction", pages: 720, rating: 4.4, match: 88 },
  { title: "Atomic Habits", author: "James Clear", genre: "Non-Fiction", pages: 320, rating: 4.8, match: 95 },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", pages: 498, rating: 4.6, match: 90 },
  { title: "Before the Coffee Gets Cold", author: "Toshikazu Kawaguchi", genre: "Fiction", pages: 213, rating: 4.0, match: 87 },
  { title: "Beach Read", author: "Emily Henry", genre: "Romance", pages: 374, rating: 4.2, match: 86 },
  { title: "Wintering", author: "Katherine May", genre: "Non-Fiction", pages: 256, rating: 4.1, match: 85 },
  { title: "Gone Girl", author: "Gillian Flynn", genre: "Mystery", pages: 415, rating: 4.4, match: 89 },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Mystery", pages: 336, rating: 4.3, match: 88 },
];

export function searchBooks(query: string, limit = 6): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return BOOKS.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q),
  ).slice(0, limit);
}

export function booksByGenre(genre: string): Book[] {
  return BOOKS.filter((b) => b.genre.toLowerCase() === genre.toLowerCase());
}

export const AI_SUGGESTIONS = [
  "sci-fi like Project Hail Mary but shorter",
  "cozy fantasy with found family",
  "non-fiction about habits and focus",
  "twisty mystery I can finish in a weekend",
];
