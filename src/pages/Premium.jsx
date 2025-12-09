import { useState, useEffect } from 'react';
import PremiumController from '../controllers/PremiumController';

const Premium = () => {
  const { packages, voucher, error, success, getPackages, validateVoucher, purchasePremium, clearMessage, clearVoucher } = PremiumController();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPackages();
  }, []);

  const handleVoucherCheck = async () => {
    if (!voucherCode || !selectedPackage) return;
    
    try {
      setLoading(true);
      await validateVoucher(voucherCode, selectedPackage.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    
    try {
      setLoading(true);
      const result = await purchasePremium(selectedPackage.id, voucherCode || null);
      
      console.log('Purchase successful:', result);
      
      // Clear form
      setSelectedPackage(null);
      setVoucherCode('');
      clearVoucher();
      
      // Refresh user data to update premium status
      setTimeout(async () => {
        try {
          const AuthController = (await import('../controllers/AuthController')).default;
          await AuthController.getState().refreshUser();
          window.location.reload();
        } catch (err) {
          console.error('Failed to refresh user data:', err);
          window.location.reload();
        }
      }, 2000);
      
    } catch (err) {
      console.error('Purchase failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const getFinalPrice = () => {
    if (!selectedPackage) return 0;
    
    const originalPrice = Number(selectedPackage.price) || 0;
    
    if (!voucher) return originalPrice;
    
    const discountValue = Number(voucher.discount_value) || 0;
    
    console.log('Debug voucher object:', voucher); // Debug full voucher
    console.log('Debug:', { originalPrice, discountValue, voucher });
    
    if (voucher.discount_type === 'percentage') {
      const discountAmount = originalPrice * discountValue / 100;
      return originalPrice - discountAmount;
    } else {
      return Math.max(0, originalPrice - discountValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Paket Premium</span>
          </h1>
          <p className="text-gray-400 text-lg">🚀 Upgrade untuk fitur unlimited dan pengalaman terbaik</p>
        </div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
            ❌ {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-300 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
            ✅ {success}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => {
            const isPopular = index === 1;
            const isSelected = selectedPackage?.id === pkg.id;
            
            return (
              <div 
                key={pkg.id}
                className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                  isSelected 
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 transform scale-105' 
                    : isPopular 
                      ? 'border-yellow-400/50 transform scale-105' 
                      : 'border-gray-700 hover:border-gray-600 hover:transform hover:scale-105'
                } hover:shadow-yellow-400/20`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      ⭐ POPULER
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    isSelected 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  } shadow-lg`}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                  <p className="text-gray-400 mb-6 text-lg">
                    Akses premium selama <span className="text-yellow-400 font-semibold">
                      {pkg.name?.includes('1 Bulan') ? '1 bulan' : 
                       pkg.name?.includes('3 Bulan') ? '3 bulan' : 
                       pkg.name?.includes('1 Tahun') ? '1 tahun' : 
                       pkg.duration_months ? `${pkg.duration_months} bulan` : '1 bulan'}
                    </span>
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{formatPrice(pkg.price)}</span>
                    <p className="text-gray-400 mt-1">
                      {pkg.name?.includes('1 Bulan') ? 'Per bulan' : 
                       pkg.name?.includes('3 Bulan') ? 'Sekali bayar 3 bulan' : 
                       pkg.name?.includes('1 Tahun') ? 'Sekali bayar 1 tahun' : 'Per periode'}
                    </p>
                  </div>
                  
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}>
                    {isSelected ? '✓ Terpilih' : 'Pilih Paket'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedPackage && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              💳 Konfirmasi Pembelian
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                🎫 Kode Voucher (opsional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder="Masukkan kode voucher (contoh: DISKON50)"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <button
                  onClick={handleVoucherCheck}
                  disabled={!voucherCode || loading}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? '⏳' : '🔍'} Cek
                </button>
              </div>
            </div>

            {voucher && (
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <p className="text-green-300 font-semibold text-center">
                  🎉 Voucher valid! Diskon {voucher.discount_type === 'percentage' ? `${voucher.discount_value || 0}%` : formatPrice(voucher.discount_value || 0)}
                </p>
              </div>
            )}

            <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-3 text-gray-300">
                <span className="text-lg">📦 Paket: {selectedPackage.name}</span>
                <span className="text-lg font-semibold">{formatPrice(selectedPackage.price)}</span>
              </div>
              
              {voucher && (
                <div className="flex justify-between items-center mb-3 text-green-400">
                  <span className="text-lg">🎫 Diskon</span>
                  <span className="text-lg font-semibold">-{formatPrice((Number(selectedPackage.price) || 0) - getFinalPrice())}</span>
                </div>
              )}
              
              <div className="border-t border-gray-600 pt-3">
                <div className="flex justify-between items-center font-bold text-2xl text-white">
                  <span>💰 Total</span>
                  <span className="text-yellow-400">{formatPrice(getFinalPrice())}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setVoucherCode('');
                  clearVoucher();
                  clearMessage();
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                ❌ Batal
              </button>
              <button
                onClick={() => {
                  const message = `Halo Admin, saya ingin upgrade ke ${selectedPackage.name} dengan harga ${formatPrice(getFinalPrice())}${voucher ? ` (pakai voucher ${voucherCode})` : ''}. Mohon diaktifkan premium account saya. Email: ${JSON.parse(localStorage.getItem('user') || '{}').email || 'belum login'}. Terima kasih!`;
                  const whatsappUrl = `https://wa.me/628979045222?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                💬 Hubungi Admin untuk Aktivasi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;