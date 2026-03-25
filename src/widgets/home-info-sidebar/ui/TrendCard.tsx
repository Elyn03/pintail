import "@/widgets/home-info-sidebar/styles/TrendCard.css"
import {useTrendingCountries} from "@/shared/api/queries.ts";

export default function TrendCard() {
  const { data: countries = [], isLoading, error } = useTrendingCountries();

  const renderContent = () => {
    if (isLoading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">Error while loading</p>;
    if (countries.length > 0) {
      return (
        <ul className="trending-countries-list">
          {countries.map((country, index) => (
            <li key={country.id} className="trending-country-item">
              <div className="country-rank">#{index + 1}</div>
              <div className="country-info">
                <span className="country-name">{country.name}</span>
                <span className="country-region">{country.region}</span>
              </div>
            </li>
          ))}
        </ul>
      )
    }
    return <p className="no-countries">No trending destinations</p>;
  }

  return (
    <div className="trending-countries-section">
      <h3 className="section-title">🌍 Trending</h3>
      {renderContent()}
    </div>
  )
}