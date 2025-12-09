import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center min-h-screen py-10 2xl:py-20 2xl:px-60 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5"></div>
        <div className="grid xl:grid-cols-2 grid-cols-1 xl:space-x-5 relative z-10">
          <div className="flex justify-center flex-col">
            <div className="flex justify-end xl:hidden mb-8">
            <img src="/src/assets/checklist-1-18.svg" className="w-[35rem] animate-pulse" alt="" />
          </div>
            <h1
              className="font-bold xl:text-6xl text-center xl:text-start text-4xl text-white leading-tight"
              data-aos="fade-up"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Kelola tugas</span> harianmu
              dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">cara yang</span> lebih
              mudah <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">dan teratur</span>
            </h1>
            <div
              data-aos="fade-up"
              className="pt-8 flex xl:justify-start justify-center"
              data-aos-duration="1400"
            >
              <Link
                to="/login"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 font-bold text-white px-12 xl:text-3xl text-2xl py-4 shadow-2xl rounded-full transform hover:scale-110 transition-all duration-300"
              >
                🚀 Mulai Sekarang
              </Link>
            </div>
          </div>
          <div className="xl:flex justify-end hidden">
            <img src="/src/assets/checklist-1-18.svg" className="xl:w-[35rem] w-[20rem] animate-pulse" alt="" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-40 2xl:px-60 px-6">
        <h1
          className="font-bold text-4xl xl:text-6xl text-white text-center mb-4"
          data-aos="fade-up"
        >
          Kelola <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Harimu</span> Jadi Lebih Baik
        </h1>
        <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          ✨ Produktivitas maksimal dengan manajemen tugas yang efektif
        </p>
        <div
          className="grid xl:grid-cols-2 grid-cols-1 mt-16 xl:space-x-16"
          data-aos="fade-up"
        >
          <div>
            <img
              src="/src/assets/time-organization-concept-close-up.jpg"
              className="rounded-2xl shadow-2xl xl:mb-0 mb-3 border-4 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold xl:text-4xl text-3xl mb-4 xl:text-start text-justify text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              🎯 Fokus Lebih Baik, Selesaikan Lebih Banyak
            </h1>
            <p className="text-gray-300 font-medium text-lg xl:text-start text-justify leading-relaxed">
              TodoDin membantumu mencatat, menjadwalkan, dan menyelesaikan
              semua tugas pentingmu setiap hari. Tidak ada lagi tugas yang
              terlupa semua tercatat rapi dalam satu aplikasi yang mudah
              digunakan.
            </p>
          </div>
        </div>
        <div
          className="grid xl:grid-cols-2 grid-cols-1 mt-20 xl:space-x-16 xl:text-end"
          data-aos="fade-up"
        >
          <div className="md:hidden">
            <img
              src="/src/assets/top-view-arrangement-with-calendar-pencils.jpg"
              className="rounded-2xl shadow-2xl mb-3 border-4 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold xl:text-4xl text-3xl text-justify xl:text-end mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              📈 Pantau Progres, Capai Target
            </h1>
            <p className="text-gray-300 font-medium text-lg text-justify xl:text-end leading-relaxed">
              Tandai tugas yang sudah selesai, lihat apa saja yang tertunda, dan
              atur ulang prioritasmu dengan mudah. TodoDin hadir untuk
              membantumu tetap produktif dan disiplin, kapan saja dan di mana
              saja.
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src="/src/assets/top-view-arrangement-with-calendar-pencils.jpg"
              className="rounded-2xl shadow-2xl border-4 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-40 2xl:px-60 px-6 grid xl:grid-cols-2 grid-cols-1 xl:space-x-16">
        <div data-aos="fade-up">
          <img
            src="/src/assets/time-organization-concept-with-planner-top-view.jpg"
            className="rounded-2xl shadow-2xl mb-3 xl:mb-0 border-4 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center" data-aos="fade-up">
          <h1 className="font-bold text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            ✅ Atur Tugasmu, Raih Hari yang Produktif
          </h1>
          <p className="text-gray-300 font-medium text-lg text-justify leading-relaxed mb-6">
            TodoDin membantumu mencatat tugas, mengatur jadwal, dan
            menyelesaikan pekerjaan tepat waktu. Cocok untuk pelajar, pekerja,
            atau siapa pun yang ingin hidup lebih teratur.
          </p>
          <div className="pt-5">
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-xl shadow-2xl rounded-full text-white font-bold px-8 py-4 transform hover:scale-110 transition-all duration-300"
            >
              🚀 Mulai Sekarang
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-40 2xl:px-60 px-6">
        <div className="text-center mb-16">
          <h1 className="font-bold text-4xl xl:text-5xl text-white mb-4" data-aos="fade-up">
            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Paket</span> Anda
          </h1>
          <p className="text-gray-400 text-lg" data-aos="fade-up" data-aos-delay="200">
            🎉 Mulai gratis atau upgrade untuk fitur unlimited
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-xl border-2 border-gray-700" data-aos="fade-up" data-aos-delay="100">
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
            <Link
              to="/register"
              className="block text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Mulai Gratis
            </Link>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl border-2 border-yellow-400 transform scale-105" data-aos="fade-up" data-aos-delay="200">
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
            <Link
              to="/premium"
              className="block text-center bg-white text-orange-500 hover:bg-gray-100 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              Upgrade Sekarang
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;