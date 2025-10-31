"use client"

import type React from "react"
import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useCertificate } from "@/hooks/useCertificate"
import { DEFAULT_CERTIFICATE_DATA } from "@/lib/constants"
import CertificateInfoForm from "./CertificateInfoForm"
import CertificateDesignForm from "./CertificateDesignForm"
import CertificatePreview from "./CertificatePreview"
import type { CertificateFormData } from "@/lib/types"
import html2canvas from "html2canvas"
import { exportToImage } from "@/lib/utils"

const CertificateGenerator: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null)

  // Use react-hook-form
  const form = useForm<CertificateFormData>({
    defaultValues: DEFAULT_CERTIFICATE_DATA as CertificateFormData,
  })

  // Use custom Hook to get certificate state and handler functions
  const { formData, formErrors, handleInputChange, handleFileChange, resetForm } =
    useCertificate(DEFAULT_CERTIFICATE_DATA)

  // Handle form field changes
  const handleFormChange = (name: string, value: string | boolean) => {
    handleInputChange({ target: { name, value } } as any)
  }

  // Download certificate image
  const handleDownload = (quality: string) => {
    if (!previewRef.current) return

    // Validate form data
    const errors = validateCertificateData(formData)
    if (Object.keys(errors).length > 0) {
      alert("Please complete all required fields.")
      return
    }

    const fileName = `${formData.fullName || "student"}_certificate`

    // Add temporary style fix
    const styleFixElement = document.createElement("style")
    styleFixElement.id = "export-fix-style"
    styleFixElement.innerHTML = `
      #certificate-preview img { display: inline-block !important; }
      #certificate-preview { font-variant: normal !important; }
      .h-full { height: 100% !important; }
      .w-full { width: 100% !important; }
      .object-contain { object-fit: contain !important; }
      .object-cover { object-fit: cover !important; }
    `
    document.head.appendChild(styleFixElement)

    // Scroll to top to ensure correct rendering
    window.scrollTo(0, 0)

    // Add small delay to ensure rendering is complete
    setTimeout(() => {
      html2canvas(previewRef.current as HTMLElement, {
        scale: quality === "ultra" ? 4 : quality === "high" ? 3 : quality === "medium" ? 2 : 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: formData.paperColor,
        scrollY: -window.scrollY,
        foreignObjectRendering: false,
        onclone: (documentClone: Document) => {
          // Apply style fix again in cloned document
          const imgElements = documentClone.querySelectorAll("img")
          imgElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = "inline-block"
            }
          })
        },
      }).then((canvas) => {
        exportToImage(canvas, fileName, "png")
        // Remove temporary style
        document.getElementById("export-fix-style")?.remove()
      })
    }, 300)
  }

  // Validate certificate data
  const validateCertificateData = (data: CertificateFormData): Record<string, string> => {
    const errors: Record<string, string> = {}

    // Required field validation
    if (!data.fullName) errors.fullName = "Required"
    if (!data.studentId) errors.studentId = "Required"
    if (!data.universityName) errors.universityName = "Required"
    if (!data.faculty) errors.faculty = "Required"
    if (!data.major) errors.major = "Required"
    if (!data.degreeType) errors.degreeType = "Required"
    if (!data.studyMode) errors.studyMode = "Required"
    if (!data.enrollmentDate) errors.enrollmentDate = "Required"
    if (!data.expectedGraduationDate) errors.expectedGraduationDate = "Required"
    if (!data.issueDate) errors.issueDate = "Required"

    return errors
  }

  return (
    <div>
      {/* Form Error Alert */}
      {Object.keys(formErrors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Incomplete Form Information</AlertTitle>
          <AlertDescription>Please fill in all required fields before proceeding.</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <Tabs defaultValue="info" className="w-full tabs-container">
          <div className="bg-gray-100 rounded-md p-2 w-full mb-6">
            <TabsList className="flex mx-0 tabs-list overflow-x-auto bg-transparent">
              <TabsTrigger className="tabs-trigger" value="info">
                Certificate Information
              </TabsTrigger>
              <TabsTrigger className="tabs-trigger" value="design">
                Design Options
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="order-2 lg:order-1">
                <CertificateInfoForm formData={formData} onChange={handleFormChange} onFileChange={handleFileChange} />
              </div>

              {/* Preview Section */}
              <div className="order-1 lg:order-2">
                <CertificatePreview
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="order-2 lg:order-1">
                <CertificateDesignForm formData={formData} onChange={handleFormChange} />
              </div>

              {/* Preview Section */}
              <div className="order-1 lg:order-2">
                <CertificatePreview
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
    </div>
  )
}

export default CertificateGenerator
