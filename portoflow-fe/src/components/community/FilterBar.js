const FilterBar = ({ styles, filters, activeFilter, onFilterChange }) => {
    return (
        <div className={styles.filterBar}>
            <span>Sort & View</span>
            {filters.map(filter => (
                <button
                    key={filter}
                    className={activeFilter === filter ? styles.activeFilter : ''}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;