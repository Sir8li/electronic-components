// 全局变量
window.products = [
    {
        id: 1,
        name: { zh: 'USB Type-C 数据线', en: 'USB Type-C Data Cable' },
        description: { zh: '高品质USB-C数据线，支持快充', en: 'High quality USB-C cable with fast charging' },
        category: 'connectors',
        price: 3.90,
        originalPrice: 5.50,
        image: '🔌',
        specs: { type: 'USB-C', length: '1m' },
        tags: ['快充', '数据线'],
        tagsEn: ['Fast Charge', 'Data Cable'],
        stock: 1000,
        sales: 120,
        rating: 4.8
    },
    {
        id: 2,
        name: { zh: 'LED灯珠 5mm', en: 'LED Diode 5mm' },
        description: { zh: '高亮LED灯珠，多种颜色可选', en: 'High brightness LED diode' },
        category: 'led',
        price: 0.50,
        originalPrice: 0.80,
        image: '💡',
        specs: { color: 'White', voltage: '3.2V' },
        tags: ['LED', '灯珠'],
        tagsEn: ['LED', 'Diode'],
        stock: 5000,
        sales: 350,
        rating: 4.6
    },
    {
        id: 3,
        name: { zh: '贴片电阻 1kΩ', en: 'SMD Resistor 1kΩ' },
        description: { zh: '高精度贴片电阻，5%公差', en: 'High precision SMD resistor' },
        category: 'resistors',
        price: 0.10,
        originalPrice: 0.15,
        image: '🔧',
        specs: { value: '1kΩ', package: '0805' },
        tags: ['电阻', '贴片'],
        tagsEn: ['Resistor', 'SMD'],
        stock: 10000,
        sales: 890,
        rating: 4.9
    },
    {
        id: 4,
        name: { zh: 'Arduino开发板', en: 'Arduino Board' },
        description: { zh: '开源电子原型平台，适合学习', en: 'Open source electronics prototyping platform' },
        category: 'ics',
        price: 25.00,
        originalPrice: 35.00,
        image: '💻',
        specs: { model: 'Uno R3', MCU: 'ATmega328P' },
        tags: ['开发板', 'Arduino'],
        tagsEn: ['Development Board', 'Arduino'],
        stock: 200,
        sales: 45,
        rating: 4.7
    },
    {
        id: 5,
        name: { zh: '锂电池 18650', en: 'Li-ion Battery 18650' },
        description: { zh: '高性能锂离子电池，3.7V', en: 'High performance Li-ion battery' },
        category: 'power',
        price: 8.50,
        originalPrice: 12.00,
        image: '🔋',
        specs: { capacity: '2600mAh', voltage: '3.7V' },
        tags: ['电池', '18650'],
        tagsEn: ['Battery', '18650'],
        stock: 500,
        sales: 180,
        rating: 4.5
    },
    {
        id: 6,
        name: { zh: 'HC-SR04超声波传感器', en: 'HC-SR04 Sensor' },
        description: { zh: '超声波测距模块，2-400cm量程', en: 'Ultrasonic distance sensor module' },
        category: 'sensors',
        price: 6.80,
        originalPrice: 9.50,
        image: '📡',
        specs: { range: '2-400cm', voltage: '5V' },
        tags: ['传感器', '超声波'],
        tagsEn: ['Sensor', 'Ultrasonic'],
        stock: 300,
        sales: 78,
        rating: 4.6
    },
    {
        id: 7,
        name: { zh: '继电器模块 5V', en: 'Relay Module 5V' },
        description: { zh: '1路继电器模块，支持高低电平触发', en: '1-channel relay module' },
        category: 'relays',
        price: 4.50,
        originalPrice: 6.50,
        image: '⚡',
        specs: { channels: '1', voltage: '5V' },
        tags: ['继电器', '控制'],
        tagsEn: ['Relay', 'Control'],
        stock: 400,
        sales: 120,
        rating: 4.7
    },
    {
        id: 8,
        name: { zh: 'ESP8266 WiFi模块', en: 'ESP8266 WiFi Module' },
        description: { zh: 'WiFi通信模块，支持串口透传', en: 'WiFi communication module' },
        category: 'devboards',
        price: 12.00,
        originalPrice: 18.00,
        image: '🔬',
        specs: { model: 'ESP-01', protocol: '802.11b/g/n' },
        tags: ['WiFi', '模块'],
        tagsEn: ['WiFi', 'Module'],
        stock: 250,
        sales: 67,
        rating: 4.8
    }
];

window.categories = [
    { id: 'all', name: { zh: '全部商品', en: 'All Products' }, count: 8 },
    { id: 'connectors', name: { zh: '连接器', en: 'Connectors' }, count: 1 },
    { id: 'led', name: { zh: 'LED', en: 'LED' }, count: 1 },
    { id: 'resistors', name: { zh: '电阻', en: 'Resistors' }, count: 1 },
    { id: 'ics', name: { zh: '开发板', en: 'ICs & Boards' }, count: 1 },
    { id: 'power', name: { zh: '电源', en: 'Power' }, count: 1 },
    { id: 'sensors', name: { zh: '传感器', en: 'Sensors' }, count: 1 },
    { id: 'relays', name: { zh: '继电器', en: 'Relays' }, count: 1 },
    { id: 'devboards', name: { zh: '模块', en: 'Modules' }, count: 1 }
];

window.cart = [];
window.currentLanguage = 'zh';

function saveProducts() {
    localStorage.setItem('customProducts', JSON.stringify(window.products));
    localStorage.setItem('customCategories', JSON.stringify(window.categories));
}

function loadSavedData() {
    const savedProducts = localStorage.getItem('customProducts');
    const savedCategories = localStorage.getItem('customCategories');
    const savedCart = localStorage.getItem('cart');
    if (savedProducts) window.products = JSON.parse(savedProducts);
    if (savedCategories) window.categories = JSON.parse(savedCategories);
    if (savedCart) window.cart = JSON.parse(savedCart);
}