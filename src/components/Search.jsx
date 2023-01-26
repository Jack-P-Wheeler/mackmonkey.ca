const Search = ({searchData, setSearchData, filterData}) => {
    
    return (
        <section className="m-4 flex">
            <form>
                <label className="mr-4">Search:</label>
                <input className="rounded-full border p-2 mr-4 w-72" value={searchData.term} onChange={(ev) => setSearchData({...searchData, term: ev.target.value})}></input>
                {Object.keys(filterData).map((filterName) => {
                    return (
                        <select className="mr-4  p-2 rounded-full capitalize border-blue-500 border bg-blue-400 shadow-inner font-bold text-white" value={searchData[filterName]} name={filterName} key={filterName} onChange={(ev) => setSearchData({...searchData, [filterName]: ev.target.value})}>
                            <option value="">{filterName}</option>
                            {filterData[filterName].map((option) => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    )
                })}
            </form>
            <button onClick={(ev) => setSearchData({term: "", author: "", category: "", team: ""})}>Reset</button>
        </section>
    )
}

export default Search