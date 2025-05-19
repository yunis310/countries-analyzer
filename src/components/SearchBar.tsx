import React from 'react';

interface Props {
    searchTerm: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by country name..."
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
