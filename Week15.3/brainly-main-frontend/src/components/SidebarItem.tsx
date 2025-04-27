import { ReactElement } from "react"

interface SideBarItemInterface {
    icon: ReactElement;
    text: string;
}

export function SideBarItem({text, icon}: SideBarItemInterface) {
    return (
        <div className="flex text-gray-700 py-2 pl-4 cursor-pointer 
        hover:bg-gray-200 rounded max-w-48 transition-all duration-150">
            <div className="pr-2 ">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}