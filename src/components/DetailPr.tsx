import React from 'react';
import { Country } from '../store/countriesSlice';

interface Props {
    country: Country;
}

const DetailPr: React.FC<Props> = ({ country }) => {
    if (!country) return null;

    const {
        name,
        capital,
        population,
        region,
        subregion,
        languages,
        currencies,
        tld,
        landlocked,
        timezones,
        unMember,
        maps,
    } = country;

    const languageList = languages
        ? Object.values(languages).join(', ')
        : 'N/A';
    const currencyList = currencies
        ? Object.values(currencies)
              .map((c) => {
                  const currency = c as { name: string; symbol: string };
                  return `${currency.name} (${currency.symbol})`;
              })
              .join(', ')
        : 'N/A';

    return (
        <>
            <p>
                <strong>{name.common}</strong>, officially known as the{' '}
                <em>{name.official}</em>, is a country in the region of{' '}
                <strong>{region}</strong>, specifically{' '}
                <strong>{subregion}</strong>. Its capital is{' '}
                <strong>{capital?.[0]}</strong>, and it has a population of
                approximately <strong>{population.toLocaleString()}</strong>.
            </p>
            <p>
                The official language is <strong>{languageList}</strong>, and
                the currency used is <strong>{currencyList}</strong>. It is{' '}
                {landlocked ? 'landlocked' : 'not landlocked'} and operates in
                the <strong>{timezones?.[0]}</strong> timezone. It{' '}
                {unMember ? 'is' : 'is not'} a member of the United Nations. Its
                top-level domain is <strong>{tld?.[0]}</strong>.
            </p>
            <a
                href={maps && maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline inline-block"
            >
                📍 View on Google Maps
            </a>
        </>
    );
};

export default DetailPr;
