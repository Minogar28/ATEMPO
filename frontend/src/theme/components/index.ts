import { deepMergeObjects } from '@src/helpers/global'
import { formOverrides } from './forms'
import { surfaceOverrides } from './surfaces'
import { tableOverrides } from './table'
import { tooltipOverrides } from './tooltip'
import type { Components, Theme } from '@mui/material/styles'

export const componentOverrides = deepMergeObjects<Components<Theme>>(
  formOverrides,
  surfaceOverrides,
  tableOverrides,
  tooltipOverrides,
)
