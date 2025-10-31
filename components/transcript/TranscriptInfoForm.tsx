"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEGREE_TYPE_OPTIONS } from "@/lib/constants"
import CourseGradeEditor from "./CourseGradeEditor"
import type { TranscriptFormData, TranscriptCourse } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TranscriptInfoFormProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
  onCoursesChange: (courses: TranscriptCourse[]) => void
}

/**
 * 成绩单信息表单组件
 */
export default function TranscriptInfoForm({
  formData,
  onChange,
  onFileChange,
  onCoursesChange,
}: TranscriptInfoFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  // 处理Logo上传
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      if (onFileChange) {
        onFileChange(e, "universityLogo")
      }
    }
  }

  // 处理照片上传
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      if (onFileChange) {
        onFileChange(e, "studentPhoto")
      }
    }
  }

  return (
    <>
      {/* 大学信息 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>大学信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universityName">
                大学名称
              </Label>
              <Input
                id="universityName"
                name="universityName"
                value={formData.universityName}
                onChange={(e) => onChange("universityName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityLogo">
                大学标志
              </Label>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  type="file"
                  id="universityLogo"
                  name="universityLogo"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={formData.universityLogo || "/placeholder.svg"}
                      alt="学校Logo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Label
                      htmlFor="universityLogo"
                      className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                    >
                      选择Logo
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">上传学校或组织的Logo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityAddress">
                大学地址
              </Label>
              <Input
                id="universityAddress"
                name="universityAddress"
                value={formData.universityAddress}
                onChange={(e) => onChange("universityAddress", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityContact">
                联系电话
              </Label>
              <Input
                id="universityContact"
                name="universityContact"
                value={formData.universityContact}
                onChange={(e) => onChange("universityContact", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityWebsite">
                网站
              </Label>
              <Input
                id="universityWebsite"
                name="universityWebsite"
                value={formData.universityWebsite}
                onChange={(e) => onChange("universityWebsite", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 学生信息 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>学生信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">
                学生姓名
              </Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={(e) => onChange("studentName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">
                学生ID
              </Label>
              <Input
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={(e) => onChange("studentId", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="programName">
                专业名称
              </Label>
              <Input
                id="programName"
                name="programName"
                value={formData.programName}
                onChange={(e) => onChange("programName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departmentName">
                院系名称
              </Label>
              <Input
                id="departmentName"
                name="departmentName"
                value={formData.departmentName}
                onChange={(e) => onChange("departmentName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degreeType">
                学位类型
              </Label>
              <Select value={formData.degreeType} onValueChange={(value) => onChange("degreeType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择学位类型" />
                </SelectTrigger>
                <SelectContent>
                  {DEGREE_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">
                入学日期
              </Label>
              <Input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => onChange("enrollmentDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedGraduationDate">
                预计毕业日期
              </Label>
              <Input
                id="expectedGraduationDate"
                name="expectedGraduationDate"
                type="date"
                value={formData.expectedGraduationDate}
                onChange={(e) => onChange("expectedGraduationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentPhoto">
                学生照片
              </Label>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  type="file"
                  id="studentPhoto"
                  name="studentPhoto"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <div className="w-16 h-16 border rounded overflow-hidden">
                    <img
                      src={formData.studentPhoto || "/placeholder.svg"}
                      alt="学生照片"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Label
                      htmlFor="studentPhoto"
                      className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                    >
                      选择照片
                    </Label>
                    <p className="text-xs text-gray-500 mt-2">上传学生照片</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 签发信息 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>签发信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">
                签发日期
              </Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => onChange("issueDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrarName">
                教务长姓名
              </Label>
              <Input
                id="registrarName"
                name="registrarName"
                value={formData.registrarName}
                onChange={(e) => onChange("registrarName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrarTitle">
                教务长职位
              </Label>
              <Input
                id="registrarTitle"
                name="registrarTitle"
                value={formData.registrarTitle}
                onChange={(e) => onChange("registrarTitle", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 课程和成绩信息 */}
      <Card>
        <CardHeader>
          <CardTitle>课程和成绩信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <CourseGradeEditor courses={formData.courses} onChange={onCoursesChange} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
