import { Box, Button, Card, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { DateRangePicker } from '../components/DateRangePicker'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  components: {
    MuiDateRangePicker: {
      defaultProps: {
        disabledRipple: true,
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#20F2CF',
      light: 'rgba(19, 99, 135, 0.66)',
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
  const [selected, setSelected] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleSubmit = (selected) => {
    setOpened(false)
    console.log({selected})
    setSelected(selected)
  }

  const handleClose = (values) => {
    setOpened(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="h-screen bg-black flex flex-col items-center justify-center m-0 p-0">
        <div className="flex space-x-4 bg-gray-800 rounded p-4">
          {selected?.label}
        </div>
        <Button onClick={() => setOpened(true)}>Date Picker</Button>
        {opened && <DateRangePicker onSubmit={handleSubmit} onClose={handleClose} />}
      </div>
    </ThemeProvider>
  )
}
