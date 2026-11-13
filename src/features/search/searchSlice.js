
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchBrands, fetchOffers } from './services/searchApi';

// Асинхронный запрос производителей
export const searchBrands = createAsyncThunk(
    'search/searchBrands',
    async (number, { signal, rejectWithValue }) => {
        try {
            return await fetchBrands(number, signal);
        } catch (error) {
            if (error.name === 'AbortError') {
                throw error;
            }

            return rejectWithValue(error.message);
        }
    }
);

export const searchOffers = createAsyncThunk(
    'search/searchOffers',
    async ({ number, brand }, { signal, rejectWithValue }) => {
        try {
            return await fetchOffers(number, brand, signal);
        } catch (error) {
            if (error.name === 'AbortError') {
                throw error;
            }

            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    brands: [],
    goods: [],
    selectedBrand: null,

    offers: [],
    offersStatus: 'idle',
    offersError: null,
    offersRequestId: null,

    status: 'idle',
    error: null,
    currentRequestId: null,
};

const searchSlice = createSlice({
    name: 'search',

    initialState,

    reducers: {
        clearSearch: (state) => {
            state.brands = [];
            state.goods = [];
            state.selectedBrand = null;

            state.offers = [];
            state.offersStatus = 'idle';
            state.offersError = null;
            state.offersRequestId = null;

            state.status = 'idle';
            state.error = null;
            state.currentRequestId = null;
        },

        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(searchBrands.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
                state.currentRequestId = action.meta.requestId;

                state.offers = [];
                state.offersStatus = 'idle';
                state.offersError = null;
                state.offersRequestId = null;
            })

            .addCase(searchBrands.fulfilled, (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return;
                }

                state.brands = action.payload.brands;
                state.goods = action.payload.goods;

                state.status = 'succeeded';
                state.currentRequestId = null;
            })

            .addCase(searchBrands.rejected, (state, action) => {
                if (state.currentRequestId !== action.meta.requestId) {
                    return;
                }

                state.currentRequestId = null;

                if (action.meta.aborted) {
                    state.status = 'idle';
                    return;
                }

                state.status = 'failed';
                state.error =
                    action.payload || action.error.message;
            })
            .addCase(searchOffers.pending, (state, action) => {
                state.offersStatus = 'loading';
                state.offersError = null;
                state.offers = [];
                state.offersRequestId = action.meta.requestId;
            })

            .addCase(searchOffers.fulfilled, (state, action) => {
                if (state.offersRequestId !== action.meta.requestId) {
                    return;
                }

                state.offers = action.payload;
                state.offersStatus = 'succeeded';
                state.offersRequestId = null;
            })

            .addCase(searchOffers.rejected, (state, action) => {
                if (state.offersRequestId !== action.meta.requestId) {
                    return;
                }

                state.offersRequestId = null;

                if (action.meta.aborted) {
                    state.offersStatus = 'idle';
                    return;
                }

                state.offersStatus = 'failed';
                state.offersError = action.payload || action.error.message;
            });
    },
});

export const {
    clearSearch,
    setSelectedBrand,
} = searchSlice.actions;

export default searchSlice.reducer;
