import { useState } from "react"


function FriendForm({listLength, onSubmit }) {

    const [input, setInput] = useState("")

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) {
            e.preventDefault()
            setInput("");
            onSubmit({
                id: listLength,
                name: input,
                isSelected:false,
            })
        }
    }

    return (
        <form>
            <div className="inputContainer">
                <input className="inputText" placeholder='Add Name' type="text" onChange={handleChange} onKeyPress={handleKeyPress} value={input} name='text' />
            </div>
        </form>
    )
}

export default FriendForm