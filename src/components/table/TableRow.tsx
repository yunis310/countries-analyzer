import { useState } from 'react';
import DetailPr from '../DetailPr';
import { Country } from '../../store/countriesSlice';

interface Props {
    country: Country;
    visibleHeads: string[];
    checked: boolean;
    onCheck: (countryName: string) => void;
}

const TableRow = ({ country, visibleHeads, onCheck, checked }: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = () => {
        setShowDetails(!showDetails);
    };
    return (
        <>
            <tr>
                {visibleHeads.includes('country') && (
                    <td>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onCheck(country.name.common)}
                        />
                        {`${country.name.official} (${country.name.common})`}
                        <button onClick={handleToggle}>
                            {showDetails ? '▲' : '▼'}
                        </button>
                    </td>
                )}
                {visibleHeads.includes('population') && (
                    <td>{country.population.toLocaleString()}</td>
                )}
                {visibleHeads.includes('continents') && (
                    <td>
                        {country.continents && country.continents.join(', ')}
                    </td>
                )}
                {visibleHeads.includes('languages') && (
                    <td>
                        {country.languages
                            ? Object.values(country.languages).join(', ')
                            : 'N/A'}
                    </td>
                )}

                {visibleHeads.includes('region') && <td>{country.region}</td>}
                {visibleHeads.includes('area') && (
                    <td>{country.area.toLocaleString()}</td>
                )}
                {visibleHeads.includes('flag') && (
                    <td>
                        <img
                            src={country.flags.svg}
                            alt={country.name.common}
                            width="40"
                        />
                    </td>
                )}
            </tr>
            {showDetails && (
                <tr>
                    <td colSpan={4}>
                        {country && <DetailPr country={country} />}
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
