// Mock data for Georgian real estate properties
import apartmentModern from '@/assets/apartment-modern.jpg';
import penthouseLuxury from '@/assets/penthouse-luxury.jpg';
import houseTraditional from '@/assets/house-traditional.jpg';
import commercialModern from '@/assets/commercial-modern.jpg';
import studioApartment from '@/assets/studio-apartment.jpg';
import familyHouse from '@/assets/family-house.jpg';
import beachfrontVilla from '@/assets/beachfront-villa.jpg';
import officeSpace from '@/assets/office-space.jpg';
import loftApartment from '@/assets/loft-apartment.jpg';
import retailSpace from '@/assets/retail-space.jpg';

export interface PriceHistory {
  month: string;
  price: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  district: string;
  propertyType: 'apartment' | 'house' | 'commercial';
  area: number; // square meters
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  listedDate: string;
  features: string[];
  priceHistory: PriceHistory[];
}

export interface MarketData {
  month: string;
  averagePrice: number;
  totalListings: number;
  city: string;
}

export interface CityStats {
  city: string;
  averagePrice: number;
  totalListings: number;
  priceChange: number; // percentage
  demandScore: number; // 1-100
}

// Helper function to generate seasonal price patterns
const generatePriceHistory = (basePrice: number, city: string, propertyType: string): PriceHistory[] => {
  const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 
                  'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'];
  
  return months.map((month, index) => {
    let multiplier = 1;
    
    // Seasonal patterns based on location and property type
    if (city === 'Batumi' || city === 'Kobuleti') {
      // Beach locations: Higher in summer (June-August), lower in winter
      if (index >= 5 && index <= 7) { // Jun-Aug
        multiplier = 1.15 + Math.random() * 0.1; // 15-25% higher
      } else if (index >= 11 || index <= 1) { // Dec-Feb
        multiplier = 0.85 + Math.random() * 0.1; // 15-25% lower
      } else {
        multiplier = 0.95 + Math.random() * 0.2; // Normal variation
      }
    } else if (propertyType === 'commercial') {
      // Commercial: Higher in business seasons (Mar-May, Sep-Nov), lower in summer
      if ((index >= 2 && index <= 4) || (index >= 8 && index <= 10)) {
        multiplier = 1.1 + Math.random() * 0.1; // 10-20% higher
      } else if (index >= 6 && index <= 7) { // Jul-Aug
        multiplier = 0.9 + Math.random() * 0.1; // 10-20% lower
      } else {
        multiplier = 0.95 + Math.random() * 0.15;
      }
    } else {
      // Regular residential: Spring/autumn peaks, winter lows
      if (index >= 3 && index <= 5) { // Apr-Jun
        multiplier = 1.08 + Math.random() * 0.12; // 8-20% higher
      } else if (index >= 8 && index <= 10) { // Sep-Nov
        multiplier = 1.05 + Math.random() * 0.1; // 5-15% higher
      } else if (index >= 11 || index <= 1) { // Dec-Feb
        multiplier = 0.88 + Math.random() * 0.12; // 12-24% lower
      } else {
        multiplier = 0.92 + Math.random() * 0.16;
      }
    }
    
    return {
      month,
      price: Math.round(basePrice * multiplier)
    };
  });
};

