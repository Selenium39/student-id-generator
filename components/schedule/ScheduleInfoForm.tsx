"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash, Plus, Edit, School, Calendar, User, BookOpen } from "lucide-react"
import { HOUR_FORMAT_OPTIONS } from "@/lib/constants"
import type { ScheduleFormData, ScheduleCourse } from "@/lib/types"

interface ScheduleInfoFormProps {
  formData: ScheduleFormData
  onChange: (name: string, value: string | boolean | number | string[] | ScheduleCourse[]) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onAddCourse: () => void
  onEditCourse: (courseId: string) => void
  onDeleteCourse: (courseId: string) => void
}

export default function ScheduleInfoForm({
  formData,
  onChange,
  onFileChange,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}: ScheduleInfoFormProps) {
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

  // Get course mode badge color
  const getModeColor = (mode: string) => {
    switch (mode) {
      case "In-Person":
        return "bg-green-100 text-green-800 border-green-200"
      case "Online":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get course type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lecture":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Seminar":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Lab":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "Tutorial":
        return "bg-rose-100 text-rose-800 border-rose-200"
      case "Workshop":
        return "bg-emerald-100 text-emerald-200 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universityName">University Name</Label>
              <Input
                id="universityName"
                name="universityName"
                value={formData.universityName}
                onChange={(e) => onChange("universityName", e.target.value)}
                placeholder="Enter university name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="universityLogo">University Logo</Label>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  type="file"
                  id="universityLogo"
                  name="universityLogo"
                  accept="image/*"
                  onChange={(e) => onFileChange && onFileChange(e, "universityLogo")}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={formData.universityLogo || "/placeholder.svg"}
                      alt="University Logo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Label
                      htmlFor="universityLogo"
                      className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                    >
                      Select Logo
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">Upload school or organization logo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department/School</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={(e) => onChange("department", e.target.value)}
                placeholder="Enter department or school name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Student Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                placeholder="Enter student name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={(e) => onChange("studentId", e.target.value)}
                placeholder="Enter student ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                name="major"
                value={formData.major}
                onChange={(e) => onChange("major", e.target.value)}
                placeholder="Enter major"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={(e) => onChange("academicYear", e.target.value)}
                placeholder="e.g., 2023-2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Input
                id="term"
                name="term"
                value={formData.term}
                onChange={(e) => onChange("term", e.target.value)}
                placeholder="e.g., Fall 2023"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleTitle">Schedule Title</Label>
              <Input
                id="scheduleTitle"
                name="scheduleTitle"
                value={formData.scheduleTitle}
                onChange={(e) => onChange("scheduleTitle", e.target.value)}
                placeholder="Enter schedule title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourFormat">Time Format</Label>
              <Select value={formData.hourFormat} onValueChange={(value) => onChange("hourFormat", value)}>
                <SelectTrigger id="hourFormat">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  {HOUR_FORMAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Options */}
      <Card>
        <CardHeader>
          <CardTitle>Display Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showWeekends">Show Weekends</Label>
              <Switch
                id="showWeekends"
                checked={formData.showWeekends}
                onCheckedChange={(checked) => onChange("showWeekends", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showInstructors">Show Instructors</Label>
              <Switch
                id="showInstructors"
                checked={formData.showInstructors}
                onCheckedChange={(checked) => onChange("showInstructors", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showLocations">Show Locations</Label>
              <Switch
                id="showLocations"
                checked={formData.showLocations}
                onCheckedChange={(checked) => onChange("showLocations", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showCourseType">Show Course Type</Label>
              <Switch
                id="showCourseType"
                checked={formData.showCourseType}
                onCheckedChange={(checked) => onChange("showCourseType", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showCredits">Show Credits</Label>
              <Switch
                id="showCredits"
                checked={formData.showCredits}
                onCheckedChange={(checked) => onChange("showCredits", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showNotes">Show Notes</Label>
              <Switch
                id="showNotes"
                checked={formData.showNotes}
                onCheckedChange={(checked) => onChange("showNotes", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Information</CardTitle>
          <Button variant="outline" size="sm" onClick={onAddCourse}>
            <Plus className="mr-1 h-4 w-4" />
            Add Course
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.courses.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No courses yet, please click "Add Course" to add</div>
          ) : (
            <div className="space-y-4">
              {formData.courses.map((course, index) => (
                <div key={course.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-lg">{course.courseName || "Unnamed Course"}</h4>
                        <p className="text-sm text-muted-foreground">{course.courseCode}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEditCourse(course.id)}>
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteCourse(course.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.instructor || "No instructor information"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {course.building} {course.room ? `${course.room}` : ""}
                        {!course.building && !course.room && course.location ? course.location : ""}
                        {!course.building && !course.room && !course.location && "No location information"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {course.days.join(", ")}{" "}
                        {course.startTime && course.endTime
                          ? `${formatTime(course.startTime)} - ${formatTime(course.endTime)}`
                          : "No time information"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <Badge variant="outline" className={getModeColor(course.mode)}>
                          {course.mode}
                        </Badge>
                        <Badge variant="outline" className={getTypeColor(course.type)}>
                          {course.type}
                        </Badge>
                        {formData.showCredits && <Badge variant="outline">{course.credits} Credits</Badge>}
                      </div>
                    </div>
                  </div>

                  {course.notes && formData.showNotes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Notes:</span> {course.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
