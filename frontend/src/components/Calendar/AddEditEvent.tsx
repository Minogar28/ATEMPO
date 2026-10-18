import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { monoFont } from '@src/theme/typography'
import type { SlotDialogState } from './helper'

// Diálogo de confirmación para abrir o quitar un bloque de disponibilidad.

const SlotDialog = ({
  state,
  onClose,
  onConfirm,
}: {
  state: SlotDialogState | null
  onClose: () => void
  onConfirm: (state: SlotDialogState) => void
}) => (
  <Dialog open={state != null} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>
      {state?.mode === 'abrir' ? 'Abrir disponibilidad' : 'Quitar disponibilidad'}
    </DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        {state?.mode === 'abrir'
          ? 'Este horario quedará visible para que tus pacientes lo reserven:'
          : 'El bloque se quitará de tu agenda y dejará de ser reservable:'}
      </Typography>
      <Typography sx={{ fontFamily: monoFont, fontSize: '0.85rem', color: 'primary.main', mt: 1.5 }}>
        {state?.label}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        variant="contained"
        color={state?.mode === 'quitar' ? 'error' : 'primary'}
        onClick={() => state && onConfirm(state)}
      >
        {state?.mode === 'abrir' ? 'Abrir bloque' : 'Quitar bloque'}
      </Button>
    </DialogActions>
  </Dialog>
)

export default SlotDialog