// Georgian cities with realistic coordinates
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Saburtalo',
    price: 95000,
    city: 'Tbilisi',
    district: 'Saburtalo',
    propertyType: 'apartment',
    area: 65,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2018,
    description: 'Beautiful modern apartment with city views in popular Saburtalo district',
    imageUrl: apartmentModern,
    coordinates: { lat: 41.7287, lng: 44.7633 },
    listedDate: '2024-01-15',
    features: ['Parking', 'Elevator', 'Balcony', 'Central Heating'],
    priceHistory: generatePriceHistory(95000, 'Tbilisi', 'apartment')
  },
  {
    id: '2',
    title: 'Luxury Penthouse Vake',
    price: 280000,
    city: 'Tbilisi',
    district: 'Vake',
    propertyType: 'apartment',
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2020,
    description: 'Exclusive penthouse with panoramic views of Tbilisi',
    imageUrl: penthouseLuxury,
    coordinates: { lat: 41.7088, lng: 44.7577 },
    listedDate: '2024-01-20',
    features: ['Parking', 'Elevator', 'Terrace', 'Premium Finishes', 'Security'],
    priceHistory: generatePriceHistory(280000, 'Tbilisi', 'apartment')
  },
  {
    id: '3',
    title: 'Cozy House in Batumi Old Town',
    price: 120000,
    city: 'Batumi',
    district: 'Old Town',
    propertyType: 'house',
    area: 90,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2015,
    description: 'Charming house near the Black Sea in historic Old Town',
    imageUrl: houseTraditional,
    coordinates: { lat: 41.6461, lng: 41.6369 },
    listedDate: '2024-01-10',
    features: ['Garden', 'Sea View', 'Renovated', 'Central Location'],
    priceHistory: generatePriceHistory(120000, 'Batumi', 'house')
  },
  {
    id: '4',
    title: 'Commercial Space Rustaveli',
    price: 350000,
    city: 'Tbilisi',
    district: 'Center',
    propertyType: 'commercial',
    area: 200,
    yearBuilt: 2017,
    description: 'Prime commercial space on famous Rustaveli Avenue',
    imageUrl: commercialModern,
    coordinates: { lat: 41.6977, lng: 44.8014 },
    listedDate: '2024-01-05',
    features: ['High Traffic', 'Modern Fixtures', 'Parking', 'Corner Location'],
    priceHistory: generatePriceHistory(350000, 'Tbilisi', 'commercial')
  },
  {
    id: '5',
    title: 'Studio Apartment Vera',
    price: 55000,
    city: 'Tbilisi',
    district: 'Vera',
    propertyType: 'apartment',
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    yearBuilt: 2019,
    description: 'Perfect studio for young professionals in trendy Vera',
    imageUrl: studioApartment,
    coordinates: { lat: 41.7063, lng: 44.7961 },
    listedDate: '2024-01-18',
    features: ['Modern Design', 'Central Location', 'Furnished'],
    priceHistory: generatePriceHistory(55000, 'Tbilisi', 'apartment')
  },
  {
    id: '6',
    title: 'Family House Kutaisi',
    price: 85000,
    city: 'Kutaisi',
    district: 'Center',
    propertyType: 'house',
    area: 110,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2016,
    description: 'Spacious family home in Georgia\'s second largest city',
    imageUrl: familyHouse,
    coordinates: { lat: 42.2679, lng: 42.7056 },
    listedDate: '2024-01-12',
    features: ['Large Garden', 'Garage', 'Modern Kitchen', 'Quiet Area'],
    priceHistory: generatePriceHistory(85000, 'Kutaisi', 'house')
  },
  {
    id: '7',
    title: 'Luxury Apartment Mtatsminda',
    price: 180000,
    city: 'Tbilisi',
    district: 'Mtatsminda',
    propertyType: 'apartment',
    area: 85,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2021,
    description: 'High-end apartment with mountain views in prestigious Mtatsminda',
    imageUrl: apartmentModern,
    coordinates: { lat: 41.6943, lng: 44.8015 },
    listedDate: '2024-01-25',
    features: ['Mountain Views', 'Premium Location', 'Modern Amenities', 'Security'],
    priceHistory: generatePriceHistory(180000, 'Tbilisi', 'apartment')
  },
  {
    id: '8',
    title: 'Beachfront Villa Batumi',
    price: 450000,
    city: 'Batumi',
    district: 'New Boulevard',
    propertyType: 'house',
    area: 250,
    bedrooms: 5,
    bathrooms: 3,
    yearBuilt: 2022,
    description: 'Exclusive beachfront villa with private beach access',
    imageUrl: beachfrontVilla,
    coordinates: { lat: 41.6519, lng: 41.6421 },
    listedDate: '2024-01-08',
    features: ['Private Beach', 'Swimming Pool', 'Luxury Finishes', 'Sea Views'],
    priceHistory: generatePriceHistory(450000, 'Batumi', 'house')
  },
  {
    id: '9',
    title: 'Modern Apartment Digomi',
    price: 75000,
    city: 'Tbilisi',
    district: 'Digomi',
    propertyType: 'apartment',
    area: 55,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2020,
    description: 'Contemporary apartment in developing Digomi district',
    imageUrl: apartmentModern,
    coordinates: { lat: 41.7789, lng: 44.7911 },
    listedDate: '2024-01-14',
    features: ['New Building', 'Parking', 'Modern Design', 'Good Transport'],
    priceHistory: generatePriceHistory(75000, 'Tbilisi', 'apartment')
  },
  {
    id: '10',
    title: 'Office Space Gldani',
    price: 120000,
    city: 'Tbilisi',
    district: 'Gldani',
    propertyType: 'commercial',
    area: 80,
    yearBuilt: 2019,
    description: 'Professional office space in business district',
    imageUrl: officeSpace,
    coordinates: { lat: 41.7789, lng: 44.8014 },
    listedDate: '2024-01-22',
    features: ['Business Center', 'Conference Room', 'Parking', 'Security'],
    priceHistory: generatePriceHistory(120000, 'Tbilisi', 'commercial')
  },
  {
    id: '11',
    title: 'Historic House Rustavi',
    price: 65000,
    city: 'Rustavi',
    district: 'Center',
    propertyType: 'house',
    area: 95,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    description: 'Traditional Georgian house with modern renovations',
    imageUrl: houseTraditional,
    coordinates: { lat: 41.5492, lng: 44.9967 },
    listedDate: '2024-01-16',
    features: ['Garden', 'Traditional Style', 'Renovated', 'Quiet Neighborhood'],
    priceHistory: generatePriceHistory(65000, 'Rustavi', 'house')
  },
  {
    id: '12',
    title: 'Loft Apartment Isani',
    price: 88000,
    city: 'Tbilisi',
    district: 'Isani',
    propertyType: 'apartment',
    area: 70,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2018,
    description: 'Industrial-style loft with high ceilings',
    imageUrl: loftApartment,
    coordinates: { lat: 41.7151, lng: 44.8185 },
    listedDate: '2024-01-19',
    features: ['High Ceilings', 'Industrial Design', 'Open Plan', 'Natural Light'],
    priceHistory: generatePriceHistory(88000, 'Tbilisi', 'apartment')
  },
  {
    id: '13',
    title: 'Seaside Apartment Kobuleti',
    price: 95000,
    city: 'Kobuleti',
    district: 'Beach Area',
    propertyType: 'apartment',
    area: 60,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2021,
    description: 'Modern apartment with sea views in resort town',
    imageUrl: apartmentModern,
    coordinates: { lat: 41.8167, lng: 41.7667 },
    listedDate: '2024-01-11',
    features: ['Sea View', 'Balcony', 'Resort Location', 'Modern Amenities'],
    priceHistory: generatePriceHistory(95000, 'Kobuleti', 'apartment')
  },
  {
    id: '14',
    title: 'Country House Telavi',
    price: 78000,
    city: 'Telavi',
    district: 'Wine Region',
    propertyType: 'house',
    area: 120,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2017,
    description: 'Charming house in famous wine region with vineyard views',
    imageUrl: houseTraditional,
    coordinates: { lat: 41.9167, lng: 45.4667 },
    listedDate: '2024-01-13',
    features: ['Vineyard Views', 'Wine Cellar', 'Large Plot', 'Rural Setting'],
    priceHistory: generatePriceHistory(78000, 'Telavi', 'house')
  },
  {
    id: '15',
    title: 'Student Apartment Didi Digomi',
    price: 42000,
    city: 'Tbilisi',
    district: 'Didi Digomi',
    propertyType: 'apartment',
    area: 30,
    bedrooms: 1,
    bathrooms: 1,
    yearBuilt: 2019,
    description: 'Affordable studio perfect for students',
    imageUrl: studioApartment,
    coordinates: { lat: 41.7890, lng: 44.7800 },
    listedDate: '2024-01-21',
    features: ['Affordable', 'Near University', 'Furnished', 'Good Transport'],
    priceHistory: generatePriceHistory(42000, 'Tbilisi', 'apartment')
  },
  {
    id: '16',
    title: 'Retail Space Avlabari',
    price: 180000,
    city: 'Tbilisi',
    district: 'Avlabari',
    propertyType: 'commercial',
    area: 120,
    yearBuilt: 2020,
    description: 'Prime retail location near historic district',
    imageUrl: retailSpace,
    coordinates: { lat: 41.6923, lng: 44.8190 },
    listedDate: '2024-01-17',
    features: ['High Foot Traffic', 'Historic Area', 'Large Windows', 'Corner Unit'],
    priceHistory: generatePriceHistory(180000, 'Tbilisi', 'commercial')
  },
  {
    id: '17',
    title: 'Family Duplex Vazisubani',
    price: 110000,
    city: 'Tbilisi',
    district: 'Vazisubani',
    propertyType: 'house',
    area: 140,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2016,
    description: 'Spacious duplex with private garden',
    imageUrl: familyHouse,
    coordinates: { lat: 41.7234, lng: 44.8456 },
    listedDate: '2024-01-09',
    features: ['Duplex', 'Private Garden', 'Family Friendly', 'Quiet Area'],
    priceHistory: generatePriceHistory(110000, 'Tbilisi', 'house')
  },
  {
    id: '18',
    title: 'Luxury Condo Batumi Boulevard',
    price: 320000,
    city: 'Batumi',
    district: 'Boulevard',
    propertyType: 'apartment',
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2023,
    description: 'Ultra-modern condo with panoramic sea views',
    imageUrl: penthouseLuxury,
    coordinates: { lat: 41.6461, lng: 41.6369 },
    listedDate: '2024-01-06',
    features: ['Sea Views', 'Modern Design', 'Hotel Services', 'Premium Location'],
    priceHistory: generatePriceHistory(320000, 'Batumi', 'apartment')
  },
  {
    id: '19',
    title: 'Investment Property Gori',
    price: 55000,
    city: 'Gori',
    district: 'Center',
    propertyType: 'apartment',
    area: 50,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2015,
    description: 'Great investment opportunity in historic Gori',
    imageUrl: apartmentModern,
    coordinates: { lat: 41.9847, lng: 44.1086 },
    listedDate: '2024-01-24',
    features: ['Investment Potential', 'Historic City', 'Central Location', 'Renovated'],
    priceHistory: generatePriceHistory(55000, 'Gori', 'apartment')
  },
  {
    id: '20',
    title: 'Penthouse Apartment Chugureti',
    price: 240000,
    city: 'Tbilisi',
    district: 'Chugureti',
    propertyType: 'apartment',
    area: 130,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2022,
    description: 'Stunning penthouse with rooftop terrace',
    imageUrl: penthouseLuxury,
    coordinates: { lat: 41.7023, lng: 44.7890 },
    listedDate: '2024-01-07',
    features: ['Rooftop Terrace', 'City Views', 'Premium Finishes', 'Elevator'],
    priceHistory: generatePriceHistory(240000, 'Tbilisi', 'apartment')
  }
];

