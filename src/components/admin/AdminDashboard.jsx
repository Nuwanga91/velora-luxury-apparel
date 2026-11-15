import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Eye, 
  ArrowLeft, 
  Shield, 
  Layers, 
  Truck,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    products,
    orders,
    formatPrice,
    updateOrderStatus,
    addProduct,
    deleteProduct,
    updateProduct,
    navigateTo,
    addToast
  } = useShop();

  const [activeTab, setActiveTab] = useState('orders'); // orders, products, analytics
  const [orderFilter, setOrderFilter] = useState('all');
  
  // Add Product Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    subtitle: '',
    category: 'women',
    subcategory: 'Dresses',
    price: 450,
    originalPrice: '',
    stockCount: 10,
    description: '',
    material: '100% Organic Silk',
    care: 'Dry clean only',
    fit: 'True to size',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'],
    colors: [
      { name: 'Onyx Noir', hex: '#111111', bgClass: 'bg-[#111111]', imageIndex: 0 },
      { name: 'Champagne', hex: '#F3E8D2', bgClass: 'bg-[#F3E8D2]', imageIndex: 0 }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['Couture', 'New Arrival']
  });

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const lowStockProducts = products.filter((p) => p.stockCount <= 5);

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase().includes(orderFilter.toLowerCase());
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      addToast('Please enter title and price', 'error');
      return;
    }
    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : null,
      stockCount: Number(newProduct.stockCount)
    });
    setAddModalOpen(false);
    setNewProduct({
      name: '',
      subtitle: '',
      category: 'women',
      subcategory: 'Dresses',
      price: 450,
      originalPrice: '',
      stockCount: 10,
      description: '',
      material: '100% Organic Silk',
      care: 'Dry clean only',
      fit: 'True to size',
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'],
      colors: [
        { name: 'Onyx Noir', hex: '#111111', bgClass: 'bg-[#111111]', imageIndex: 0 }
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      tags: ['Couture']
    });
  };

  return (
    <div className="bg-noir-950 text-gray-100 min-h-screen pb-24">
      
      {/* Top Back-Office Bar */}
      <header className="bg-noir-900 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Client Storefront</span>
            </button>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              <span className="font-serif text-lg tracking-wider text-white">
                Maison Velora <span className="text-xs font-sans text-gold uppercase tracking-widest font-semibold ml-1">Back-Office</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Supabase: jbxhauwahewvfoklgxjg</span>
            </div>
            <span className="text-xs text-gray-400 hidden sm:inline-block">
              Logged in as: <strong className="text-white">Alexandre Laurent (Director)</strong>
            </span>
            <div className="w-8 h-8 rounded-full bg-gold text-noir-950 flex items-center justify-center font-bold text-xs">
              AL
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-noir-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Gross Revenue
              </span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <span className="font-serif text-3xl font-normal text-white">
              {formatPrice(totalRevenue)}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last seasonal quarter
            </span>
          </div>

          <div className="bg-noir-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Total Orders
              </span>
              <div className="p-2 rounded-lg bg-gold/10 text-gold">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <span className="font-serif text-3xl font-normal text-white">
              {totalOrders}
            </span>
            <span className="text-[11px] text-gray-400 block mt-2">
              100% On-time courier delivery dispatch
            </span>
          </div>

          <div className="bg-noir-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Avg Order Value
              </span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <span className="font-serif text-3xl font-normal text-white">
              {formatPrice(aov)}
            </span>
            <span className="text-[11px] text-gray-400 block mt-2">
              High couture average cart density
            </span>
          </div>

          <div className="bg-noir-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Low Stock Alerts
              </span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <span className="font-serif text-3xl font-normal text-white">
              {lowStockProducts.length}
            </span>
            <span className="text-[11px] text-amber-400 block mt-2">
              {lowStockProducts.length} creations with ≤ 5 units in atelier
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-gold text-noir-950 shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Order Management ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-gold text-noir-950 shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Product Catalog ({products.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-white hover:bg-gold text-noir-950 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Creation</span>
            </button>
          )}
        </div>

        {/* TAB 1: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider mr-2">Filter Status:</span>
              {['all', 'Confirmed', 'Transit', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors capitalize ${
                    orderFilter === status
                      ? 'bg-white/20 text-white font-semibold'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-noir-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gray-300 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-4 px-4 font-semibold">Order ID</th>
                      <th className="py-4 px-4 font-semibold">Client</th>
                      <th className="py-4 px-4 font-semibold">Items</th>
                      <th className="py-4 px-4 font-semibold">Total Amount</th>
                      <th className="py-4 px-4 font-semibold">Status Milestone</th>
                      <th className="py-4 px-4 font-semibold">Update Status</th>
                      <th className="py-4 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-white">
                          {order.id}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-white block">{order.customer.name}</span>
                          <span className="text-[11px] text-gray-500">{order.customer.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          {order.items.length} garments ({order.items.map((i) => i.name).slice(0, 1).join(', ')}...)
                        </td>
                        <td className="py-4 px-4 font-serif font-bold text-white text-sm">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gold/15 text-gold border border-gold/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-white/10 border border-white/20 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold"
                          >
                            <option value="Order Confirmed" className="bg-noir-900">Order Confirmed</option>
                            <option value="Handcrafted & Packed" className="bg-noir-900">Handcrafted & Packed</option>
                            <option value="In Transit" className="bg-noir-900">In Transit</option>
                            <option value="Out for Delivery" className="bg-noir-900">Out for Delivery</option>
                            <option value="Delivered" className="bg-noir-900">Delivered</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => navigateTo('tracking', order.id)}
                            className="text-xs text-gold hover:underline font-semibold"
                          >
                            Inspect Live Tracker →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-noir-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-gray-300 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 font-semibold">Creation</th>
                    <th className="py-4 px-4 font-semibold">Category</th>
                    <th className="py-4 px-4 font-semibold">Price</th>
                    <th className="py-4 px-4 font-semibold">Stock In Atelier</th>
                    <th className="py-4 px-4 font-semibold">Rating</th>
                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-16 object-cover rounded-md bg-gray-800 shrink-0"
                          />
                          <div>
                            <span className="font-serif text-sm font-semibold text-white block">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-gray-500">SKU: {product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 uppercase text-[11px] tracking-wider text-gray-400">
                        {product.category} • {product.subcategory}
                      </td>
                      <td className="py-4 px-4 font-serif font-bold text-white text-sm">
                        {formatPrice(product.price)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            product.stockCount <= 5
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {product.stockCount} units
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gold">
                        ★ {product.rating} ({product.reviewCount})
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigateTo('product', product.id)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                          title="View on store"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add New Product */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-noir-900 border border-white/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white shadow-2xl relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
              Atelier Inventory
            </span>
            <h3 className="font-serif text-2xl font-normal mb-6">
              Add New Couture Garment to Catalog
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Garment Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Sculpted Silk Crepe Evening Cape"
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Subtitle / Fabric Line
                </label>
                <input
                  type="text"
                  value={newProduct.subtitle}
                  onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                  placeholder="e.g. 100% Heavy Silk Crepe de Chine"
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                  >
                    <option value="women" className="bg-noir-900">Women</option>
                    <option value="men" className="bg-noir-900">Men</option>
                    <option value="accessories" className="bg-noir-900">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                    placeholder="e.g. Capes & Shawls"
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="Optional"
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.stockCount}
                    onChange={(e) => setNewProduct({ ...newProduct, stockCount: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  High-Resolution Editorial Image URL
                </label>
                <input
                  type="url"
                  value={newProduct.images[0]}
                  onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                  Atelier Description
                </label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Describe the silhouette, drape, and hand-feel..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gold hover:bg-gold-light text-noir-950 py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg transition-colors"
                >
                  Publish Creation to Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-6 py-3 border border-white/20 rounded-xl text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
