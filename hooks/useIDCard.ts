"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import JsBarcode from "jsbarcode"
import type { IDCardFormData, CardStyle } from "@/lib/types"
import { DEFAULT_FORM_DATA, DEFAULT_CARD_STYLE } from "@/lib/constants"
import { calculateExpiryYear, validateFormData } from "@/lib/utils"

export const useIDCard = (initialData: IDCardFormData = DEFAULT_FORM_DATA) => {
  // Card form data
  const [formData, setFormData] = useState<IDCardFormData>(initialData)

  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Card style
  const [cardStyle, setCardStyle] = useState<CardStyle>(DEFAULT_CARD_STYLE)

  // Barcode references
  const barcodeRefs = {
    modern: useRef<SVGSVGElement>(null),
    classic: useRef<SVGSVGElement>(null),
    minimal: useRef<SVGSVGElement>(null),
    landscape: useRef<SVGSVGElement>(null),
  }

  // Validate form data
  useEffect(() => {
    setFormErrors(validateFormData(formData))
  }, [formData])

  // Generate barcode
  useEffect(() => {
    if (formData.codeType === "barcode" || formData.orientation === "landscape") {
      const studentId = formData.studentId || "S12345678"

      // Generate barcodes for various styles
      generateBarcode(barcodeRefs.modern.current, studentId, {
        width: 2,
        height: 40,
        fontSize: 12,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.classic.current, studentId, {
        width: 1.5,
        height: 30,
        fontSize: 10,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.minimal.current, studentId, {
        width: 2,
        height: 40,
        fontSize: 12,
        displayValue: true,
      })

      generateBarcode(barcodeRefs.landscape.current, studentId, {
        width: 1.5,
        height: 24,
        fontSize: 10,
        displayValue: false,
        textMargin: 0,
      })
    }
  }, [formData.studentId, formData.codeType, formData.orientation, cardStyle])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // When enrollment year changes, automatically infer expiry time
    if (name === "enrollmentYear") {
      const year = Number.parseInt(value)
      if (!isNaN(year)) {
        const expiryYear = calculateExpiryYear(year, formData.programType)
        setFormData({
          ...formData,
          [name]: value,
          validityEnd: `${expiryYear}-06`, // Assume academic year ends in June
        })
      }
    }
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })

    // When program type changes, automatically infer expiry time
    if (name === "programType" && typeof value === "string") {
      const enrollmentYear = Number.parseInt(formData.enrollmentYear)
      if (!isNaN(enrollmentYear)) {
        const expiryYear = calculateExpiryYear(enrollmentYear, value)
        setFormData({
          ...formData,
          [name]: value,
          validityEnd: `${expiryYear}-06`, // Assume academic year ends in June
        })
      }
    }
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA)
    setFormErrors({})
  }

  // Download card
  const downloadCard = async (quality: string) => {
    const cardElement = document.getElementById("student-card")
    if (!cardElement) return

    try {
      // Set scale based on export quality
      let scaleValue = 2
      switch (quality) {
        case "low":
          scaleValue = 2
          break
        case "medium":
          scaleValue = 3
          break
        case "high":
          scaleValue = 4
          break
        case "ultra":
          scaleValue = 6
          break
        default:
          scaleValue = 4
      }

      // 动态导入html2canvas
      const html2canvasModule = await import("html2canvas")
      const html2canvas = html2canvasModule.default

      // 捕获卡片元素
      const canvas = await html2canvas(cardElement, {
        scale: scaleValue, // 根据用户选择的质量设置缩放参数
        useCORS: true, // 允许加载跨域图像
        backgroundColor: null, // 保持背景透明
        logging: false, // 关闭日志
        allowTaint: true, // 允许污染画布
        scrollY: -window.scrollY, // 确保捕获整个内容，即使有滚动
      })

      // 创建下载链接
      const link = document.createElement("a")

      // 将canvas转换为dataURL
      const image = canvas.toDataURL("image/png")

      // 设置下载属性
      link.href = image
      link.download = `student-id-${formData.studentId || "card"}.png`

      // 触发下载
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Error generating image:", err)
      alert("无法生成图片，请稍后再试")
    }
  }

  // 辅助函数：生成条形码
  const generateBarcode = (barcodeRef: SVGSVGElement | null, value: string, options: any) => {
    if (barcodeRef) {
      try {
        JsBarcode(barcodeRef, value, {
          format: "CODE128",
          lineColor: "#000",
          ...options,
          margin: 0,
          background: "transparent",
        })
      } catch (e) {
        console.error("Error generating barcode:", e)
      }
    }
  }

  return {
    formData,
    formErrors,
    cardStyle,
    barcodeRefs,
    setFormData,
    setCardStyle,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    resetForm,
    downloadCard,
  }
}
