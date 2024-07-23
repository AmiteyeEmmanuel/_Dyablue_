import { CustomButtonProps } from '../interface/common';

export default function CustomButton({
    type,
    title,
    backgroundColor,
    color,
    hoverBackgroundColor,
    fullWidth,
    padding,
    icon,
    handleClick
}: CustomButtonProps) {
    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={`${
                fullWidth ? 'w-auto' : 'w-auto'
            } min-w-[130px] ${backgroundColor} ${color} text-lg font-semibold gap-2.5 rounded-full capitalize flex items-center justify-center ${padding} ${hoverBackgroundColor ? `hover:${hoverBackgroundColor}` : ''}`}
            onClick={handleClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {title}
        </button>
    );
}
