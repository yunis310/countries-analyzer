import TableRow from './TableRow';

interface Country {
    name: { common: string; official: string };
    population: number;
    continents: string[];
    languages: { [key: string]: string };
    region: string;
    area: number;
    flags: { svg: string };
}

interface Props {
    countries: Country[];
    visibleHeads: string[];
    selected: string[];
    onCheck: (name: string) => void;
}

const TableBody = ({ countries, visibleHeads, selected, onCheck }: Props) => {
    return (
        <tbody>
            {countries.map((country, idx) => (
                <TableRow
                    key={idx}
                    country={country}
                    visibleHeads={visibleHeads}
                    checked={selected.includes(country.name.common)}
                    onCheck={onCheck}
                />
            ))}
        </tbody>
    );
};

export default TableBody;
