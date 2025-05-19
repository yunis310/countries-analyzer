import { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SearchBar from '../SearchBar';
import Pagination from './Pagination';
import { Country } from '../../store/countriesSlice';
import CompareButton from '../CompareButton';

interface Props {
    countries: Country[];
}

const TableWrapper = ({ countries }: Props) => {
    const heads = [
        'country',
        'population',
        'continents',
        'languages',
        'region',
        'Size (km²)',
        'flag',
    ];

    const [visibleHeads, setVisibleHeads] = useState<string[]>(heads);
    const [sortKey, setSortKey] = useState<string>('country');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [isComparing, setIsComparing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, isComparing]);

    const displayCountries = isComparing
        ? countries.filter((c) => selectedCountries.includes(c.name.common))
        : countries;
    const filteredCountries = displayCountries.filter((country) => {
        const name = country.name.official.toLowerCase();
        return name.includes(searchTerm.toLowerCase());
    });

    function getValue(country: Country, key: string) {
        switch (key) {
            case 'country':
                return country.name.official || '';
            case 'population':
                return country.population || 0;
            case 'region':
                return country.region || '';
            case 'languages':
                return country.languages || '';
            case 'continents':
                return country.continents || '';
            case 'Size (km²)':
                return country.area || 0;
            default:
                return '';
        }
    }
    const sortedCountries = [...filteredCountries].sort((a, b) => {
        const aValue = getValue(a, sortKey);
        const bValue = getValue(b, sortKey);

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handelSorting = (key: string) => {
        if (key === sortKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };
    const handleRemoveHead = (head: string) => {
        setVisibleHeads((prev) => prev.filter((h) => h !== head));
    };
    const handleAddHead = (head: string) => {
        setVisibleHeads((prev) => {
            const next = [...prev, head];
            return heads.filter((h) => next.includes(h));
        });
    };
    const toggleCountry = (name: string) => {
        setSelectedCountries((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
    };
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedCountries = sortedCountries.slice(startIndex, endIndex);

    return (
        <div className="table-wrapper">
            <div>
                <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
                <CompareButton
                    isComparing={isComparing}
                    selectedCount={selectedCountries.length}
                    onCompare={() => setIsComparing(true)}
                    onCancel={() => {
                        setIsComparing(false);
                        setSelectedCountries([]);
                    }}
                />
            </div>
            <Pagination
                total={sortedCountries.length}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setRowsPerPage}
            />
            <table>
                <TableHeader
                    heads={visibleHeads}
                    allHeads={heads}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    onSort={handelSorting}
                    onRemoveHead={handleRemoveHead}
                    onAddHead={handleAddHead}
                />
                <TableBody
                    countries={paginatedCountries}
                    visibleHeads={visibleHeads}
                    selected={selectedCountries}
                    onCheck={toggleCountry}
                />
            </table>
        </div>
    );
};

export default TableWrapper;
