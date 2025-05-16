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

    return (
        <div>
            <table>
                <TableHeader heads={visibleHeads} />
                <TableBody countries={countries} visibleHeads={visibleHeads} />
            </table>
        </div>
    );
};

export default TableWrapper;
