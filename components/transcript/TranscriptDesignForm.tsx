"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FONT_FAMILY_OPTIONS, BORDER_STYLE_OPTIONS } from "@/lib/constants"
import type { TranscriptFormData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TranscriptDesignFormProps {
  formData: TranscriptFormData
  onChange: (name: string, value: string | boolean | number) => void
}

/**
 * 成绩单设计表单组件
 */
export default function TranscriptDesignForm({ formData, onChange }: TranscriptDesignFormProps) {
  return (
    <>
      {/* 颜色和字体设置 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>颜色和字体设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headerColor">标题颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="headerColor"
                  name="headerColor"
                  type="color"
                  value={formData.headerColor}
                  onChange={(e) => onChange("headerColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.headerColor}
                  onChange={(e) => onChange("headerColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tableHeaderColor">表头颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tableHeaderColor"
                  name="tableHeaderColor"
                  type="color"
                  value={formData.tableHeaderColor}
                  onChange={(e) => onChange("tableHeaderColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.tableHeaderColor}
                  onChange={(e) => onChange("tableHeaderColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="textColor">文本颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="textColor"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="accentColor">强调颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="accentColor"
                  name="accentColor"
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => onChange("accentColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.accentColor}
                  onChange={(e) => onChange("accentColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="paperColor">背景颜色</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="paperColor"
                  name="paperColor"
                  type="color"
                  value={formData.paperColor}
                  onChange={(e) => onChange("paperColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.paperColor}
                  onChange={(e) => onChange("paperColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fontFamily">字体</Label>
              <Select value={formData.fontFamily} onValueChange={(value) => onChange("fontFamily", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择字体" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILY_OPTIONS.map((option) => (
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

      {/* 水印设置 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>水印设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableWatermark">启用水印</Label>
              <Switch
                id="enableWatermark"
                checked={formData.enableWatermark}
                onCheckedChange={(checked) => onChange("enableWatermark", checked)}
              />
            </div>
            {formData.enableWatermark && (
              <>
                <div>
                  <Label htmlFor="watermarkText">水印文本</Label>
                  <Input
                    id="watermarkText"
                    name="watermarkText"
                    value={formData.watermarkText}
                    onChange={(e) => onChange("watermarkText", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="watermarkColor">水印颜色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="watermarkColor"
                      name="watermarkColor"
                      type="color"
                      value={formData.watermarkColor}
                      onChange={(e) => onChange("watermarkColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      value={formData.watermarkColor}
                      onChange={(e) => onChange("watermarkColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="watermarkOpacity">水印透明度 ({formData.watermarkOpacity}%)</Label>
                  <Input
                    id="watermarkOpacity"
                    name="watermarkOpacity"
                    type="range"
                    min="1"
                    max="20"
                    value={formData.watermarkOpacity}
                    onChange={(e) => onChange("watermarkOpacity", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="watermarkSize">水印大小</Label>
                  <Input
                    id="watermarkSize"
                    name="watermarkSize"
                    type="range"
                    min="8"
                    max="24"
                    value={formData.watermarkSize}
                    onChange={(e) => onChange("watermarkSize", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="watermarkAngle">水印角度</Label>
                  <Input
                    id="watermarkAngle"
                    name="watermarkAngle"
                    type="range"
                    min="-45"
                    max="45"
                    value={formData.watermarkAngle}
                    onChange={(e) => onChange("watermarkAngle", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 边框设置 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>边框设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableBorder">启用边框</Label>
              <Switch
                id="enableBorder"
                checked={formData.enableBorder}
                onCheckedChange={(checked) => onChange("enableBorder", checked)}
              />
            </div>
            {formData.enableBorder && (
              <>
                <div>
                  <Label htmlFor="borderColor">边框颜色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borderColor"
                      name="borderColor"
                      type="color"
                      value={formData.borderColor}
                      onChange={(e) => onChange("borderColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      value={formData.borderColor}
                      onChange={(e) => onChange("borderColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="borderStyle">边框样式</Label>
                  <Select value={formData.borderStyle} onValueChange={(value) => onChange("borderStyle", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择边框样式" />
                    </SelectTrigger>
                    <SelectContent>
                      {BORDER_STYLE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 显示选项 */}
      <Card>
        <CardHeader>
          <CardTitle>显示选项</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showStudentPhoto">显示学生照片</Label>
              <Switch
                id="showStudentPhoto"
                checked={formData.showStudentPhoto}
                onCheckedChange={(checked) => onChange("showStudentPhoto", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showGradePoints">显示绩点</Label>
              <Switch
                id="showGradePoints"
                checked={formData.showGradePoints}
                onCheckedChange={(checked) => onChange("showGradePoints", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showGradeScale">显示成绩等级说明</Label>
              <Switch
                id="showGradeScale"
                checked={formData.showGradeScale}
                onCheckedChange={(checked) => onChange("showGradeScale", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showSemesterGPA">显示学期GPA</Label>
              <Switch
                id="showSemesterGPA"
                checked={formData.showSemesterGPA}
                onCheckedChange={(checked) => onChange("showSemesterGPA", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
