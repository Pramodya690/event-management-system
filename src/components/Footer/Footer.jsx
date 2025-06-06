const Footer = () => {
  return (
    <footer className="bg-blue-50 text-blue-800 py-8 mt-10 border-t border-blue-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">

          {/* Left Section */}
          <div className="text-center sm:text-left text-sm">
            &copy; {new Date().getFullYear()} EventSphere. All rights reserved.
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-800">
            <a href="/about" className="hover:text-blue-600 transition">About</a>
            <a href="/blog" className="hover:text-blue-600 transition">Blog</a>
            <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
            <a href="/privacy" className="hover:text-blue-600 transition">Privacy</a>
            <a href="/terms" className="hover:text-blue-600 transition">Terms</a>
            <a href="/cookies" className="hover:text-blue-600 transition">Cookies</a>
          </div>

          {/* Right: Social Media */}
          <div className="flex gap-4 text-blue-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.6V12h2.6V9.8c0-2.58 1.54-4 3.9-4 1.13 0 2.31.2 2.31.2v2.54h-1.3c-1.28 0-1.67.8-1.67 1.6V12h2.84l-.45 2.88h-2.39v6.99A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.37 8.5 8.5 0 01-2.7 1.03 4.27 4.27 0 00-7.3 3.9A12.13 12.13 0 013 5.1a4.27 4.27 0 001.32 5.7 4.23 4.23 0 01-1.93-.53v.05a4.28 4.28 0 003.42 4.2 4.3 4.3 0 01-1.92.07 4.27 4.27 0 003.98 2.97A8.58 8.58 0 012 19.55a12.08 12.08 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.18 0-.36-.01-.53A8.67 8.67 0 0024 5.57a8.47 8.47 0 01-2.54.7z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 011.78 1.08 4.91 4.91 0 011.08 1.78c.17.46.353 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.88 4.88 0 01-1.08 1.78 4.88 4.88 0 01-1.78 1.08c-.46.17-1.26.353-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.91 4.91 0 01-1.78-1.08 4.91 4.91 0 01-1.08-1.78c-.17-.46-.353-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.91 4.91 0 011.08-1.78 4.91 4.91 0 011.78-1.08c.46-.17 1.26-.353 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.012-4.76.07-.99.047-1.53.21-1.88.35-.47.18-.8.39-1.16.75a3.13 3.13 0 00-.75 1.16c-.14.35-.3.89-.35 1.88-.058 1.24-.07 1.61-.07 4.76s.012 3.52.07 4.76c.047.99.21 1.53.35 1.88.18.47.39.8.75 1.16.35.35.69.57 1.16.75.35.14.89.3 1.88.35 1.24.058 1.61.07 4.76.07s3.52-.012 4.76-.07c.99-.047 1.53-.21 1.88-.35a3.13 3.13 0 001.16-.75c.35-.35.57-.69.75-1.16.14-.35.3-.89.35-1.88.058-1.24.07-1.61.07-4.76s-.012-3.52-.07-4.76c-.047-.99-.21-1.53-.35-1.88a3.13 3.13 0 00-.75-1.16 3.13 3.13 0 00-1.16-.75c-.35-.14-.89-.3-1.88-.35-1.24-.058-1.61-.07-4.76-.07zm0 3.6a5.4 5.4 0 110 10.8 5.4 5.4 0 010-10.8zm0 1.8a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zm6.9-1.08a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

