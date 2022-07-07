export class ArticleOption {
  id: string
  title: string
  summary: string
  constructor (id: string, title: string, summary?: string) {
    this.id = id ?? 'default_id'
    this.title = title ?? 'default_title'
    this.summary = summary ?? ''
  }
}