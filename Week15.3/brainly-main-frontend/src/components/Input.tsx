
interface InputCompInterface {
    reference?: any;
    placeholder: string;
}

export function InputComponent({ reference, placeholder }: InputCompInterface) {
    return (
        <div>
            <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded-md m-2" />
        </div>
    )
}