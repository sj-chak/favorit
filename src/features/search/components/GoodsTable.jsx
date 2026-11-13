import '../../../css/GoodsTable.css';

function GoodsTable({ goods, onSelect }) {
    if (!goods.length) {
        return (
            <div className="search-message">
                Товары не найдены
            </div>
        );
    }

    return (
        <div className="goods-table-wrapper">
            <h3>Результаты поиска</h3>

            <table className="goods-table">
                <thead>
                    <tr>
                        <th>Производитель</th>
                        <th>Артикул</th>
                        <th>Наименование</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {goods.map((item, index) => (
                        <tr key={`${item.brand}-${item.number}-${index}`}>
                            <td>{item.brand}</td>
                            <td>{item.number}</td>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    type="button"
                                    className="offers-button"
                                    onClick={() => onSelect(item)}
                                >
                                    Цена и аналоги
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GoodsTable;