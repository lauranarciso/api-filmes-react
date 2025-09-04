export const Button = (props) => {
  const { label, onClick, className, disabled } = props;

  return (
    <button
      className={`bg-primary rounded-lg py-2 font-semibold px-4 cursor-pointer text-white min-w-28 disabled:bg-gray-500 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
