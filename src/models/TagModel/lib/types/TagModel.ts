export interface Tag {
  name: string
  code: string
}

export interface TagElement extends Tag {
  id: number
  createdAt: Date
}

export type TagCreated = Tag & {
  draft: boolean
}

export type TagEdit = Omit<Tag, 'code'> & Omit<TagElement, 'createdAt' | 'code'> & {
  draft: boolean
}

export type TagMode = 'name' | 'code'
