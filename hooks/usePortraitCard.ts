import type { IDCardFormData } from "@/lib/types"
import { getCardStyleConfig, getRealisticCardStyles, getWatermarkStyles } from "@/lib/cardStyles"
import { getBackgroundImageStyle } from "@/lib/utils"

// 竖向卡片专用Hook
export const usePortraitCard = (formData: IDCardFormData, cardStyle: string) => {
  // 获取对应风格的卡片样式配置
  const styleConfig = getCardStyleConfig(cardStyle as any, "portrait")

  // 真实质感效果样式
  const realisticStyles = formData.realisticEffect ? getRealisticCardStyles("portrait") : {}

  // 获取水印样式
  const watermarkStyles = formData.enableWatermark ? getWatermarkStyles(formData) : {}

  // 获取背景图片样式
  const backgroundImageStyle = getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity)
  const backBackgroundImageStyle = getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity, true)

  // 计算不同卡片风格的特定样式
  const getCardSpecificStyles = () => {
    switch (cardStyle) {
      case "modern":
        return {
          containerStyle: {
            backgroundColor: formData.cardColor,
            ...(formData.realisticEffect && realisticStyles),
          },
          contentStyle: {
            color: formData.textColor,
          },
        }
      case "classic":
        return {
          containerStyle: {
            ...(formData.realisticEffect && realisticStyles),
          },
          headerStyle: {
            backgroundColor: formData.cardColor,
          },
          contentStyle: {
            color: "inherit", // 使用默认文本颜色
          },
          accentStyle: {
            color: formData.cardColor,
          },
        }
      case "minimal":
        return {
          containerStyle: {
            ...(formData.realisticEffect && realisticStyles),
          },
          accentStyle: {
            color: formData.cardColor,
          },
        }
      default:
        return {}
    }
  }

  // 获取完整的卡片样式
  const cardStyles = {
    ...styleConfig,
    ...getCardSpecificStyles(),
    backgroundImageStyle,
    backBackgroundImageStyle,
    watermarkStyles,
  }

  return {
    cardStyles,
  }
}
