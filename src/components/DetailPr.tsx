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
              .map((c) => `${c.name} (${c.symbol})`)
              .join(', ')
        : 'N/A';

    return (
        <div className="country-detail">
            <p>
                <strong>{name.common}</strong>, officially known as{' '}
                <em>{name.official}</em>, is located in{' '}
                <strong>{region}</strong> ({subregion || 'Unknown'}). The
                capital is <strong>{capital?.[0] || 'N/A'}</strong>, with a
                population of about{' '}
                <strong>{population.toLocaleString()}</strong>.
            </p>
            <p>
                Languages spoken include <strong>{languageList}</strong>. The
                currency is <strong>{currencyList}</strong>. This country is{' '}
                <strong>{landlocked ? 'landlocked' : 'not landlocked'}</strong>{' '}
                and follows <strong>{timezones?.[0] || 'N/A'}</strong> time. It{' '}
                <strong>{unMember ? 'is' : 'is not'}</strong> a UN member.
                Top-level domain: <strong>{tld?.[0] || 'N/A'}</strong>.
            </p>
            {maps?.googleMaps && (
                <a
                    href={maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-map-link"
                >
                    📍 View on Google Maps
                </a>
            )}
        </div>
    );
};

export default DetailPr;
