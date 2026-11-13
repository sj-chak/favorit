
import { useState } from 'react';
import './SearchInput.css';

function SearchInput() {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Поисковый запрос:', query);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Легко найти"
            />

            <button type="submit">
                НАЙТИ
            </button>
        </form>
    );
}

export default SearchInput;
