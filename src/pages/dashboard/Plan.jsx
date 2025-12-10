import React from 'react';

function Plan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Paket Premium</span>
          </h1>
          <p className="text-gray-400 text-lg">🚀 Upgrade untuk fitur unlimited dan pengalaman terbaik</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-xl border-2 border-gray-700">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Gratis</h3>
              <div className="text-5xl font-bold text-white mb-4">Rp 0</div>
              <p className="text-gray-400">Selamanya</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-3">✓</span> Maksimal 3 todos
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-3">✓</span> Unlimited subtasks
              </li>
              <li className="flex items-center text-gray-300">
                <span className="text-green-400 mr-3">✓</span> Drag & drop
              </li>
            </ul>
            <button className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200">
              Paket Aktif
            </button>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl border-2 border-yellow-400 transform scale-105">
            <div className="text-center mb-6">
              <div className="inline-block bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full mb-4">⭐ POPULER</div>
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Premium</h3>
              <div className="text-5xl font-bold text-white mb-4">Rp 50K</div>
              <p className="text-white/90">Per bulan</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white">
                <span className="text-white mr-3">✓</span> Unlimited todos
              </li>
              <li className="flex items-center text-white">
                <span className="text-white mr-3">✓</span> Unlimited subtasks
              </li>
              <li className="flex items-center text-white">
                <span className="text-white mr-3">✓</span> Drag & drop
              </li>
              <li className="flex items-center text-white">
                <span className="text-white mr-3">✓</span> Priority support
              </li>
            </ul>
            <button 
              onClick={() => window.location.href = '/premium'}
              className="block w-full text-center bg-white text-orange-500 hover:bg-gray-100 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              Upgrade Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;