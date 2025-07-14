type Props ={
    setSortBy : (value:string) => void,
    sortBy: string,
    setPage:()=>void,
}
 
export default function SortDropdown({setSortBy, sortBy,setPage}: Props) {
    return (
        <div className="govuk-form-group govuk-form-group-cust">
                <label className="govuk-label" htmlFor="sort">Sort by</label>
                <select className="govuk-select" id="sort" name="sort" value={sortBy}
                    onChange={(e) => {setSortBy(e.target.value);setPage();}}>
                    <option value="default">Default</option>
                    <option value="price-low-high">Price: Low To High</option>
                    <option value="price-high-low">Price: High To Low</option>
                    <option value="name-asc">Product: A To Z</option>
                    <option value="name-desc">Product: Z To A</option>
                    <option value="rating-high-low">Rating: High To Low</option>
                    <option value="rating-low-high">Rating: Low To High</option>
                </select>
            </div>
    );
}