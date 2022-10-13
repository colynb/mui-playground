import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);
dayjs().localeData();

export const SelectMonth = ({ value, setMonth }) => {
  return (
    <select
      className="bg-[#2E2C2A] border border-[#383634] rounded h-10 text-white w-40"
      value={value}
      onChange={(e) => setMonth(e.target.value)}
    >
      <optgroup>
        {dayjs.months().map((month, i) => {
          return (
            <option key={`month${month}`} value={`${month}`}>
              {month}
            </option>
          );
        })}
      </optgroup>
    </select>
  );
};
