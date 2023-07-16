import { MouseEventHandler } from "react";
import Image from "next/image";


type Props = {
    title:string;
    leftIcon?:string | null;
    rightIcon?:string | null;
    handleClick?:MouseEventHandler;
    submitting?:boolean;
    type?:'button' | 'submit';
    bgColor?:string;
    textColor?:string;
}

const Button = ({title,leftIcon,rightIcon,submitting,type,bgColor,textColor,handleClick}: Props) => {
  return (
    <button
        type={type || 'button'}
        disabled={submitting}
        className={`flexCenter gap-3 px-4 py-3 
        ${textColor ||  'text-white'} 
        ${submitting ? 'bg-black/50' : bgColor ||  'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
        onClick={handleClick}
       
    >
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
            {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right" />}
    </button>
  )
}

export default Button
