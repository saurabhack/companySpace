const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Efficiently Manage Your Company with CompanySpace
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Streamline employee management, track projects, and boost productivity with our all-in-one company management system.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition duration-300">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;
