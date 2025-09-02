import { LupaIcon } from "../../icons/lupa-icon";

interface InputTextProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  required: boolean;
  placeholder?: string;
}

export const InputText = (props: InputTextProps) => {
  const { label, value, onChange, id, required, placeholder } = props;
  return (
    <div className="flex flex-col gap-2 w-full relative border border-[#2C313A]/50 bg-[#1f222880] rounded-lg">
      <LupaIcon
        className="absolute left-4 top-3.5 bottom-0 w-5 h-5"
        stroke="#bdbdbd"
      />
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-white focus:outline-primary ml-8 outline-none  py-3 px-5"
      />
    </div>
  );
};
