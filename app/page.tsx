"use client"

import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InfoForm from "@/components/id-card/form/InfoForm"
import DesignForm from "@/components/id-card/form/DesignForm"
import PreviewForm from "@/components/id-card/form/PreviewForm"
import { useIDCard } from "@/hooks/useIDCard"
import { DEFAULT_FORM_DATA } from "@/lib/constants"
import html2canvas from "html2canvas"
import { exportToImage, validateFormData } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import type { IDCardFormData } from "@/lib/types"
import CertificateGenerator from "@/components/certificate/CertificateGenerator"
import ScheduleGenerator from "@/components/schedule/ScheduleGenerator"
import AdmissionLetterGenerator from "@/components/admission-letter/AdmissionLetterGenerator"
import TranscriptGenerator from "@/components/transcript/TranscriptGenerator"
import Footer from "@/components/layout/Footer"

/**
 * Home Page Component
 */
export default function Home() {
  // Use non-null assertion to ensure ref type doesn't include null
  const previewRef = useRef<HTMLDivElement>(null)

  // Use react-hook-form
  const form = useForm<IDCardFormData>({
    defaultValues: DEFAULT_FORM_DATA as IDCardFormData,
  })

  // Use custom Hook to get card state and handler functions
  const { formData, formErrors, handleInputChange, handleFileChange, resetForm } = useIDCard(
    DEFAULT_FORM_DATA as IDCardFormData,
  )

  // Handle form field changes
  const handleFormChange = (name: string, value: string | boolean) => {
    handleInputChange({ target: { name, value } } as any)
  }

  // Download card image
  const handleDownload = async (quality: string) => {
    if (!previewRef.current) return

    // Validate form data
    const errors = validateFormData(formData)
    if (Object.keys(errors).length > 0) {
      alert("Please complete all required information first.")
      return
    }

    const fileName = `${formData.fullName || "student"}_id_card`

    try {
      // 1. Temporarily inject style fixes before export
      const fixStyle = document.createElement("style")
      fixStyle.id = "export-fix-style"
      fixStyle.textContent = `
        img { 
          display: inline-block !important; 
        }
        #student-card {
          font-variant: normal !important;
        }
        .realistic-card {
          position: relative !important;
        }
        .realistic-content {
          position: relative !important;
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

      // 2. Ensure correct scroll position before export
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
        onclone: (documentClone: Document) => {
          // Apply style fixes again in cloned document
          const imgElements = documentClone.querySelectorAll("img")
          imgElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = "inline-block"
            }
          })

          const cardContainer = documentClone.getElementById("student-card")
          if (cardContainer) {
            cardContainer.style.fontVariant = "normal"
          }
        },
      })

      // 5. Export image
      exportToImage(canvas, fileName, "png")

      // 6. Remove temporary styles
      document.getElementById("export-fix-style")?.remove()
    } catch (err) {
      console.error("Error occurred while exporting image:", err)
      alert("Failed to export image, please try again later")
    }
  }

  // Print card
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="container mx-auto px-4 pt-4 pb-8">
        {/* Document type selection */}
        <Tabs defaultValue="id-card" className="w-full mb-6 tabs-container">
          <div className="bg-gray-100 rounded-md p-2 w-full">
            <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
              <TabsTrigger className="tabs-trigger" value="id-card">
                Student ID Card
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="certificate">
                Certificate of Enrollment
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="schedule">
                Course Schedule
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="admission">
                Admission Letter
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="transcript">
                Transcript
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="id-card">
            {/* Form error message */}
            {Object.keys(formErrors).length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Form Information Incomplete</AlertTitle>
                <AlertDescription>Please fill in all required fields before proceeding.</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <Tabs defaultValue="info" className="w-full tabs-container">
                <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
                  <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
                    <TabsTrigger className="tabs-trigger" value="info">
                      ID Information
                    </TabsTrigger>
                    <TabsTrigger className="tabs-trigger" value="design">
                      Design Options
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="info" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form section */}
                    <div className="order-2 md:order-1">
                      <InfoForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
                    </div>

                    {/* Preview section */}
                    <div className="order-1 md:order-2">
                      <PreviewForm
                        formData={formData}
                        onChange={handleFormChange}
                        onFileChange={handleFileChange}
                        onDownload={handleDownload}
                        previewRef={previewRef}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form section */}
                    <div className="order-2 md:order-1">
                      <DesignForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
                    </div>

                    {/* Preview section */}
                    <div className="order-1 md:order-2">
                      <PreviewForm
                        formData={formData}
                        onChange={handleFormChange}
                        onFileChange={handleFileChange}
                        onDownload={handleDownload}
                        previewRef={previewRef}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Form>
          </TabsContent>

          <TabsContent value="certificate">
            <CertificateGenerator />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleGenerator />
          </TabsContent>

          <TabsContent value="admission">
            <AdmissionLetterGenerator />
          </TabsContent>

          <TabsContent value="transcript">
            <TranscriptGenerator />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </>
  )
}
