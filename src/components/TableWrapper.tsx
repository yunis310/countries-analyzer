import { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface Country {
    name: {
        common: string;
        official: string;
    };
    population: number;
    continents: string[];
    languages: { [key: string]: string };
    region: string;
    area: number;
    flags: {
        svg: string;
    };
    size?: number;
}

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
        'area',
        'flag',
    ];

    const [visibleHeads, setVisibleHeads] = useState<string[]>(heads);
    const [sortKey, setSortKey] = useState<string>('country');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [isComparing, setIsComparing] = useState(false);
    const displayCountries = isComparing
        ? countries.filter((c) => selectedCountries.includes(c.name.common))
        : countries;

    function getValue(country: Country, key: string) {
        switch (key) {
            case 'country':
                return country.name.official;
            case 'population':
                return country.population;
            case 'region':
                return country.region;
            case 'languages':
                return country.languages;
            case 'continents':
                return country.continents;
            case 'area':
                return country.area;
            default:
                return '';
        }
    }
    const sortedCountries = [...displayCountries].sort((a, b) => {
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

    console.log(visibleHeads);

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                {selectedCountries.length >= 2 && !isComparing && (
                    <button onClick={() => setIsComparing(true)}>
                        Compare Selected ({selectedCountries.length})
                    </button>
                )}

                {isComparing && (
                    <button
                        onClick={() => {
                            setIsComparing(false);
                            setSelectedCountries([]);
                        }}
                    >
                        Cancel Comparison
                    </button>
                )}
            </div>
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
                    countries={sortedCountries}
                    visibleHeads={visibleHeads}
                    selected={selectedCountries}
                    onCheck={toggleCountry}
                />
            </table>
        </div>
    );
};

export default TableWrapper;
