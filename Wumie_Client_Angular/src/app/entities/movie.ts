export class Movie {
  id: number;
  title: string;
  plot: string;
  releaseDate: Date;
  runtime: number;
  genre: Genre;
  language: Language;
  boxOffice: number;
  actorsCount: number;
  watched: boolean;
}

export enum Genre {
  Action,
  Adventure,
  Comedy,
  Drama,
  Horror,
  'Science Fiction',
  Historical,
  Musical,
  Western
}

export enum Language {
  English,
  Spanish,
  French,
  Romanian
}
