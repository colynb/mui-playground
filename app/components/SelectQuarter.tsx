
export const SelectQuarter = ({ value, setQuarter }) => {
  return (
    <select
      className="bg-[#2E2C2A] border border-[#383634] rounded h-10 text-white w-32"
      value={value}
      onChange={(e) => setQuarter(e.target.value)}
    >
      <optgroup>
        {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => {
          return (
            <option key={`q${q}`} value={`${q}`}>
              {q}
            </option>
          );
        })}
      </optgroup>
    </select>
  );
};
