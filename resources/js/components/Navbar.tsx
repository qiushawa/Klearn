import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  isHighlight?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  brandName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ items, brandName = 'KLearn' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e: React.FormEvent, href: string) => {
    e.preventDefault();
    // Get the CSRF token from the meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // Create a form dynamically to submit POST request
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = href;

    // Add CSRF token to the form
    if (csrfToken) {
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = '_token'; // Laravel expects '_token' as the CSRF field name
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
    } else {
      console.error('CSRF token not found');
      return;
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
            {brandName}
          </a>
          <div className="hidden md:flex space-x-8">
            {items.map((item) => (
              item.label === '登出' ? (
                <button
                  key={item.href}
                  onClick={(e) => handleLogout(e, item.href)}
                  className={`${
                    item.isHighlight
                      ? 'text-blue-700 hover:text-blue-800'
                      : 'text-gray-700 hover:text-blue-700'
                  } font-medium transition-colors`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${
                    item.isHighlight
                      ? 'text-blue-700 hover:text-blue-800'
                      : 'text-gray-700 hover:text-blue-700'
                  } font-medium transition-colors`}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-2">
            {items.map((item) => (
              item.label === '登出' ? (
                <button
                  key={item.href}
                  onClick={(e) => handleLogout(e, item.href)}
                  className={`block py-1 ${
                    item.isHighlight
                      ? 'text-blue-700 hover:text-blue-800'
                      : 'text-gray-700 hover:text-blue-700'
                  } font-medium`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block py-1 ${
                    item.isHighlight
                      ? 'text-blue-700 hover:text-blue-800'
                      : 'text-gray-700 hover:text-blue-700'
                  } font-medium`}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
