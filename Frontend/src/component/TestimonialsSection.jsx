const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CEO at TechCorp',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      comment: 'This CRM has transformed how we manage our customer relationships. The automation features have saved us countless hours.'
    },
    // ... add other testimonials here
  ]
  
  const TestimonialsSection = () => {
    return (
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.position}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default TestimonialsSection