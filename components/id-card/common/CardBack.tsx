import type React from "react"
import type { CardComponentProps } from "@/lib/types"
import { CardBackElements } from "./CardElements"
import { getRealisticCardStyles } from "@/lib/cardStyles"

interface CardBackProps {
  formData: CardComponentProps["formData"]
  cardStyle: string
  orientation: "portrait" | "landscape"
  barcodeRef?: React.RefObject<SVGSVGElement | null>
}

/**
 * 卡片背面组件
 * 根据方向展示不同的背面布局
 */
export const CardBack: React.FC<CardBackProps> = ({ formData, cardStyle, orientation, barcodeRef }) => {
  // 只有当启用背面时才显示
  if (!formData.backEnabled) return null

  // 根据方向选择渲染的内容
  if (orientation === "portrait") {
    return <PortraitCardBack formData={formData} cardStyle={cardStyle} barcodeRef={barcodeRef} />
  } else {
    return <LandscapeCardBack formData={formData} cardStyle={cardStyle} barcodeRef={barcodeRef} />
  }
}

/**
 * 竖向卡片背面
 */
const PortraitCardBack: React.FC<Omit<CardBackProps, "orientation">> = ({ formData, cardStyle, barcodeRef }) => {
  // 获取真实质感效果样式（如果启用）
  const realisticStyles = formData.realisticEffect ? getRealisticCardStyles("portrait") : {}

  // 现代风格样式
  const containerClassName = "mt-4 overflow-hidden rounded-lg shadow-lg"
  const headerClassName = "mb-5 flex items-center justify-between"
  const contentClassName = "relative z-10 space-y-4"
  const footerClassName = "relative z-10 bg-black/10 p-2 text-center text-xs"

  // 现代风格的特定样式
  const styles = {
    containerStyle: {
      backgroundColor: formData.cardColor,
      ...(formData.realisticEffect && realisticStyles),
    },
    textStyle: { color: formData.textColor },
  }

  return (
    <div className={containerClassName} style={styles.containerStyle}>
      <div className="relative p-6">
        <CardBackElements formData={formData}>
          {/* 头部 - 校徽和标题 */}
          <div className={`relative z-10 ${headerClassName}`}>
            <div>
              <div className="text-sm font-medium" style={styles.textStyle}>
                {formData.universityName || "INTERNATIONAL UNIVERSITY"}
              </div>
              <div className="mt-1 text-2xl font-bold" style={styles.textStyle}>
                CARD INFORMATION
              </div>
            </div>
            <div className="h-16 w-16">
              <img
                src={formData.backLogo || "/placeholder.svg"}
                alt="University Seal"
                className="h-full w-full object-contain"
                style={{
                  opacity: Number(formData.backLogoOpacity) / 100,
                }}
              />
            </div>
          </div>

          {/* 主体内容 */}
          <div className={`relative z-10 ${contentClassName}`}>
            {/* 使用条款 */}
            <div>
              <div className="text-xs opacity-80" style={styles.textStyle}>
                TERMS OF USE
              </div>
              <div style={styles.textStyle}>{formData.termsOfUse}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs opacity-80" style={styles.textStyle}>
                  ACCESS PRIVILEGES
                </div>
                <div style={styles.textStyle}>{formData.accessList}</div>
              </div>
              <div>
                <div className="text-xs opacity-80" style={styles.textStyle}>
                  EMERGENCY CONTACT
                </div>
                <div style={styles.textStyle}>{formData.emergencyContact}</div>
              </div>
            </div>

            {/* 地址和网站 */}
            <div>
              <div className="text-xs opacity-80" style={styles.textStyle}>
                UNIVERSITY CONTACT
              </div>
              <div style={styles.textStyle}>{formData.universityAddress}</div>
              <div className="mt-1" style={styles.textStyle}>
                {formData.universityWebsite}
              </div>
            </div>
          </div>

          {/* 底部返还信息 */}
          <div className={footerClassName} style={styles.textStyle}>
            {formData.lostCardInfo} {formData.returnInfo}
          </div>
        </CardBackElements>
      </div>
    </div>
  )
}

