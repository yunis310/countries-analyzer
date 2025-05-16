import { useState } from 'react';
import TableHeader from './TableHeader';

interface Country {
    name: {
        common: string;
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
        'size',
    ];

    const [visibleColumns, setVisibleColumns] = useState<string[]>(heads);
    const [sortKey, setSortKey] = useState<string>('country');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    return (
        <div>
            <table>
                <TableHeader heads={heads} />
            </table>
        </div>
    );
};

export default TableWrapper;
