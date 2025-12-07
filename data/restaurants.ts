
import { MenuCategory, Review } from '../types';

interface MultilingualString {
  en: string;
  es: string;
  fr: string;
  de: string;
}

interface MultilingualMenu {
  en: MenuCategory[];
  es: MenuCategory[];
  fr: MenuCategory[];
  de: MenuCategory[];
}

interface MultilingualRestaurant {
  id: string;
  slug: string;
  title: string;
  uri: string;
  description: MultilingualString;
  address: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  priceLevel: number;
  cuisine: MultilingualString[]; 
  features: MultilingualString[];
  images: string[];
  reviewSnippet: MultilingualString;
  sourceIndex: number;
  openingHours: MultilingualString[];
  phoneNumber: string;
  website: string;
  menu: MultilingualMenu;
  reviews: Review[];
}

export const RESTAURANTS_DB: MultilingualRestaurant[] = [
  {
    id: '1',
    slug: 'el-balcon-de-femes',
    title: 'El Balcón de Femés',
    uri: 'https://maps.google.com/?q=El+Balcon+de+Femes',
    description: {
      en: 'Iconic restaurant located in the mountain village of Femés. Famous for its breathtaking panoramic views of Playa Blanca and Fuerteventura, serving traditional Canarian goat stew and grilled meats.',
      es: 'Restaurante emblemático situado en el pueblo de montaña de Femés. Famoso por sus impresionantes vistas panorámicas de Playa Blanca y Fuerteventura, sirve estofado de cabra tradicional canario y carnes a la brasa.',
      fr: 'Restaurant emblématique situé dans le village de montagne de Femés. Célèbre pour ses vues panoramiques à couper le souffle sur Playa Blanca et Fuerteventura, servant un ragoût de chèvre traditionnel canarien et des viandes grillées.',
      de: 'Kultiges Restaurant im Bergdorf Femés. Berühmt für seinen atemberaubenden Panoramablick auf Playa Blanca und Fuerteventura, serviert traditionellen kanarischen Ziegeneintopf und gegrilltes Fleisch.'
    },
    address: 'Plaza San Marcial 1, 35570 Femés, Lanzarote',
    zone: 'Yaiza',
    coordinates: { lat: 28.9135, lng: -13.7812 },
    rating: 4.6,
    reviewsCount: 2150,
    priceLevel: 2,
    cuisine: [
        { en: 'Canarian', es: 'Canaria', fr: 'Canarienne', de: 'Kanarisch' },
        { en: 'Meats', es: 'Carnes', fr: 'Viandes', de: 'Fleisch' }
    ],
    features: [
        { en: 'Ocean View', es: 'Vistas al Mar', fr: 'Vue Mer', de: 'Meerblick' },
        { en: 'Terrace', es: 'Terraza', fr: 'Terrasse', de: 'Terrasse' },
        { en: 'Traditional Food', es: 'Comida Tradicional', fr: 'Cuisine Traditionnelle', de: 'Traditionelle Küche' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596627787472-79354924c8c0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'The goat stew is a must-try, but the view at sunset is the real star.',
      es: 'El estofado de cabra es imprescindible, pero la vista al atardecer es la verdadera estrella.',
      fr: 'Le ragoût de chèvre est incontournable, mais la vue au coucher du soleil est la vraie star.',
      de: 'Der Ziegeneintopf ist ein Muss, aber die Aussicht bei Sonnenuntergang ist der eigentliche Star.'
    },
    sourceIndex: 1,
    openingHours: [
        { en: 'Mon-Sun: 12:00 - 22:30', es: 'Lun-Dom: 12:00 - 22:30', fr: 'Lun-Dim: 12:00 - 22:30', de: 'Mo-So: 12:00 - 22:30' }
    ],
    phoneNumber: '+34 928 83 00 00',
    website: 'https://elbalcondefemes.com',
    menu: {
      en: [
        {
          title: 'Traditional',
          items: [
            { name: 'Cabrito Estofado', description: 'Traditional stewed goat meat', price: '€16.50' },
            { name: 'Papas Arrugadas', description: 'Wrinkled potatoes with mojo', price: '€5.50' }
          ]
        }
      ],
      es: [
        {
          title: 'Tradicional',
          items: [
            { name: 'Cabrito Estofado', description: 'Carne de cabra estofada tradicional', price: '€16.50' },
            { name: 'Papas Arrugadas', description: 'Papas arrugadas con mojo', price: '€5.50' }
          ]
        }
      ],
      fr: [
        {
          title: 'Traditionnel',
          items: [
            { name: 'Cabrito Estofado', description: 'Ragoût de chèvre traditionnel', price: '€16.50' },
            { name: 'Papas Arrugadas', description: 'Pommes de terre ridées au mojo', price: '€5.50' }
          ]
        }
      ],
      de: [
        {
          title: 'Traditionell',
          items: [
            { name: 'Cabrito Estofado', description: 'Traditioneller Ziegeneintopf', price: '€16.50' },
            { name: 'Papas Arrugadas', description: 'Runzelkartoffeln mit Mojo', price: '€5.50' }
          ]
        }
      ]
    },
    reviews: [
      { author: 'Maria G.', rating: 5, text: 'Spectacular views and authentic food.', date: '1 week ago' }
    ]
  },
  {
    id: '2',
    slug: 'kamezi-deli-bistro',
    title: 'Kamezí Deli & Bistro',
    uri: 'https://kamezi.com/deli-bistro/',
    description: {
      en: 'A sophisticated dining experience in Playa Blanca offering a modern reinterpretation of Canarian cuisine. Tasting menus featuring local Km0 ingredients in an avant-garde setting.',
      es: 'Una experiencia gastronómica sofisticada en Playa Blanca que ofrece una reinterpretación moderna de la cocina canaria. Menús degustación con ingredientes locales Km0 en un entorno vanguardista.',
      fr: 'Une expérience culinaire sophistiquée à Playa Blanca offrant une réinterprétation moderne de la cuisine canarienne. Menus dégustation mettant en vedette des ingrédients locaux Km0 dans un cadre avant-gardiste.',
      de: 'Ein raffiniertes kulinarisches Erlebnis in Playa Blanca, das eine moderne Neuinterpretation der kanarischen Küche bietet. Degustationsmenüs mit lokalen Km0-Zutaten in einem avantgardistischen Ambiente.'
    },
    address: 'Calle Mónaco 2, 35580 Playa Blanca, Lanzarote',
    zone: 'Playa Blanca',
    coordinates: { lat: 28.8615, lng: -13.8569 },
    rating: 4.9,
    reviewsCount: 320,
    priceLevel: 4,
    cuisine: [
        { en: 'Fine Dining', es: 'Alta Cocina', fr: 'Haute Cuisine', de: 'Gehobene Küche' },
        { en: 'Modern Canarian', es: 'Canaria Moderna', fr: 'Canarien Moderne', de: 'Modern Kanarisch' }
    ],
    features: [
        { en: 'Fine Dining', es: 'Alta Cocina', fr: 'Haute Cuisine', de: 'Gehobene Küche' },
        { en: 'Ocean View', es: 'Vistas al Mar', fr: 'Vue Mer', de: 'Meerblick' },
        { en: 'Romantic', es: 'Romántico', fr: 'Romantique', de: 'Romantisch' }
    ],
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=800&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'An exquisite journey through flavors of the volcanic earth. The tasting menu is art.',
      es: 'Un viaje exquisito a través de los sabores de la tierra volcánica. El menú degustación es arte.',
      fr: 'Un voyage exquis à travers les saveurs de la terre volcanique. Le menu dégustation est de l\'art.',
      de: 'Eine exquisite Reise durch die Aromen der vulkanischen Erde. Das Degustationsmenü ist Kunst.'
    },
    sourceIndex: 2,
    openingHours: [
        { en: 'Tue-Sat: 18:30 - 22:00', es: 'Mar-Sab: 18:30 - 22:00', fr: 'Mar-Sam: 18:30 - 22:00', de: 'Di-Sa: 18:30 - 22:00' }
    ],
    phoneNumber: '+34 928 51 86 24',
    website: 'https://kamezi.com',
    menu: {
      en: [ { title: 'Tasting Menu', items: [ { name: 'Volcanic Menu', description: '12-course tasting experience', price: '€85.00' } ] } ],
      es: [ { title: 'Menú Degustación', items: [ { name: 'Menú Volcánico', description: 'Experiencia de 12 platos', price: '€85.00' } ] } ],
      fr: [ { title: 'Menu Dégustation', items: [ { name: 'Menu Volcanique', description: 'Expérience de 12 plats', price: '€85.00' } ] } ],
      de: [ { title: 'Degustationsmenü', items: [ { name: 'Vulkanisches Menü', description: '12-Gänge-Erlebnis', price: '€85.00' } ] } ]
    },
    reviews: [
      { author: 'James B.', rating: 5, text: 'Michelin star quality food and service.', date: '2 days ago' }
    ]
  },
  {
    id: '3',
    slug: 'cofradia-de-pescadores-puerto-del-carmen',
    title: 'Cofradía de Pescadores',
    uri: '#',
    description: {
      en: 'The authentic Fisherman\'s Guild restaurant in La Tiñosa. No frills, just the freshest fish caught daily by local boats, served right on the harbor.',
      es: 'El auténtico restaurante de la Cofradía de Pescadores en La Tiñosa. Sin lujos, solo el pescado más fresco capturado a diario, servido directamente en el puerto.',
      fr: 'L\'authentique restaurant de la Confrérie des Pêcheurs à La Tiñosa. Sans chichis, juste le poisson le plus frais pêché quotidiennement, servi sur le port.',
      de: 'Das authentische Restaurant der Fischerzunft in La Tiñosa. Kein Schnickschnack, nur der frischeste Fisch, täglich gefangen, direkt am Hafen serviert.'
    },
    address: 'Calle Teide 6, 35510 Puerto del Carmen, Lanzarote',
    zone: 'Puerto del Carmen',
    coordinates: { lat: 28.9202, lng: -13.6685 },
    rating: 4.4,
    reviewsCount: 1500,
    priceLevel: 2,
    cuisine: [
        { en: 'Seafood', es: 'Marisco', fr: 'Fruits de Mer', de: 'Meeresfrüchte' },
        { en: 'Tapas', es: 'Tapas', fr: 'Tapas', de: 'Tapas' }
    ],
    features: [
        { en: 'Harbor View', es: 'Vistas al Puerto', fr: 'Vue Port', de: 'Hafenblick' },
        { en: 'Fresh Fish', es: 'Pescado Fresco', fr: 'Poisson Frais', de: 'Frischer Fisch' }
    ],
    images: [
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621852004158-b39768b776a3?q=80&w=800&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Best fresh fish in Puerto del Carmen. Simple, delicious, and honest prices.',
      es: 'El mejor pescado fresco en Puerto del Carmen. Sencillo, delicioso y precios honestos.',
      fr: 'Le meilleur poisson frais de Puerto del Carmen. Simple, délicieux et prix honnêtes.',
      de: 'Bester frischer Fisch in Puerto del Carmen. Einfach, lecker und ehrliche Preise.'
    },
    sourceIndex: 3,
    openingHours: [
        { en: 'Mon-Sun: 11:30 - 23:00', es: 'Lun-Dom: 11:30 - 23:00', fr: 'Lun-Dim: 11:30 - 23:00', de: 'Mo-So: 11:30 - 23:00' }
    ],
    phoneNumber: '+34 928 51 42 42',
    menu: {
        en: [ { title: 'Fresh Fish', items: [ { name: 'Grilled Cherne', description: 'Fresh local wreckfish with salad', price: 'Market Price' } ] } ],
        es: [ { title: 'Pescado Fresco', items: [ { name: 'Cherne a la Plancha', description: 'Cherne local fresco con ensalada', price: 'Precio Mercado' } ] } ],
        fr: [ { title: 'Poisson Frais', items: [ { name: 'Cherne Grillé', description: 'Mérou local frais avec salade', price: 'Prix Marché' } ] } ],
        de: [ { title: 'Frischer Fisch', items: [ { name: 'Gegrillter Cherne', description: 'Frischer lokaler Wrackbarsch mit Salat', price: 'Marktpreis' } ] } ]
    },
    reviews: [],
    website: ''
  },
  {
    id: '4',
    slug: 'la-bodega-de-santiago',
    title: 'La Bodega de Santiago',
    uri: '#',
    description: {
      en: 'A hidden gem in the village of Yaiza. Set in a restored 19th-century house under a giant Ficus tree, offering high-quality meats and wines.',
      es: 'Una joya escondida en el pueblo de Yaiza. Ubicado en una casa restaurada del siglo XIX bajo un árbol Ficus gigante, ofrece carnes y vinos de alta calidad.',
      fr: 'Un joyau caché dans le village de Yaiza. Situé dans une maison restaurée du 19ème siècle sous un arbre Ficus géant, offrant des viandes et des vins de haute qualité.',
      de: 'Ein verstecktes Juwel im Dorf Yaiza. In einem restaurierten Haus aus dem 19. Jahrhundert unter einem riesigen Ficusbaum gelegen, bietet es hochwertiges Fleisch und Weine.'
    },
    address: 'Calle Montañas del Fuego 4, 35570 Yaiza, Lanzarote',
    zone: 'Yaiza',
    coordinates: { lat: 28.9555, lng: -13.7667 },
    rating: 4.7,
    reviewsCount: 890,
    priceLevel: 3,
    cuisine: [
        { en: 'Meats', es: 'Carnes', fr: 'Viandes', de: 'Fleisch' },
        { en: 'International', es: 'Internacional', fr: 'Internationale', de: 'International' }
    ],
    features: [
        { en: 'Historic Building', es: 'Edificio Histórico', fr: 'Bâtiment Historique', de: 'Historisches Gebäude' },
        { en: 'Romantic', es: 'Romántico', fr: 'Romantique', de: 'Romantisch' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Atmosphere is magical under the tree. The Ibérico pork secret was perfection.',
      es: 'El ambiente es mágico bajo el árbol. El secreto ibérico fue perfección.',
      fr: 'L\'atmosphère est magique sous l\'arbre. Le secret de porc ibérique était parfait.',
      de: 'Die Atmosphäre unter dem Baum ist magisch. Das Ibérico-Schwein war perfekt.'
    },
    sourceIndex: 4,
    openingHours: [
        { en: 'Tue-Sat: 12:30-22:30', es: 'Mar-Sab: 12:30-22:30', fr: 'Mar-Sam: 12:30-22:30', de: 'Di-Sa: 12:30-22:30' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '5',
    slug: 'el-amanecer-arrieta',
    title: 'Restaurante El Amanecer',
    uri: '#',
    description: {
      en: 'A classic in Arrieta. Famous for its terrace right over the ocean and serving the best fresh fish in the north of the island.',
      es: 'Un clásico en Arrieta. Famoso por su terraza justo sobre el océano y por servir el mejor pescado fresco del norte de la isla.',
      fr: 'Un classique à Arrieta. Célèbre pour sa terrasse juste au-dessus de l\'océan et servant le meilleur poisson frais du nord de l\'île.',
      de: 'Ein Klassiker in Arrieta. Berühmt für seine Terrasse direkt über dem Meer und den besten frischen Fisch im Norden der Insel.'
    },
    address: 'Calle La Garita 44, 35542 Arrieta, Lanzarote',
    zone: 'Haría',
    coordinates: { lat: 29.1432, lng: -13.4998 },
    rating: 4.5,
    reviewsCount: 2300,
    priceLevel: 2,
    cuisine: [
        { en: 'Seafood', es: 'Marisco', fr: 'Fruits de Mer', de: 'Meeresfrüchte' },
        { en: 'Canarian', es: 'Canaria', fr: 'Canarienne', de: 'Kanarisch' }
    ],
    features: [
        { en: 'Ocean View', es: 'Vistas al Mar', fr: 'Vue Mer', de: 'Meerblick' },
        { en: 'Terrace', es: 'Terraza', fr: 'Terrasse', de: 'Terrasse' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Eating fish while waves crash below you. Unbeatable experience.',
      es: 'Comiendo pescado mientras las olas rompen debajo de ti. Experiencia inmejorable.',
      fr: 'Manger du poisson pendant que les vagues s\'écrasent en dessous. Expérience imbattable.',
      de: 'Fisch essen, während die Wellen unter einem brechen. Unschlagbares Erlebnis.'
    },
    sourceIndex: 5,
    openingHours: [
        { en: 'Thu-Tue: 12:00-20:00', es: 'Jue-Mar: 12:00-20:00', fr: 'Jeu-Mar: 12:00-20:00', de: 'Do-Di: 12:00-20:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '6',
    slug: 'lani-s-gourmet-restaurant',
    title: 'Lani\'s Gourmet Restaurant',
    uri: '#',
    description: {
      en: 'Located in Puerto del Carmen within Lani\'s Suites. Offers refined international cuisine with stunning glass-fronted views of the ocean.',
      es: 'Ubicado en Puerto del Carmen dentro de Lani\'s Suites. Ofrece cocina internacional refinada con impresionantes vistas al mar a través de cristales.',
      fr: 'Situé à Puerto del Carmen au sein de Lani\'s Suites. Offre une cuisine internationale raffinée avec une vue imprenable sur l\'océan.',
      de: 'In Puerto del Carmen in den Lani\'s Suites gelegen. Bietet raffinierte internationale Küche mit atemberaubendem Meerblick durch Glasfronten.'
    },
    address: 'Av. de las Playas 26, 35510 Puerto del Carmen, Lanzarote',
    zone: 'Puerto del Carmen',
    coordinates: { lat: 28.9242, lng: -13.6585 },
    rating: 4.8,
    reviewsCount: 1100,
    priceLevel: 4,
    cuisine: [
        { en: 'Fine Dining', es: 'Alta Cocina', fr: 'Haute Cuisine', de: 'Gehobene Küche' },
        { en: 'International', es: 'Internacional', fr: 'Internationale', de: 'International' }
    ],
    features: [
        { en: 'Luxury', es: 'Lujo', fr: 'Luxe', de: 'Luxus' },
        { en: 'Ocean View', es: 'Vistas al Mar', fr: 'Vue Mer', de: 'Meerblick' }
    ],
    images: [
      'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Impeccable service and the view is just breathtaking. The lobster was divine.',
      es: 'Servicio impecable y la vista es simplemente impresionante. La langosta estaba divina.',
      fr: 'Service impeccable et la vue est juste à couper le souffle. Le homard était divin.',
      de: 'Tadelloser Service und die Aussicht ist einfach atemberaubend. Der Hummer war göttlich.'
    },
    sourceIndex: 6,
    openingHours: [
        { en: 'Daily: 13:00-23:00', es: 'Diario: 13:00-23:00', fr: 'Tous les jours: 13:00-23:00', de: 'Täglich: 13:00-23:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '7',
    slug: 'restaurante-lilium',
    title: 'Restaurante Lilium',
    uri: '#',
    description: {
      en: 'Situated in the Marina of Arrecife, Chef Orlando Ortega serves modern Canarian cuisine that has earned a Repsol Sun and Michelin recommendation.',
      es: 'Situado en la Marina de Arrecife, el chef Orlando Ortega sirve cocina canaria moderna que ha ganado un Sol Repsol y recomendación Michelin.',
      fr: 'Situé dans la Marina d\'Arrecife, le chef Orlando Ortega sert une cuisine canarienne moderne qui a valu un Soleil Repsol et une recommandation Michelin.',
      de: 'In der Marina von Arrecife serviert Küchenchef Orlando Ortega moderne kanarische Küche, die eine Repsol-Sonne und eine Michelin-Empfehlung erhalten hat.'
    },
    address: 'CC Marina Lanzarote, Av. Olof Palme, 35500 Arrecife, Lanzarote',
    zone: 'Arrecife',
    coordinates: { lat: 28.9634, lng: -13.5410 },
    rating: 4.6,
    reviewsCount: 650,
    priceLevel: 3,
    cuisine: [
        { en: 'Modern Canarian', es: 'Canaria Moderna', fr: 'Canarien Moderne', de: 'Modern Kanarisch' },
        { en: 'Creative', es: 'Creativa', fr: 'Créative', de: 'Kreativ' }
    ],
    features: [
        { en: 'Harbor View', es: 'Vistas al Puerto', fr: 'Vue Port', de: 'Hafenblick' },
        { en: 'Michelin Recommended', es: 'Recomendado Michelin', fr: 'Recommandé Michelin', de: 'Michelin Empfohlen' }
    ],
    images: [
      'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Creative twists on local classics. The Ropa Vieja croquettes are essential.',
      es: 'Giros creativos en clásicos locales. Las croquetas de Ropa Vieja son esenciales.',
      fr: 'Des touches créatives sur les classiques locaux. Les croquettes de Ropa Vieja sont essentielles.',
      de: 'Kreative Variationen lokaler Klassiker. Die Ropa Vieja Kroketten sind unverzichtbar.'
    },
    sourceIndex: 7,
    openingHours: [
        { en: 'Mon-Sat: 13:00-23:00', es: 'Lun-Sab: 13:00-23:00', fr: 'Lun-Sam: 13:00-23:00', de: 'Mo-Sa: 13:00-23:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '8',
    slug: 'la-carmencita-del-puerto',
    title: 'La Carmencita del Puerto',
    uri: '#',
    description: {
      en: 'A vibrant and cozy spot in Puerto del Carmen specializing in high-quality creative tapas. A favorite among locals and repeat tourists.',
      es: 'Un lugar vibrante y acogedor en Puerto del Carmen especializado en tapas creativas de alta calidad. Favorito entre locales y turistas habituales.',
      fr: 'Un endroit vibrant et chaleureux à Puerto del Carmen spécialisé dans les tapas créatives de haute qualité. Un favori parmi les habitants et les touristes.',
      de: 'Ein lebhafter und gemütlicher Ort in Puerto del Carmen, spezialisiert auf hochwertige kreative Tapas. Ein Favorit bei Einheimischen und wiederkehrenden Touristen.'
    },
    address: 'Av. de las Playas 18, 35510 Puerto del Carmen, Lanzarote',
    zone: 'Puerto del Carmen',
    coordinates: { lat: 28.9230, lng: -13.6600 },
    rating: 4.7,
    reviewsCount: 980,
    priceLevel: 2,
    cuisine: [
        { en: 'Tapas', es: 'Tapas', fr: 'Tapas', de: 'Tapas' },
        { en: 'Spanish', es: 'Española', fr: 'Espagnole', de: 'Spanisch' }
    ],
    features: [
        { en: 'Cozy', es: 'Acogedor', fr: 'Chaleureux', de: 'Gemütlich' },
        { en: 'Creative Tapas', es: 'Tapas Creativas', fr: 'Tapas Créatives', de: 'Kreative Tapas' }
    ],
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Not your typical tourist trap. The tapas are inventive and full of flavor.',
      es: 'No es la típica trampa para turistas. Las tapas son inventivas y llenas de sabor.',
      fr: 'Pas le piège à touristes typique. Les tapas sont inventives et pleines de saveurs.',
      de: 'Keine typische Touristenfalle. Die Tapas sind einfallsreich und voller Geschmack.'
    },
    sourceIndex: 8,
    openingHours: [
        { en: 'Mon-Sat: 18:00-23:00', es: 'Lun-Sab: 18:00-23:00', fr: 'Lun-Sam: 18:00-23:00', de: 'Mo-Sa: 18:00-23:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '9',
    slug: 'casa-carlos',
    title: 'Casa Carlos',
    uri: '#',
    description: {
      en: 'Located in Playa Blanca near the lighthouse, offering a warm atmosphere and a menu that blends international dishes with fresh local seafood.',
      es: 'Ubicado en Playa Blanca cerca del faro, ofrece un ambiente cálido y un menú que combina platos internacionales con mariscos locales frescos.',
      fr: 'Situé à Playa Blanca près du phare, offrant une atmosphère chaleureuse et un menu mêlant plats internationaux et fruits de mer locaux frais.',
      de: 'In Playa Blanca in der Nähe des Leuchtturms gelegen, bietet es eine warme Atmosphäre und ein Menü, das internationale Gerichte mit frischen lokalen Meeresfrüchten verbindet.'
    },
    address: 'Calle La Lapa 20, 35580 Playa Blanca, Lanzarote',
    zone: 'Playa Blanca',
    coordinates: { lat: 28.8650, lng: -13.8700 },
    rating: 4.5,
    reviewsCount: 1400,
    priceLevel: 3,
    cuisine: [
        { en: 'International', es: 'Internacional', fr: 'Internationale', de: 'International' },
        { en: 'Seafood', es: 'Marisco', fr: 'Fruits de Mer', de: 'Meeresfrüchte' }
    ],
    features: [
        { en: 'Terrace', es: 'Terraza', fr: 'Terrasse', de: 'Terrasse' },
        { en: 'Sunset View', es: 'Vista Atardecer', fr: 'Vue Coucher Soleil', de: 'Sonnenuntergangsblick' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Great service and consistency. The grilled fish platter is huge.',
      es: 'Gran servicio y consistencia. La parrillada de pescado es enorme.',
      fr: 'Excellent service et constance. Le plateau de poisson grillé est énorme.',
      de: 'Toller Service und Beständigkeit. Die gegrillte Fischplatte ist riesig.'
    },
    sourceIndex: 9,
    openingHours: [
        { en: 'Daily: 12:00-22:30', es: 'Diario: 12:00-22:30', fr: 'Tous les jours: 12:00-22:30', de: 'Täglich: 12:00-22:30' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '10',
    slug: 'cantina-teguise',
    title: 'Cantina Teguise',
    uri: '#',
    description: {
      en: 'Set in a historic building in the heart of Teguise. A place with soul, serving excellent burgers, local wines, and fusion tapas.',
      es: 'Ubicado en un edificio histórico en el corazón de Teguise. Un lugar con alma, que sirve excelentes hamburguesas, vinos locales y tapas fusión.',
      fr: 'Situé dans un bâtiment historique au cœur de Teguise. Un lieu avec une âme, servant d\'excellents burgers, des vins locaux et des tapas fusion.',
      de: 'In einem historischen Gebäude im Herzen von Teguise gelegen. Ein Ort mit Seele, der ausgezeichnete Burger, lokale Weine und Fusion-Tapas serviert.'
    },
    address: 'Calle León y Castillo 8, 35530 Teguise, Lanzarote',
    zone: 'Teguise',
    coordinates: { lat: 29.0605, lng: -13.5585 },
    rating: 4.6,
    reviewsCount: 1200,
    priceLevel: 2,
    cuisine: [
        { en: 'Tapas', es: 'Tapas', fr: 'Tapas', de: 'Tapas' },
        { en: 'Burgers', es: 'Hamburguesas', fr: 'Burgers', de: 'Burger' }
    ],
    features: [
        { en: 'Historic', es: 'Histórico', fr: 'Historique', de: 'Historisch' },
        { en: 'Live Music', es: 'Música en Vivo', fr: 'Musique Live', de: 'Live-Musik' }
    ],
    images: [
      'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'The secret garden in the back is a lovely escape. Best burgers on the island.',
      es: 'El jardín secreto en la parte trasera es un escape encantador. Las mejores hamburguesas de la isla.',
      fr: 'Le jardin secret à l\'arrière est une belle évasion. Les meilleurs burgers de l\'île.',
      de: 'Der geheime Garten im hinteren Bereich ist ein schöner Rückzugsort. Beste Burger der Insel.'
    },
    sourceIndex: 10,
    openingHours: [
        { en: 'Daily: 11:00-23:00', es: 'Diario: 11:00-23:00', fr: 'Tous les jours: 11:00-23:00', de: 'Täglich: 11:00-23:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '11',
    slug: 'divina-italia-costa-teguise',
    title: 'Divina Italia',
    uri: '#',
    description: {
      en: 'A beloved Italian restaurant in Costa Teguise known for its authentic pasta, thin-crust pizzas, and friendly service.',
      es: 'Un querido restaurante italiano en Costa Teguise conocido por su pasta auténtica, pizzas de masa fina y servicio amable.',
      fr: 'Un restaurant italien bien-aimé à Costa Teguise connu pour ses pâtes authentiques, ses pizzas à croûte fine et son service amical.',
      de: 'Ein beliebtes italienisches Restaurant in Costa Teguise, bekannt für seine authentische Pasta, Pizzen mit dünnem Boden und freundlichen Service.'
    },
    address: 'Av. del Jablillo 15, 35508 Costa Teguise, Lanzarote',
    zone: 'Costa Teguise',
    coordinates: { lat: 28.9950, lng: -13.4950 },
    rating: 4.5,
    reviewsCount: 800,
    priceLevel: 2,
    cuisine: [
        { en: 'Italian', es: 'Italiana', fr: 'Italienne', de: 'Italienisch' },
        { en: 'Pizza', es: 'Pizza', fr: 'Pizza', de: 'Pizza' }
    ],
    features: [
        { en: 'Family Friendly', es: 'Familiar', fr: 'Familial', de: 'Familienfreundlich' },
        { en: 'Takeaway', es: 'Para Llevar', fr: 'À Emporter', de: 'Zum Mitnehmen' }
    ],
    images: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Authentic Italian flavors. The Carbonara is the real deal.',
      es: 'Sabores italianos auténticos. La Carbonara es la de verdad.',
      fr: 'Saveurs italiennes authentiques. La Carbonara est la vraie.',
      de: 'Authentische italienische Aromen. Die Carbonara ist echt.'
    },
    sourceIndex: 11,
    openingHours: [
        { en: 'Wed-Mon: 17:00-23:00', es: 'Mie-Lun: 17:00-23:00', fr: 'Mer-Lun: 17:00-23:00', de: 'Mi-Mo: 17:00-23:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  },
  {
    id: '12',
    slug: 'el-risco',
    title: 'Restaurante El Risco',
    uri: '#',
    description: {
      en: 'Located in Famara, this restaurant honors the legacy of Cesar Manrique. Offers creative Canarian cuisine with a focus on local fish and a stunning mural designed by Manrique himself.',
      es: 'Situado en Famara, este restaurante honra el legado de César Manrique. Ofrece cocina canaria creativa con enfoque en pescado local y un impresionante mural diseñado por el propio Manrique.',
      fr: 'Situé à Famara, ce restaurant honore l\'héritage de Cesar Manrique. Offre une cuisine canarienne créative axée sur le poisson local et une superbe fresque conçue par Manrique lui-même.',
      de: 'In Famara gelegen, ehrt dieses Restaurant das Erbe von Cesar Manrique. Bietet kreative kanarische Küche mit Schwerpunkt auf lokalem Fisch und ein atemberaubendes Wandgemälde, das von Manrique selbst entworfen wurde.'
    },
    address: 'Calle Montaña Clara 30, 35558 Caleta de Famara, Lanzarote',
    zone: 'Famara',
    coordinates: { lat: 29.1175, lng: -13.5650 },
    rating: 4.6,
    reviewsCount: 950,
    priceLevel: 3,
    cuisine: [
        { en: 'Seafood', es: 'Marisco', fr: 'Fruits de Mer', de: 'Meeresfrüchte' },
        { en: 'Creative', es: 'Creativa', fr: 'Créative', de: 'Kreativ' }
    ],
    features: [
        { en: 'Ocean View', es: 'Vistas al Mar', fr: 'Vue Mer', de: 'Meerblick' },
        { en: 'Artistic', es: 'Artístico', fr: 'Artistique', de: 'Künstlerisch' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1200&auto=format&fit=crop',
    ],
    reviewSnippet: {
      en: 'Beautiful setting and food that matches the art on the walls.',
      es: 'Hermoso entorno y comida que está a la altura del arte en las paredes.',
      fr: 'Cadre magnifique et nourriture à la hauteur de l\'art sur les murs.',
      de: 'Schöne Umgebung und Essen, das zur Kunst an den Wänden passt.'
    },
    sourceIndex: 12,
    openingHours: [
        { en: 'Wed-Mon: 12:00-22:00', es: 'Mie-Lun: 12:00-22:00', fr: 'Mer-Lun: 12:00-22:00', de: 'Mi-Mo: 12:00-22:00' }
    ],
    menu: { en: [], es: [], fr: [], de: [] },
    reviews: [],
    phoneNumber: '',
    website: ''
  }
];
