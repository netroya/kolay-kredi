import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Calculator, CreditCard, Gift, DollarSign } from 'lucide-react'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: null },
    { name: 'Kredi', href: '/kredi', icon: Calculator },
    { name: 'Kredi Kartı', href: '/kredi-karti', icon: CreditCard },
    { name: 'Promosyonlar', href: '/emekli-promosyonu', icon: Gift },
    { name: 'Ücretler', href: '/ucretler', icon: DollarSign }
  ]

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Kolay Kredi</h1>
                <p className="text-xs text-gray-500">Kredi Karşılaştırma</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActivePath(item.href)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  } px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent flex items-center`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Ana menü"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActivePath(item.href)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 flex items-center`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {Icon && <Icon className="w-5 h-5 mr-3" />}
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Header