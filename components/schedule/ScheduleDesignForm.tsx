"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { FONT_FAMILY_OPTIONS } from "@/lib/constants"
import type { ScheduleFormData } from "@/lib/types"

interface ScheduleDesignFormProps {
  formData: ScheduleFormData
  onChange: (name: string, value: string | boolean | number) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

export default function ScheduleDesignForm({ formData, onChange, onFileChange }: ScheduleDesignFormProps) {
  return (
    <div className="space-y-6">
      {/* Time Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Time Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startHour">Start Time</Label>
              <Select
                value={formData.startHour.toString()}
                onValueChange={(value) => onChange("startHour", Number.parseInt(value, 10))}
              >
                <SelectTrigger id="startHour">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 6).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endHour">End Time</Label>
              <Select
                value={formData.endHour.toString()}
                onValueChange={(value) => onChange("endHour", Number.parseInt(value, 10))}
              >
                <SelectTrigger id="endHour">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 12).map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Options */}
      <Card>
        <CardHeader>
          <CardTitle>Design Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="headerColor">Header Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="headerColor"
                  name="headerColor"
                  type="color"
                  value={formData.headerColor}
                  onChange={(e) => onChange("headerColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.headerColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableHeaderColor">Table Header Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tableHeaderColor"
                  name="tableHeaderColor"
                  type="color"
                  value={formData.tableHeaderColor}
                  onChange={(e) => onChange("tableHeaderColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.tableHeaderColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="textColor"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.textColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="borderColor"
                  name="borderColor"
                  type="color"
                  value={formData.borderColor}
                  onChange={(e) => onChange("borderColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.borderColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperColor">Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="paperColor"
                  name="paperColor"
                  type="color"
                  value={formData.paperColor}
                  onChange={(e) => onChange("paperColor", e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm">{formData.paperColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select value={formData.fontFamily} onValueChange={(value) => onChange("fontFamily", value)}>
                <SelectTrigger id="fontFamily">
                  <SelectValue placeholder="Select font" />
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

      {/* Watermark Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Watermark Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enableWatermark">Enable Watermark</Label>
            <Switch
              id="enableWatermark"
              checked={formData.enableWatermark}
              onCheckedChange={(checked) => onChange("enableWatermark", checked)}
            />
          </div>

          {formData.enableWatermark && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="watermarkText">Watermark Text</Label>
                <Input
                  id="watermarkText"
                  name="watermarkText"
                  value={formData.watermarkText}
                  onChange={(e) => onChange("watermarkText", e.target.value)}
                  placeholder="Enter watermark text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkColor">Watermark Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="watermarkColor"
                    name="watermarkColor"
                    type="color"
                    value={formData.watermarkColor}
                    onChange={(e) => onChange("watermarkColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{formData.watermarkColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkOpacity">Watermark Opacity ({formData.watermarkOpacity}%)</Label>
                <Slider
                  id="watermarkOpacity"
                  min={1}
                  max={20}
                  step={1}
                  value={[formData.watermarkOpacity]}
                  onValueChange={(value) => onChange("watermarkOpacity", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkSize">Watermark Size</Label>
                <Input
                  id="watermarkSize"
                  name="watermarkSize"
                  type="number"
                  value={formData.watermarkSize}
                  onChange={(e) => onChange("watermarkSize", e.target.value)}
                  min="8"
                  max="36"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="watermarkAngle">Watermark Angle</Label>
                <Input
                  id="watermarkAngle"
                  name="watermarkAngle"
                  type="number"
                  value={formData.watermarkAngle}
                  onChange={(e) => onChange("watermarkAngle", e.target.value)}
                  min="-90"
                  max="90"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
