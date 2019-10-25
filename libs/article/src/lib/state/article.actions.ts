export class LoadArticle {
  static type = '[Article] Load Article';
  constructor(public slug: string) {}
}

export class LoadComments {
  static type = '[article] LOAD_COMMENTS';  // rename after side effects [Article] Load Article Comments
  constructor(public slug: string) {}
}
