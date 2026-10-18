export interface Episode {
  id: number
  date: string
  level: number
  mood: string
  trigger: string
  note?: string
}

export interface HomeStat {
  id: string
  label: string
  value: string | number
  hint?: string
}

export interface QuickAction {
  label: string
  description: string
  path: string
  icon: string
}