// Market trend data for the last 6 months
export const marketTrendData: MarketData[] = [
  { month: 'Aug 2023', averagePrice: 142000, totalListings: 850, city: 'Tbilisi' },
  { month: 'Sep 2023', averagePrice: 138000, totalListings: 920, city: 'Tbilisi' },
  { month: 'Oct 2023', averagePrice: 145000, totalListings: 780, city: 'Tbilisi' },
  { month: 'Nov 2023', averagePrice: 148000, totalListings: 650, city: 'Tbilisi' },
  { month: 'Dec 2023', averagePrice: 152000, totalListings: 720, city: 'Tbilisi' },
  { month: 'Jan 2024', averagePrice: 155000, totalListings: 890, city: 'Tbilisi' },
  
  { month: 'Aug 2023', averagePrice: 158000, totalListings: 180, city: 'Batumi' },
  { month: 'Sep 2023', averagePrice: 162000, totalListings: 210, city: 'Batumi' },
  { month: 'Oct 2023', averagePrice: 159000, totalListings: 145, city: 'Batumi' },
  { month: 'Nov 2023', averagePrice: 165000, totalListings: 120, city: 'Batumi' },
  { month: 'Dec 2023', averagePrice: 171000, totalListings: 95, city: 'Batumi' },
  { month: 'Jan 2024', averagePrice: 175000, totalListings: 160, city: 'Batumi' },
  
  { month: 'Aug 2023', averagePrice: 78000, totalListings: 45, city: 'Kutaisi' },
  { month: 'Sep 2023', averagePrice: 82000, totalListings: 52, city: 'Kutaisi' },
  { month: 'Oct 2023', averagePrice: 79000, totalListings: 38, city: 'Kutaisi' },
  { month: 'Nov 2023', averagePrice: 81000, totalListings: 42, city: 'Kutaisi' },
  { month: 'Dec 2023', averagePrice: 85000, totalListings: 35, city: 'Kutaisi' },
  { month: 'Jan 2024', averagePrice: 87000, totalListings: 48, city: 'Kutaisi' },
];

