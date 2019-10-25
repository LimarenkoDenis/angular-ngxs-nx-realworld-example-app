export class LoadArticle {
  static type = '[Article] Load Article';
  constructor(public slug: string) {}
}
