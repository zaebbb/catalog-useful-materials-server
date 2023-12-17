declare type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

interface SelectItem {
  content: string
  code: string
  id: number
}

type SelectItems = SelectItem[]
