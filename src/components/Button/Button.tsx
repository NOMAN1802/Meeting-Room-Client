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
        hover:opacity-80
        transition
        px-4
        w-full
        ${outline ? 'bg-white' : 'bg-gray-600'}
        ${outline ? 'border-black' : 'border-gray-600'}
        ${outline ? 'text-black' : 'text-white'}
 
        ${medium ? 'text-lg' : 'text-lg'}
        ${medium ? 'py-2' : 'py-3'}
        ${medium ? 'font-medium' : 'font-semibold'}
        ${medium? 'border-[1px]' : 'border-3'}
        
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
    
        ${rounded ? 'rounded-full' : 'rounded'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className='absolute left-4 top-3'
        />
      )}
      {label}
    </button>
  );
};

export default Button;