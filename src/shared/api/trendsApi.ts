export interface TrendingCountry {
  id: string;
  name: string;
  population: number;
  region: string;
}

interface RawCountry {
  name: { common: string };
  population: number;
  region: string;
  cca2: string;
}

export const getTrendingCountries = async (): Promise<TrendingCountry[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca2');

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: RawCountry[] = await response.json();
    const shuffled = data.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 2).map((country) => ({
      id: country.cca2,
      name: country.name.common,
      population: country.population,
      region: country.region,
    }));

  } catch (error) {
    console.error('Erreur lors de la récupération des pays aléatoires:', error);

    // Fallback : return 2 defaults countries
    return [
      {
        id: 'fr',
        name: 'France',
        population: 67970571,
        region: 'Europe'
      },
      {
        id: 'jp',
        name: 'Japan',
        population: 123294513,
        region: 'Asia'
      }
    ];
  }
};