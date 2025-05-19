import React, { useState } from 'react';

interface Props {
    heads: string[];
    allHeads: string[];
    sortKey: string;
    sortOrder: 'asc' | 'desc';
    onRemoveHead: (key: string) => void;
    onAddHead: (key: string) => void;
    onSort: (key: string) => void;
}

const TableHeader = ({
    heads,
    allHeads,
    sortKey,
    onSort,
    sortOrder,
    onRemoveHead,
    onAddHead,
}: Props) => {
    const hiddenHeads = allHeads.filter((col) => !heads.includes(col));
    const [selectedHead, setSelectedHead] = useState('');

    const handleAdd = () => {
        if (selectedHead) {
            onAddHead(selectedHead);
            setSelectedHead('');
        }
    };

    return (
        <thead>
            <tr>
                {heads.map((head) => {
                    const isSortable = head !== 'flag' && head !== 'languages';
                    return (
                        <th
                            key={head}
                            onClick={() => isSortable && onSort(head)}
                            className={isSortable ? 'sortable' : ''}
                        >
                            {head.toUpperCase()}
                            {head === sortKey && (
                                <span className="sort-icon">
                                    {sortOrder === 'asc' ? '▲' : '▼'}
                                </span>
                            )}
                            {head !== 'country' && (
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveHead(head);
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </th>
                    );
                })}
                {hiddenHeads.length > 0 && (
                    <th>
                        <select
                            value={selectedHead}
                            onChange={(e) => setSelectedHead(e.target.value)}
                        >
                            <option value="">+ Add Column</option>
                            {hiddenHeads.map((h) => (
                                <option key={h} value={h}>
                                    {h.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <button
                            className="add-btn"
                            onClick={handleAdd}
                            disabled={!selectedHead}
                        >
                            Add
                        </button>
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default TableHeader;
