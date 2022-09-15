import { Box, Button, Card, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { DateRangePicker } from '../components/DateRangePicker'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#20F2CF',
    },
    white: {
      main: '#fff',
      contrastText: '#000',
    },
  },
})

export default function IndexRoute() {
  const [opened, setOpened] = useState(true)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleSubmit = (values) => {
    console.log({ values })
    setOpened(false)

    setStartDate(values[0])
    setEndDate(values[1])
  }

  const handleClose = (values) => {
    setOpened(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="h-screen bg-black flex flex-col items-center justify-center m-0 p-0">
        <div className="flex space-x-4 bg-gray-800 rounded p-4">
          {startDate && <div>{startDate.format('M/DD/YY')}</div>}
          {endDate && <div>{endDate.format('M/DD/YY')}</div>}
        </div>
        <Button onClick={() => setOpened(true)}>Date Picker</Button>
        {opened && <DateRangePicker onSubmit={handleSubmit} onClose={handleClose} />}
      </div>
    </ThemeProvider>
  )
}
