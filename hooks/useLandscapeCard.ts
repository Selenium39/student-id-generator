import type { IDCardFormData } from "@/lib/types"
import { getCardStyleConfig, getRealisticCardStyles, getWatermarkStyles } from "@/lib/cardStyles"
import { hexToRgba, getBackgroundImageStyle } from "@/lib/utils"

// 横向卡片专用Hook
export const useLandscapeCard = (formData: IDCardFormData, cardStyle: string) => {
  // 获取对应风格的卡片样式配置
  const styleConfig = getCardStyleConfig(cardStyle as any, "landscape")

  // 真实质感效果样式 - 横向卡片特有的磁条和全息防伪效果
  const realisticStyles = formData.realisticEffect ? getRealisticCardStyles("landscape") : {}

  // 获取水印样式
  const watermarkStyles = formData.enableWatermark ? getWatermarkStyles(formData) : {}

  // 获取背景图片样式
  const backgroundImageStyle = getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity)
  const backBackgroundImageStyle = getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity, true)

  // 横向卡片比例 - ISO/IEC 7810 ID-1 标准比例 (85.60mm:53.98mm)
  const aspectRatio = "1.586/1"

  // 计算不同卡片风格的特定样式
  const getCardSpecificStyles = () => {
    switch (cardStyle) {
      case "modern":
        return {
          containerStyle: {
            backgroundColor: "#ffffff", // 横向卡片默认使用白色背景
            aspectRatio,
            maxWidth: "100%",
            ...(formData.realisticEffect && realisticStyles),
          },
          contentStyle: {
            // 针对内容的样式
          },
          cardColorStyle: {
            color: formData.cardColor, // 卡片主色调应用到标题等元素
          },
        }
      case "classic":
        return {
          containerStyle: {
            backgroundColor: "#ffffff",
            aspectRatio,
            maxWidth: "100%",
            ...(formData.realisticEffect && realisticStyles),
          },
          headerStyle: {
            borderBottom: `1px solid ${hexToRgba(formData.cardColor, 0.2)}`,
          },
          cardColorStyle: {
            color: formData.cardColor,
          },
        }
      case "minimal":
        return {
          containerStyle: {
            backgroundColor: "#ffffff",
            aspectRatio,
            maxWidth: "100%",
            ...(formData.realisticEffect && realisticStyles),
          },
          accentStyle: {
            color: formData.cardColor,
          },
        }
      default:
        return {
          containerStyle: {
            backgroundColor: "#ffffff",
            aspectRatio,
            maxWidth: "100%",
          },
        }
    }
  }

  // 横向卡片特有的磁条效果
  const getMagneticStripeStyle = () => {
    if (formData.realisticEffect && realisticStyles.magneticStripe) {
      return {
        position: "absolute",
        top: "10mm",
        left: 0,
        right: 0,
        height: "8mm",
        background: realisticStyles.magneticStripe.background,
        boxShadow: realisticStyles.magneticStripe.boxShadow,
        textureStyle: {
          height: "100%",
          width: "100%",
          opacity: 0.3,
          backgroundImage: realisticStyles.magneticStripe.texture.backgroundImage,
        },
      }
    }
    return null
  }

  // 横向卡片特有的全息防伪效果
  const getHologramStyle = () => {
    if (formData.realisticEffect && realisticStyles.hologram) {
      return {
        position: "absolute",
        bottom: "2px",
        right: "16px",
        zIndex: 20,
        width: "8mm",
        height: "8mm",
        borderRadius: "50%",
        ...realisticStyles.hologram,
      }
    }
    return null
  }

  // 获取完整的横向卡片样式
  const cardStyles = {
    ...styleConfig,
    ...getCardSpecificStyles(),
    backgroundImageStyle,
    backBackgroundImageStyle,
    watermarkStyles,
    magneticStripeStyle: getMagneticStripeStyle(),
    hologramStyle: getHologramStyle(),
  }

  return {
    cardStyles,
  }
}
