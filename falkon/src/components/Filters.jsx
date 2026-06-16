import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Filters = () => {
    return (
        <div>
            <span>FILTER</span>
            <form className="filter-bar">
                <input placeholder="Filtro..." />
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
}

export default Filters
