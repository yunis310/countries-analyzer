import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from './api/store';
import TableWrapper from './components/TableWrapper';

function App() {
    const dispatch = useDispatch();
    const countries = useSelector((state: any) => state.countries.countries);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            dispatch(setCountries(data));
        };

        fetchCountries();
    }, [dispatch]);

    console.log(countries);

    return (
        <div>
            <h1>Countries</h1>
            <TableWrapper countries={countries} />
        </div>
    );
}

export default App;
