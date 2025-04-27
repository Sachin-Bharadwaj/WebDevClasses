import { TextInput } from "@repo/ui/text-input";

export default function() {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <div>
                Chat room
            </div>
            <div>
                <TextInput placeholder="Type a message" />
            </div>
            
        </div>
    )
}