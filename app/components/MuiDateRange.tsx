import * as React from 'react'
import { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker'
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'

import { LicenseInfo } from '@mui/x-license-pro'

LicenseInfo.setLicenseKey(
  '7760fb8fc9685036a87cae6a7d52f104Tz01MDUxMyxFPTE2OTQyNzAyMzA1OTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
)

export const MuiDateRange = () => {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null])

  return (
    <Stack spacing={3}>
      <div>{JSON.stringify(value[0])}</div>
      <div>{JSON.stringify(value[1])}</div>
      <div className="block md:hidden">
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Mobile start', end: 'Mobile end' }}>
          <StaticDateRangePicker
            displayStaticWrapperAs="mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
      </div>
      <div className="hidden md:block">
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Desktop start', end: 'Desktop end' }}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
      </div>
    </Stack>
  )
}
