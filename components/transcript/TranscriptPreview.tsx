"use client"

import { useState } from "react"
import type React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import PreviewContainer from "@/components/common/PreviewContainer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EXPORT_QUALITY_OPTIONS, GRADE_POINTS } from "@/lib/constants"
import { hexToRgba } from "@/lib/utils"
import type { TranscriptFormData, TranscriptCourse } from "@/lib/types"

interface TranscriptPreviewProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

/**
 * 成绩单预览组件
 */
export default function TranscriptPreview({ formData, onChange, onDownload, previewRef }: TranscriptPreviewProps) {
  const [exportQuality, setExportQuality] = useState("high")
  const localPreviewRef = useRef<HTMLDivElement>(null)
  const finalPreviewRef = previewRef || localPreviewRef

  // 计算学期GPA
  const calculateSemesterGPA = (courses: TranscriptCourse[], semester: string, academicYear: string) => {
    const semesterCourses = courses.filter(
      (course) => course.semester === semester && course.academicYear === academicYear && course.completed,
    )

    if (semesterCourses.length === 0) return "N/A"

    let totalPoints = 0
    let totalCredits = 0

    semesterCourses.forEach((course) => {
      const gradePoint = GRADE_POINTS[course.grade as keyof typeof GRADE_POINTS]
      if (gradePoint !== null) {
        totalPoints += gradePoint * course.credits
        totalCredits += course.credits
      }
    })

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A"
  }

  // 获取唯一的学期和学年组合
  const getSemesterYearCombinations = (courses: TranscriptCourse[]) => {
    const combinations: { semester: string; academicYear: string }[] = []

    courses.forEach((course) => {
      const exists = combinations.some(
        (combo) => combo.semester === course.semester && combo.academicYear === course.academicYear,
      )

      if (!exists) {
        combinations.push({
          semester: course.semester,
          academicYear: course.academicYear,
        })
      }
    })

    // 按学年和学期排序
    combinations.sort((a, b) => {
      // 首先按学年排序
      const yearComparison = a.academicYear.localeCompare(b.academicYear)
      if (yearComparison !== 0) return yearComparison

      // 然后按学期排序（Fall, Spring, Summer, Winter）
      const semesterOrder = { Fall: 0, Spring: 1, Summer: 2, Winter: 3 }
      return (
        (semesterOrder[a.semester as keyof typeof semesterOrder] || 0) -
        (semesterOrder[b.semester as keyof typeof semesterOrder] || 0)
      )
    })

    return combinations
  }

  // 获取成绩点数
  const getGradePoint = (grade: string) => {
    const point = GRADE_POINTS[grade as keyof typeof GRADE_POINTS]
    return point !== null ? point.toFixed(1) : "N/A"
  }

  // 处理下载
  const handleDownload = () => {
    if (onDownload) {
      onDownload(exportQuality)
    }
  }

  // 处理质量变更
  const handleQualityChange = (quality: string) => {
    setExportQuality(quality)
  }

  // 水印样式
  const watermarkStyle = formData.enableWatermark
    ? {
        backgroundImage: `repeating-linear-gradient(${formData.watermarkAngle}deg, ${hexToRgba(
          formData.watermarkColor,
          formData.watermarkOpacity / 100,
        )}, ${hexToRgba(formData.watermarkColor, formData.watermarkOpacity / 100)} 1px, transparent 1px, transparent ${
          formData.watermarkSize
        }px)`,
      }
    : {}

  // 边框样式
  const borderStyle = formData.enableBorder
    ? {
        border: `1px ${formData.borderStyle} ${formData.borderColor}`,
      }
    : {}

  // 下载按钮
  const downloadButton = (
    <div className="flex items-center gap-2">
      <Select value={exportQuality} onValueChange={handleQualityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择导出质量" />
        </SelectTrigger>
        <SelectContent>
          {EXPORT_QUALITY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        下载
      </Button>
    </div>
  )

  return (
    <PreviewContainer title="成绩单预览" actions={downloadButton}>
      <div
        ref={finalPreviewRef}
        className="w-full max-w-4xl mx-auto relative overflow-hidden p-8"
        style={{
          backgroundColor: formData.paperColor,
          color: formData.textColor,
          fontFamily: formData.fontFamily,
          ...borderStyle,
          position: "relative",
        }}
      >
        {/* 水印 */}
        {formData.enableWatermark && (
          <div className="absolute inset-0 pointer-events-none" style={watermarkStyle} aria-hidden="true" />
        )}

        {/* 内容容器 */}
        <div className="relative z-10">
          {/* 标题和大学信息 */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {formData.universityLogo && (
                <img
                  src={formData.universityLogo || "/placeholder.svg"}
                  alt="University Logo"
                  className="h-16 w-auto object-contain"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold" style={{ color: formData.headerColor }}>
                  {formData.universityName}
                </h1>
                <p className="text-sm">{formData.universityAddress}</p>
                <p className="text-sm">
                  {formData.universityContact} | {formData.universityWebsite}
                </p>
              </div>
            </div>
            {formData.showStudentPhoto && formData.studentPhoto && (
              <div className="h-24 w-20 overflow-hidden border">
                <img
                  src={formData.studentPhoto || "/placeholder.svg"}
                  alt="Student Photo"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* 标题 */}
          <div className="text-center mb-6">
            <h2
              className="text-xl font-bold uppercase tracking-wider py-2"
              style={{ color: formData.headerColor, borderBottom: `2px solid ${formData.headerColor}` }}
            >
              Official Academic Transcript
            </h2>
          </div>

          {/* 学生信息 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <span className="font-semibold">Student Name:</span> {formData.studentName}
              </p>
              <p>
                <span className="font-semibold">Student ID:</span> {formData.studentId}
              </p>
              <p>
                <span className="font-semibold">Program:</span> {formData.programName}
              </p>
              <p>
                <span className="font-semibold">Department:</span> {formData.departmentName}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Degree:</span> {formData.degreeType}
              </p>
              <p>
                <span className="font-semibold">Enrollment Date:</span> {formData.enrollmentDate}
              </p>
              <p>
                <span className="font-semibold">Expected Graduation:</span> {formData.expectedGraduationDate}
              </p>
              <p>
                <span className="font-semibold">Current GPA:</span> {formData.currentGPA}
              </p>
            </div>
          </div>

          {/* 成绩等级说明 */}
          {formData.showGradeScale && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2" style={{ color: formData.headerColor }}>
                Grading Scale
              </h3>
              <div className="grid grid-cols-6 gap-2 text-xs">
                <div>A+ / A = 4.0</div>
                <div>A- = 3.7</div>
                <div>B+ = 3.3</div>
                <div>B = 3.0</div>
                <div>B- = 2.7</div>
                <div>C+ = 2.3</div>
                <div>C = 2.0</div>
                <div>C- = 1.7</div>
                <div>D+ = 1.3</div>
                <div>D = 1.0</div>
                <div>F = 0.0</div>
                <div>P/NP = Not in GPA</div>
              </div>
            </div>
          )}

          {/* 课程成绩 */}
          <div className="mb-6">
            {getSemesterYearCombinations(formData.courses).map((combo, index) => (
              <div key={`${combo.academicYear}-${combo.semester}`} className="mb-4 p-4 rounded-md" style={{ backgroundColor: `${formData.accentColor}10` }}>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: formData.headerColor }}
                >
                  {combo.semester} {combo.academicYear}
                  {formData.showSemesterGPA && (
                    <span className="float-right">
                      Semester GPA: {calculateSemesterGPA(formData.courses, combo.semester, combo.academicYear)}
                    </span>
                  )}
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${formData.tableHeaderColor}` }}>
                      <th className="py-1 px-2 text-left font-semibold">Course Code</th>
                      <th className="py-1 px-2 text-left font-semibold">Course Name</th>
                      <th className="py-1 px-2 text-center font-semibold">Credits</th>
                      <th className="py-1 px-2 text-center font-semibold">Grade</th>
                      {formData.showGradePoints && <th className="py-1 px-2 text-center font-semibold">Grade Points</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {formData.courses
                      .filter(
                        (course) => course.semester === combo.semester && course.academicYear === combo.academicYear,
                      )
                      .map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="py-1 px-2">{course.courseCode}</td>
                          <td className="py-1 px-2">{course.courseName}</td>
                          <td className="py-1 px-2 text-center">{course.credits}</td>
                          <td className="py-1 px-2 text-center">{course.grade}</td>
                          {formData.showGradePoints && (
                            <td className="py-1 px-2 text-center">{getGradePoint(course.grade)}</td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* 总结信息 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="border p-3 text-center">
              <div className="text-sm font-semibold">Total Credits</div>
              <div className="text-xl font-bold">{formData.totalCredits}</div>
            </div>
            <div className="border p-3 text-center">
              <div className="text-sm font-semibold">Completed Credits</div>
              <div className="text-xl font-bold">{formData.completedCredits}</div>
            </div>
            <div className="border p-3 text-center">
              <div className="text-sm font-semibold">Cumulative GPA</div>
              <div className="text-xl font-bold">{formData.currentGPA}</div>
            </div>
          </div>

          {/* 签名和日期 */}
          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Issue Date:</span> {formData.issueDate}
              </p>
            </div>
            <div className="text-center">
              <div className="border-b border-black mb-1 min-w-[200px] text-center">
                <span className="font-handwriting text-lg">{formData.registrarName}</span>
              </div>
              <p className="text-sm">{formData.registrarTitle}</p>
            </div>
          </div>

          {/* 页脚 */}
          <div className="mt-8 pt-2 text-xs text-center" style={{ borderTop: `1px solid ${formData.headerColor}` }}>
            <p>This transcript is not valid without the university seal and signature of the registrar.</p>
            <p>For verification, please contact the Office of the Registrar at {formData.universityContact}.</p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  )
}
