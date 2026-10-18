import { useState } from 'react'
import type { MouseEvent } from 'react'

export const useDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  return {
    anchorEl,
    open: Boolean(anchorEl),
    openMenu,
    closeMenu,
  }
}
