import type React from "react"
import type { CardComponentProps } from "@/lib/types"
import { CardElements } from "@/components/id-card/common/CardElements"
import { useLandscapeCard } from "@/hooks/useLandscapeCard"

/**
 * 横向现代风格卡片组件
 * 照搬自备份文件的实现，并修复布局问题
 */
export const ModernCard: React.FC<CardComponentProps> = ({ formData, barcodeRef }) => {
  // 使用横向卡片Hook获取样式
  const { cardStyles } = useLandscapeCard(formData, "modern")

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-lg ${formData.realisticEffect ? "realistic-card" : ""}`}
      style={{
        backgroundColor: formData.realisticEffect ? "#ffffff" : "#ffffff", // 默认使用白色背景
        aspectRatio: "1.586/1", // ISO/IEC 7810 ID-1 标准比例 (85.60mm:53.98mm)
        maxWidth: "100%",
        ...(formData.realisticEffect && {
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)",
          backgroundImage: "linear-gradient(145deg, #ffffff, #f5f7fa)",
        }),
      }}
    >
      {/* 背景图片 - 全覆盖 */}
      {formData.backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${formData.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: Number(formData.backgroundOpacity) / 100,
            ...(formData.realisticEffect && {
              filter: "contrast(1.05) saturate(1.1)",
            }),
          }}
        ></div>
      )}

      {/* 水印层 */}
      {formData.enableWatermark && (
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent ${formData.watermarkLineWidth}px,
              rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100}) ${formData.watermarkLineWidth}px,
              rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100}) ${Number(formData.watermarkLineWidth) * 2}px
            )`,
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="transform text-center"
              style={{
                color: `rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100})`,
                letterSpacing: "2px",
                width: "100%",
                fontSize: `${Number(formData.watermarkSize) * 0.8 + 1.5}rem`,
                transform: `rotate(${formData.watermarkAngle}deg)`,
              }}
            >
              {formData.watermarkText}
            </div>
          </div>
        </div>
      )}

      <CardElements formData={formData}>
        {/* 全息防伪效果 */}
        {formData.realisticEffect && (
          <div
            className="absolute bottom-2 right-4 z-20 w-8 h-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(125,185,232,0.4), rgba(125,185,232,0.1))",
              opacity: 0.7,
              backdropFilter: "hue-rotate(45deg)",
              boxShadow: "inset 0 0 2px rgba(255,255,255,0.6)",
            }}
          ></div>
        )}

        {/* 真实质感磨损纹理 */}
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

        <div
          className={`relative z-10 flex flex-col h-full p-4 ${formData.realisticEffect ? "realistic-content" : ""}`}
        >
          {/* 头部 - 学校信息 */}
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 mr-3">
              <img
                src={formData.logo || "/placeholder.svg"}
                alt="University Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold" style={{ color: formData.cardColor }}>
                {formData.universityName || "INTERNATIONAL UNIVERSITY"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium" style={{ color: formData.cardColor }}>
                Student ID
              </div>
            </div>
          </div>

          {/* 主要内容 */}
          <div className="flex-1 flex">
            {/* 左侧内容 */}
            <div className="w-[55%] flex flex-col justify-between">
              {/* 名称信息 */}
              <div>
                <div className="text-xl font-bold mb-1">{formData.fullName || "JOHN SMITH"}</div>
                <div className="text-sm text-gray-600 mb-1">{formData.faculty || "ENGINEERING"}</div>
                <div className="text-sm text-gray-600 mb-3">{formData.programType || "Bachelor"}</div>

                {/* 签名栏 */}
                <div className="mt-2 mb-1">
                  <div className="flex items-end">
                    <div className="relative inline-block pb-0 w-[120px]">
                      <div className="border-b border-gray-400 absolute bottom-0 left-0 right-0"></div>
                      <div
                        className="font-handwriting text-gray-800 pb-[1px] px-1 italic transform -rotate-[2deg]"
                        style={{ transform: "rotate(-2deg)" }}
                      >
                        {formData.officialSignature || "J. Smith"}
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-400 ml-1 pb-[2px]">Registrar's Office</span>
                  </div>
                </div>
              </div>

              {/* 底部对齐内容 */}
              <div className="flex flex-col justify-end pb-[1px]">
                <div className="text-red-600 font-mono text-sm mb-1">{formData.studentId || "S12345678"}</div>
                <div className="inline-block" style={{ lineHeight: 0 }}>
                  <svg ref={barcodeRef} style={{ width: "auto", maxWidth: "none" }} className="h-[24px]"></svg>
                </div>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="w-[45%] flex flex-col items-end justify-between">
              {/* 照片 */}
              <div
                className={`h-[6.5rem] w-[5.5rem] overflow-hidden rounded border bg-white shadow-sm ${formData.realisticEffect ? "realistic-photo" : ""}`}
                style={
                  formData.realisticEffect
                    ? {
                        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }
                    : {}
                }
              >
                <img src={formData.photo || "/placeholder.svg"} alt="Student" className="h-full w-full object-cover" />
              </div>

              {/* 底部信息 */}
              <div className="text-right flex flex-col justify-end">
                <div className="text-sm text-gray-500 mb-0.5">Enrolled: {formData.enrollmentYear || "2024"}</div>
                <div className="text-sm text-gray-500 mb-0.5">
                  Expiry: {formData.validityEnd ? formData.validityEnd.replace("-", "/") : "2028/06"}
                </div>
                <div className="text-sm text-gray-500">Card No. {formData.cardNumber || "C12345678"}</div>
              </div>
            </div>
          </div>
        </div>
      </CardElements>
    </div>
  )
}

export default ModernCard
