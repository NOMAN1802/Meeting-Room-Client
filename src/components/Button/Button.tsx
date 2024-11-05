import { MouseEventHandler, FC } from "react";
import { IconType } from 'react-icons';

type TButton = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  medium?: boolean;
  icon?: IconType;
  rounded?: boolean;
};

const Button: FC<TButton> = ({ label, onClick, disabled, outline, small, icon: Icon, rounded ,medium}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        transition-transform
        duration-300
        w-full
        px-6
        py-3
        ${outline ? 'bg-white' : 'bg-gray-600'}
        ${outline ? 'border-gray-400' : 'border-gray-600'}
        ${outline ? 'text-gray-700' : 'text-white'}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        shadow-md
        hover:shadow-xl
        transform hover:-translate-y-1
        ${medium ? 'text-lg font-medium' : 'text-md font-semibold'}
        ${small ? 'text-sm py-2' : 'text-md py-3'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className='absolute left-4 top-1/2 transform -translate-y-1/2'
        />
      )}
      {label}
    </button>
  );
};

export default Button;
