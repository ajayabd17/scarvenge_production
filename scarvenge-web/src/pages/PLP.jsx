import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton/Skeleton';
import { Chip } from '../components/Chip/Chip';
import { PRODUCTS } from '../data/products';
import { SIZE_OPTIONS, COLOR_OPTIONS, FIT_OPTIONS, GENDER_OPTIONS } from '../data/categories';
import './PLP.css';

const SORT_OPTIONS = [
  { value: 'featured',  label: 'Featured' },
  { value: 'newest',    label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc',label: 'Price: High → Low' },
  { value: 'discount',  label: 'Discount %' },
];

function sortProducts(products, sort) {
  return [...products].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'newest')     return b.isNew - a.isNew;
    if (sort === 'discount')   return ((b.compareAtPrice || b.price) - b.price) - ((a.compareAtPrice || a.price) - a.price);
    return 0;
  });
}

export default function PLP({ title = 'All Products' }) {
  const [searchParams] = useSearchParams();
  const [view,    setView]    = useState('grid');
  const [sort,    setSort]    = useState('featured');
  const [filters, setFilters] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const filterParam = searchParams.get('filter');

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (filterParam === 'new')        list = list.filter(p => p.isNew);
    if (filterParam === 'bestseller') list = list.filter(p => p.isBestSeller);
    if (filterParam === 'sale')       list = list.filter(p => p.compareAtPrice);
    if (filterParam === 'trending')   list = list.filter(p => p.isTrending);
    if (filters.gender)     list = list.filter(p => p.gender === filters.gender.toLowerCase());
    if (filters.fit)        list = list.filter(p => p.fit === filters.fit);
    if (filters.category)   list = list.filter(p => p.category === filters.category);
    return sortProducts(list, sort);
  }, [filterParam, filters, sort]);

  const activeFilterCount = Object.keys(filters).length;

  const removeFilter = (key) => {
    setFilters(f => { const n = { ...f }; delete n[key]; return n; });
  };

  const clearAll = () => setFilters({});

  const filterGroups = [
    { key: 'gender',   label: 'Gender',   options: GENDER_OPTIONS },
    { key: 'fit',      label: 'Fit',      options: FIT_OPTIONS },
    { key: 'category', label: 'Category', options: ['compression','tops','bottoms','accessories'] },
  ];

  return (
    <div className="plp page-enter">
      <div className="plp__hero container">
        <h1 className="plp__title">{title}</h1>
        <p className="plp__count">{filtered.length} products</p>
      </div>

      <div className="plp__body container">
        {/* Sidebar filters */}
        <aside className={['plp__sidebar', drawerOpen ? 'plp__sidebar--open' : ''].join(' ')} aria-label="Product filters">
          <div className="plp__sidebar-header">
            <span className="plp__sidebar-title">Filters {activeFilterCount > 0 && <span className="plp__filter-count">{activeFilterCount}</span>}</span>
            <button className="plp__sidebar-close" onClick={() => setDrawerOpen(false)} aria-label="Close filters"><X size={20}/></button>
          </div>
          {filterGroups.map(grp => (
            <div key={grp.key} className="filter-group">
              <p className="filter-group__label">{grp.label}</p>
              <div className="filter-group__options">
                {grp.options.map(opt => (
                  <button
                    key={opt}
                    className={['filter-pill', filters[grp.key] === opt ? 'filter-pill--active' : ''].join(' ')}
                    onClick={() => setFilters(f => f[grp.key] === opt ? (removeFilter(grp.key), f) : { ...f, [grp.key]: opt })}
                    aria-pressed={filters[grp.key] === opt}
                  >{opt}</button>
                ))}
              </div>
            </div>
          ))}
          {activeFilterCount > 0 && (
            <button className="plp__clear-all" onClick={clearAll}>Clear All Filters</button>
          )}
        </aside>

        {drawerOpen && <div className="plp__overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />}

        {/* Main content */}
        <div className="plp__main">
          {/* Toolbar */}
          <div className="plp__toolbar">
            <button className="plp__filter-toggle" onClick={() => setDrawerOpen(true)} aria-label="Open filters">
              <SlidersHorizontal size={18} />
              Filters {activeFilterCount > 0 && <span className="plp__filter-count">{activeFilterCount}</span>}
            </button>

            {/* Active chips */}
            <div className="plp__active-chips">
              {Object.entries(filters).map(([key, val]) => (
                <Chip key={key} label={val} onRemove={() => removeFilter(key)} />
              ))}
            </div>

            <div className="plp__toolbar-right">
              <select className="plp__sort" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="plp__view-toggle">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Grid size={18}/></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><List size={18}/></button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="plp__empty">
              <p className="plp__empty-title">No products match your filters.</p>
              <button className="plp__clear-btn" onClick={clearAll}>Clear Filters</button>
            </div>
          ) : (
            <div className={view === 'grid' ? 'product-grid' : 'product-list'}>
              {filtered.slice(0, visibleCount).map(p => (
                <ProductCard key={p.id} product={p} view={view} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="plp__load-more">
              <button className="plp__load-more-btn" onClick={() => setVisibleCount(n => n + 12)}>
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
