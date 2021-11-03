function SearchName({onSearch}) {
    const handleChange=e=>{
        e.preventDefault();
        onSearch(e.target.value);
    }

    return (
        <form>
            <div className="inputContainer">
            <input className="inputText" placeholder='Search Name' type="text"  onChange={handleChange} name='text'/>
            </div>
        </form>
    )
}

export default SearchName