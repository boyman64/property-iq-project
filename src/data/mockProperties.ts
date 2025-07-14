// Mock data for Georgian real estate properties
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
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop',
    coordinates: { lat: 41.7287, lng: 44.7633 },
    listedDate: '2024-01-15',
    features: ['Parking', 'Elevator', 'Balcony', 'Central Heating']
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
    imageUrl: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=300&fit=crop',
    coordinates: { lat: 41.7088, lng: 44.7577 },
    listedDate: '2024-01-20',
    features: ['Parking', 'Elevator', 'Terrace', 'Premium Finishes', 'Security']
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
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    coordinates: { lat: 41.6461, lng: 41.6369 },
    listedDate: '2024-01-10',
    features: ['Garden', 'Sea View', 'Renovated', 'Central Location']
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
    imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop',
    coordinates: { lat: 41.6977, lng: 44.8014 },
    listedDate: '2024-01-05',
    features: ['High Traffic', 'Modern Fixtures', 'Parking', 'Corner Location']
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
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    coordinates: { lat: 41.7063, lng: 44.7961 },
    listedDate: '2024-01-18',
    features: ['Modern Design', 'Central Location', 'Furnished']
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
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    coordinates: { lat: 42.2679, lng: 42.7056 },
    listedDate: '2024-01-12',
    features: ['Large Garden', 'Garage', 'Modern Kitchen', 'Quiet Area']
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
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop',
    coordinates: { lat: 41.6943, lng: 44.8015 },
    listedDate: '2024-01-25',
    features: ['Mountain Views', 'Premium Location', 'Modern Amenities', 'Security']
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
    imageUrl: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=300&fit=crop',
    coordinates: { lat: 41.6519, lng: 41.6421 },
    listedDate: '2024-01-08',
    features: ['Private Beach', 'Swimming Pool', 'Luxury Finishes', 'Sea Views']
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