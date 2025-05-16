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

    return (
        <thead>
            <tr>
                {heads.map((head) => (
                    <th
                        key={head}
                        onClick={() =>
                            head !== 'flag' &&
                            head !== 'languages' &&
                            onSort(head)
                        }
                    >
                        {head.toUpperCase()}{' '}
                        {head === sortKey && (sortOrder === 'asc' ? '▲' : '▼')}
                        {head !== 'country' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveHead(head);
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </th>
                ))}
                {hiddenHeads.length > 0 && (
                    <th>
                        <button
                            onClick={() => {
                                const next = hiddenHeads[0];
                                if (next) onAddHead(next);
                            }}
                        >
                            + Add
                        </button>
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default TableHeader;
