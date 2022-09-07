import { Button, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'

export const MuiButton = () => {
  return (
    <Stack spacing={4}>
      <Stack direction={'row'} spacing={2}>
        <Button variant="text" href="/">
          Text
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
      </Stack>
    </Stack>
  )
}
