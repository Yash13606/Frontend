import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { stores } from '@/data/mockData';

export const StoreSelector = () => {
  const { selectedStore, setSelectedStore } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentStore = selectedStore === 'all'
    ? { name: 'All Stores' }
    : stores.find(s => s.id === selectedStore) ?? { name: 'All Stores' };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-colors"
        style={{
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#FFFFFF',
        }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#00FF88' }} />
        {currentStore.name}
        <ChevronDown size={12} style={{ color: '#444' }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-50 rounded-lg overflow-hidden min-w-[160px]"
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          {[{ id: 'all', name: 'All Stores' }, ...stores].map(store => (
            <button
              key={store.id}
              onClick={() => { setSelectedStore(store.id); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-white/5"
              style={{ color: selectedStore === store.id ? '#00FF88' : '#888888' }}
            >
              {store.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreSelector;
