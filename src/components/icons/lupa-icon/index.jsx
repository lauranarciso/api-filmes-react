export const LupaIcon = (props) => {
  const { className, stroke = "#ffffff" } = props;
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 19.4131C15.4183 19.4131 19 15.8314 19 11.4131C19 6.99481 15.4183 3.41309 11 3.41309C6.58172 3.41309 3 6.99481 3 11.4131C3 15.8314 6.58172 19.4131 11 19.4131Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 21.413L16.65 17.063"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
