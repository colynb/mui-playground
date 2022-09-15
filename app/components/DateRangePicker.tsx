import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker'
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

import { LicenseInfo } from '@mui/x-license-pro'

LicenseInfo.setLicenseKey(
  '7760fb8fc9685036a87cae6a7d52f104Tz01MDUxMyxFPTE2OTQyNzAyMzA1OTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
)

const shortcuts = [
  {
    label: 'All Time',
    dates: () => {
      return [null, null]
    },
  },
  {
    label: 'Custom',
    dates: () => {
      return [null, null]
    },
  },
  {
    label: 'Year to Date',
    dates: () => {
      return [dayjs('2022-01-01'), dayjs()]
    },
  },
  {
    label: 'Last 12 Months',
    dates: () => {
      return [dayjs().startOf('month').subtract(12, 'month'), dayjs()]
    },
  },
  {
    label: 'Last 6 Months',
    dates: () => {
      return [dayjs().startOf('month').subtract(6, 'month'), dayjs()]
    },
  },
  {
    label: 'Last 3 Months',
    dates: () => {
      return [dayjs().startOf('month').subtract(3, 'month'), dayjs()]
    },
  },
  {
    label: 'This Month',
    dates: () => {
      return [dayjs().startOf('month'), dayjs().endOf('month')]
    },
  },
  {
    label: 'This Week',
    dates: () => {
      return [dayjs().startOf('week'), dayjs().endOf('week')]
    },
  },
]

export const DateRangePicker = ({ onSubmit, onClose }) => {
  const [values, setValues] = React.useState<DateRange<Dayjs>>([null, null])
  const [showing, setShowing] = React.useState(1)

  React.useEffect(() => {
    const shortcut = shortcuts[showing]
    setValues(shortcut.dates())
  }, [showing])

  const handleChange = (event: SelectChangeEvent) => {
    setShowing(event.target.value as string)
  }

  const handleSubmit = () => {
    onSubmit(values)
  }

  const isDisabled = () => {
    return !(values[0] && values[1])
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#23211F', borderRadius: '8px' }}>
      <div className="flex items-center justify-between space-x-4">
        <div>Showing</div>
        <div className="flex-1">
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={showing}
              displayEmpty
              onChange={handleChange}
            >
              {shortcuts.map((shortcut, i) => {
                return (
                  <MenuItem key={`shortcut${i}`} value={i}>
                    {shortcut.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <Stack spacing={3}>
        <div className="block md:hidden">
          <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Mobile start', end: 'Mobile end' }}>
            <StaticDateRangePicker
              displayStaticWrapperAs="mobile"
              value={values}
              onChange={(newValue) => {
                setValues(newValue)
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
              value={values}
              onChange={(newValue) => {
                setValues(newValue)
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
      <Stack direction="row" spacing={2} justifyContent="end" padding={2}>
        <Button variant="outlined" color="inherit" size="large" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="contained" color="primary" size="large" onClick={handleSubmit} disabled={isDisabled()}>
          Apply
        </Button>
      </Stack>
    </Box>
  )
}