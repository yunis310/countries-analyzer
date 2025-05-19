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
    const formatPopulation = (num: number): string => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleToggle = () => {
        setShowDetails((prev) => !prev);
    };

    const colSpan = visibleHeads.length;

    return (
        <>
            <tr className={showDetails ? 'expanded-row' : ''}>
                {visibleHeads.includes('country') && (
                    <td>
                        <label className="table-row-label">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onCheck(country.name.common)}
                            />
                            <span>{`${country.name.common}`}</span>
                            <button
                                onClick={handleToggle}
                                className="expand-btn"
                            >
                                {showDetails ? '▲' : '▼'}
                            </button>
                        </label>
                    </td>
                )}
                {visibleHeads.includes('population') && (
                    <td>{formatPopulation(country.population)}</td>
                )}
                {visibleHeads.includes('continents') && (
                    <td>{country.continents?.join(', ')}</td>
                )}
                {visibleHeads.includes('languages') && (
                    <td>
                        {country.languages
                            ? Object.values(country.languages).join(', ')
                            : 'N/A'}
                    </td>
                )}
                {visibleHeads.includes('region') && <td>{country.region}</td>}
                {visibleHeads.includes('Size (km²)') && (
                    <td>{formatPopulation(country.area)}</td>
                )}
                {visibleHeads.includes('flag') && (
                    <td>
                        <img
                            className="flag-img"
                            src={country.flags.svg}
                            alt={country.name.common}
                            width="40"
                        />
                    </td>
                )}
            </tr>
            {showDetails && (
                <tr className="detail-row">
                    <td colSpan={colSpan}>
                        <DetailPr country={country} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;
