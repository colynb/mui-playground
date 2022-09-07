import { MuiTypography } from '../components/MuiTypography'
import { MuiButton } from '../components/MuiButton'
import { MuiPicker } from '../components/MuiPicker'
import { Stack } from '@mui/material'
import { MuiDateRange } from '../components/MuiDateRange'

export default function IndexRout() {
  return (
    <Stack spacing={4}>
      <MuiTypography />
      <MuiButton />
      <MuiPicker />
      <MuiDateRange />
    </Stack>
  )
}
