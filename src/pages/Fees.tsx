import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import SearchBox from '../components/SearchBox'
import ResetButton from '../components/ResetButton'
import SortableHeader from '../components/SortableHeader'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
import LogoCell from '../components/LogoCell'
import { fees, getCategoryDisplayName } from '../data/fees'
import { useSort } from '../hooks/useSort'
import { usePagination } from '../hooks/usePagination'
import { DollarSign, TrendingDown } from 'lucide-react'

const Fees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [amountRange, setAmountRange] = useState<string>('all')

  // Filter fees based on search and filters
  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || fee.category === selectedCategory
    const feeAmount = typeof fee.amount === 'number' ? fee.amount : 999999
    const matchesAmount = amountRange === 'all' || 
      (amountRange === 'free' && feeAmount === 0) ||
      (amountRange === 'low' && feeAmount > 0 && feeAmount <= 20) ||
      (amountRange === 'medium' && feeAmount > 20 && feeAmount <= 100) ||
      (amountRange === 'high' && feeAmount > 100)
    
    return matchesSearch && matchesCategory && matchesAmount
  })

  // Sorting
  const { sortedData: sortedFees, sortConfig, handleSort } = useSort({
    data: filteredFees,
    initialSort: { key: 'amount', direction: 'asc' }
  })

  // Pagination
  const { 
    paginatedData, 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage,
    goToPage 
  } = usePagination({
    data: sortedFees,
    itemsPerPage: 10
  })

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setAmountRange('all')
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || amountRange !== 'all'

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      monthly: 'Aylık',
      yearly: 'Yıllık',
      'per-transaction': 'İşlem Başı',
      'one-time': 'Tek Seferlik'
    }
    return labels[frequency as keyof typeof labels] || frequency
  }

  const formatAmount = (amount: number | string) => {
    if (amount === 0) return 'ÜCRETSİZ'
    if (typeof amount === 'string') return 'Değişken'
    return `${amount} TL`
  }

  return (
    <>
      <Helmet>
        <title>Banka Ücret Tarifeleri - Hesap İşletim ve Kart Ücretleri | Kolay Kredi</title>
        <meta name="description" content="Türkiye'nin önde gelen bankalarının ücret tarifelerini karşılaştırın. Hesap işletim, kart ve transfer ücretleri." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/ucretler" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-green-50 to-emerald-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Banka Ücret Tarifeleri
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Türkiye'nin önde gelen bankalarının ücret tarifelerini karşılaştırın. 
              Hesap işletim, kart ve transfer ücretlerini inceleyin.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="fee-search" className="block text-sm font-medium text-gray-900 mb-2">
                Banka veya Ücret Adı Ara
              </label>
              <SearchBox
                id="fee-search"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Banka adı veya ücret türü yazın..."
                aria-describedby="search-help"
              />
              <span id="search-help" className="sr-only">Arama yaparak bankaları ve ücret türlerini filtreleyebilirsiniz</span>
            </div>
            
            <div>
              <label htmlFor="fee-category" className="block text-sm font-medium text-gray-900 mb-2">
                Ücret Kategorisi
              </label>
              <select
                id="fee-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tüm Ücretler</option>
                <option value="account">Hesap İşletim</option>
                <option value="card">Kart Ücretleri</option>
                <option value="transfer">Para Transfer</option>
                <option value="loan">Kredi Masrafları</option>
                <option value="other">Diğer Ücretler</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <ResetButton
                onReset={handleReset}
                disabled={!hasActiveFilters}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {paginatedData.length > 0 ? (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="bank"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Banka
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="name"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Ücret Adı
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="category"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Kategori
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="amount"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Ücret
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="frequency"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Sıklık
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((fee, index) => (
                      <tr key={fee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <LogoCell slug={fee.bank.toLowerCase().replace(/\s+/g, '')} />
                            <div className="text-sm font-medium text-gray-900">
                              {fee.bank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {fee.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {fee.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {getCategoryDisplayName(fee.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {sortConfig.key === 'amount' && sortConfig.direction === 'asc' && index === 0 && fee.amount === 0 && (
                              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                            )}
                            <span className={`text-lg font-bold ${fee.amount === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                              {formatAmount(fee.amount)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getFrequencyLabel(fee.frequency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            Detay Gör
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              className="mb-8"
            />
          </>
        ) : (
          <EmptyState
            title="Ücret bulunamadı"
            description="Arama kriterlerinize uygun ücret bulunamadı. Filtreleri değiştirerek tekrar deneyin."
            onClearFilters={hasActiveFilters ? handleReset : undefined}
            showClearFilters={hasActiveFilters}
          />
        )}
      </Container>
    </>
  )
}

export default Fees