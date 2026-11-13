
import '../../../css/OffersTable.css';

function formatPrice(price) {
    if (price === null || price === undefined || price === '') {
        return '—';
    }

    const value = Number(price);

    if (!Number.isFinite(value)) {
        return price;
    }

    return `${value.toLocaleString('ru-RU')} ₽`;
}

function OffersTable({ offers }) {
    if (!offers.length) {
        return <div className="offers-empty">Предложения не найдены</div>;
    }

    const rows = offers.flatMap((item, itemIndex) => {
        const warehouses = Array.isArray(item.warehouses)
            ? item.warehouses
            : [];

        if (warehouses.length === 0) {
            return [{
                ...item,
                warehouse: null,
                key: `${itemIndex}-empty`,
            }];
        }

        return warehouses.map((warehouse, warehouseIndex) => ({
            ...item,
            warehouse,
            key: `${itemIndex}-${warehouseIndex}`,
        }));
    });

    return (
        <div className="offers-table-wrapper">
            <table className="offers-table">
                <thead>
                    <tr>
                        <th>Производитель</th>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Остаток</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map(row => (
                        <tr key={row.key}>
                            <td className="offers-brand">
                                {row.brand || '—'}
                            </td>

                            <td className="offers-name">
                                {row.name || '—'}
                            </td>

                            <td className="offers-price">
                                {formatPrice(row.warehouse?.price)}
                            </td>

                            <td className="offers-stock">
                                {row.warehouse?.stock ?? '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OffersTable;
