import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Country {
    name: {
        common: string;
        official: string;
    };
    population: number;
    continents?: string[];
    languages: { [key: string]: string };
    region: string;
    subregion?: string;
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    tld?: string[];
    landlocked?: boolean;
    area: number;
    capital?: string[];
    timezones?: string[];
    unMember?: boolean;
    maps?: {
        googleMaps: string;
        openStreetMaps: string;
    };
    flags: {
        svg: string;
    };
}

interface CountriesState {
    data: Country[];
    loading: boolean;
    error: string | null;
}

const initialState: CountriesState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchCountries = createAsyncThunk(
    'countries/fetchAll',
    async () => {
        const response = await axios.get<Country[]>(
            'https://restcountries.com/v3.1/all'
        );
        return response.data;
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCountries.fulfilled,
                (state, action: PayloadAction<Country[]>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch countries';
            });
    },
});

export default countriesSlice.reducer;
