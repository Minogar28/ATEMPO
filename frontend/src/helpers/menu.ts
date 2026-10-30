import type { ComponentType } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type MenuIcon = ComponentType<{ sx?: SxProps<Theme> }>

export interface MenuItem {
  key: string
  label: string
  path?: string
  icon?: MenuIcon
  children?: MenuItem[]
}

export interface MenuSection {
  label: string
  items: MenuItem[]
}

// Devuelve todos los padres (ids) de un item en el árbol del menú.
export const findAllParent = (items: MenuItem[], item: MenuItem): string[] => {
  const chain: string[] = []
  const walk = (nodes: MenuItem[], target: MenuItem, parents: string[]): boolean => {
    for (const node of nodes) {
      if (node.key === target.key) {
        chain.push(...parents)
        return true
      }
      if (node.children?.length && walk(node.children, target, [...parents, node.key])) {
        return true
      }
    }
    return false
  }
  walk(items, item, [])
  return chain
}

export const findMenuItem = (items: MenuItem[], key: string): MenuItem | undefined => {
  for (const item of items) {
    if (item.key === key) return item
    const found = item.children && findMenuItem(item.children, key)
    if (found) return found
  }
  return undefined
}

// Alterna un atributo en <html> (usado por el toggler de tema).
export const changeHTMLAttribute = (attribute: string, value: string): void =>
  document.documentElement.setAttribute(attribute, value)
