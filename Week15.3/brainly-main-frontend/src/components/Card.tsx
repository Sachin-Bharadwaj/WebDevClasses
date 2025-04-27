import { ShareIcon } from "../icons/ShareIcon";

type CardTypes = "Youtube" | "Twitter" ;

interface CardProps {
    title: string;
    link: string;
    type: CardTypes
}

export function Card(props: CardProps) {
    return (
        <div>
            <div className="bg-color-white rounded-md
            border-gray-200 p-4 max-w-72 border"> 
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="pr-2 text-gray-500">
                            <ShareIcon />
                        </div>
                        {props.title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={props.link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                        <ShareIcon />
                        </div>
                    </div>
                </div>  
                <div className="pt-4">
                    {props.type=="Youtube" && <iframe className="w-full" src={props.link.replace("youtu.be", "youtube.com/embed")}
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                    </iframe> }
                    {props.type=="Twitter" && <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x.com", "twitter.com")}></a>
                    </blockquote>} 
                </div>
            
            </div>
        </div>
    )
}