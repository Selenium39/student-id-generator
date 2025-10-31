"use client"

import { useState } from "react"

import type React from "react"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EXPORT_QUALITY_OPTIONS, DAYS_OF_WEEK_OPTIONS } from "@/lib/constants"
import { Download } from "lucide-react"
import Image from "next/image"
import type { ScheduleFormData, ScheduleCourse } from "@/lib/types"

interface SchedulePreviewProps {
  formData: ScheduleFormData
  onChange: (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onDownload?: (quality: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

export default function SchedulePreview({
  formData,
  onChange,
  onFileChange,
  onDownload,
  previewRef,
}: SchedulePreviewProps) {
  // Export quality
  const [exportQuality, setExportQuality] = useState<string>(formData.pngQuality || "high")
  // Current preview mode
  const [previewMode, setPreviewMode] = useState<"weekly" | "compact">("weekly")

  // Watermark canvas reference
  const watermarkCanvasRef = useRef<HTMLCanvasElement>(null)

  // Draw watermark
  useEffect(() => {
    if (formData.enableWatermark && watermarkCanvasRef.current) {
      const canvas = watermarkCanvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set watermark text style
        ctx.font = `${formData.watermarkSize}px ${formData.fontFamily}`
        ctx.fillStyle = formData.watermarkColor
        ctx.globalAlpha = formData.watermarkOpacity / 100

        // Rotate canvas
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((Number.parseInt(formData.watermarkAngle, 10) * Math.PI) / 180)

        // Calculate watermark text size
        const textWidth = ctx.measureText(formData.watermarkText).width

        // Draw watermark text
        for (let x = -canvas.width; x < canvas.width; x += textWidth + 50) {
          for (let y = -canvas.height; y < canvas.height; y += 60) {
            ctx.fillText(formData.watermarkText, x, y)
          }
        }

        // Restore canvas
        ctx.restore()
      }
    }
  }, [
    formData.enableWatermark,
    formData.watermarkText,
    formData.watermarkColor,
    formData.watermarkOpacity,
    formData.watermarkSize,
    formData.watermarkAngle,
    formData.fontFamily,
  ])

  // Handle download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(exportQuality)
    }
  }

  // Format time
  const formatTime = (time: string) => {
    if (!time) return ""

    if (formData.hourFormat === "12h") {
      const [hours, minutes] = time.split(":").map(Number)
      const period = hours >= 12 ? "PM" : "AM"
      const hour12 = hours % 12 || 12
      return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
    }

    return time
  }

  // Get displayed days of week
  const getDisplayDays = () => {
    let days = [...DAYS_OF_WEEK_OPTIONS]

    if (!formData.showWeekends) {
      days = days.filter((day) => day.value !== "Saturday" && day.value !== "Sunday")
    }

    return days
  }

  // Check if course is on specific day
  const isCourseOnDay = (course: ScheduleCourse, day: string) => {
    return course.days.includes(day)
  }

  // Get course cell style
  const getCourseStyle = (course: ScheduleCourse) => {
    return {
      backgroundColor: course.color,
      color: "#ffffff",
      borderRadius: "4px",
      padding: "8px",
      height: "100%",
      overflow: "hidden",
    }
  }

