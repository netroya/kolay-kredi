import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import SearchBox from '../components/SearchBox'
import ResetButton from '../components/ResetButton'
import SortableHeader from '../components/SortableHeader'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
import { LogoCell } from '../components/LogoCell'
import { promotions } from '../data/promotions'
import { useSort } from '../hooks/useSort'
import { usePagination } from '../hooks/usePagination'
import { Gift, TrendingUp } from 'lucide-react'

const Promotions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [amountRange, setAmountRange] = useState<string>('all')

  // Filter promotions based on search and filters
  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || promotion.type === selectedType
    const matchesAmount = amountRange === 'all' || 
      (amountRange === 'low' && promotion.amount <= 8000) ||
      (amountRange === 'medium' && promotion.amount > 8000 && promotion.amount <= 15000) ||
      (amountRange === 'high' && promotion.amount > 15000)
    
    return matchesSearch && matchesType && matchesAmount
  })

  // Sorting
  const { sortedData: sortedPromotions, sortConfig, handleSort } = useSort({
    data: filteredPromotions,
    initialSort: { key: 'amount', direction: 'desc' }
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
    data: sortedPromotions,
    itemsPerPage: 10
  })

  const handleReset = () => {
    setSearchTerm('')
    setSelectedType('all')
    setAmountRange('all')
  }

  const hasActiveFilters = searchTerm || selectedType !== 'all' || amountRange !== 'all'

  const getTypeLabel = (type: string) => {
    const labels = {
      pension: 'Emekli',
      salary: 'Maaş',
      deposit: 'Mevduat',
      digital: 'Dijital',
      student: 'Genç',
      special: 'Özel'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <>
      <Helmet>
        <title>Banka Promosyonları - En Yüksek Promosyon Tutarları | Kolay Kredi</title>
        <meta name="description" content="Türkiye'nin önde gelen bankalarının promosyon kampanyalarını karşılaştırın. Maaş, emekli ve özel promosyonlar." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/emekli-promosyonu" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-orange-50 to-red-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Banka Promosyonları
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Türkiye'nin önde gelen bankalarının promosyon kampanyalarını karşılaştırın. 
              Maaş, emekli ve özel promosyonlardan yararlanın.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="promotion-search" className="block text-sm font-medium text-gray-900 mb-2">
                Banka veya Promosyon Ara
              </label>
              <SearchBox
                id="promotion-search"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Banka adı veya promosyon adı yazın..."
                aria-describedby="search-help"
              />
              <span id="search-help" className="sr-only">Arama yaparak bankaları ve promosyonları filtreleyebilirsiniz</span>
            </div>
            
            <div>
              <label htmlFor="promotion-type" className="block text-sm font-medium text-gray-900 mb-2">
                Promosyon Türü
              </label>
              <select
                id="promotion-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Tüm Promosyonlar</option>
                <option value="pension">Emekli</option>
                <option value="salary">Maaş</option>
                <option value="deposit">Mevduat</option>
                <option value="digital">Dijital</option>
                <option value="student">Genç</option>
                <option value="special">Özel</option>
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
                          sortKey="title"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Promosyon
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="type"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Tür
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="amount"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Tutar
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="validUntil"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Geçerlilik
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((promotion, index) => (
                      <tr key={promotion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <LogoCell slug={promotion.bank.toLowerCase().replace(/\s+/g, '')} />
                            <div className="text-sm font-medium text-gray-900">
                              {promotion.bank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {promotion.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {promotion.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                            {getTypeLabel(promotion.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {sortConfig.key === 'amount' && sortConfig.direction === 'desc' && index === 0 && (
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                            )}
                            <span className="text-lg font-bold text-gray-900">
                              {new Intl.NumberFormat('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(promotion.amount)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(promotion.validUntil).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
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
            title="Promosyon bulunamadı"
            description="Arama kriterlerinize uygun promosyon bulunamadı. Filtreleri değiştirerek tekrar deneyin."
            onClearFilters={hasActiveFilters ? handleReset : undefined}
            showClearFilters={hasActiveFilters}
          />
        )}
      </Container>
    </>
  )
}

export default Promotions