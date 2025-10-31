"use client"

import type React from "react"

import { useState } from "react"
import type { AdmissionLetterFormData } from "@/lib/types"
import { DEFAULT_ADMISSION_LETTER_DATA } from "@/lib/constants"

/**
 * 录取通知书状态管理Hook
 */
export const useAdmissionLetter = (initialData: AdmissionLetterFormData = DEFAULT_ADMISSION_LETTER_DATA) => {
  // 表单数据状态
  const [formData, setFormData] = useState<AdmissionLetterFormData>(initialData)

  // 表单错误状态
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // 处理输入变更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // 处理复选框
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
      return
    }

    // 处理其他输入
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 清除错误
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target?.result as string,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  // 重置表单
  const resetForm = () => {
    setFormData(DEFAULT_ADMISSION_LETTER_DATA)
    setFormErrors({})
  }

  // 验证表单
  const validateForm = () => {
    const errors: Record<string, string> = {}

    // 必填字段验证
    const requiredFields = ["universityName", "studentName", "programName", "departmentName", "letterContent"]

    requiredFields.forEach((field) => {
      if (!formData[field as keyof AdmissionLetterFormData]) {
        errors[field] = "此字段为必填项"
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  return {
    formData,
    formErrors,
    handleInputChange,
    handleFileChange,
    resetForm,
    validateForm,
    setFormData,
  }
}
