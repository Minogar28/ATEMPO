import { styled } from '@mui/material'

// Contenedor centrado compartido por las secciones del landing.
const ContainerBox = styled('div')(({ theme }) => ({
  width: '100%',
  marginInline: 'auto',
  paddingInline: '1rem',
  maxWidth: '100%',
  [theme.breakpoints.up('sm')]: { maxWidth: theme.breakpoints.values.sm },
  [theme.breakpoints.up('md')]: { maxWidth: theme.breakpoints.values.md },
  [theme.breakpoints.up('lg')]: { maxWidth: theme.breakpoints.values.lg },
  [theme.breakpoints.up('xl')]: { maxWidth: theme.breakpoints.values.xl },
}))

export default ContainerBox
