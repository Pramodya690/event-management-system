const NewsletterSignup = () => (
  <section className="py-12 bg-sky-600 rounded-xl my-12 text-white">
    <div className="max-w-2xl mx-auto text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-6 text-sky-100">
        Subscribe to our newsletter to get the latest event updates
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <button className="bg-white text-sky-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);

export default NewsletterSignup;