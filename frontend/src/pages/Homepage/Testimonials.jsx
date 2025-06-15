const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Event Enthusiast",
    content: "I've discovered so many amazing events through this platform. It's completely changed my social life!",
    avatar: "/Images/1.jpg",
  },
  {
    id: 2,
    name: "Michael T.",
    role: "Music Lover",
    content: "The concert recommendations are spot on. I've been to three incredible shows I would have otherwise missed.",
    avatar: "/Images/2.jpeg",
  },
  {
    id: 3,
    name: "Priya K.",
    role: "Food Festival Organizer",
    content: "As an event organizer, this platform has helped me reach the right audience. Ticket sales have doubled!",
    avatar: "/Images/3.jpeg",
  }
];

const Testimonials = () => (
  <section className="py-12">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800">What People Are Saying</h2>
      <p className="text-gray-600 mt-2">Hear from our community</p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-sky-600">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-600">"{testimonial.content}"</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;