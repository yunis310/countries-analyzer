import TableRow from './TableRow';
import { Country } from '../../store/countriesSlice';
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
