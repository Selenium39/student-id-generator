import type React from "react"
import type { CardElementsProps } from "@/lib/types"
import { getBackgroundImageStyle } from "@/lib/utils"
import { getWatermarkStyles } from "@/lib/cardStyles"

/**
 * 卡片通用元素组件
 * 处理水印、背景图片等公共元素
 */
export const CardElements: React.FC<CardElementsProps> = ({ formData, children }) => {
  // 是否为背面
  const isBack = false

  // 处理背景图片样式
  const backgroundImageStyle = formData.backgroundImage
    ? getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity, isBack)
    : {}

  // 处理水印样式
  const watermarkStyles = formData.enableWatermark ? getWatermarkStyles(formData) : {}

  return (
    <>
      {/* 背景图片层 */}
      {formData.backgroundImage && <div className="absolute inset-0 z-0" style={backgroundImageStyle}></div>}

      {/* 水印层 */}
      {formData.enableWatermark && (
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ background: watermarkStyles.background }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="transform text-center" style={watermarkStyles.text}>
              {formData.watermarkText}
            </div>
          </div>
        </div>
      )}

      {/* 真实质感纹理层 */}
      {formData.realisticEffect && (
        <div
          className="absolute inset-0 z-5 mix-blend-overlay opacity-30"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgIDAgLjA1IDAgMCAwICAwIDAgLjA1IDAgMCAgMCAwIDAgLjA1IDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')",
            backgroundSize: "cover",
          }}
        ></div>
      )}

      {/* 实际内容 */}
      {children}
    </>
  )
}

/**
 * 卡片背面通用元素组件
 * 类似CardElements，但有不同的透明度和z-index设置
 */
export const CardBackElements: React.FC<CardElementsProps> = ({ formData, children }) => {
  // 为背面设置
  const isBack = true

  // 处理背景图片样式 - 背面通常透明度更低
  const backgroundImageStyle = formData.backgroundImage
    ? getBackgroundImageStyle(formData.backgroundImage, formData.backgroundOpacity, isBack)
    : {}

  // 处理水印样式
  const watermarkStyles = formData.enableWatermark ? getWatermarkStyles(formData) : {}

  return (
    <>
      {/* 背景图片层 */}
      {formData.backgroundImage && <div className="absolute inset-0 z-0" style={backgroundImageStyle}></div>}

      {/* 水印层 */}
      {formData.enableWatermark && (
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ background: watermarkStyles.background }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="transform text-center" style={watermarkStyles.text}>
              {formData.watermarkText}
            </div>
          </div>
        </div>
      )}

      {/* 真实质感纹理层 - 背面通常效果更轻微 */}
      {formData.realisticEffect && (
        <div
          className="absolute inset-0 z-5 mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgIDAgLjA1IDAgMCAwICAwIDAgLjA1IDAgMCAgMCAwIDAgLjA1IDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')",
            backgroundSize: "cover",
          }}
        ></div>
      )}

      {/* 实际内容 */}
      {children}
    </>
  )
}
