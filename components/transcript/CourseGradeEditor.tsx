"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GRADE_OPTIONS, SEMESTER_OPTIONS } from "@/lib/constants"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { TranscriptCourse } from "@/lib/types"

interface CourseGradeEditorProps {
  courses: TranscriptCourse[]
  onChange: (courses: TranscriptCourse[]) => void
}

/**
 * 课程成绩编辑器组件
 */
export default function CourseGradeEditor({ courses, onChange }: CourseGradeEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<TranscriptCourse | null>(null)
  const [courseCode, setCourseCode] = useState("")
  const [courseName, setCourseName] = useState("")
  const [credits, setCredits] = useState(3)
  const [grade, setGrade] = useState("A")
  const [semester, setSemester] = useState("Fall")
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear() + "-" + (new Date().getFullYear() + 1))
  const [completed, setCompleted] = useState(true)

  // 重置表单
  const resetForm = () => {
    setEditingCourse(null)
    setCourseCode("")
    setCourseName("")
    setCredits(3)
    setGrade("A")
    setSemester("Fall")
    setAcademicYear(new Date().getFullYear() + "-" + (new Date().getFullYear() + 1))
    setCompleted(true)
  }

  // 打开编辑对话框
  const openEditDialog = (course: TranscriptCourse) => {
    setEditingCourse(course)
    setCourseCode(course.courseCode)
    setCourseName(course.courseName)
    setCredits(course.credits)
    setGrade(course.grade)
    setSemester(course.semester)
    setAcademicYear(course.academicYear)
    setCompleted(course.completed)
    setIsDialogOpen(true)
  }

  // 添加或更新课程
  const handleSaveCourse = () => {
    const newCourse: TranscriptCourse = {
      id: editingCourse ? editingCourse.id : Date.now().toString(),
      courseCode,
      courseName,
      credits,
      grade,
      semester,
      academicYear,
      completed,
    }

    let updatedCourses: TranscriptCourse[]

    if (editingCourse) {
      // 更新现有课程
      updatedCourses = courses.map((course) => (course.id === editingCourse.id ? newCourse : course))
    } else {
      // 添加新课程
      updatedCourses = [...courses, newCourse]
    }

    // 按学年和学期排序
    updatedCourses.sort((a, b) => {
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

    onChange(updatedCourses)
    setIsDialogOpen(false)
    resetForm()
  }

  // 删除课程
  const handleDeleteCourse = (id: string) => {
    const updatedCourses = courses.filter((course) => course.id !== id)
    onChange(updatedCourses)
  }

  // Mock formData for demonstration purposes.  In a real application,
  // this data would likely come from a more persistent source or be
  // calculated dynamically.
  const formData = {
    totalCredits: 120,
    completedCredits: 60,
    currentGPA: 3.5,
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">课程列表</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <Plus className="h-4 w-4 mr-1" /> 添加课程
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCourse ? "编辑课程" : "添加课程"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseCode" className="mb-2 block">
                    课程代码
                  </Label>
                  <Input
                    id="courseCode"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="例如: CS101"
                  />
                </div>
                <div>
                  <Label htmlFor="credits" className="mb-2 block">
                    学分
                  </Label>
                  <Input
                    id="credits"
                    type="number"
                    min="0"
                    step="0.5"
                    value={credits}
                    onChange={(e) => setCredits(Number.parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="courseName" className="mb-2 block">
                  课程名称
                </Label>
                <Input
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="例如: Introduction to Computer Science"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="semester" className="mb-2 block">
                    学期
                  </Label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择学期" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEMESTER_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="academicYear" className="mb-2 block">
                    学年
                  </Label>
                  <Input
                    id="academicYear"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="例如: 2023-2024"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade" className="mb-2 block">
                    成绩
                  </Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择成绩" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch id="completed" checked={completed} onCheckedChange={setCompleted} />
                  <Label htmlFor="completed">已完成</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveCourse}>保存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>课程代码</TableHead>
              <TableHead>课程名称</TableHead>
              <TableHead>学分</TableHead>
              <TableHead>成绩</TableHead>
              <TableHead>学期</TableHead>
              <TableHead>学年</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  暂无课程数据，请点击"添加课程"按钮添加
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.grade}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.academicYear}</TableCell>
                  <TableCell>{course.completed ? "已完成" : "进行中"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(course)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium">总学分</div>
          <div className="text-2xl font-bold">{formData.totalCredits}</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium">已完成学分</div>
          <div className="text-2xl font-bold">{formData.completedCredits}</div>
        </div>
        <div className="border rounded-md p-4">
          <div className="text-sm font-medium">当前GPA</div>
          <div className="text-2xl font-bold">{formData.currentGPA}</div>
        </div>
      </div>
    </div>
  )
}
