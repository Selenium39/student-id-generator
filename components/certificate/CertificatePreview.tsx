"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { CertificatePreviewProps } from "@/lib/types"
import { EXPORT_QUALITY_OPTIONS } from "@/lib/constants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"
import PreviewContainer from "@/components/common/PreviewContainer"

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ formData, onDownload, previewRef }) => {
  // Export quality state
  const [exportQuality, setExportQuality] = useState<string>("high")

  // Determine if line watermark should be shown
  const showLineWatermark = formData.enableWatermark && !formData.watermarkText.includes("LINE_DISABLED")

  // Determine if text watermark should be shown
  const showTextWatermark =
    formData.enableWatermark && formData.watermarkText && !formData.watermarkText.match(/^\s*LINE_DISABLED\s*$/)

  // Get actual watermark text (remove LINE_DISABLED marker)
  const watermarkTextContent = formData.watermarkText?.replace("LINE_DISABLED", "").trim() || ""

  // Generate line watermark style
  const lineWatermarkStyle = showLineWatermark
    ? {
        background: `repeating-linear-gradient(
          ${formData.watermarkAngle || "-30"}deg,
          transparent,
          transparent ${formData.watermarkLineWidth || "10"}px,
          rgba(${Number.parseInt(formData.watermarkColor?.slice(1, 3) || "00", 16)}, 
               ${Number.parseInt(formData.watermarkColor?.slice(3, 5) || "00", 16)}, 
               ${Number.parseInt(formData.watermarkColor?.slice(5, 7) || "00", 16)}, 
               ${Number(formData.watermarkOpacity) / 100}) ${formData.watermarkLineWidth || "10"}px,
          rgba(${Number.parseInt(formData.watermarkColor?.slice(1, 3) || "00", 16)}, 
               ${Number.parseInt(formData.watermarkColor?.slice(3, 5) || "00", 16)}, 
               ${Number.parseInt(formData.watermarkColor?.slice(5, 7) || "00", 16)}, 
               ${Number(formData.watermarkOpacity) / 100}) ${Number(formData.watermarkLineWidth || "10") * 2}px
        )`,
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none" as const,
      }
    : {}

  // Generate watermark text style
  const getWatermarkTextElements = () => {
    if (!showTextWatermark) return null

    const size = Number.parseInt(formData.watermarkSize) || 14
    const color = formData.watermarkColor || "#000000"
    const opacity = (formData.watermarkOpacity / 100) * 3 // Enhance opacity
    const angle = Number.parseInt(formData.watermarkAngle) || -30
    const elements = []

    // Calculate text watermark density
    const density = 180 - size * 3 // Adjust density based on font size
    const rowSpacing = Math.max(40, density / 2)

    // Generate watermark text at different positions on the page
    for (let row = -5; row < 30; row++) {
      for (let col = -2; col < 15; col++) {
        const xPos = col * density + ((row % 2) * density) / 2 // Staggered arrangement
        const yPos = row * rowSpacing

        elements.push(
          <div
            key={`${row}-${col}`}
            style={{
              position: "absolute",
              left: xPos,
              top: yPos,
              fontSize: size,
              color,
              opacity,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "center",
              pointerEvents: "none",
              zIndex: 2,
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textShadow: "0 0 1px rgba(0,0,0,0.1)",
            }}
          >
            {watermarkTextContent}
          </div>,
        )
      }
    }

    return elements
  }

  // Generate border style
  const borderStyle = formData.enableBorder
    ? {
        border: `1px ${formData.borderStyle} ${formData.borderColor}`,
        padding: "16px",
      }
    : {}

  // Generate pattern style, render different pattern styles based on type and position
  const getPatternElement = () => {
    if (!formData.enablePattern) return null

    const patternSize = Number.parseInt(formData.patternSize) || 30
    const patternColor = formData.patternColor || formData.headerColor
    const opacity = formData.patternOpacity / 100

    const commonStyle = {
      position: "absolute" as const,
      zIndex: 2,
      opacity: opacity,
      pointerEvents: "none" as const,
    }

    switch (formData.patternType) {
      case "corner":
        return (
          <>
            {(formData.patternPosition === "all" ||
              formData.patternPosition === "corners" ||
              formData.patternPosition === "top") && (
              <div
                style={{
                  ...commonStyle,
                  top: 20,
                  left: 20,
                  width: patternSize,
                  height: patternSize,
                  borderTop: `2px solid ${patternColor}`,
                  borderLeft: `2px solid ${patternColor}`,
                }}
              ></div>
            )}
            {(formData.patternPosition === "all" ||
              formData.patternPosition === "corners" ||
              formData.patternPosition === "top") && (
              <div
                style={{
                  ...commonStyle,
                  top: 20,
                  right: 20,
                  width: patternSize,
                  height: patternSize,
                  borderTop: `2px solid ${patternColor}`,
                  borderRight: `2px solid ${patternColor}`,
                }}
              ></div>
            )}
            {(formData.patternPosition === "all" ||
              formData.patternPosition === "corners" ||
              formData.patternPosition === "bottom") && (
              <div
                style={{
                  ...commonStyle,
                  bottom: 20,
                  left: 20,
                  width: patternSize,
                  height: patternSize,
                  borderBottom: `2px solid ${patternColor}`,
                  borderLeft: `2px solid ${patternColor}`,
                }}
              ></div>
            )}
            {(formData.patternPosition === "all" ||
              formData.patternPosition === "corners" ||
              formData.patternPosition === "bottom") && (
              <div
                style={{
                  ...commonStyle,
                  bottom: 20,
                  right: 20,
                  width: patternSize,
                  height: patternSize,
                  borderBottom: `2px solid ${patternColor}`,
                  borderRight: `2px solid ${patternColor}`,
                }}
              ></div>
            )}
          </>
        )

      case "border":
        return (
          <div
            style={{
              ...commonStyle,
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
              border: `1px solid ${patternColor}`,
              backgroundImage:
                formData.patternPosition !== "all"
                  ? "none"
                  : `repeating-linear-gradient(0deg, ${patternColor}, ${patternColor} 1px, transparent 1px, transparent 10px)`,
              backgroundSize: `100% ${patternSize}px`,
              backgroundPosition: "center",
              backgroundRepeat: "repeat-y",
            }}
          ></div>
        )

      case "background":
        return (
          <div
            style={{
              ...commonStyle,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(${patternColor} 1px, transparent 1px)`,
              backgroundSize: `${patternSize}px ${patternSize}px`,
            }}
          ></div>
        )

      case "badge":
        const badgeSize = patternSize * 2
        return (
          <div
            style={{
              ...commonStyle,
              top: "50%",
              left: "50%",
              width: badgeSize,
              height: badgeSize,
              marginTop: -badgeSize / 2,
              marginLeft: -badgeSize / 2,
              border: `2px solid ${patternColor}`,
              borderRadius: "50%",
              transform: "rotate(25deg)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -8,
                left: "50%",
                width: 16,
                height: 16,
                marginLeft: -8,
                border: `2px solid ${patternColor}`,
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                width: 16,
                height: 16,
                marginLeft: -8,
                border: `2px solid ${patternColor}`,
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: -8,
                top: "50%",
                width: 16,
                height: 16,
                marginTop: -8,
                border: `2px solid ${patternColor}`,
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "50%",
                width: 16,
                height: 16,
                marginTop: -8,
                border: `2px solid ${patternColor}`,
                borderRadius: "50%",
              }}
            ></div>
          </div>
        )

      default:
        return null
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Handle quality selection
  const handleQualityChange = (quality: string) => {
    setExportQuality(quality)
  }

  // Handle download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(exportQuality)
    }
  }

  // Preview content
  const previewContent = (
    <div className="relative">
      {/* A4 paper range marker - for preview only, not included in export */}
      <div
        className="absolute inset-0 border-2 border-blue-400 border-dashed pointer-events-none z-20"
        style={{ boxShadow: "0 0 0 4px rgba(96, 165, 250, 0.2)" }}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs px-2 py-0.5 rounded">
          A4 Paper Range
        </div>
      </div>
      <div
        id="certificate-preview"
        ref={previewRef}
        className="relative w-full bg-white overflow-hidden mb-6"
        style={{
          fontFamily: formData.fontFamily || "Times New Roman, serif",
          backgroundColor: formData.paperColor,
          color: formData.textColor,
          maxWidth: "210mm", // A4 width
          aspectRatio: "1 / 1.414", // A4 paper ratio
          margin: "0 auto",
        }}
      >
        {/* Line Watermark Layer */}
        {showLineWatermark && <div style={lineWatermarkStyle}></div>}

        {/* Text Watermark Layer */}
        {showTextWatermark && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            {getWatermarkTextElements()}
          </div>
        )}

        {/* Document Content */}
        <div
          className="relative z-10"
          style={{
            margin: "16px",
            padding: "16px",
            border: formData.enableBorder
              ? `1px ${formData.borderStyle} ${formData.borderColor}`
              : "1px solid transparent",
          }}
        >
          {/* Pattern Layer - moved inside document content div */}
          {getPatternElement()}

          {/* Header - University Information */}
          <div
            className="flex justify-between items-center mb-4 pb-3 border-b"
            style={{ borderColor: formData.headerColor }}
          >
            {formData.universityLogo && (
              <div className="relative w-16 h-16">
                <Image
                  src={formData.universityLogo}
                  alt="University Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="64px"
                />
              </div>
            )}
            <div className="text-right">
              <h1 className="text-xl font-bold mb-1" style={{ color: formData.headerColor }}>
                {formData.universityName || "University Name"}
              </h1>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color: formData.headerColor }}>
              {formData.certificateTitle || "Certificate of Enrollment"}
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Student Information and Photo */}
            <div className="flex flex-row justify-between">
              {/* Student Basic Information */}
              <div className="space-y-1 flex-1">
                <p>
                  <strong>Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Student ID:</strong> {formData.studentId}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {formatDate(formData.birthDate)}
                </p>
                <p>
                  <strong>Nationality:</strong> {formData.nationality}
                </p>
              </div>

              {/* Student Photo */}
              {formData.studentPhoto && (
                <div className="ml-4 relative w-[100px] h-[133px] border border-gray-300">
                  <Image
                    src={formData.studentPhoto}
                    alt="Student Photo"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100px"
                  />
                </div>
              )}
              {!formData.studentPhoto && (
                <div className="ml-4 relative w-[100px] h-[133px] border border-gray-300 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=133&width=100"
                    alt="Student Photo"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100px"
                  />
                </div>
              )}
            </div>

            {/* Academic Information */}
            <div className="space-y-1">
              <p>
                <strong>Faculty/School:</strong> {formData.faculty}
              </p>
              <p>
                <strong>Major:</strong> {formData.major}
              </p>
              <p>
                <strong>Degree Type:</strong> {formData.degreeType}
              </p>
              <p>
                <strong>Study Mode:</strong> {formData.studyMode}
              </p>
              <p>
                <strong>Enrollment Date:</strong> {formatDate(formData.enrollmentDate)}
              </p>
              <p>
                <strong>Expected Graduation Date:</strong> {formatDate(formData.expectedGraduationDate)}
              </p>
              <p>
                <strong>Current Year:</strong> {formData.currentYear}
              </p>
            </div>

            {/* Certificate Content */}
            <div className="py-3">
              <p className="text-justify">
                {formData.certificateContent ||
                  "This is to certify that the above-named student is currently enrolled as a student in good standing. The student is making satisfactory progress towards their degree."}
              </p>
            </div>

            {/* Issuance Information */}
            <div
              className="flex justify-between items-end pt-4 mt-4 border-t"
              style={{ borderColor: formData.headerColor }}
            >
              <div>
                <p>
                  <strong>Issue Date:</strong> {formatDate(formData.issueDate)}
                </p>
                <p>
                  <strong>Validity:</strong> {formData.validityPeriod}
                </p>
              </div>
              <div className="text-right">
                {formData.issuerSignature && (
                  <div className="mb-2">
                    <div className="flex items-end justify-end">
                      <div className="relative inline-block pb-0 w-auto min-w-[120px]">
                        <div className="border-b border-gray-400 absolute bottom-0 left-0 right-0"></div>
                        <div className="font-handwriting text-gray-800 text-lg pb-[2px] px-2">
                          {formData.issuerSignature}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <p>
                  <strong>{formData.issuerTitle || "Registrar"}</strong>
                </p>
              </div>
            </div>

            {/* Footer - Contact Information */}
            <div className="text-sm mt-4 pt-3 border-t text-center" style={{ borderColor: formData.headerColor }}>
              <p>
                {formData.contactInfo ||
                  "For verification of this certificate, please contact the Office of the Registrar."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Footer action area
  const footerContent = (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Quality Selection */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {EXPORT_QUALITY_OPTIONS.find((opt) => opt.value === exportQuality)?.label || "Select Export Quality"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {EXPORT_QUALITY_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleQualityChange(option.value)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {exportQuality === option.value && (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Download Button */}
        <Button variant="default" onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
      </div>
      <div className="flex justify-center text-sm text-gray-500 mt-4">
        Tip: The exported image includes all certificate elements, including watermarks and background
      </div>
    </>
  )

  return (
    <PreviewContainer title="Certificate Preview" footer={footerContent}>
      {previewContent}
    </PreviewContainer>
  )
}

export default CertificatePreview