  // Render weekly view
  const renderWeeklyView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="border p-2 text-center"
                style={{
                  backgroundColor: formData.tableHeaderColor,
                  borderColor: formData.borderColor,
                }}
              >
                Time / Day
              </th>
              {getDisplayDays().map((day) => (
                <th
                  key={day.value}
                  className="border p-2 text-center"
                  style={{
                    backgroundColor: formData.tableHeaderColor,
                    borderColor: formData.borderColor,
                  }}
                >
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: formData.endHour - formData.startHour }, (_, i) => {
              const hour = i + formData.startHour
              const timeString = `${hour}:00`
              const displayTime = formatTime(timeString)

              return (
                <tr key={timeString}>
                  <td className="border p-2 text-center" style={{ borderColor: formData.borderColor }}>
                    {displayTime}
                  </td>
                  {getDisplayDays().map((day) => {
                    const coursesOnDay = formData.courses.filter((course) => {
                      if (!isCourseOnDay(course, day.value)) return false

                      if (!course.startTime || !course.endTime) return false

                      const [startHour, startMinute] = course.startTime.split(":").map(Number)
                      const [endHour, endMinute] = course.endTime.split(":").map(Number)

                      const courseStartHour = startHour
                      const courseEndHour = endHour

                      return hour >= courseStartHour && hour < courseEndHour
                    })

                    return (
                      <td
                        key={`${day.value}-${timeString}`}
                        className="border p-0"
                        style={{ borderColor: formData.borderColor }}
                      >
                        {coursesOnDay.map((course) => {
                          const [startHour, startMinute] = course.startTime?.split(":").map(Number) || [0, 0]
                          const courseStartHour = startHour

                          // Only render the course once at its start time
                          if (courseStartHour === hour) {
                            return (
                              <div key={course.id} className="p-1" style={getCourseStyle(course)}>
                                <div className="font-semibold">{course.courseName}</div>
                                <div className="text-xs">
                                  {course.courseCode && <span>{course.courseCode}</span>}

                                  {formData.showInstructors && course.instructor && <span> | {course.instructor}</span>}

                                  {formData.showLocations && (course.building || course.room || course.location) && (
                                    <span>
                                      {" "}
                                      | {course.building} {course.room}{" "}
                                      {!course.building && !course.room ? course.location : ""}
                                    </span>
                                  )}

                                  {formData.showCourseType && course.type && <span> | {course.type}</span>}
                                </div>
                              </div>
                            )
                          }
                          return null
                        })}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Render compact view
  const renderCompactView = () => {
    return (
      <div className="space-y-4">
        {formData.courses.length === 0 ? (
          <div className="text-center py-4">No courses added yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {formData.courses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-lg"
                style={{ backgroundColor: course.color, color: "#ffffff" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{course.courseName}</h3>
                    <p className="text-sm opacity-90">{course.courseCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{course.days.join(", ")}</p>
                    <p className="text-sm">
                      {course.startTime && course.endTime
                        ? `${formatTime(course.startTime)} - ${formatTime(course.endTime)}`
                        : "No time specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {formData.showInstructors && (
                    <div>
                      <span className="opacity-80">Instructor:</span> {course.instructor || "N/A"}
                    </div>
                  )}

                  {formData.showLocations && (
                    <div>
                      <span className="opacity-80">Location:</span>{" "}
                      {course.building ? `${course.building} ${course.room}` : course.location || "N/A"}
                    </div>
                  )}

                  {formData.showCourseType && (
                    <div>
                      <span className="opacity-80">Type:</span> {course.type}
                    </div>
                  )}

                  {formData.showCredits && (
                    <div>
                      <span className="opacity-80">Credits:</span> {course.credits}
                    </div>
                  )}
                </div>

                {formData.showNotes && course.notes && (
                  <div className="mt-2 text-sm">
                    <span className="opacity-80">Notes:</span> {course.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as "weekly" | "compact")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="compact">Compact View</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            {/* Watermark Canvas */}
            {formData.enableWatermark && (
              <canvas
                ref={watermarkCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                width={800}
                height={600}
              />
            )}

            {/* Schedule Preview */}
            <div
              ref={previewRef}
              className="schedule-container relative bg-white p-6 rounded-lg shadow-sm"
              style={{
                backgroundColor: formData.paperColor,
                color: formData.textColor,
                fontFamily: formData.fontFamily,
              }}
            >
              {/* Title Area */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  {formData.universityLogo && (
                    <div className="mr-3">
                      <Image
                        src={formData.universityLogo || "/placeholder.svg"}
                        alt="University Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h1 className="text-2xl font-bold" style={{ color: formData.headerColor }}>
                    {formData.scheduleTitle}
                  </h1>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-semibold">University:</span> {formData.universityName}
                  </p>
                  <p>
                    <span className="font-semibold">Student:</span> {formData.fullName} ({formData.studentId})
                  </p>
                  <p>
                    <span className="font-semibold">Department/Major:</span> {formData.department} / {formData.major}
                  </p>
                  <p>
                    <span className="font-semibold">Term:</span> {formData.term} - {formData.academicYear}
                  </p>
                </div>
              </div>

              {/* Render different views based on preview mode */}
              {previewMode === "weekly" ? renderWeeklyView() : renderCompactView()}

              {/* Course Legend */}
              {formData.courses.length > 0 && previewMode === "weekly" && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Course Legend</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {formData.courses.map((course) => (
                      <div key={course.id} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.color }}></div>
                        <span>
                          {course.courseCode}: {course.courseName}
                          {formData.showCredits &&
                            ` (${course.credits} ${course.credits === 1 ? "Credit" : "Credits"})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {formData.showNotes && formData.courses.some((c) => c.notes) && previewMode === "weekly" && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {formData.courses
                      .filter((c) => c.notes)
                      .map((course) => (
                        <li key={course.id}>
                          <span className="font-medium">{course.courseCode}:</span> {course.notes}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Select value={exportQuality} onValueChange={setExportQuality}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select export quality" />
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
          Download Schedule
        </Button>
      </CardFooter>
    </Card>
  )
}
