import { useEffect } from 'react';
import TableWrapper from './components/table/TableWrapper';
import { fetchCountries } from './store/countriesSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
    const dispatch = useAppDispatch();
    const {
        data: countries,
        loading,
        error,
    } = useAppSelector((state) => state.countries);

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Countries</h1>
            <TableWrapper countries={countries} />
        </div>
    );
}

export default App;
