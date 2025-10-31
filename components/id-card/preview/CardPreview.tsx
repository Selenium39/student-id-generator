"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import type { CardPreviewProps } from "@/lib/types"
import ModernPortraitCard from "../portrait/ModernCard"
import ModernLandscapeCard from "../landscape/ModernCard"
import { CardBack } from "../common/CardBack"
import JsBarcode from "jsbarcode"
import { QRCodeSVG } from "qrcode.react"

/**
 * Card Preview Component
 * Display different card views based on card orientation and style
 */
export const CardPreview: React.FC<CardPreviewProps> = ({ formData, showBack = false }) => {
  // Create barcode reference
  const barcodeRef = useRef<SVGSVGElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Client-side rendering detection (prevent SSR errors)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate barcode
  useEffect(() => {
    if (isClient && barcodeRef.current && (formData.codeType === "barcode" || formData.orientation === "landscape")) {
      try {
        const studentId = formData.studentId || "S12345678"

        if (formData.orientation === "landscape") {
          // Landscape card barcode style
          JsBarcode(barcodeRef.current, studentId, {
            format: "CODE128",
            lineColor: "#000",
            width: 1.5,
            height: 24,
            displayValue: false, // Don't show text below barcode
            margin: 0,
            background: "transparent",
            textMargin: 0,
          })
        } else {
          // Portrait card barcode style
          JsBarcode(barcodeRef.current, studentId, {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: true,
            fontSize: 12,
            margin: 0,
            background: "transparent",
          })
        }
      } catch (error) {
        console.error("Barcode generation error:", error)
      }
    }
  }, [formData.studentId, formData.codeType, formData.orientation, isClient])

  // If it's card back
  if (showBack) {
    // Copy back implementation from backup file
    return (
      <div className="w-full">
        {formData.orientation === "landscape" ? (
          // Landscape card back
          <div className="mt-4">
            <div
              className={`relative overflow-hidden rounded-lg shadow-lg ${formData.realisticEffect ? "realistic-card" : ""}`}
              style={{
                backgroundColor: formData.realisticEffect ? "#ffffff" : "#ffffff",
                aspectRatio: "1.586/1", // Maintain same ratio as front
                maxWidth: "100%",
                ...(formData.realisticEffect && {
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)",
                  backgroundImage: "linear-gradient(145deg, #ffffff, #f5f7fa)",
                }),
              }}
            >
              {/* Background image - full coverage */}
              {formData.backgroundImage && (
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${formData.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: Number(formData.backgroundOpacity) / 200, // Lower background opacity for back
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

              {/* 反面内容 */}
              <div className="relative z-10 h-full p-4">
                {/* 头部 - 学校信息 */}
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <div className="flex items-center">
                    <div className="text-base font-bold text-gray-800">
                      {formData.universityName || "INTERNATIONAL UNIVERSITY"}
                    </div>
                  </div>

                  {/* 反面学校印章/校徽 */}
                  <div className="relative">
                    <img
                      src={formData.backLogo || "/placeholder.svg"}
                      alt="University Seal"
                      className="h-12 w-12 object-contain"
                      style={{
                        opacity: Number(formData.backLogoOpacity) / 100,
                      }}
                    />
                  </div>
                </div>

                {/* 主要内容 - 两列布局 */}
                <div className="flex text-sm">
                  {/* 左列 */}
                  <div className="w-[60%] pr-3">
                    {/* 使用条款 */}
                    <div className="mb-2">
                      <div className="font-semibold text-xs mb-1 text-gray-700">TERMS OF USE</div>
                      <p className="text-xs text-gray-600 leading-tight">{formData.termsOfUse}</p>
                    </div>

                    {/* 遗失声明 */}
                    <div className="mb-2">
                      <div className="font-semibold text-xs mb-1 text-gray-700">LOST CARD</div>
                      <p className="text-xs text-gray-600 leading-tight">{formData.lostCardInfo}</p>
                    </div>

                    {/* 返还信息 */}
                    <div className="mb-0">
                      <p className="text-xs text-gray-600 leading-tight">{formData.returnInfo}</p>
                    </div>
                  </div>

                  {/* 右列 */}
                  <div className="w-[40%]">
                    {/* 校园权限 */}
                    <div className="mb-2">
                      <div className="font-semibold text-xs mb-1 text-gray-700">ACCESS PRIVILEGES</div>
                      <p className="text-xs text-gray-600 leading-tight">{formData.accessList}</p>
                    </div>

                    {/* 联系方式 */}
                    <div className="mb-2">
                      <div className="font-semibold text-xs mb-1 text-gray-700">EMERGENCY CONTACT</div>
                      <p className="text-xs text-gray-600 leading-tight">{formData.emergencyContact}</p>
                    </div>

                    {/* 学校地址和网站 */}
                    <div>
                      <div className="font-semibold text-xs mb-1 text-gray-700">CONTACT INFO</div>
                      <p className="text-xs text-gray-600 leading-tight mb-1">{formData.universityAddress}</p>
                      <p className="text-xs text-gray-600 leading-tight">{formData.universityWebsite}</p>
                    </div>
                  </div>
                </div>

                {/* 底部磁条效果 */}
                {formData.realisticEffect && (
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
                )}
              </div>
            </div>
          </div>
        ) : (
          <CardBack
            formData={formData}
            cardStyle={formData.cardStyle}
            orientation={formData.orientation}
            barcodeRef={barcodeRef}
          />
        )}
      </div>
    )
  }

  // 渲染卡片正面
  if (!isClient) return null

  // 横向卡片 - 现代风格
  if (formData.orientation === "landscape") {
    return (
      <div className="w-full">
        <ModernLandscapeCard formData={formData} barcodeRef={barcodeRef} />
      </div>
    )
  }

  // 竖向卡片
  return (
    <div className="w-full">
      {formData.cardStyle === "modern" && (
        <div className="overflow-hidden rounded-lg shadow-lg" style={{ backgroundColor: formData.cardColor }}>
          <div className="relative p-6">
            {/* 背景图片 - 全覆盖 */}
            {formData.backgroundImage && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${formData.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: Number(formData.backgroundOpacity) / 100,
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

            {/* Header Section */}
            <div className="relative z-10 mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium" style={{ color: formData.textColor }}>
                  {formData.universityName || "INTERNATIONAL UNIVERSITY"}
                </div>
                <div className="mt-1 text-2xl font-bold" style={{ color: formData.textColor }}>
                  STUDENT ID CARD
                </div>
              </div>
              <div className="h-16 w-16">
                <img
                  src={formData.logo || "/placeholder.svg"}
                  alt="University Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Main Content Section */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-5">
              {/* Photo Column */}
              <div className="flex flex-col items-center">
                <div className="h-36 w-28 overflow-hidden rounded border bg-white shadow-sm">
                  <img
                    src={formData.photo || "/placeholder.svg"}
                    alt="Student"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-3" style={{ color: formData.textColor }}>
                <div>
                  <div className="text-xs opacity-80">FULL NAME</div>
                  <div className="text-lg font-semibold">{formData.fullName || "JOHN SMITH"}</div>
                </div>

                <div>
                  <div className="text-xs opacity-80">FACULTY</div>
                  <div className="font-semibold">{formData.faculty || "ENGINEERING"}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs opacity-80">PROGRAM</div>
                    <div className="font-semibold">{formData.programType}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-80">ENROLLED</div>
                    <div className="font-semibold">{formData.enrollmentYear}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ID 和 Valid Until 显示在同一行 */}
            <div className="relative z-10 mt-4 grid grid-cols-2 gap-3" style={{ color: formData.textColor }}>
              <div>
                <div className="text-xs opacity-80">STUDENT ID</div>
                <div className="font-semibold">{formData.studentId || "S12345678"}</div>
              </div>
              <div>
                <div className="text-xs opacity-80">VALID UNTIL</div>
                <div className="font-semibold">
                  {formData.validityEnd ? formData.validityEnd.replace("-", "/") : "2028/06"}
                </div>
              </div>
            </div>

            {/* Code Section */}
            <div className="relative z-10 mt-5 border-t border-white/20 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium" style={{ color: formData.textColor }}>
                  {formData.codeType === "qrcode" ? "SCAN QR CODE FOR VERIFICATION" : "SCAN BARCODE FOR VERIFICATION"}
                </div>
              </div>
              <div className="mt-2 flex justify-center">
                {formData.codeType === "qrcode" ? (
                  <div className="bg-white p-2 rounded-sm shadow-sm">
                    <QRCodeSVG
                      value={`ID:${formData.studentId || "S12345678"}`}
                      size={80}
                      bgColor={"#FFFFFF"}
                      fgColor={"#000000"}
                      level={"M"}
                      includeMargin={false}
                    />
                  </div>
                ) : (
                  <div className="bg-white py-1 px-2 rounded-sm shadow-sm">
                    <svg ref={barcodeRef} className="w-full max-w-[180px]"></svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-black/10 p-2 text-center text-xs" style={{ color: formData.textColor }}>
            This card remains the property of the university. If found, please return to the Student Office.
          </div>
        </div>
      )}

      {formData.cardStyle !== "modern" && <ModernPortraitCard formData={formData} barcodeRef={barcodeRef} />}
    </div>
  )
}

export default CardPreview
