import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from './api/store';

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

    console.log(countries[1]);

    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map((country: any, index: number) => (
                    <li key={index}>{country.name.common}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
