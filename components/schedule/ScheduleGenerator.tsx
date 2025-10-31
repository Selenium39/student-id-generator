"use client"

import { useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import html2canvas from "html2canvas"
import { exportToImage } from "@/lib/utils"
import { useSchedule } from "@/hooks/useSchedule"
import { DEFAULT_SCHEDULE_DATA } from "@/lib/constants"
import ScheduleInfoForm from "./ScheduleInfoForm"
import ScheduleDesignForm from "./ScheduleDesignForm"
import SchedulePreview from "./SchedulePreview"
import CourseEditor from "./CourseEditor"
import type { ScheduleFormData, ScheduleCourse } from "@/lib/types"

export default function ScheduleGenerator() {
  // Preview reference
  const previewRef = useRef<HTMLDivElement>(null)

  // Active tab state
  const [activeTab, setActiveTab] = useState("info")

  // Use react-hook-form
  const form = useForm<ScheduleFormData>({
    defaultValues: DEFAULT_SCHEDULE_DATA,
  })

  // Use custom Hook to get schedule state and handler functions
  const {
    formData,
    formErrors,
    editingCourse,
    handleInputChange,
    handleFileChange,
    addCourse,
    editCourse,
    saveCourse,
    cancelEditCourse,
    deleteCourse,
  } = useSchedule(DEFAULT_SCHEDULE_DATA)

  // Handle form field changes
  const handleFormChange = (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => {
    if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
      handleInputChange({ target: { name, value, type: typeof value } } as any)
    } else {
      // Handle array type values
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Set form data (for array type values)
  const setFormData = (updater: (prev: ScheduleFormData) => ScheduleFormData) => {
    const newData = updater(formData)
    Object.entries(newData).forEach(([key, value]) => {
      if (key !== "courses" && key !== "daysOfWeek") {
        if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
          handleInputChange({ target: { name: key, value, type: typeof value } } as any)
        }
      }
    })

    // Special handling for array types
    if (newData.courses !== formData.courses) {
      handleFormChange("courses", newData.courses)
    }
  }

  // Download schedule image
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    // Validate form data
    if (Object.keys(formErrors).length > 0) {
      alert("Please complete all required fields.")
      return
    }

    const fileName = `${formData.fullName || "student"}_schedule`

    try {
      // 1. Inject temporary style fix before export
      const fixStyle = document.createElement("style")
      fixStyle.id = "export-fix-style"
      fixStyle.textContent = `
        img { 
          display: inline-block !important; 
        }
        .schedule-container {
          font-variant: normal !important;
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
      `
      document.head.appendChild(fixStyle)

      // 2. Ensure scroll position is correct before export
      window.scrollTo(0, 0)

      // 3. Wait for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Set scale ratio
      const scaleValue = quality === "ultra" ? 6 : quality === "high" ? 4 : quality === "medium" ? 3 : 2

      // 4. Export using html2canvas
      const canvas = await html2canvas(previewRef.current, {
        scale: scaleValue,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scrollY: -window.scrollY,
        foreignObjectRendering: false,
      })

      // 5. Export image
      exportToImage(canvas, fileName, "png")

      // 6. Remove temporary style
      document.getElementById("export-fix-style")?.remove()
    } catch (err) {
      console.error("Error exporting image:", err)
      alert("Failed to export image, please try again later.")
    }
  }

  return (
    <div>
      {/* Form Error Alert */}
      {Object.keys(formErrors).length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Incomplete Form Information</AlertTitle>
          <AlertDescription>Please fill in all required fields before proceeding.</AlertDescription>
        </Alert>
      )}

      {/* Course Editor */}
      {editingCourse && <CourseEditor course={editingCourse} onUpdate={saveCourse} onCancel={cancelEditCourse} />}

      {!editingCourse && (
        <Form {...form}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full tabs-container">
            <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
              <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
                <TabsTrigger className="tabs-trigger" value="info">
                  Course Information
                </TabsTrigger>
                <TabsTrigger className="tabs-trigger" value="design">
                  Design Options
                </TabsTrigger>
                <TabsTrigger className="tabs-trigger" value="preview">
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Course Information Form */}
            <TabsContent value="info" className="mt-0">
              <ScheduleInfoForm
                formData={formData}
                onChange={handleFormChange}
                onFileChange={handleFileChange}
                onAddCourse={addCourse}
                onEditCourse={editCourse}
                onDeleteCourse={deleteCourse}
              />
            </TabsContent>

            {/* Design Options Form */}
            <TabsContent value="design" className="mt-0">
              <ScheduleDesignForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview" className="mt-0">
              <SchedulePreview
                formData={formData}
                onChange={handleFormChange}
                onFileChange={handleFileChange}
                onDownload={handleDownload}
                previewRef={previewRef}
              />
            </TabsContent>
          </Tabs>
        </Form>
      )}
    </div>
  )
}
