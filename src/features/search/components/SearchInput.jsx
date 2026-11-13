
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@base-ui/react/input';

import {
    searchBrands,
    searchOffers,
    clearSearch,
    setSelectedBrand,
} from '../searchSlice';

import '../../../css/SearchInput.css';
import SearchResults from './SearchResults';

function SearchInput() {
    const dispatch = useDispatch();

    const {
        goods,
        status,
        selectedBrand,
        offers,
        offersStatus,
        offersError,
    } = useSelector(state => state.search);

    const [query, setQuery] = useState('');

    useEffect(() => {
        const number = query.trim();

        if (!number) {
            dispatch(clearSearch());
            return;
        }

        let request;

        const timer = setTimeout(() => {
            request = dispatch(searchBrands(number));
        }, 500);

        return () => {
            clearTimeout(timer);
            request?.abort();
        };
    }, [query, dispatch]);

    return (
        <div className="search-widget">

            <div className="search-form">
                <Input
                    className="search-input"
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Введите артикул запчасти"
                />
            </div>

            {status === 'succeeded' && goods.length === 0 && (
                <div className="search-message">
                    Товары не найдены
                </div>
            )}

            <SearchResults
                goods={goods}
                selectedBrand={selectedBrand}
                onSelectBrand={(brand) => {
                    dispatch(setSelectedBrand(brand));

                    dispatch(searchOffers({
                        number: query.trim(),
                        brand,
                    }));
                }}
            />

            {offersStatus === 'loading' && (
                <div className="search-message">
                    Загружаем предложения...
                </div>
            )}

            {offersStatus === 'failed' && (
                <div className="search-error">
                    Ошибка загрузки предложений: {offersError}
                </div>
            )}

            {offersStatus === 'succeeded' && (
                <div className="brand-list">
                    <div className="brand-list-title">
                        Предложения {selectedBrand}
                    </div>

                    {offers.length === 0 ? (
                        <div>Предложения не найдены</div>
                    ) : (
                        <pre>
                            {JSON.stringify(offers, null, 2)}
                        </pre>
                    )}
                </div>
            )}

        </div>
    );
}

export default SearchInput;
