"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DAYS_OF_WEEK_OPTIONS, COURSE_MODE_OPTIONS, COURSE_TYPE_OPTIONS, COURSE_COLOR_OPTIONS } from "@/lib/constants"
import type { ScheduleCourse } from "@/lib/types"

interface CourseEditorProps {
  course: ScheduleCourse
  onUpdate: (updatedCourse: ScheduleCourse) => void
  onCancel: () => void
}

export default function CourseEditor({ course, onUpdate, onCancel }: CourseEditorProps) {
  const [editedCourse, setEditedCourse] = useState<ScheduleCourse>({ ...course })

  // Handle input changes
  const handleInputChange = (field: keyof ScheduleCourse, value: string | number) => {
    setEditedCourse((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle day of week multi-select
  const handleDayChange = (day: string) => {
    const currentDays = [...editedCourse.days]
    const index = currentDays.indexOf(day)

    if (index === -1) {
      // Add day
      setEditedCourse((prev) => ({
        ...prev,
        days: [...prev.days, day],
      }))
    } else {
      // Remove day
      setEditedCourse((prev) => ({
        ...prev,
        days: prev.days.filter((d) => d !== day),
      }))
    }
  }

  // Save course
  const handleSave = () => {
    onUpdate(editedCourse)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Edit Course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              value={editedCourse.courseName}
              onChange={(e) => handleInputChange("courseName", e.target.value)}
              placeholder="Enter course name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              value={editedCourse.courseCode}
              onChange={(e) => handleInputChange("courseCode", e.target.value)}
              placeholder="Enter course code"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              value={editedCourse.instructor}
              onChange={(e) => handleInputChange("instructor", e.target.value)}
              placeholder="Enter instructor name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Input
              id="credits"
              type="number"
              value={editedCourse.credits}
              onChange={(e) => handleInputChange("credits", Number(e.target.value))}
              placeholder="Enter credits"
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="building">Building</Label>
            <Input
              id="building"
              value={editedCourse.building}
              onChange={(e) => handleInputChange("building", e.target.value)}
              placeholder="Enter building name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={editedCourse.room}
              onChange={(e) => handleInputChange("room", e.target.value)}
              placeholder="Enter room number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Other Location</Label>
            <Input
              id="location"
              value={editedCourse.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Enter other location information"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={editedCourse.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={editedCourse.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">Teaching Mode</Label>
            <Select value={editedCourse.mode} onValueChange={(value) => handleInputChange("mode", value)}>
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select teaching mode" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_MODE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Course Type</Label>
            <Select value={editedCourse.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select course type" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Course Color</Label>
            <Select value={editedCourse.color} onValueChange={(value) => handleInputChange("color", value)}>
              <SelectTrigger id="color">
                <SelectValue placeholder="Select course color" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: option.value }} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Class Days</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {DAYS_OF_WEEK_OPTIONS.map((day) => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`day-${day.value}`}
                  checked={editedCourse.days.includes(day.value)}
                  onCheckedChange={() => handleDayChange(day.value)}
                />
                <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={editedCourse.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Enter course notes"
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Course</Button>
      </CardFooter>
    </Card>
  )
}
