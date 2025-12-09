function Contact() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen">
      {/* Hero Section */}
      <div className="py-32 xl:px-60 px-6">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-12 items-center">
          <div className="mb-6 xl:mb-0" data-aos="fade-right">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <img
                src="/src/assets/top-view-arrangement-with-calendar-pencils.jpg"
                className="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition duration-300"
                alt="Contact Us"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center" data-aos="fade-left">
            <h1 className="font-extrabold xl:text-6xl text-5xl text-white leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Kontak</span> Kami
            </h1>
            <p className="text-gray-300 xl:mt-6 mt-4 text-xl leading-relaxed">
              Punya pertanyaan, saran, atau butuh bantuan? Tim <span className="text-yellow-400 font-semibold">TodoDin</span> siap membantumu! Jangan ragu untuk menghubungi kami melalui kontak berikut. Kami ingin mendengar darimu. 💬
            </p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-20">
          <a href="https://wa.me/6208979045222" target="_blank" rel="noopener noreferrer"
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-green-500 hover:to-green-600 p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-transparent cursor-pointer"
            data-aos="fade-up"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative text-center">
              <div className="text-6xl mb-6">
                <i className="fa-brands fa-whatsapp text-green-400 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">WhatsApp</h3>
              <p className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300">08979045222</p>
            </div>
          </a>

          <a href="mailto:TodoDin@gmail.com"
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-blue-600 p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-transparent cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative text-center">
              <div className="text-6xl mb-6">
                <i className="fa-solid fa-envelope text-blue-400 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Email</h3>
              <p className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300">TodoDin@gmail.com</p>
            </div>
          </a>

          <div
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-500 hover:to-red-600 p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-transparent"
            data-aos="fade-up"
            data-aos-duration="1400"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative text-center">
              <div className="text-6xl mb-6">
                <i className="fa-solid fa-location-dot text-red-400 group-hover:text-white transition-colors duration-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Lokasi</h3>
              <p className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300">Gang Mahmud 1, Sukabumi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maps Section */}
      <div className="pt-10 px-6 xl:px-60 pb-32">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            📍 Temukan Kami
          </h2>
          <p className="text-gray-400 text-lg">Kunjungi kantor kami atau hubungi untuk informasi lebih lanjut</p>
        </div>
        <div 
          className="relative group"
          data-aos="fade-up" 
          data-aos-duration="1200"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8!2d106.9267!3d-6.9278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnNDAuMSJTIDEwNsKwNTUnMzYuMSJF!5e0!3m2!1sid!2sid!4v1234567890&q=Gang+Mahmud+1+Sukabumi"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
