interface AuthInputProps {
    newState: (state:string) => void, 
    label:string   
    IsPassword?:boolean
}

function AuthInput(props:AuthInputProps) {
    return (
        <div className="flex flex-col justify-between items-start">
                    <label >{props.label}</label>
                    <input onChange={(e)=> props.newState(e.currentTarget.value)} type={props.IsPassword?"password":"text"} className="border-gray border-b w-full  focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"/>
                </div>
    );
}


export default AuthInput;