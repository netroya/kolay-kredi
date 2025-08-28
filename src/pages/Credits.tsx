import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import SearchBox from '../components/SearchBox'
import ResetButton from '../components/ResetButton'
import SortableHeader from '../components/SortableHeader'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
import Disclaimer from '../components/Disclaimer'
import LogoCell from '../components/LogoCell'
import { credits } from '../data/credits'
import { useSort } from '../hooks/useSort'
import { usePagination } from '../hooks/usePagination'
import { Calculator, TrendingDown } from 'lucide-react'

const Credits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [amountRange, setAmountRange] = useState<string>('all')

  // Filter credits based on search and filters
  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || credit.type === selectedType
    const matchesAmount = amountRange === 'all' || 
      (amountRange === 'low' && credit.maxAmount <= 100000) ||
      (amountRange === 'medium' && credit.maxAmount > 100000 && credit.maxAmount <= 500000) ||
      (amountRange === 'high' && credit.maxAmount > 500000)
    
    return matchesSearch && matchesType && matchesAmount
  })

  // Sorting
  const { sortedData: sortedCredits, sortConfig, handleSort } = useSort({
    data: filteredCredits,
    initialSort: { key: 'interestRate', direction: 'asc' }
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
    data: sortedCredits,
    itemsPerPage: 10
  })

  const handleReset = () => {
    setSearchTerm('')
    setSelectedType('all')
    setAmountRange('all')
  }

  const hasActiveFilters = searchTerm || selectedType !== 'all' || amountRange !== 'all'

  return (
    <>
      <Helmet>
        <title>Kredi Karşılaştırma - En Uygun Faiz Oranları | Kolay Kredi</title>
        <meta name="description" content="Türkiye'nin en kapsamlı kredi karşılaştırma platformu. İhtiyaç, konut ve taşıt kredisi faiz oranlarını karşılaştırın, en uygun krediyi bulun." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/kredi" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Kredi Karşılaştırma
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Türkiye'nin önde gelen bankalarının kredi faiz oranlarını karşılaştırın. 
              İhtiyaç, konut ve taşıt kredisi seçeneklerini inceleyin.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="credit-search" className="block text-sm font-medium text-gray-900 mb-2">
                Banka veya Kredi Türü Ara
              </label>
              <SearchBox
                id="credit-search"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Banka adı veya kredi türü yazın..."
                aria-describedby="search-help"
              />
              <span id="search-help" className="sr-only">Arama yaparak bankaları ve kredi türlerini filtreleyebilirsiniz</span>
            </div>
            
            <div>
              <label htmlFor="credit-type" className="block text-sm font-medium text-gray-900 mb-2">
                Kredi Türü
              </label>
              <select
                id="credit-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Krediler</option>
                <option value="personal">İhtiyaç Kredisi</option>
                <option value="housing">Konut Kredisi</option>
                <option value="vehicle">Taşıt Kredisi</option>
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
                          sortKey="type"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Kredi Türü
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="interestRate"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Faiz Oranı
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="maxAmount"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Max. Tutar
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="maxTerm"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Max. Vade
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((credit, index) => (
                      <tr key={credit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <LogoCell slug={credit.bank.toLowerCase().replace(/\s+/g, '')} />
                            <div className="text-sm font-medium text-gray-900">
                              {credit.bank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {credit.type === 'personal' ? 'İhtiyaç' : 
                             credit.type === 'housing' ? 'Konut' : 'Taşıt'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {sortConfig.key === 'interestRate' && sortConfig.direction === 'asc' && index === 0 && (
                              <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                            )}
                            <span className="text-lg font-bold text-gray-900">
                              %{credit.interestRate}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }).format(credit.maxAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {credit.maxTerm} ay
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
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

            {/* Disclaimer */}
            <Disclaimer type="calculation" className="mb-8" />
          </>
        ) : (
          <EmptyState
            title="Kredi bulunamadı"
            description="Arama kriterlerinize uygun kredi bulunamadı. Filtreleri değiştirerek tekrar deneyin."
            onClearFilters={hasActiveFilters ? handleReset : undefined}
            showClearFilters={hasActiveFilters}
          />
        )}
      </Container>
    </>
  )
}

export default Credits