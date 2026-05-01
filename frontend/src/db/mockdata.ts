// Mock for P5: Product Listing
export const MOCK_PRODUCT_LIST = {
  data: [
    {
      id: 42,
      name: 'Sony Alpha a7 IV Mirrorless Camera',
      category: 'ELECTRONICS',
      pricePerDay: 85.0,
      imageUrl:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      rating: 4.8,
    },
    {
      id: 77,
      name: 'DeWalt Cordless Drill Set',
      category: 'TOOLS',
      pricePerDay: 15.0,
      imageUrl:
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500',
      rating: 4.5,
    },
  ],
  page: 1,
  totalPages: 10,
}

// Mock for P7: Availability (The Calendar View)
export const MOCK_AVAILABILITY = {
  productId: 42,
  available: false,
  busyPeriods: [
    { start: '2024-03-01', end: '2024-03-05', label: 'Booked' },
    { start: '2024-03-10', end: '2024-03-15', label: 'Maintenance' },
  ],
  freeWindows: [{ start: '2024-03-06', end: '2024-03-09' }],
}

export const MOCK_USER_PREFS = [
  { category: 'ELECTRONICS', rentalCount: 14, color: '#3b82f6' },
  { category: 'OUTDOOR', rentalCount: 9, color: '#10b981' },
  { category: 'TOOLS', rentalCount: 6, color: '#f59e0b' },
]

export const MOCK_ALL_CATEGORIES = [
  "Trending", "Electronics", "Power Tools", "Outdoor Gear", "Party Supplies",
  "Photography", "Vehicles", "Furniture", "Audio & Sound", "Camping",
  "Gaming Consoles", "Sports Equipment", "Drones", "Musical Instruments",
  "Home Appliances", "Bicycles", "Lawn Care", "Heavy Machinery", 
  "Office Equipment", "Books & Textbooks", "VR Headsets", "Projectors",
  "Water Sports", "Winter Sports", "Baby Gear", "Fitness Equipment",
  "Costumes", "Medical Equipment", "Travel Accessories", "Art Supplies"
]
