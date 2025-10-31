"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TranscriptInfoForm from "./TranscriptInfoForm"
import TranscriptDesignForm from "./TranscriptDesignForm"
import TranscriptPreview from "./TranscriptPreview"
import { useTranscript } from "@/hooks/useTranscript"
import { DEFAULT_TRANSCRIPT_DATA } from "@/lib/constants"
import html2canvas from "html2canvas"
import { exportToImage } from "@/lib/utils"

/**
 * 成绩单生成器组件
 */
export default function TranscriptGenerator() {
  const [activeTab, setActiveTab] = useState("info")
  const previewRef = useRef<HTMLDivElement>(null)

  // 使用自定义Hook获取成绩单状态和处理函数
  const { formData, handleInputChange, handleFileChange, handleCoursesChange, resetForm } =
    useTranscript(DEFAULT_TRANSCRIPT_DATA)

  // 处理表单字段变更
  const handleFormChange = (name: string, value: string | boolean | number) => {
    const event = {
      target: {
        name,
        value,
        type: typeof value === "boolean" ? "checkbox" : "text",
      },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(event)
  }

  // 下载成绩单图片
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    const fileName = `${formData.studentName || "student"}_transcript`

    try {
      // 1. 导出前临时注入样式修复
      const fixStyle = document.createElement("style")
      fixStyle.id = "export-fix-style"
      fixStyle.textContent = `
        img { 
          display: inline-block !important; 
        }
        .h-full {
          height: 100% !important;
        }
        .w-full {
          width: 100% !important;
        }
        .object-contain {
          object-fit: contain !important;
        }
        .object-cover {
          object-fit: cover !important;
        }
      `
      document.head.appendChild(fixStyle)

      // 2. 导出前确保滚动条位置正确
      window.scrollTo(0, 0)

      // 3. 等待渲染完成
      await new Promise((resolve) => setTimeout(resolve, 300))

      // 设置缩放比例
      const scaleValue = quality === "ultra" ? 6 : quality === "high" ? 4 : quality === "medium" ? 3 : 2

      // 4. 使用html2canvas导出
      const canvas = await html2canvas(previewRef.current, {
        scale: scaleValue,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scrollY: -window.scrollY,
        foreignObjectRendering: false,
      })

      // 5. 导出图片
      exportToImage(canvas, fileName, "png")

      // 6. 移除临时样式
      document.getElementById("export-fix-style")?.remove()
    } catch (err) {
      console.error("导出图片时发生错误:", err)
      alert("导出图片失败，请稍后再试")
    }
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
        <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
          <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
            <TabsTrigger className="tabs-trigger" value="info">
              成绩信息
            </TabsTrigger>
            <TabsTrigger className="tabs-trigger" value="design">
              设计选项
            </TabsTrigger>
            <TabsTrigger className="tabs-trigger" value="preview">
              预览
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="info" className="mt-0">
          <TranscriptInfoForm
            formData={formData}
            onChange={handleFormChange}
            onFileChange={handleFileChange}
            onCoursesChange={handleCoursesChange}
          />
        </TabsContent>

        <TabsContent value="design" className="mt-0">
          <TranscriptDesignForm formData={formData} onChange={handleFormChange} />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <TranscriptPreview
            formData={formData}
            onChange={handleFormChange}
            onDownload={handleDownload}
            previewRef={previewRef}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
