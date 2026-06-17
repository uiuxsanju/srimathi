import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, Boxes, ShoppingBag, IndianRupee, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { useProductStore } from '@/store/useProductStore';
import { formatINR, discountedPrice } from '@/lib/utils';
import { Seo } from '@/components/Seo';

const revenueTrend = [
  { m: 'Jan', v: 182000 }, { m: 'Feb', v: 224000 }, { m: 'Mar', v: 198000 },
  { m: 'Apr', v: 286000 }, { m: 'May', v: 312000 }, { m: 'Jun', v: 358000 },
];
const PIE = ['#1A1A1A', '#C9A24B', '#E7D3B1', '#9BA88F', '#B98A6A', '#7C6F64', '#A8B0BD', '#D08C7A', '#8C9A6B', '#C0B283'];

export default function Dashboard() {
  const { products, categories } = useProductStore();

  const stats = useMemo(() => {
    const inventory = products.reduce((s, p) => s + p.stock, 0);
    const stockValue = products.reduce((s, p) => s + discountedPrice(p.price, p.discount) * p.stock, 0);
    const lowStock = products.filter((p) => p.stock <= 10);
    return { inventory, stockValue, lowStock };
  }, [products]);

  const byCategory = useMemo(
    () =>
      categories
        .map((c) => ({ name: c.name, value: products.filter((p) => p.category === c.slug).length }))
        .filter((d) => d.value > 0),
    [products, categories],
  );

  const topStock = useMemo(
    () => [...products].sort((a, b) => b.stock - a.stock).slice(0, 6).map((p) => ({ name: p.name.split(' ').slice(0, 2).join(' '), stock: p.stock })),
    [products],
  );

  const cards = [
    { label: 'Total Products', value: products.length, icon: Package, sub: 'Live in catalogue' },
    { label: 'Categories', value: categories.length, icon: Tags, sub: 'Active collections' },
    { label: 'Inventory Units', value: stats.inventory, icon: Boxes, sub: 'In stock' },
    { label: 'Orders', value: 248, icon: ShoppingBag, sub: '+12% this month' },
    { label: 'Revenue', value: formatINR(358000), icon: IndianRupee, sub: 'June (demo)' },
    { label: 'Stock Value', value: formatINR(stats.stockValue), icon: TrendingUp, sub: 'Catalogue worth' },
  ];

  return (
    <div className="space-y-8">
      <Seo title="Dashboard · Admin" noIndex />
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="font-display text-3xl md:text-4xl">Dashboard</h1>
        </div>
        <Link to="/admin/products" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream hover:bg-ink/90">
          Manage products <ArrowUpRight size={16} />
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card-luxe p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink/5"><c.icon size={18} /></span>
            </div>
            <p className="mt-4 font-display text-2xl md:text-3xl">{c.value}</p>
            <p className="text-sm font-medium">{c.label}</p>
            <p className="text-xs text-ink/50">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card-luxe p-5 lg:col-span-2">
          <h3 className="mb-4 font-display text-xl">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ left: -10, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#C9A24B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A12" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip formatter={(v: number) => formatINR(v)} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,.12)' }} />
                <Area type="monotone" dataKey="v" stroke="#C9A24B" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-luxe p-5">
          <h3 className="mb-4 font-display text-xl">By Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={48} outerRadius={88} paddingAngle={2}>
                  {byCategory.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,.12)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card-luxe p-5 lg:col-span-2">
          <h3 className="mb-4 font-display text-xl">Stock Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topStock} margin={{ left: -14, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A12" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} interval={0} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,.12)' }} />
                <Bar dataKey="stock" fill="#1A1A1A" radius={[8, 8, 0, 0]} barSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-luxe p-5">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className="font-display text-xl">Low Stock</h3>
          </div>
          {stats.lowStock.length === 0 ? (
            <p className="text-sm text-ink/50">All products well stocked.</p>
          ) : (
            <ul className="space-y-3">
              {stats.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm">{p.name}</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
