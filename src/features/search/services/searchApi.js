
const API_URL = 'http://api.favorit-parts.ru/hs/hsprice/';

const API_KEY = '00000000-0000-0000-0000-000000000001';

export async function fetchBrands(number, signal) {
    const params = new URLSearchParams({
        key: API_KEY,
        number: number,
    });

    const response = await fetch(`${API_URL}?${params}`, {
        method: 'GET',
        signal,
    });

    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
        throw new Error(
            Array.isArray(result.error)
                ? result.error.join(', ')
                : String(result.error)
        );
    }

    const goods = Array.isArray(result.goods)
        ? result.goods
        : [];

    // Получаем уникальные названия производителей
    const brands = [
        ...new Set(
            goods
                .map(item => item.brand?.trim())
                .filter(Boolean)
        )
    ];

    return {
        goods,
        brands,
    };
}

export async function fetchOffers(number, brand, signal) {
    const params = new URLSearchParams({
        key: API_KEY,
        number,
        brand,
    });

    const response = await fetch(`${API_URL}?${params}`, {
        method: 'GET',
        signal,
    });

    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
        throw new Error(
            Array.isArray(result.error)
                ? result.error.join(', ')
                : String(result.error)
        );
    }

    const offers = Array.isArray(result.goods)
        ? result.goods.filter(item => item && Object.keys(item).length > 0)
        : [];

    return offers;
}
