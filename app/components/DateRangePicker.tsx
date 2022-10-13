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
import { SelectChangeEvent } from "@mui/material/Select";

import { LicenseInfo } from "@mui/x-license-pro";
import { SelectYear } from "./SelectYear";
import { SelectMonth } from "./SelectMonth";
import { SelectQuarter } from "./SelectQuarter";

LicenseInfo.setLicenseKey(
  "7760fb8fc9685036a87cae6a7d52f104Tz01MDUxMyxFPTE2OTQyNzAyMzA1OTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const presets = [
  {
    label: "All Time",
    key: "alltime",
    template: "daterange",
    dates: () => {
      return [null, null];
    },
  },
  {
    label: "Custom",
    key: "custom",
    template: "daterange",
    dates: () => {
      return [null, null];
    },
  },
  {
    label: "Year to Date",
    key: "yeartodate",
    template: "daterange",
    dates: () => {
      return [dayjs("2022-01-01"), dayjs()];
    },
  },
  {
    label: "Last 12 Months",
    key: "last12months",
    template: "daterange",
    dates: () => {
      return [dayjs().subtract(12, "month"), dayjs()];
    },
  },
  {
    label: "Last 6 Months",
    key: "last6months",
    template: "daterange",
    dates: () => {
      return [dayjs().subtract(6, "month"), dayjs()];
    },
  },
  {
    label: "Last 3 Months",
    key: "last3months",
    template: "daterange",
    dates: () => {
      return [dayjs().subtract(3, "month"), dayjs()];
    },
  },
  {
    label: "This Month",
    key: "thismonth",
    template: "daterange",
    dates: () => {
      return [dayjs().startOf("month"), dayjs().endOf("month")];
    },
  },
  {
    label: "This Week",
    key: "thisweek",
    template: "daterange",
    dates: () => {
      return [dayjs().startOf("week"), dayjs().endOf("week")];
    },
  },
  {
    label: "Year of...",
    key: "yearof",
    template: "select",
  },
  {
    label: "Quarter of...",
    key: "quarterof",
    template: "select",
  },
  {
    label: "Month of...",
    key: "monthof",
    template: "select",
  },
];

export const DateRangePicker = ({ onSubmit, onClose }) => {
  const [values, setValues] = React.useState<DateRange<Dayjs>>([null, null]);
  const [presetValue, setPresetValue] = React.useState<string>("custom");
  const [showingTemplate, setShowingTemplate] =
    React.useState<string>("daterange");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [quarter, setQuarter] = React.useState("Q1");
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    const preset = presets.find((p) => p.key === presetValue);

    if (preset.template === "daterange") {
      setShowingTemplate("daterange");
      const dates = preset.dates();
      if (startDate && endDate) {
      } else {
        setValues(dates);
        setStartDate(dates[0]?.format("M/DD/YY"));
        setEndDate(dates[1]?.format("M/DD/YY"));
      }
    }

    if (preset.template === "select") {
      setShowingTemplate("select");
    }
  }, [presetValue]);

  const handlePresetChange = (event: SelectChangeEvent) => {
    setStartDate("");
    setEndDate("");
    setPresetValue(event.target.value as string);
  };

  const handleSubmit = () => {
    if (presetValue === "yearof") {
      onSubmit({
        label: `Date: Year of ${year}`,
        preset: presetValue,
        value: year,
      });

      return;
    }

    if (presetValue === "monthof") {
      onSubmit({
        label: `Date: ${month}, ${year}`,
        preset: presetValue,
        value: `${month}/${year}`,
      });

      return;
    }

    if (presetValue === "quarterof") {
      onSubmit({
        label: `Date: ${quarter} of ${year}`,
        preset: presetValue,
        value: `${quarter}/${year}`,
      });

      return;
    }

    if (presetValue === "yeartodate") {
      onSubmit({
        label: `Date: Year to Date`,
        preset: presetValue,
        value: values,
      });

      return;
    }

    if (presetValue === "last12months") {
      onSubmit({
        label: `Date: Last 12 Months`,
        preset: presetValue,
        value: values,
      });

      return;
    }

    if (presetValue === "last6months") {
      onSubmit({
        label: `Date: Last 6 Months`,
        preset: presetValue,
        value: values,
      });

      return;
    }

    if (presetValue === "last3months") {
      onSubmit({
        label: `Date: Last 3 Months`,
        preset: presetValue,
        value: values,
      });

      return;
    }

    if (presetValue === "thismonth") {
      onSubmit({
        label: `Date: This Month`,
        preset: presetValue,
        value: values,
      });

      return;
    }

    if (presetValue === "thisweek") {
      onSubmit({
        label: `Date: This Week`,
        preset: presetValue,
        value: values,
      });

      return;
    }
    onSubmit({
      label: `Date: ${values[0].format("M/DD/YY")} - ${values[1].format(
        "M/DD/YY"
      )}`,
      preset: presetValue,
      value: values,
    });
  };

  const isDisabled = () => {
    return !(values[0] && values[1]) && !year;
  };

  const handleDateInput = (e) => {
    const startDateDay = dayjs(startDate);
    const endDateDay = dayjs(endDate);
    if (startDateDay.isValid() && endDateDay.isValid()) {
      setPresetValue("custom");
      setValues([startDateDay, endDateDay]);
    }

    if (startDateDay.valueOf() > endDateDay.valueOf()) {
      setValues(values);
      setStartDate(values[0]?.format("M/DD/YY"));
      setEndDate(values[1]?.format("M/DD/YY"));
    }
  };

  return (
    <div className="p-4 bg-[#23211F] rounded-lg w-full max-w-2xl">
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-4">
          <div>Showing</div>
          <div className="flex-1">
            <select
              className="bg-[#2E2C2A] border border-[#383634] rounded h-10 text-white"
              value={presetValue}
              onChange={handlePresetChange}
            >
              <optgroup>
                {presets.map((preset, i) => {
                  return (
                    <option key={`preset${i}`} value={`${preset.key}`}>
                      {preset.label}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
        </div>

        {presetValue === "yearof" && (
          <SelectYear value={year} setYear={setYear} />
        )}

        {presetValue === "monthof" && (
          <>
            <SelectMonth value={month} setMonth={setMonth} />
            <SelectYear value={year} setYear={setYear} />
          </>
        )}

        {presetValue === "quarterof" && (
          <>
            <SelectQuarter value={quarter} setQuarter={setQuarter} />
            <SelectYear value={year} setYear={setYear} />
          </>
        )}

        {showingTemplate === "daterange" && (
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
        )}
      </div>

      {showingTemplate === "daterange" && (
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
      )}

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
    </div>
  );
};
