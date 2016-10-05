import db from '../db';

const test = db.get('test');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const {
    sort = 'email',
    limit = 100,
    ...args
  } = req.query;
  Object.keys(args).map((value, index) => {
    const arg = args[value].toLowerCase();
    if(arg === 'true' || arg === 'false') {
      args[value] = JSON.parse(arg);
    };
  });

  // const filterObj = {};
  // filterObj[filter] = filter.charAt(0) === '-' ? false : true;
  const data = test
  .filter(args)
  .sortBy(sort)
  .take(limit)
  .value();
  res.json(data);
});


router.get('/:id', (req, res, next) => {
  const data = test.find({id: req.params.id}).value();
  if(data) {
    res.json(data);
  } else {
    next();
  }
});

router.post('/', (req, res) => {
  const id = uuid();
  test.push({
    id,
    ...req.body
  })
  .value();
  res.status(200).send(test.find({id}).value());
});

router.get('/currencies', (req, res) => {
  const currencies = [{
    name: 'USD',
    symbol: '$',
    base: true,
    // rate: 1,
  }, {
    name: 'EUR',
    symbol: '€',
    base: false,
    // rate: 0.745101,
  }, {
    name: 'HKD',
    symbol: '$',
    base: false,
    // rate: 7.781919,
  }, {
    name: 'GBP',
    symbol: '£',
    base: false,
    // rate: 0.647710,
  }];
  res.status(200).send(currencies);
});

router.get('/amenities', (req, res) => {
  const amenities = [
    "pets_allowed",
    "pool",
    "dishwasher",
    "terrace_balcony",
    "washing_machine_available",
    "tv"
  ]
  res.status(200).send(amenities);
});

