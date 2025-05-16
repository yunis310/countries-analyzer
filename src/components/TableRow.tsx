interface Country {
    name: { common: string; official: string };
    population: number;
    continents: string[];
    languages: { [key: string]: string };
    region: string;
    area: number;
    flags: { svg: string };
    size?: number;
}

interface Props {
    country: Country;
    visibleHeads: string[];
}

const TableRow = ({ country, visibleHeads }: Props) => {
    return (
        <tr>
            {visibleHeads.includes('country') && (
                <td>{`${country.name.official} (${country.name.common})`}</td>
            )}
            {visibleHeads.includes('population') && (
                <td>{country.population.toLocaleString()}</td>
            )}
            {visibleHeads.includes('continents') && (
                <td>{country.continents.join(', ')}</td>
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
    );
};

export default TableRow;
