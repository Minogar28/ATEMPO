import type { MenuItem } from '@src/helpers/menu'

export const isItemActive = (item: MenuItem, pathname: string): boolean =>
  Boolean(
    item.path &&
      (pathname === item.path || pathname.startsWith(`${item.path}/`)),
  )

export const hasActiveChild = (item: MenuItem, pathname: string): boolean =>
  Boolean(
    item.children?.some(
      (child) =>
        isItemActive(child, pathname) || hasActiveChild(child, pathname),
    ),
  )
