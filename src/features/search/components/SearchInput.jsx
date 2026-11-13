import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@base-ui/react/input';

import {
    searchBrands,
    searchOffers,
    clearSearch,
    clearOffers,
    setSelectedBrand,
} from '../searchSlice';

import '../../../css/SearchInput.css';

import SearchResults from './SearchResults';
import GoodsTable from './GoodsTable';
import OffersTable from './OffersTable';

function SearchInput() {
    const dispatch = useDispatch();

    const {
        goods,
        status,
        error,
        selectedBrand,
        offers,
        offersStatus,
        offersError,
    } = useSelector(state => state.search);

    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Автоматический поиск при вводе
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

    // Изменение артикула скрывает старую таблицу
    function handleQueryChange(value) {
        setQuery(value);
        setShowResults(false);
        dispatch(setSelectedBrand(null));
        dispatch(clearSearch());
    }

    // Нажатие кнопки или Enter
    function handleSubmit(event) {
        event.preventDefault();

        if (!query.trim() || status !== 'succeeded') {
            return;
        }

        dispatch(setSelectedBrand(null));
        dispatch(clearOffers());

        setShowResults(true);
    }

    // Запрос цены и аналогов для конкретной строки
    function handleSelectItem(item) {
        setShowResults(false);

        dispatch(setSelectedBrand(item.brand));

        dispatch(searchOffers({
            number: item.number,
            brand: item.brand,
        }));
    }

    return (
        <div className="search-widget">

            <div className="search-title">
                ВАШ ФАВОРИТ
                <br />
                В ВЫБОРЕ ЗАПЧАСТЕЙ
            </div>

            <form className="search-form" onSubmit={handleSubmit}>
                <Input
                    className="search-input"
                    value={query}
                    onValueChange={handleQueryChange}
                    placeholder="Введите артикул запчасти"
                />

                <button
                    type="submit"
                    className="search-button"
                    disabled={!query.trim() || status === 'loading'}
                >
                    Найти
                </button>
            </form>

            {status === 'loading' && (
                <div className="search-message">
                    Поиск...
                </div>
            )}

            {status === 'succeeded' && goods.length === 0 && (
                <div className="search-message">
                    Товары не найдены
                </div>
            )}

            <div className="search-content">
                {!selectedBrand && !showResults && (
                    <SearchResults
                        goods={goods}
                        selectedBrand={selectedBrand}
                        onSelectBrand={(item) => {
                            setShowResults(false);

                            dispatch(setSelectedBrand(item.brand));

                            dispatch(searchOffers({
                                number: item.number,
                                brand: item.brand,
                            }));
                        }}
                    />
                )}

                {showResults && status === 'succeeded' && (
                    <GoodsTable
                        goods={goods}
                        onSelect={handleSelectItem}
                    />
                )}

                {offersStatus === 'loading' && (
                    <div className="search-message">
                        Загружаем цены и аналоги...
                    </div>
                )}

                {offersStatus === 'failed' && (
                    <div className="search-error">
                        Ошибка загрузки предложений: {offersError}
                    </div>
                )}

                {status === 'failed' && (
                    <div className="search-error">
                        Ошибка поиска: {error}
                    </div>
                )}

                {offersStatus === 'succeeded' && (
                    <div className="offers-section">
                        <h3>Предложения: {selectedBrand}</h3>
                        <OffersTable offers={offers} />
                    </div>
                )}
            </div>

        </div>
    );
}

export default SearchInput;