interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { label, onClick, className, icon } = props;

  return (
    <button
      className={`flex items-center justify-center gap-2 bg-primary rounded-xl py-1 px-4 shadow-md transition duration-300 ease-in-out cursor-pointer text-white min-w-28 ${className}`}
      onClick={onClick}
    > {label}
    </button>
  );
};
