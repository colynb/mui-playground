import * as React from "react";
import dayjs, { Dayjs } from "dayjs";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "7760fb8fc9685036a87cae6a7d52f104Tz01MDUxMyxFPTE2OTQyNzAyMzA1OTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const shortcuts = [
  {
    label: "All Time",
    dates: () => {
      return [null, null];
    },
  },
  {
    label: "Custom",
    dates: () => {
      return [null, null];
    },
  },
  {
    label: "Year to Date",
    dates: () => {
      return [dayjs("2022-01-01"), dayjs()];
    },
  },
  {
    label: "Last 12 Months",
    dates: () => {
      return [dayjs().subtract(12, "month"), dayjs()];
    },
  },
  {
    label: "Last 6 Months",
    dates: () => {
      return [dayjs().subtract(6, "month"), dayjs()];
    },
  },
  {
    label: "Last 3 Months",
    dates: () => {
      return [dayjs().subtract(3, "month"), dayjs()];
    },
  },
  {
    label: "This Month",
    dates: () => {
      return [dayjs().startOf("month"), dayjs().endOf("month")];
    },
  },
  {
    label: "This Week",
    dates: () => {
      return [dayjs().startOf("week"), dayjs().endOf("week")];
    },
  },
];

export const DateRangePicker = ({ onSubmit, onClose }) => {
  const [values, setValues] = React.useState<DateRange<Dayjs>>([null, null]);
  const [showing, setShowing] = React.useState<string>("1");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  React.useEffect(() => {
    const shortcut = shortcuts[showing];
    const dates = shortcut.dates();
    if (startDate && endDate) {
    } else {
      setValues(dates);
      setStartDate(dates[0]?.format("M/DD/YY"));
      setEndDate(dates[1]?.format("M/DD/YY"));
    }
  }, [showing]);

  const handleChange = (event: SelectChangeEvent) => {
    setShowing(event.target.value as string);
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const isDisabled = () => {
    return !(values[0] && values[1]);
  };

  const handleDateInput = (e) => {
    const startDateDay = dayjs(startDate);
    const endDateDay = dayjs(endDate);
    if (startDateDay.isValid() && endDateDay.isValid()) {
      setShowing("1");
      setValues([startDateDay, endDateDay]);
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#23211F", borderRadius: "8px" }}>
      <div className="flex items-center justify-between space-x-4 text-sm">
        <div className="flex items-center space-x-4 w-1/2">
          <div>Showing</div>
          <div className="flex-1">
            <select
              className="bg-[#2E2C2A] border border-[#383634] rounded h-10 text-white w-full"
              value={showing}
              onChange={handleChange}
            >
              {shortcuts.map((shortcut, i) => {
                return (
                  <option key={`shortcut${i}`} value={`${i}`}>
                    {shortcut.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4 w-1/2">
          <div>With Date Range</div>
          <div className="flex-1">
            <div className="bg-[#2E2C2A] border border-[#383634] rounded h-10 flex items-center justify-center">
              <input
                type="text"
                onChange={(e) => setStartDate(e.target.value)}
                onBlur={handleDateInput}
                value={startDate}
                className="bg-[#2E2C2A] w-20 text-white text-sm border-0"
              />
              <span>-</span>
              <input
                type="text"
                onChange={(e) => setEndDate(e.target.value)}
                onBlur={handleDateInput}
                value={endDate}
                className="bg-[#2E2C2A] w-20 text-white text-sm border-0"
              />
            </div>
          </div>
        </div>
      </div>
      <Stack spacing={3}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Start Date", end: "End Date" }}
        >
          <div className="block md:hidden">
            <StaticDateRangePicker
              value={values}
              onChange={(newValue) => {
                setValues(newValue);
                setStartDate(newValue[0]?.format("M/DD/YY"));
                setEndDate(newValue[1]?.format("M/DD/YY"));
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </div>
          <div className="hidden md:block">
            <StaticDateRangePicker
              displayStaticWrapperAs="desktop"
              value={values}
              onChange={(newValue) => {
                setValues(newValue);
                setStartDate(newValue[0]?.format("M/DD/YY"));
                setEndDate(newValue[1]?.format("M/DD/YY"));
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </div>
        </LocalizationProvider>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="end" padding={2}>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={isDisabled()}
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );
};
