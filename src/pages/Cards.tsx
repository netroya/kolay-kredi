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
import { cards } from '../data/cards'
import { useSort } from '../hooks/useSort'
import { usePagination } from '../hooks/usePagination'
import { CreditCard, Award } from 'lucide-react'

const Cards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [feeRange, setFeeRange] = useState<string>('all')

  // Filter cards based on search and filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || card.type === selectedType
    const matchesFee = feeRange === 'all' || 
      (feeRange === 'free' && card.annualFee === 0) ||
      (feeRange === 'low' && card.annualFee > 0 && card.annualFee <= 100) ||
      (feeRange === 'high' && card.annualFee > 100)
    
    return matchesSearch && matchesType && matchesFee
  })

  // Sorting
  const { sortedData: sortedCards, sortConfig, handleSort } = useSort({
    data: filteredCards,
    initialSort: { key: 'annualFee', direction: 'asc' }
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
    data: sortedCards,
    itemsPerPage: 10
  })

  const handleReset = () => {
    setSearchTerm('')
    setSelectedType('all')
    setFeeRange('all')
  }

  const hasActiveFilters = searchTerm || selectedType !== 'all' || feeRange !== 'all'

  const getCardTypeLabel = (type: string) => {
    const labels = {
      standard: 'Standart',
      gold: 'Gold',
      platinum: 'Platinum',
      world: 'World',
      infinite: 'Infinite'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <>
      <Helmet>
        <title>Kredi Kartı Karşılaştırma - En Avantajlı Kartlar | Kolay Kredi</title>
        <meta name="description" content="Türkiye'nin en kapsamlı kredi kartı karşılaştırma platformu. Yıllık ücret, bonus program ve avantajları karşılaştırın." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/kredi-karti" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-purple-50 to-pink-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Kredi Kartı Karşılaştırma
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Türkiye'nin önde gelen bankalarının kredi kartlarını karşılaştırın. 
              Yıllık ücret, bonus programları ve özel avantajları inceleyin.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="card-search" className="block text-sm font-medium text-gray-900 mb-2">
                Banka veya Kart Adı Ara
              </label>
              <SearchBox
                id="card-search"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Banka adı veya kart adı yazın..."
                aria-describedby="search-help"
              />
              <span id="search-help" className="sr-only">Arama yaparak bankaları ve kart türlerini filtreleyebilirsiniz</span>
            </div>
            
            <div>
              <label htmlFor="card-type" className="block text-sm font-medium text-gray-900 mb-2">
                Kart Seviyesi
              </label>
              <select
                id="card-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Tüm Kartlar</option>
                <option value="standard">Standart</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="world">World</option>
                <option value="infinite">Infinite</option>
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
                          Kart Adı
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="type"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Seviye
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="annualFee"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Yıllık Ücret
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3">
                        <SortableHeader
                          sortKey="rewardRate"
                          currentSort={sortConfig}
                          onSort={handleSort}
                        >
                          Bonus Oranı
                        </SortableHeader>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        İşlem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((card, index) => (
                      <tr key={card.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <LogoCell slug={card.bank.toLowerCase().replace(/\s+/g, '')} />
                            <div className="text-sm font-medium text-gray-900">
                              {card.bank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {card.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            {getCardTypeLabel(card.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {sortConfig.key === 'annualFee' && sortConfig.direction === 'asc' && index === 0 && card.annualFee === 0 && (
                              <Award className="w-4 h-4 text-green-600 mr-1" />
                            )}
                            <span className={`text-lg font-bold ${card.annualFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                              {card.annualFee === 0 ? 'ÜCRETSİZ' : `${card.annualFee} TL`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          %{card.rewardRate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
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
            <Disclaimer type="comparison" className="mb-8" />
          </>
        ) : (
          <EmptyState
            title="Kredi kartı bulunamadı"
            description="Arama kriterlerinize uygun kredi kartı bulunamadı. Filtreleri değiştirerek tekrar deneyin."
            onClearFilters={hasActiveFilters ? handleReset : undefined}
            showClearFilters={hasActiveFilters}
          />
        )}
      </Container>
    </>
  )
}

export default Cards