interface Props {
    heads: string[];
    sortKey: string;
    sortOrder: 'asc' | 'desc';

    onSort: (key: string) => void;
}
const TableHeader = ({ heads, sortKey, onSort, sortOrder }: Props) => {
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
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
