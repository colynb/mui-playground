import { Box, TextField } from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import type { DateRange } from '@mui/lab'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export const MuiDateRange = () => {
  const [value, setValue] = useState<DateRange<Date>>([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box width={500}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={value}
          onChange={(value) => setValue(value)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  )
}
