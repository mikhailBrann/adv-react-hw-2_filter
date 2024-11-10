import { useState, useEffect, useRef } from 'react';

const FilterView = ({ props }) => {
    // состояние для хранения значения фильтра
    const [filterValue, setFilter] = useState('All');
    // категории для фильтра
    const filterCategory = ['All', ...new Set(props.map((item) => item.category))];

    // для реализации в стиле мансори
    const gridRef = useRef(null);
    useEffect(() => {
        const grid = gridRef.current;
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

        const items = grid.getElementsByClassName('portfolioItem');
        
        Array.from(items).forEach(item => {
            const itemHeight = item.getBoundingClientRect().height;
            const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
            item.style.setProperty('--row-span', rowSpan);
        });
    }, [filterValue, props]);

    // для установки значения фильтра
    const changeFilter = event => setFilter(event.target.dataset.value); 
    const viewTemplate = (item, index) => <img src={item.img} alt={item.category} className='portfolioItem' key={`view-${index}-${item}`}/>;

    const filterCategoryCheckers = [...filterCategory].map((item, index) => {
        return (
            <button key={`checker-${index}-${item}`} 
                className='filterChecker' 
                data-state={item === filterValue ? 'active' : ''} 
                data-value={item} 
                onClick={changeFilter}>
                {item}
            </button>
        )
    });
    const filterViewResult = props.map((item, index) => {
        if (filterValue === 'All') {
            return (
                viewTemplate(item, index)
            )
        }
        
        if (filterValue === item.category) {
            return (
                viewTemplate(item, index)
            )
        }
    });

    return (
        <div className='portfolioWrapper'>
            <div className='portfolioFilter'>
                {[...filterCategoryCheckers]}
            </div>
            <div className='portfolioItems' ref={gridRef}>
                {[...filterViewResult]}
            </div>
        </div>
    );
}

export default FilterView;