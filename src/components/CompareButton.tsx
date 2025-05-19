interface Props {
    isComparing: boolean;
    selectedCount: number;
    onCompare: () => void;
    onCancel: () => void;
}

const CompareButton = ({
    isComparing,
    selectedCount,
    onCompare,
    onCancel,
}: Props) => {
    if (isComparing) {
        return <button onClick={onCancel}>Cancel Comparison</button>;
    }

    if (selectedCount >= 2) {
        return (
            <button className="compare-button" onClick={onCompare}>
                Compare Selected ({selectedCount})
            </button>
        );
    }

    return null;
};

export default CompareButton;
