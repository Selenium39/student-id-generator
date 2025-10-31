"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { BORDER_STYLE_OPTIONS, FONT_FAMILY_OPTIONS } from "@/lib/constants"
import type { AdmissionLetterDesignFormProps } from "@/lib/types"

/**
 * Admission Letter Design Form Component
 */
export default function AdmissionLetterDesignForm({
  formData,
  formErrors,
  onChange,
  onSubmit,
}: AdmissionLetterDesignFormProps) {
  // Handle slider changes
  const handleSliderChange = (name: string, value: number[]) => {
    onChange({
      target: {
        name,
        value: value[0].toString(),
        type: "range",
      },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-6">
        {/* Color Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Color Settings</CardTitle>
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
                    onChange={onChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={formData.headerColor}
                    onChange={onChange}
                    name="headerColor"
                    className="flex-1"
                  />
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
                    onChange={onChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={formData.textColor}
                    onChange={onChange}
                    name="textColor"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="accentColor"
                    name="accentColor"
                    type="color"
                    value={formData.accentColor}
                    onChange={onChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={formData.accentColor}
                    onChange={onChange}
                    name="accentColor"
                    className="flex-1"
                  />
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
                    onChange={onChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={formData.paperColor}
                    onChange={onChange}
                    name="paperColor"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                name="fontFamily"
                value={formData.fontFamily}
                onValueChange={(value) => onChange({ target: { name: "fontFamily", value } })}
              >
                <SelectTrigger>
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
          </CardContent>
        </Card>

        {/* Watermark Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Watermark Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableWatermark"
                name="enableWatermark"
                checked={formData.enableWatermark}
                onCheckedChange={(checked) =>
                  onChange({
                    target: {
                      name: "enableWatermark",
                      value: checked,
                      type: "checkbox",
                      checked,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Label htmlFor="enableWatermark">Enable Watermark</Label>
            </div>

            {formData.enableWatermark && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="watermarkText">Watermark Text</Label>
                  <Input
                    id="watermarkText"
                    name="watermarkText"
                    value={formData.watermarkText}
                    onChange={onChange}
                    placeholder="e.g., OFFICIAL DOCUMENT"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="watermarkColor">Watermark Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="watermarkColor"
                        name="watermarkColor"
                        type="color"
                        value={formData.watermarkColor}
                        onChange={onChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.watermarkColor}
                        onChange={onChange}
                        name="watermarkColor"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="watermarkOpacity">Watermark Opacity: {formData.watermarkOpacity}%</Label>
                    <Slider
                      id="watermarkOpacity"
                      min={1}
                      max={20}
                      step={1}
                      value={[Number(formData.watermarkOpacity)]}
                      onValueChange={(value) => handleSliderChange("watermarkOpacity", value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="watermarkSize">Watermark Size: {formData.watermarkSize}px</Label>
                    <Slider
                      id="watermarkSize"
                      min={8}
                      max={24}
                      step={1}
                      value={[Number(formData.watermarkSize)]}
                      onValueChange={(value) => handleSliderChange("watermarkSize", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="watermarkAngle">Watermark Angle: {formData.watermarkAngle}°</Label>
                    <Slider
                      id="watermarkAngle"
                      min={-45}
                      max={45}
                      step={5}
                      value={[Number(formData.watermarkAngle)]}
                      onValueChange={(value) => handleSliderChange("watermarkAngle", value)}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Border Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Border Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableBorder"
                name="enableBorder"
                checked={formData.enableBorder}
                onCheckedChange={(checked) =>
                  onChange({
                    target: {
                      name: "enableBorder",
                      value: checked,
                      type: "checkbox",
                      checked,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Label htmlFor="enableBorder">Enable Border</Label>
            </div>

            {formData.enableBorder && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borderColor">Border Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borderColor"
                      name="borderColor"
                      type="color"
                      value={formData.borderColor}
                      onChange={onChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={formData.borderColor}
                      onChange={onChange}
                      name="borderColor"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderStyle">Border Style</Label>
                  <Select
                    name="borderStyle"
                    value={formData.borderStyle}
                    onValueChange={(value) => onChange({ target: { name: "borderStyle", value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select border style" />
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
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
              Reset
            </Button>
            <Button type="submit">Preview</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
