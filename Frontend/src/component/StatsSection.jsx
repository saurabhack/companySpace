const StatsSection = () => {
    const stats = [
      { number: "10k+", label: "Active Users" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "24/7", label: "Customer Support" }
    ]
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default StatsSection