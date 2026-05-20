import React from 'react';

interface CircuitIconProps {
  type: string;
  size?: number;
  color?: string;
}

const CircuitIcon: React.FC<CircuitIconProps> = ({ type, size = 36, color = '#00d4ff' }) => {
  const icons: Record<string, React.ReactNode> = {
    // 电阻 - IEC标准矩形框（立创EDA样式）
    resistor: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="20" x2="10" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="13" width="20" height="14" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <line x1="30" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 电容 - IEC标准两条平行线（立创EDA样式）
    capacitor: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="20" x2="16" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="10" x2="16" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="10" x2="24" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 电感 - IEC标准半圆弧（立创EDA样式）
    inductor: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="24" x2="6" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M6,24 A6,6 0 0,1 18,24 A6,6 0 0,1 30,24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="30" y1="24" x2="36" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 晶振 - 两引脚晶振标准符号（立创EDA样式）
    crystal: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="20" x2="11" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="12" x2="11" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <rect x="15" y="12" width="10" height="16" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <line x1="29" y1="12" x2="29" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 连接器 - 端子排符号（立创EDA样式）
    connector: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 外框 */}
        <rect x="14" y="4" width="22" height="32" rx="1" stroke={color} strokeWidth="2" fill="none" />
        {/* 引脚编号 */}
        <text x="20" y="14" fill={color} fontSize="8" fontFamily="Arial">1</text>
        <text x="20" y="24" fill={color} fontSize="8" fontFamily="Arial">2</text>
        <text x="20" y="34" fill={color} fontSize="8" fontFamily="Arial">3</text>
        {/* 左侧引脚连接线 */}
        <line x1="4" y1="10" x2="14" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="20" x2="14" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="30" x2="14" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 引脚圆点 */}
        <circle cx="6" cy="10" r="2" fill={color} />
        <circle cx="6" cy="20" r="2" fill={color} />
        <circle cx="6" cy="30" r="2" fill={color} />
      </svg>
    ),
    // 开关/按键 - SPST标准符号（立创EDA样式）
    switch: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="28" x2="12" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="28" r="2" fill={color} />
        <line x1="16" y1="26.5" x2="26" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="12" r="2" fill={color} />
        <line x1="30" y1="12" x2="36" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 保险丝 - IEC标准矩形框（立创EDA样式）
    fuse: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="20" x2="10" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="13" width="20" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <line x1="30" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 天线 - 标准天线符号（立创EDA样式）
    antenna: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="38" x2="20" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="28" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="20" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 喇叭/扬声器 - IEC标准锥形+声波（立创EDA样式）
    speaker: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="8" height="12" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <polygon points="14,14 26,6 26,34 14,26" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M30,14 Q36,20 30,26" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M33,10 Q40,20 33,30" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
    // 麦克风 - IEC标准圆形+波纹（立创EDA样式）
    microphone: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="16" r="6" stroke={color} strokeWidth="2" fill="none" />
        <line x1="20" y1="22" x2="20" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12,18 Q12,32 20,32 Q28,32 28,18" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="20" y1="32" x2="20" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="38" x2="26" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 二极管 - IEC标准三角形+竖线（立创EDA样式）
    diode: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="20" x2="13" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <polygon points="13,11 13,29 27,20" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="rgba(0,212,255,0.15)" />
        <line x1="27" y1="9" x2="27" y2="31" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="27" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 三极管 - NPN BJT标准符号（立创EDA样式）
    transistor: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 基极竖线 */}
        <line x1="14" y1="8" x2="14" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {/* 发射极斜线 - 带箭头 */}
        <line x1="14" y1="26" x2="28" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 集电极斜线 */}
        <line x1="14" y1="14" x2="28" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 箭头 - 指向基极 */}
        <polygon points="20,29 18,27 22,25" fill={color} />
        {/* 外部引脚 */}
        <line x1="28" y1="6" x2="36" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="20" x2="14" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="34" x2="36" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 集成电路IC - 矩形框+引脚（立创EDA样式）
    ic: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="20" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <line x1="6" y1="16" x2="10" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="24" x2="10" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="16" x2="34" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="24" x2="34" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="6" x2="16" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="6" x2="24" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="30" x2="16" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="30" x2="24" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill={color} />
      </svg>
    ),
    // 传感器 - 检测符号（立创EDA样式）
    sensor: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="24" height="24" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <line x1="14" y1="16" x2="26" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="24" x2="26" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="20" x2="8" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // 继电器 - 电磁继电器标准符号（立创EDA样式）
    relay: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 线圈（矩形框） */}
        <rect x="4" y="10" width="14" height="20" rx="1" stroke={color} strokeWidth="2" fill="none" />
        {/* 线圈引脚 */}
        <line x1="4" y1="16" x2="0" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="24" x2="0" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 触点公共端 */}
        <line x1="22" y1="12" x2="28" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="12" x2="36" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 常开端 */}
        <line x1="32" y1="22" x2="36" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 常闭端 */}
        <line x1="22" y1="28" x2="36" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* 触点标记 */}
        <circle cx="22" cy="12" r="1.5" fill={color} />
        <circle cx="22" cy="28" r="1.5" fill={color} />
      </svg>
    ),
  };

  return (
    <span className="circuit-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {icons[type] || null}
    </span>
  );
};

export default CircuitIcon;
