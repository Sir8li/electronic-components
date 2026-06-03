// 鍏ㄥ眬鍙橀噺
window.products = [
    {
        id: 1,
        name: { zh: 'USB Type-C 鏁版嵁绾?, en: 'USB Type-C Data Cable' },
        description: { zh: '楂樺搧璐║SB-C鏁版嵁绾匡紝鏀寔蹇厖', en: 'High quality USB-C cable with fast charging' },
        category: 'connectors',
        price: 3.90,
        originalPrice: 5.50,
        image: '馃攲',
        specs: { type: 'USB-C', length: '1m' },
        tags: ['蹇厖', '鏁版嵁绾?],
        tagsEn: ['Fast Charge', 'Data Cable'],
        stock: 1000,
        sales: 120,
        rating: 4.8
    },
    {
        id: 2,
        name: { zh: 'LED鐏彔 5mm', en: 'LED Diode 5mm' },
        description: { zh: '楂樹寒LED鐏彔锛屽绉嶉鑹插彲閫?, en: 'High brightness LED diode' },
        category: 'led',
        price: 0.50,
        originalPrice: 0.80,
        image: '馃挕',
        specs: { color: 'White', voltage: '3.2V' },
        tags: ['LED', '鐏彔'],
        tagsEn: ['LED', 'Diode'],
        stock: 5000,
        sales: 350,
        rating: 4.6
    },
    {
        id: 3,
        name: { zh: '璐寸墖鐢甸樆 1k惟', en: 'SMD Resistor 1k惟' },
        description: { zh: '楂樼簿搴﹁创鐗囩數闃伙紝5%鍏樊', en: 'High precision SMD resistor' },
        category: 'resistors',
        price: 0.10,
        originalPrice: 0.15,
        image: '馃敡',
        specs: { value: '1k惟', package: '0805' },
        tags: ['鐢甸樆', '璐寸墖'],
        tagsEn: ['Resistor', 'SMD'],
        stock: 10000,
        sales: 890,
        rating: 4.9
    },
    {
        id: 4,
        name: { zh: 'Arduino寮€鍙戞澘', en: 'Arduino Board' },
        description: { zh: '寮€婧愮數瀛愬師鍨嬪钩鍙帮紝閫傚悎瀛︿範', en: 'Open source electronics prototyping platform' },
        category: 'ics',
        price: 25.00,
        originalPrice: 35.00,
        image: '馃捇',
        specs: { model: 'Uno R3', MCU: 'ATmega328P' },
        tags: ['寮€鍙戞澘', 'Arduino'],
        tagsEn: ['Development Board', 'Arduino'],
        stock: 200,
        sales: 45,
        rating: 4.7
    },
    {
        id: 5,
        name: { zh: '閿傜數姹?18650', en: 'Li-ion Battery 18650' },
        description: { zh: '楂樻€ц兘閿傜瀛愮數姹狅紝3.7V', en: 'High performance Li-ion battery' },
        category: 'power',
        price: 8.50,
        originalPrice: 12.00,
        image: '馃攱',
        specs: { capacity: '2600mAh', voltage: '3.7V' },
        tags: ['鐢垫睜', '18650'],
        tagsEn: ['Battery', '18650'],
        stock: 500,
        sales: 180,
        rating: 4.5
    },
    {
        id: 6,
        name: { zh: 'HC-SR04瓒呭０娉紶鎰熷櫒', en: 'HC-SR04 Sensor' },
        description: { zh: '瓒呭０娉㈡祴璺濇ā鍧楋紝2-400cm閲忕▼', en: 'Ultrasonic distance sensor module' },
        category: 'sensors',
        price: 6.80,
        originalPrice: 9.50,
        image: '馃摗',
        specs: { range: '2-400cm', voltage: '5V' },
        tags: ['浼犳劅鍣?, '瓒呭０娉?],
        tagsEn: ['Sensor', 'Ultrasonic'],
        stock: 300,
        sales: 78,
        rating: 4.6
    },
    {
        id: 7,
        name: { zh: '缁х數鍣ㄦā鍧?5V', en: 'Relay Module 5V' },
        description: { zh: '1璺户鐢靛櫒妯″潡锛屾敮鎸侀珮浣庣數骞宠Е鍙?, en: '1-channel relay module' },
        category: 'relays',
        price: 4.50,
        originalPrice: 6.50,
        image: '鈿?,
        specs: { channels: '1', voltage: '5V' },
        tags: ['缁х數鍣?, '鎺у埗'],
        tagsEn: ['Relay', 'Control'],
        stock: 400,
        sales: 120,
        rating: 4.7
    },
    {
        id: 8,
        name: { zh: 'ESP8266 WiFi妯″潡', en: 'ESP8266 WiFi Module' },
        description: { zh: 'WiFi閫氫俊妯″潡锛屾敮鎸佷覆鍙ｉ€忎紶', en: 'WiFi communication module' },
        category: 'devboards',
        price: 12.00,
        originalPrice: 18.00,
        image: '馃敩',
        specs: { model: 'ESP-01', protocol: '802.11b/g/n' },
        tags: ['WiFi', '妯″潡'],
        tagsEn: ['WiFi', 'Module'],
        stock: 250,
        sales: 67,
        rating: 4.8
    }
];

window.categories = [
    { id: 'all', name: { zh: '鍏ㄩ儴鍟嗗搧', en: 'All Products' }, count: 8 },
    { id: 'connectors', name: { zh: '杩炴帴鍣?, en: 'Connectors' }, count: 1 },
    { id: 'led', name: { zh: 'LED', en: 'LED' }, count: 1 },
    { id: 'resistors', name: { zh: '鐢甸樆', en: 'Resistors' }, count: 1 },
    { id: 'ics', name: { zh: '寮€鍙戞澘', en: 'ICs & Boards' }, count: 1 },
    { id: 'power', name: { zh: '鐢垫簮', en: 'Power' }, count: 1 },
    { id: 'sensors', name: { zh: '浼犳劅鍣?, en: 'Sensors' }, count: 1 },
    { id: 'relays', name: { zh: '缁х數鍣?, en: 'Relays' }, count: 1 },
    { id: 'devboards', name: { zh: '妯″潡', en: 'Modules' }, count: 1 }
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