import type { Coffee } from '../types';

export const allProducts: Coffee[] = [
  // --- COFFEE (6 Items) ---
  {
    id: 'c1',
    name: 'Neon Espresso',
    description: 'A bold, high-voltage shot of pure energy. Dark roasted beans with notes of dark chocolate and electric cherry.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '30ml' }, { name: 'Caffeine', amount: '64mg' }],
    rating: 4.8,
    reviews: 124,
    tags: ['Hot', 'Strong', 'Bold'],
    category: 'Coffee'
  },
  {
    id: 'c2',
    name: 'Cyber Latte',
    description: 'Smooth steamed milk meets rich espresso, infused with a hint of digital vanilla and stardust sprinkles.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '30ml' }, { name: 'Steamed Milk', amount: '200ml' }, { name: 'Sugar', amount: '10g' }],
    rating: 4.6,
    reviews: 89,
    tags: ['Hot', 'Sweet', 'Smooth'],
    category: 'Coffee'
  },
  {
    id: 'c3',
    name: 'Glitch Cold Brew',
    description: 'Steeped for 24 hours in zero-gravity. Smooth, low acidity, and served over holographic ice.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Cold Brew', amount: '250ml' }, { name: 'Caffeine', amount: '150mg' }],
    rating: 4.9,
    reviews: 210,
    tags: ['Cold', 'Strong', 'Smooth'],
    category: 'Coffee'
  },
  {
    id: 'c4',
    name: 'Synthwave Cappuccino',
    description: 'Perfectly balanced espresso and foam, dusted with cocoa powder that glows under UV light.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '30ml' }, { name: 'Foam', amount: '150ml' }],
    rating: 4.7,
    reviews: 156,
    tags: ['Hot', 'Classic', 'Foamy'],
    category: 'Coffee'
  },
  {
    id: 'c5',
    name: 'Holo Mocha',
    description: 'Rich chocolate syrup swirled with espresso and steamed milk. A sweet escape from reality.',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '30ml' }, { name: 'Chocolate', amount: '30ml' }, { name: 'Milk', amount: '180ml' }],
    rating: 4.8,
    reviews: 178,
    tags: ['Hot', 'Sweet', 'Chocolate'],
    category: 'Coffee'
  },
  {
    id: 'c6',
    name: 'Quantum Americano',
    description: 'Espresso diluted with hot water to create a rich, robust flavor that exists in multiple states.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '60ml' }, { name: 'Water', amount: '180ml' }],
    rating: 4.5,
    reviews: 95,
    tags: ['Hot', 'Strong', 'Simple'],
    category: 'Coffee'
  },


  // --- TEA (6 Items) ---
  {
    id: 't1',
    name: 'Cyber Green Tea',
    description: 'Refreshing green tea infused with digital jasmine blossoms.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Green Tea', amount: '250ml' }, { name: 'Jasmine', amount: '5g' }],
    rating: 4.5,
    reviews: 76,
    tags: ['Hot', 'Light', 'Floral'],
    category: 'Tea'
  },
  {
    id: 't2',
    name: 'Neon Matcha Latte',
    description: 'Premium matcha whisked with steamed milk for a vibrant green energy boost.',
    price: 5.50,
    image: 'https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4598-I-1-500x375.jpg',
    ingredients: [{ name: 'Matcha', amount: '5g' }, { name: 'Milk', amount: '200ml' }],
    rating: 4.8,
    reviews: 145,
    tags: ['Hot', 'Sweet', 'Creamy'],
    category: 'Tea'
  },
  {
    id: 't3',
    name: 'Holo Earl Grey',
    description: 'Black tea flavored with oil of bergamot, served with a slice of lemon.',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Black Tea', amount: '250ml' }, { name: 'Bergamot', amount: 'Hint' }],
    rating: 4.6,
    reviews: 98,
    tags: ['Hot', 'Citrus', 'Classic'],
    category: 'Tea'
  },
  {
    id: 't4',
    name: 'Quantum Chai',
    description: 'Spiced tea brewed with milk and honey, warming you from the inside out.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Black Tea', amount: '150ml' }, { name: 'Spices', amount: '5g' }, { name: 'Milk', amount: '100ml' }],
    rating: 4.7,
    reviews: 120,
    tags: ['Hot', 'Spicy', 'Sweet'],
    category: 'Tea'
  },
  {
    id: 't5',
    name: 'Void Oolong',
    description: 'Traditional Chinese tea with a complex flavor profile, somewhere between green and black.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Oolong Tea', amount: '250ml' }],
    rating: 4.4,
    reviews: 65,
    tags: ['Hot', 'Complex', 'Traditional'],
    category: 'Tea'
  },
  {
    id: 't6',
    name: 'Plasma Peppermint',
    description: 'Caffeine-free herbal tea that cools and refreshes.',
    price: 3.75,
    image: 'https://img.freepik.com/free-photo/peppermint-tea-glass-ready-drink_1150-38036.jpg?semt=ais_hybrid&w=740&q=80',
    ingredients: [{ name: 'Peppermint', amount: '250ml' }],
    rating: 4.3,
    reviews: 54,
    tags: ['Hot', 'Herbal', 'Refreshing'],
    category: 'Tea'
  },


  // --- SANDWICHES (6 Items) ---
  {
    id: 's1',
    name: 'Cyber Club',
    description: 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Turkey', amount: '100g' }, { name: 'Bacon', amount: '2 slices' }, { name: 'Bread', amount: '3 slices' }],
    rating: 4.7,
    reviews: 150,
    tags: ['Savory', 'Filling', 'Classic'],
    category: 'Sandwiches'
  },
  {
    id: 's2',
    name: 'Neon Panini',
    description: 'Grilled chicken, pesto, and mozzarella pressed to perfection.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Chicken', amount: '100g' }, { name: 'Mozzarella', amount: '50g' }, { name: 'Pesto', amount: '20g' }],
    rating: 4.8,
    reviews: 180,
    tags: ['Hot', 'Savory', 'Crispy'],
    category: 'Sandwiches'
  },
  {
    id: 's3',
    name: 'Holo Veggie Wrap',
    description: 'Fresh vegetables and hummus wrapped in a spinach tortilla.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Hummus', amount: '50g' }, { name: 'Spinach', amount: 'Handful' }, { name: 'Tortilla', amount: '1' }],
    rating: 4.5,
    reviews: 90,
    tags: ['Cold', 'Healthy', 'Vegan'],
    category: 'Sandwiches'
  },
  {
    id: 's4',
    name: 'Quantum Grilled Cheese',
    description: 'A blend of four cheeses melted between two slices of sourdough.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Cheese Blend', amount: '100g' }, { name: 'Sourdough', amount: '2 slices' }],
    rating: 4.6,
    reviews: 200,
    tags: ['Hot', 'Cheesy', 'Comfort'],
    category: 'Sandwiches'
  },
  {
    id: 's5',
    name: 'Void BLT',
    description: 'Crispy bacon, fresh lettuce, and tomato on toasted bread.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Bacon', amount: '4 slices' }, { name: 'Lettuce', amount: '2 leaves' }, { name: 'Tomato', amount: '2 slices' }],
    rating: 4.7,
    reviews: 160,
    tags: ['Savory', 'Classic', 'Crispy'],
    category: 'Sandwiches'
  },
  {
    id: 's6',
    name: 'Plasma Reuben',
    description: 'Corned beef, sauerkraut, Swiss cheese, and Russian dressing on rye.',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Corned Beef', amount: '100g' }, { name: 'Sauerkraut', amount: '50g' }, { name: 'Rye Bread', amount: '2 slices' }],
    rating: 4.8,
    reviews: 110,
    tags: ['Hot', 'Savory', 'Tangy'],
    category: 'Sandwiches'
  },


  // --- DESSERTS (6 Items) ---
  {
    id: 'd1',
    name: 'Cyber Cheesecake',
    description: 'Rich and creamy cheesecake with a graham cracker crust.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Cream Cheese', amount: '100g' }, { name: 'Sugar', amount: '50g' }],
    rating: 4.9,
    reviews: 220,
    tags: ['Sweet', 'Creamy', 'Classic'],
    category: 'Desserts'
  },
  {
    id: 'd2',
    name: 'Neon Brownie',
    description: 'Fudgy chocolate brownie topped with colorful sprinkles.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Chocolate', amount: '50g' }, { name: 'Flour', amount: '30g' }],
    rating: 4.8,
    reviews: 190,
    tags: ['Sweet', 'Chocolate', 'Rich'],
    category: 'Desserts'
  },
  {
    id: 'd3',
    name: 'Holo Macarons',
    description: 'Assorted French macarons in vibrant colors.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Almond Flour', amount: '20g' }, { name: 'Sugar', amount: '20g' }],
    rating: 4.7,
    reviews: 140,
    tags: ['Sweet', 'Delicate', 'Colorful'],
    category: 'Desserts'
  },
  {
    id: 'd4',
    name: 'Quantum Cookie',
    description: 'Giant chocolate chip cookie that is both soft and crispy.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Chocolate Chips', amount: '30g' }, { name: 'Dough', amount: '50g' }],
    rating: 4.8,
    reviews: 250,
    tags: ['Sweet', 'Classic', 'Chewy'],
    category: 'Desserts'
  },
  {
    id: 'd5',
    name: 'Void Tiramisu',
    description: 'Coffee-flavored Italian dessert with layers of ladyfingers and mascarpone.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Espresso', amount: '30ml' }, { name: 'Mascarpone', amount: '50g' }],
    rating: 4.9,
    reviews: 160,
    tags: ['Sweet', 'Coffee', 'Creamy'],
    category: 'Desserts'
  },
  {
    id: 'd6',
    name: 'Plasma Muffin',
    description: 'Blueberry muffin bursting with fresh berries.',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=1000&auto=format&fit=crop',
    ingredients: [{ name: 'Blueberries', amount: '30g' }, { name: 'Flour', amount: '50g' }],
    rating: 4.6,
    reviews: 110,
    tags: ['Sweet', 'Fruity', 'Breakfast'],
    category: 'Desserts'
  },

];
