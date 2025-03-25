const CTASection = () => {
  return (
    <div className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-indigo-100 mb-8">
          Join thousands of satisfied customers and transform your business today
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-300">
            Start Free Trial
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default CTASection