// City statistics
export const cityStats: CityStats[] = [
  {
    city: 'Tbilisi',
    averagePrice: 155000,
    totalListings: 890,
    priceChange: 8.4,
    demandScore: 85
  },
  {
    city: 'Batumi',
    averagePrice: 175000,
    totalListings: 160,
    priceChange: 10.8,
    demandScore: 78
  },
  {
    city: 'Kutaisi',
    averagePrice: 87000,
    totalListings: 48,
    priceChange: 11.5,
    demandScore: 65
  }
];

// Seasonal price data for "Best Time to Buy" analysis
export const seasonalData = [
  { month: 'Jan', avgPrice: 148000, savings: 4.5 },
  { month: 'Feb', avgPrice: 152000, savings: 1.9 },
  { month: 'Mar', avgPrice: 158000, savings: -2.1 },
  { month: 'Apr', avgPrice: 161000, savings: -4.0 },
  { month: 'May', avgPrice: 165000, savings: -6.5 },
  { month: 'Jun', avgPrice: 163000, savings: -5.2 },
  { month: 'Jul', avgPrice: 159000, savings: -2.7 },
  { month: 'Aug', avgPrice: 155000, savings: 0.0 },
  { month: 'Sep', avgPrice: 151000, savings: 2.6 },
  { month: 'Oct', avgPrice: 149000, savings: 3.9 },
  { month: 'Nov', avgPrice: 146000, savings: 5.8 },
  { month: 'Dec', avgPrice: 144000, savings: 7.1 }
];