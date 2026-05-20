// 电子元件类型定义

export type ComponentCategory = 
  | 'resistor' 
  | 'capacitor' 
  | 'inductor' 
  | 'diode' 
  | 'transistor' 
  | 'ic' 
  | 'connector' 
  | 'sensor' 
  | 'crystal'
  | 'switch'
  | 'fuse'
  | 'antenna'
  | 'speaker'
  | 'microphone'
  | 'relay'
  // 有源元件子分类
  | 'power_ic'
  | 'memory_ic'
  | 'iot_module'
  | 'mcu'
  | 'logic_ic'
  | 'clock_timer'
  | 'adc_dac'
  | 'rf_chip'
  | 'opamp'
  | 'comparator'
  | 'interface_ic'
  | 'display_driver'
  | 'led_driver'
  | 'audio_ic';

export type PackageType = 
  | 'SMD' 
  | 'DIP' 
  | 'SIP' 
  | 'QFP' 
  | 'BGA' 
  | 'SOP' 
  | 'TO-220' 
  | 'TO-92'
  | '0402'
  | '0603'
  | '0805'
  | '1206';

export interface Supplier {
  name: string;            // 供应商名称
  contact?: string;        // 联系方式
  location?: string;       // 所在地
  moq?: number;            // 最小起订量
  deliveryDays?: number;   // 交货天数
  rating?: number;         // 评分 1-5
}

export interface Component {
  id: string;
  name: string;
  partNumber: string;
  category: ComponentCategory;
  package: PackageType;
  manufacturer: string;
  description: string;
  specifications: Record<string, string>;
  datasheet?: string;
  price: number;
  stock: number;
  image?: string;
  tags: string[];
  suppliers: Supplier[];   // 供应商列表
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  key: ComponentCategory;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
  type: 'passive' | 'active';  // 无源元件或有源元件
}

// 元件大类定义
export interface ComponentClass {
  key: 'passive' | 'active';
  label: string;
  description: string;
  icon: string;
  categories: CategoryInfo[];
}

// 有源元件子分类组
export interface ActiveSubCategory {
  key: string;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
  categories: CategoryInfo[];
}

export interface FilterOptions {
  category?: ComponentCategory;
  package?: PackageType;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface SearchResult {
  components: Component[];
  total: number;
  page: number;
  pageSize: number;
}

// ========== 电路图类型定义 ==========

export type CircuitDiagramCategory = 
  | 'power'        // 电源电路
  | 'amplifier'    // 放大电路
  | 'filter'       // 滤波电路
  | 'oscillator'   // 振荡电路
  | 'logic'        // 逻辑电路
  | 'interface'    // 接口电路
  | 'protection'   // 保护电路
  | 'motor'        // 电机驱动
  | 'sensor'       // 传感器电路
  | 'communication'; // 通信电路

export interface CircuitDiagram {
  id: string;
  name: string;
  category: CircuitDiagramCategory;
  description: string;
  application: string;           // 应用场景
  components: string[];          // 所需元件列表
  voltage: string;               // 工作电压
  frequency?: string;            // 工作频率
  powerConsumption?: string;     // 功耗
  difficulty: 'beginner' | 'intermediate' | 'advanced';  // 难度等级
  imageUrl?: string;             // 电路图图片
  schematicUrl?: string;         // 原理图下载链接
  pcbLayoutUrl?: string;         // PCB布局下载链接
  author: string;                // 作者/来源
  tags: string[];
  views: number;                 // 浏览次数
  downloads: number;             // 下载次数
  createdAt: string;
  updatedAt: string;
}

// ========== 电路板类型定义 ==========

export type CircuitBoardType = 
  | 'single-layer'   // 单层板
  | 'double-layer'   // 双层板
  | 'multi-layer'    // 多层板
  | 'flex'           // 柔性板
  | 'rigid-flex';    // 刚柔结合板

export type CircuitBoardApplication = 
  | 'consumer'       // 消费电子
  | 'industrial'     // 工业控制
  | 'automotive'     // 汽车电子
  | 'medical'        // 医疗设备
  | 'aerospace'      // 航空航天
  | 'communication'  // 通信设备
  | 'iot';           // 物联网

export interface CircuitBoard {
  id: string;
  name: string;
  model: string;                    // 型号
  type: CircuitBoardType;           // 板类型
  application: CircuitBoardApplication;  // 应用领域
  description: string;
  dimensions: {
    length: number;                 // 长度 mm
    width: number;                  // 宽度 mm
    thickness: number;              // 厚度 mm
  };
  layers: number;                   // 层数
  copperWeight: string;             // 铜厚
  surfaceFinish: string;            // 表面处理
  minTraceWidth: number;            // 最小线宽 mm
  minSpacing: number;               // 最小间距 mm
  viaCount?: number;                // 过孔数量
  componentCount?: number;          // 元件数量
  manufacturer: string;
  price: number;
  leadTime: string;                 // 交期
  imageUrl?: string;
  gerberUrl?: string;               // Gerber文件下载
  bomUrl?: string;                  // BOM清单下载
  tags: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}
