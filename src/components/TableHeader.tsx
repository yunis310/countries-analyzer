interface Props {
    heads: string[];
}

const TableHeader = ({ heads }: Props) => {
    return (
        <thead>
            <tr>
                {heads.map((head) => (
                    <th key={head}>
                        {head.toUpperCase()} {head === 'asc' ? '▲' : '▼'}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