/**
 * 横向卡片背面
 */
const LandscapeCardBack: React.FC<Omit<CardBackProps, "orientation">> = ({ formData, cardStyle, barcodeRef }) => {
  // 参考备份文件中的横向卡片背面样式
  const realisticStyles = formData.realisticEffect
    ? {
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)",
        backgroundImage: "linear-gradient(145deg, #ffffff, #f5f7fa)",
      }
    : {}

  // 渲染磁条（只在真实效果模式下显示）
  const renderMagneticStripe = () => {
    if (!formData.realisticEffect) return null

    return (
      <>
        {/* 磁条 */}
        <div
          className="absolute top-10 left-0 right-0 h-[8mm] bg-gradient-to-r from-[#2d2d2d] via-[#1a1a1a] to-[#2d2d2d]"
          style={{
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        >
          {/* 磁条细微纹理 */}
          <div
            className="h-full w-full opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
            }}
          ></div>
        </div>
      </>
    )
  }

  return (
    <div
      className="mt-4 relative overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundColor: formData.realisticEffect ? "#ffffff" : "#ffffff",
        aspectRatio: "1.586/1", // ISO/IEC 7810 ID-1 标准比例 (85.60mm:53.98mm)
        width: "350px",
        maxWidth: "100%",
        ...realisticStyles,
      }}
    >
      <CardBackElements formData={formData}>
        {/* 反面内容 */}
        <div className="relative z-10 h-full p-3">
          {/* 头部 - 学校信息 */}
          <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-1">
            <div className="flex items-center">
              <div className="text-sm font-bold text-gray-800">
                {formData.universityName || "INTERNATIONAL UNIVERSITY"}
              </div>
            </div>

            {/* 反面学校印章/校徽 */}
            <div className="relative">
              <img
                src={formData.backLogo || "/placeholder.svg"}
                alt="University Seal"
                className="h-10 w-10 object-contain"
                style={{
                  opacity: Number(formData.backLogoOpacity) / 100,
                }}
              />
            </div>
          </div>

          {/* 主要内容 - 两列布局 */}
          <div className="flex text-xs">
            {/* 左列 */}
            <div className="w-[60%] pr-2">
              {/* 使用条款 */}
              <div className="mb-1">
                <div className="font-semibold text-[10px] mb-1 text-gray-700">TERMS OF USE</div>
                <p className="text-[10px] text-gray-600 leading-tight line-clamp-3">{formData.termsOfUse}</p>
              </div>

              {/* 遗失声明 */}
              <div className="mb-1">
                <div className="font-semibold text-[10px] mb-1 text-gray-700">LOST CARD</div>
                <p className="text-[10px] text-gray-600 leading-tight">{formData.lostCardInfo}</p>
              </div>
            </div>

            {/* 右列 */}
            <div className="w-[40%]">
              {/* 校园权限 */}
              <div className="mb-1">
                <div className="font-semibold text-[10px] mb-1 text-gray-700">ACCESS PRIVILEGES</div>
                <p className="text-[10px] text-gray-600 leading-tight line-clamp-2">{formData.accessList}</p>
              </div>

              {/* 联系方式 */}
              <div className="mb-1">
                <div className="font-semibold text-[10px] mb-1 text-gray-700">EMERGENCY CONTACT</div>
                <p className="text-[10px] text-gray-600 leading-tight">{formData.emergencyContact}</p>
              </div>

              {/* 学校地址和网站 */}
              <div>
                <div className="font-semibold text-[10px] mb-1 text-gray-700">CONTACT INFO</div>
                <p className="text-[10px] text-gray-600 leading-tight">{formData.universityAddress}</p>
                <p className="text-[10px] text-gray-600 leading-tight">{formData.universityWebsite}</p>
              </div>
            </div>
          </div>

          {/* 磁条效果 */}
          {renderMagneticStripe()}
        </div>
      </CardBackElements>
    </div>
  )
}

export default CardBack
