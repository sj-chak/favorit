
import '../../../css/SearchResults.css';

function SearchResults({ goods, selectedBrand, onSelectBrand }) {
    if (!goods.length) {
        return null;
    }

    return (
        <div className="search-results">
            {goods.map((item, index) => (
                <button
                    key={`${item.brand}-${item.number}-${index}`}
                    type="button"
                    className={
                        selectedBrand === item.brand
                            ? 'search-result selected'
                            : 'search-result'
                    }
                    onClick={() => onSelectBrand(item)}
                >
                    <span className="result-brand">
                        {item.brand}
                    </span>

                    <span className="result-number">
                        {item.number}
                    </span>

                    <span className="result-name">
                        {item.name}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default SearchResults;
