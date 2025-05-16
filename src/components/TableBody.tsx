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
}

const TableBody = ({ countries, visibleHeads }: Props) => {
    return (
        <tbody>
            {countries.map((country, idx) => (
                <TableRow
                    key={idx}
                    country={country}
                    visibleHeads={visibleHeads}
                />
            ))}
        </tbody>
    );
};

export default TableBody;
