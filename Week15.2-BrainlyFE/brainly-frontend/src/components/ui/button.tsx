import { ReactElement } from "react";

type variantTypes = "primary" | "secondary";
type sizeTypes = "sm" | "md" | "lg";

export interface ButtonProps {
    variant: variantTypes;
    size: sizeTypes;
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

// variantStyle
const variantStylesMap = new Map<variantTypes, string>();
const variantStylesKeyVals: [variantTypes, string][] = [["primary", "bg-purple-600 text-white"],
["secondary", "bg-purple-300 text-purple"]];
variantStylesKeyVals.forEach(([key, val]) => variantStylesMap.set(key, val));

// default style
const defaultStyles: string = "rounded-md p-4 flex";

// size style
const sizeStylesMap = new Map<sizeTypes, string>();
const sizeStylesMapKeyVals: [sizeTypes, string][] = [
["sm", "py-1 px-2 text-sm rounded-sm"], 
["md", "py-2 px-4 text-md rounded-md"], 
["lg", "py-4 px-6 text-xl rounded-xl"]];
sizeStylesMapKeyVals.forEach(([key, val]) => sizeStylesMap.set(key, val));


export const Button = (props: ButtonProps) => {

    return (
        <button className={`${defaultStyles} 
        ${variantStylesMap.get(props.variant)} 
        ${sizeStylesMap.get(props.size)}`}>
            <div className="flex items-center">
                {props.startIcon? <div > {props.startIcon}</div>: null} 
                <div className={"pl-2 pr-2"}> {props.text}  </div>
                <div> {props.endIcon} </div>
            </div>
        </button>
    )
}


