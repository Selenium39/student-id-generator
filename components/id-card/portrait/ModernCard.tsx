import type React from "react"
import type { CardComponentProps } from "@/lib/types"
import { CardElements } from "@/components/id-card/common/CardElements"
import { QRCodeSVG } from "qrcode.react"
import { CreditCard } from "lucide-react"
import { formatValidityDate } from "@/lib/utils"
import { usePortraitCard } from "@/hooks/usePortraitCard"

/**
 * 竖向现代风格卡片组件
 *
 * 特点：
 * - 圆角、阴影
 * - 鲜明的颜色
 * - 简洁布局
 */
export const ModernCard: React.FC<CardComponentProps> = ({ formData, barcodeRef }) => {
  // 使用竖向卡片Hook获取样式
  const { cardStyles } = usePortraitCard(formData, "modern")

  // 现代风格的文本颜色
  const textColor = formData.textColor

  return (
    <div className="overflow-hidden rounded-lg shadow-lg" style={{ backgroundColor: formData.cardColor }}>
      <div className="relative p-6">
        <CardElements formData={formData}>
          {/* Header Section */}
          <div className="relative z-10 mb-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: textColor }}>
                {formData.universityName || "INTERNATIONAL UNIVERSITY"}
              </div>
              <div className="mt-1 text-2xl font-bold" style={{ color: textColor }}>
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
              <div
                className="h-36 w-28 overflow-hidden rounded border bg-white shadow-sm"
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
            </div>

            {/* Info Column */}
            <div className="flex-1 space-y-3" style={{ color: textColor }}>
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
          <div className="relative z-10 mt-4 grid grid-cols-2 gap-3" style={{ color: textColor }}>
            <div>
              <div className="text-xs opacity-80">STUDENT ID</div>
              <div className="font-semibold">{formData.studentId || "S12345678"}</div>
            </div>
            <div>
              <div className="text-xs opacity-80">VALID UNTIL</div>
              <div className="font-semibold">{formatValidityDate(formData.validityEnd) || "2028/06"}</div>
            </div>
          </div>

          {/* Code Section */}
          <div className="relative z-10 mt-5 border-t border-white/20 pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" style={{ color: textColor }}>
                {formData.codeType === "qrcode" ? "SCAN QR CODE FOR VERIFICATION" : "SCAN BARCODE FOR VERIFICATION"}
              </div>
              <CreditCard className="h-5 w-5" style={{ color: textColor }} />
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
        </CardElements>
      </div>

      <div className="relative z-10 bg-black/10 p-2 text-center text-xs" style={{ color: textColor }}>
        This card remains the property of the university. If found, please return to the Student Office.
      </div>
    </div>
  )
}

export default ModernCard
