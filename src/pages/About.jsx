function About() {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen py-40 xl:px-60 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-500/5"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="xl:text-6xl text-5xl font-bold mb-4" data-aos="fade-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">👋 Tentang</span>
            <span className="text-white"> Kami</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 xl:p-12 shadow-2xl border border-gray-700 mb-12" data-aos="fade-up" data-aos-duration="1200">
          <p className="text-2xl text-gray-300 font-medium xl:text-center text-justify leading-relaxed">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-bold">TodoDin</span> adalah aplikasi manajemen tugas yang dirancang untuk membantu
            kamu menjadi lebih <span className="text-yellow-400 font-semibold">teratur</span>, <span className="text-yellow-400 font-semibold">fokus</span>, dan <span className="text-yellow-400 font-semibold">produktif</span> setiap hari. Mulai
            dari mencatat ide, menyusun jadwal harian, hingga menyelesaikan tugas
            tepat waktu semua bisa dilakukan dalam satu platform yang simpel dan
            menyenangkan.
          </p>
        </div>

        <div className="relative" data-aos="fade-up" data-aos-duration="1400">
          <img
            src="/time-organization-concept-close-up.jpg"
            className="xl:h-[35rem] h-[25rem] w-full object-cover rounded-3xl shadow-2xl border-4 border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
            alt="TodoDin"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-3xl flex items-end p-8">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-2">✨ Produktivitas Maksimal</h3>
              <p className="text-lg text-gray-300">Kelola semua tugas Anda dalam satu tempat</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="100">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Fokus</h3>
            <p className="text-gray-400">Prioritaskan tugas penting dan selesaikan dengan efektif</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="200">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Produktif</h3>
            <p className="text-gray-400">Tingkatkan produktivitas dengan manajemen waktu yang baik</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Teratur</h3>
            <p className="text-gray-400">Organisir semua tugas dengan rapi dan mudah diakses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
