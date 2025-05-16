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

    function getValue(country: Country, key: string) {
        console.log(country, ': Country', key, ': string');
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
    const sortedCountries = [...countries].sort((a, b) => {
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

    return (
        <div>
            <table>
                <TableHeader
                    heads={visibleHeads}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    onSort={handelSorting}
                />
                <TableBody
                    countries={sortedCountries}
                    visibleHeads={visibleHeads}
                />
            </table>
        </div>
    );
};

export default TableWrapper;
