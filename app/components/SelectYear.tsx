const years = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const SelectYear = ({ value, setYear }) => {
  const latestYear = new Date().getFullYear();
  return (
    <select
      className="bg-[#2E2C2A] border border-[#383634] rounded h-10 text-white w-32"
      value={value}
      onChange={(e) => setYear(e.target.value)}
    >
      <optgroup>
        {years(latestYear, latestYear - 50, -1).map((year, i) => {
          return (
            <option key={`year${year}`} value={`${year}`}>
              {year}
            </option>
          );
        })}
      </optgroup>
    </select>
  );
};
