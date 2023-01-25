const Search = ({searchData, setSearchData}) => {
    
    return (
        <section className="m-4">
            <form>
                <label className="mr-4">Search:</label>
                <input className="rounded-full border p-2" value={searchData.term} onChange={(ev) => setSearchData({...searchData, term: ev.target.value})}></input>
            </form>
        </section>
    )
}

export default Search