router.get('/properties', (req, res) => {
  const properties = {
    "houseId": "HOPTWXY7WM9",
    "name": "Goldner Trafficway",
    "description": "Quia amet doloremque id corrupti. Ut id quod at quo aut explicabo tempora. Aliquid quidem facere nihil eius sunt ut esse optio. Rerum ipsam eaque impedit dolore.",
    "images": [
      "http://lorempixel.com/190/190/city/?13527",
      "http://lorempixel.com/190/190/city/?27214",
      "http://lorempixel.com/190/190/city/?52808",
      "http://lorempixel.com/190/190/city/?87855",
      "http://lorempixel.com/190/190/city/?49645"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Estonia",
      "city": "Creminfurt",
      "address": "6767 Andreanne Avenue",
      "postal_code": "30564",
      "region": "North",
      "sub_region": "East",
      "locality": "Yeshwanthpura"
    },
    "bed_number": 1,
    "bathroom_number": 1.5,
    "bedroom_number": 9,
    "guest_number": 63,
    "distance": 137,
    "price_per_night": 167.74
  },
  {
    "houseId": "HODCXQNLBTE",
    "name": "Ankunding Rapids",
    "description": "Necessitatibus est iure quam sequi. Qui suscipit omnis aut animi praesentium assumenda esse. Temporibus error molestiae iste perspiciatis nisi. Maxime dicta quia in. Eligendi in necessitatibus praesentium facere perspiciatis et.",
    "images": [
      "http://lorempixel.com/190/190/city/?22851",
      "http://lorempixel.com/190/190/city/?29224",
      "http://lorempixel.com/190/190/city/?62593",
      "http://lorempixel.com/190/190/city/?54263",
      "http://lorempixel.com/190/190/city/?76437"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Bolivia",
      "city": "Port Orlandomouth",
      "address": "614 Shanny Points",
      "postal_code": "45808",
      "region": "East",
      "sub_region": "West",
      "locality": "Bandra"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 1,
    "guest_number": 69,
    "distance": 111,
    "price_per_night": 107.69
  },
  {
    "houseId": "HO8305T2PQI",
    "name": "Roy Path",
    "description": "Cupiditate ea et consequuntur mollitia. Esse officiis eaque quo vero. Enim assumenda et adipisci rerum cum unde. Et nisi necessitatibus velit praesentium.",
    "images": [
      "http://lorempixel.com/190/190/city/?23571",
      "http://lorempixel.com/190/190/city/?54565",
      "http://lorempixel.com/190/190/city/?42595",
      "http://lorempixel.com/190/190/city/?34329",
      "http://lorempixel.com/190/190/city/?65032"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Myanmar",
      "city": "Lefflerview",
      "address": "1142 Arden Underpass",
      "postal_code": "28115",
      "region": "West",
      "sub_region": "West",
      "locality": "Bandra"
    },
    "bed_number": 1,
    "bathroom_number": 1.5,
    "bedroom_number": 1,
    "guest_number": 53,
    "distance": 147,
    "price_per_night": 131
  },
  {
    "houseId": "HOR4EG2JI38",
    "name": "Ledner Spur",
    "description": "Repellendus maxime voluptatibus accusantium quia cupiditate voluptatibus amet eum. Ex cum ipsum laudantium placeat vel cupiditate aut. Ut nesciunt eius nihil sunt.",
    "images": [
      "http://lorempixel.com/190/190/city/?20466",
      "http://lorempixel.com/190/190/city/?92813",
      "http://lorempixel.com/190/190/city/?58423",
      "http://lorempixel.com/190/190/city/?15453",
      "http://lorempixel.com/190/190/city/?15114"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Netherlands Antilles",
      "city": "Rueckerfort",
      "address": "5195 Rath Wall Apt. 736",
      "postal_code": "64816",
      "region": "North",
      "sub_region": "Central",
      "locality": "Bandra"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 7,
    "guest_number": 26,
    "distance": 89,
    "price_per_night": 146.89
  },
  {
    "houseId": "HODWN81L962",
    "name": "Lubowitz Valley",
    "description": "Rem nesciunt aut ab temporibus dolorum. Et et sed sit accusantium a inventore ipsum. Eum quisquam molestiae amet omnis illum repellat harum itaque. Temporibus sed ea corrupti dolor vero quasi perspiciatis odio. Architecto tempora libero suscipit eligendi culpa nemo quisquam.",
    "images": [
      "http://lorempixel.com/190/190/city/?67183",
      "http://lorempixel.com/190/190/city/?28563",
      "http://lorempixel.com/190/190/city/?49824",
      "http://lorempixel.com/190/190/city/?28726",
      "http://lorempixel.com/190/190/city/?15727"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Jordan",
      "city": "West Alysonside",
      "address": "6776 Bayer Grove",
      "postal_code": "32926-1194",
      "region": "West",
      "sub_region": "West",
      "locality": "Kormangala"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 4,
    "guest_number": 12,
    "distance": 67,
    "price_per_night": 153.73
  },
  {
    "houseId": "HOTLAB521E2",
    "name": "Morissette Flats",
    "description": "Laboriosam laudantium unde et id sint culpa id eos. Ut voluptatem accusantium et. Id et amet fuga maiores.",
    "images": [
      "http://lorempixel.com/190/190/city/?43031",
      "http://lorempixel.com/190/190/city/?74696",
      "http://lorempixel.com/190/190/city/?48744",
      "http://lorempixel.com/190/190/city/?79033",
      "http://lorempixel.com/190/190/city/?93560"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Venezuela",
      "city": "Port Gina",
      "address": "90936 Kilback Springs Apt. 199",
      "postal_code": "39610",
      "region": "Central",
      "sub_region": "North",
      "locality": "Marathahalli"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 4,
    "guest_number": 3,
    "distance": 53,
    "price_per_night": 151.24
  },
  {
    "houseId": "HOU01XSEIRY",
    "name": "Faye Mountain",
    "description": "Nihil veritatis et totam error dicta natus. Et consequatur voluptatum incidunt molestiae. Ut incidunt laboriosam beatae non est et. Natus labore porro quam adipisci reprehenderit ea quia.",
    "images": [
      "http://lorempixel.com/190/190/city/?47794",
      "http://lorempixel.com/190/190/city/?49568",
      "http://lorempixel.com/190/190/city/?11481",
      "http://lorempixel.com/190/190/city/?18082",
      "http://lorempixel.com/190/190/city/?40198"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Kuwait",
      "city": "Lake Madiestad",
      "address": "86889 Wintheiser Ways",
      "postal_code": "13788",
      "region": "West",
      "sub_region": "Central",
      "locality": "Deccan Gymkhana"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 10,
    "guest_number": 35,
    "distance": 132,
    "price_per_night": 179.49
  },
  {
    "houseId": "HOGRJC7TO5L",
    "name": "Schroeder Rue",
    "description": "Necessitatibus est consequatur veniam possimus illo ut. Error omnis voluptatem molestias molestiae at similique tempora. Illum laborum beatae debitis dolor eligendi est. Voluptatum quis consequuntur qui culpa. Assumenda adipisci aut ipsam autem ut et.",
    "images": [
      "http://lorempixel.com/190/190/city/?25369",
      "http://lorempixel.com/190/190/city/?76110",
      "http://lorempixel.com/190/190/city/?30757",
      "http://lorempixel.com/190/190/city/?64246",
      "http://lorempixel.com/190/190/city/?71244"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Korea",
      "city": "Lake Murlside",
      "address": "3082 Orn Valley",
      "postal_code": "75494",
      "region": "West",
      "sub_region": "North",
      "locality": "Harmada"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 4,
    "guest_number": 9,
    "distance": 127,
    "price_per_night": 164.15
  },
  {
    "houseId": "HOXO4QUK03T",
    "name": "Ziemann Extension",
    "description": "In et tenetur nisi architecto rerum et. Dolor commodi sed qui eveniet exercitationem fuga. Consequatur molestias qui labore recusandae iure. Ad alias enim aperiam incidunt illum et. Praesentium tempore commodi aut voluptatem.",
    "images": [
      "http://lorempixel.com/190/190/city/?55156",
      "http://lorempixel.com/190/190/city/?13874",
      "http://lorempixel.com/190/190/city/?34254",
      "http://lorempixel.com/190/190/city/?31053",
      "http://lorempixel.com/190/190/city/?52471"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Turkey",
      "city": "Padbergton",
      "address": "73383 Dickinson Glen",
      "postal_code": "59735",
      "region": "Central",
      "sub_region": "West",
      "locality": "Model Town"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 8,
    "guest_number": 53,
    "distance": 59,
    "price_per_night": 111.76
  },
  {
    "houseId": "HOYEMPGN4KX",
    "name": "Nicholaus Knoll",
    "description": "Animi voluptates voluptate qui possimus aut recusandae et non. Ipsa dolorem dolorem ut modi dicta praesentium dolor. Omnis tenetur esse minus minus. Est labore ut explicabo eum.",
    "images": [
      "http://lorempixel.com/190/190/city/?87215",
      "http://lorempixel.com/190/190/city/?84327",
      "http://lorempixel.com/190/190/city/?92557",
      "http://lorempixel.com/190/190/city/?60458",
      "http://lorempixel.com/190/190/city/?29451"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Finland",
      "city": "Brandtberg",
      "address": "941 Dan Street Apt. 350",
      "postal_code": "44551-8127",
      "region": "Central",
      "sub_region": "North",
      "locality": "Hadapsar"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 9,
    "guest_number": 2,
    "distance": 88,
    "price_per_night": 148.03
  },
  {
    "houseId": "HOB0K3SAUSN",
    "name": "Wunsch Expressway",
    "description": "Exercitationem at esse tenetur libero. Corporis consequatur amet illo magni quas et assumenda nisi. Quo ducimus ex id deleniti. Enim ut corrupti velit sed.",
    "images": [
      "http://lorempixel.com/190/190/city/?84599",
      "http://lorempixel.com/190/190/city/?75597",
      "http://lorempixel.com/190/190/city/?18487",
      "http://lorempixel.com/190/190/city/?38256",
      "http://lorempixel.com/190/190/city/?24994"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Montserrat",
      "city": "North Patienceshire",
      "address": "107 Hilda Estates Suite 840",
      "postal_code": "50297-9734",
      "region": "East",
      "sub_region": "West",
      "locality": "Hinjewadi"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 2,
    "guest_number": 32,
    "distance": 89,
    "price_per_night": 170.84
  },
  {
    "houseId": "HOS1TKUS9CQ",
    "name": "Kiarra Land",
    "description": "Voluptatibus nihil iste cupiditate quos et. In molestias inventore dolores corrupti ut vel. Quo est nihil distinctio suscipit minima ipsa. Omnis a sint ratione unde ea mollitia nihil molestias.",
    "images": [
      "http://lorempixel.com/190/190/city/?24304",
      "http://lorempixel.com/190/190/city/?73964",
      "http://lorempixel.com/190/190/city/?10004",
      "http://lorempixel.com/190/190/city/?13374",
      "http://lorempixel.com/190/190/city/?86944"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Sweden",
      "city": "Quincybury",
      "address": "8639 Kasandra Walks",
      "postal_code": "46273-5035",
      "region": "West",
      "sub_region": "Central",
      "locality": "Borivali"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 2,
    "guest_number": 44,
    "distance": 115,
    "price_per_night": 110.36
  },
  {
    "houseId": "HOBOJVYICFR",
    "name": "Serena Glen",
    "description": "Totam facilis et omnis aut enim. Sed voluptas id nihil esse cum. Error alias necessitatibus et laborum dolore molestias dignissimos. Libero itaque enim ducimus aut.",
    "images": [
      "http://lorempixel.com/190/190/city/?21678",
      "http://lorempixel.com/190/190/city/?54063",
      "http://lorempixel.com/190/190/city/?45056",
      "http://lorempixel.com/190/190/city/?68485",
      "http://lorempixel.com/190/190/city/?77117"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Saint Barthelemy",
      "city": "Quigleybury",
      "address": "9643 Rosie Gateway Suite 967",
      "postal_code": "24613",
      "region": "East",
      "sub_region": "Central",
      "locality": "Chandpole"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 10,
    "guest_number": 41,
    "distance": 140,
    "price_per_night": 113.05
  },
  {
    "houseId": "HOKFQYVXLPN",
    "name": "Ritchie Greens",
    "description": "Dolorum eos aut veritatis labore consequatur. Sed dolores qui distinctio quaerat. Quia sequi nostrum quasi assumenda a. Aut debitis suscipit et laboriosam fuga dignissimos. Harum velit distinctio et repellendus dolorem et.",
    "images": [
      "http://lorempixel.com/190/190/city/?37370",
      "http://lorempixel.com/190/190/city/?84871",
      "http://lorempixel.com/190/190/city/?82816",
      "http://lorempixel.com/190/190/city/?28980",
      "http://lorempixel.com/190/190/city/?97150"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Macedonia",
      "city": "Bednarport",
      "address": "26910 Twila River",
      "postal_code": "87956",
      "region": "West",
      "sub_region": "Central",
      "locality": "Dadar"
    },
    "bed_number": 3,
    "bathroom_number": 3,
    "bedroom_number": 7,
    "guest_number": 78,
    "distance": 105,
    "price_per_night": 150.19
  },
  {
    "houseId": "HOKKA1J1Y7O",
    "name": "Carmel Keys",
    "description": "Est illum quos in nobis ipsam animi blanditiis. Deserunt porro recusandae inventore facere et ut non. Ut repellat voluptatem fuga sed architecto velit facere non. Minima sequi sint qui et consectetur illo. Adipisci libero qui est est voluptatem expedita accusantium.",
    "images": [
      "http://lorempixel.com/190/190/city/?75724",
      "http://lorempixel.com/190/190/city/?68942",
      "http://lorempixel.com/190/190/city/?23034",
      "http://lorempixel.com/190/190/city/?30613",
      "http://lorempixel.com/190/190/city/?42638"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Wallis and Futuna",
      "city": "Brandoland",
      "address": "3285 Joesph Stream Suite 451",
      "postal_code": "80093",
      "region": "Central",
      "sub_region": "West",
      "locality": "Kharadi"
    },
    "bed_number": 3.5,
    "bathroom_number": 2.5,
    "bedroom_number": 3,
    "guest_number": 53,
    "distance": 119,
    "price_per_night": 146.69
  },
  {
    "houseId": "HOV8IXJC85J",
    "name": "Zackery Keys",
    "description": "Aut autem quidem quidem illo. Omnis non enim ipsum ut quis officiis. Quos voluptatem rerum ut. Eum quia sit earum fugiat ea voluptate aliquam.",
    "images": [
      "http://lorempixel.com/190/190/city/?25287",
      "http://lorempixel.com/190/190/city/?18218",
      "http://lorempixel.com/190/190/city/?92139",
      "http://lorempixel.com/190/190/city/?74947",
      "http://lorempixel.com/190/190/city/?59636"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Sudan",
      "city": "Nyasiastad",
      "address": "1132 Rutherford Rapids Apt. 357",
      "postal_code": "98305",
      "region": "North",
      "sub_region": "West",
      "locality": "Mansarovar"
    },
    "bed_number": 8,
    "bathroom_number": 4,
    "bedroom_number": 5,
    "guest_number": 68,
    "distance": 62,
    "price_per_night": 140.54
  },
  {
    "houseId": "HOHYPDXHPUG",
    "name": "Kub Meadow",
    "description": "Soluta rerum aut placeat ut voluptas voluptas dolore. Quia similique explicabo voluptatibus alias ut ipsam. Dignissimos vel ut et reprehenderit maiores eum.",
    "images": [
      "http://lorempixel.com/190/190/city/?32281",
      "http://lorempixel.com/190/190/city/?30164",
      "http://lorempixel.com/190/190/city/?90287",
      "http://lorempixel.com/190/190/city/?44743",
      "http://lorempixel.com/190/190/city/?46920"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Saint Helena",
      "city": "North Eli",
      "address": "249 Walter Flats Apt. 545",
      "postal_code": "97096",
      "region": "East",
      "sub_region": "North",
      "locality": "Model Town"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 2,
    "guest_number": 63,
    "distance": 97,
    "price_per_night": 182.59
  },
  {
    "houseId": "HO9WU2II3WI",
    "name": "Little Square",
    "description": "Eligendi dolorem laboriosam qui. Perspiciatis provident est nobis laudantium consequatur. Doloremque eveniet provident non est. Et quaerat soluta vel est dolor magnam.",
    "images": [
      "http://lorempixel.com/190/190/city/?63062",
      "http://lorempixel.com/190/190/city/?32368",
      "http://lorempixel.com/190/190/city/?31984",
      "http://lorempixel.com/190/190/city/?91688",
      "http://lorempixel.com/190/190/city/?75568"
    ],
    "type": {
      "id": "house",
      "name": "House"
    },
    "location": {
      "country": "Azerbaijan",
      "city": "South Ethel",
      "address": "16704 Conn Gateway Apt. 732",
      "postal_code": "20897",
      "region": "Central",
      "sub_region": "North",
      "locality": "Hadapsar"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 4,
    "guest_number": 54,
    "distance": 124,
    "price_per_night": 133.01
  },
  {
    "houseId": "HONIMS3F0D1",
    "name": "Rod Extension",
    "description": "Consequuntur qui quia accusamus ea ea voluptatem labore. Voluptatem id expedita maxime dignissimos. Doloribus necessitatibus distinctio ut nesciunt similique sed. Quos repudiandae consequatur similique voluptatibus autem quibusdam.",
    "images": [
      "http://lorempixel.com/190/190/city/?67797",
      "http://lorempixel.com/190/190/city/?27215",
      "http://lorempixel.com/190/190/city/?94527",
      "http://lorempixel.com/190/190/city/?52118",
      "http://lorempixel.com/190/190/city/?29717"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Uzbekistan",
      "city": "Mariellestad",
      "address": "1034 Shanahan Landing Apt. 983",
      "postal_code": "22114-9107",
      "region": "North",
      "sub_region": "Central",
      "locality": "Hinjewadi"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 10,
    "guest_number": 25,
    "distance": 62,
    "price_per_night": 118.81
  },
  {
    "houseId": "HO8LDXY8IPW",
    "name": "Bradtke River",
    "description": "Laborum repellat quisquam dolor maiores accusamus ipsa. Ea maiores quis illum neque quia dolores fugiat ut. Dolore quas enim vero. Quia ex quas veniam fugit similique. Odio autem repellendus repudiandae omnis et iste eveniet expedita. Commodi incidunt est sint eligendi et.",
    "images": [
      "http://lorempixel.com/190/190/city/?99733",
      "http://lorempixel.com/190/190/city/?14240",
      "http://lorempixel.com/190/190/city/?71400",
      "http://lorempixel.com/190/190/city/?31141",
      "http://lorempixel.com/190/190/city/?91988"
    ],
    "type": {
      "id": "apartment",
      "name": "Apartment"
    },
    "location": {
      "country": "Serbia",
      "city": "New Dawson",
      "address": "4728 Vladimir Ramp Apt. 690",
      "postal_code": "66087",
      "region": "North",
      "sub_region": "North",
      "locality": "Chandpole"
    },
    "bed_number": 2,
    "bathroom_number": 2.5,
    "bedroom_number": 10,
    "guest_number": 72,
    "distance": 76,
    "price_per_night": 118.7
  };
  res.status(200).send(properties);
});




router.get('/error', (req, res) => {
  res.status(400).send('Error');
});

router.post('/error', (req, res) => {
  res.status(400).send('Error');
});

router.get('/clear', (req, res) => {
  const data = test
  .remove()
  .value();
  res.status(200).send('Done');
});

module.exports = router;
