"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormComponentProps } from "@/lib/types"
import type { CertificateFormData } from "@/lib/types"
import {
  EXPORT_QUALITY_OPTIONS,
  FONT_FAMILY_OPTIONS,
  BORDER_STYLE_OPTIONS,
  PATTERN_TYPE_OPTIONS,
  PATTERN_POSITION_OPTIONS,
} from "@/lib/constants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CertificateDesignForm: React.FC<FormComponentProps> = ({ formData, onChange }) => {
  const data = formData as CertificateFormData

  const handleChange = (name: string, value: string | boolean) => {
    onChange(name, value)
  }

  // Handle slider value changes, it returns a number
  const handleSliderChange = (name: string, value: number) => {
    onChange(name, value.toString())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="watermark">Watermark Settings</TabsTrigger>
            <TabsTrigger value="pattern">Pattern Settings</TabsTrigger>
            <TabsTrigger value="border">Border Settings</TabsTrigger>
          </TabsList>

          {/* Basic Design Options */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paperColor">Paper Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="paperColor"
                    name="paperColor"
                    type="color"
                    value={data.paperColor}
                    onChange={(e) => handleChange("paperColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.paperColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headerColor">Header Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="headerColor"
                    name="headerColor"
                    type="color"
                    value={data.headerColor}
                    onChange={(e) => handleChange("headerColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.headerColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="textColor"
                    name="textColor"
                    type="color"
                    value={data.textColor}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <span className="text-sm">{data.textColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={data.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
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

              {/* Export Options */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pngQuality">Export Quality</Label>
                <Select value={data.pngQuality} onValueChange={(value) => handleChange("pngQuality", value)}>
                  <SelectTrigger id="pngQuality">
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
              </div>
            </div>
          </TabsContent>

          {/* Watermark Settings */}
          <TabsContent value="watermark" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableWatermark"
                checked={data.enableWatermark}
                onCheckedChange={(checked) => handleChange("enableWatermark", checked)}
              />
              <h3 className="text-lg font-medium">Enable Watermark</h3>
            </div>

            {data.enableWatermark && (
              <div>
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700 mb-4">
                  <p>Watermarks can enhance the security and formality of certificates. You can enable both line watermark and text watermark simultaneously.</p>
                </div>

                {/* Line Watermark Switch and Settings */}
                <div className="border rounded-md p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Line Watermark</h3>
                      <p className="text-xs text-gray-500 mt-1">Add diagonal line background watermark without interfering with main content</p>
                    </div>
                    <Switch
                      id="enableLineWatermark"
                      checked={data.enableWatermark && !data.watermarkText.includes("LINE_DISABLED")}
                      onCheckedChange={(checked) => {
                        // If enabling line watermark, ensure watermarkText doesn't contain LINE_DISABLED marker
                        // If disabling line watermark, add LINE_DISABLED marker
                        const currentText = data.watermarkText || ""
                        const newText = checked
                          ? currentText.replace("LINE_DISABLED", "").trim()
                          : (currentText + " LINE_DISABLED").trim()
                        handleChange("watermarkText", newText)
                      }}
                    />
                  </div>

                  {/* Line Watermark Specific Settings - Only shown when line watermark is enabled */}
                  {!data.watermarkText.includes("LINE_DISABLED") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="watermarkLineWidth">Line Width ({data.watermarkLineWidth}px)</Label>
                        <Slider
                          id="watermarkLineWidth"
                          min={1}
                          max={50}
                          step={1}
                          value={[Number.parseInt(data.watermarkLineWidth) || 20]}
                          onValueChange={(values) => handleSliderChange("watermarkLineWidth", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkSpacing">
                          Line Spacing ({Number.parseInt(data.watermarkLineWidth) * 2 || 40}px)
                        </Label>
                        <p className="text-xs text-gray-500">Line spacing is automatically calculated from line width</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkColor">Line Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="lineWatermarkColor"
                            name="watermarkColor"
                            type="color"
                            value={data.watermarkColor}
                            onChange={(e) => handleChange("watermarkColor", e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <span className="text-sm">{data.watermarkColor}</span>
                        </div>
                        <p className="text-xs text-gray-500">Recommend using light colors or colors similar to paper color</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkOpacity">Line Opacity ({data.watermarkOpacity}%)</Label>
                        <Slider
                          id="lineWatermarkOpacity"
                          min={1}
                          max={30}
                          step={1}
                          value={[data.watermarkOpacity]}
                          onValueChange={(values) => handleSliderChange("watermarkOpacity", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineWatermarkAngle">Line Angle ({data.watermarkAngle}°)</Label>
                        <Slider
                          id="lineWatermarkAngle"
                          min={-90}
                          max={90}
                          step={1}
                          value={[Number.parseInt(data.watermarkAngle) || -30]}
                          onValueChange={(values) => handleSliderChange("watermarkAngle", values[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Left Tilt</span>
                          <span>Vertical</span>
                          <span>Right Tilt</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Watermark Switch and Settings */}
                <div className="border rounded-md p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Text Watermark</h3>
                      <p className="text-xs text-gray-500 mt-1">Add repeated text watermark to enhance authority</p>
                    </div>
                    <Switch
                      id="enableTextWatermark"
                      checked={!!data.watermarkText && !data.watermarkText.match(/^\s*LINE_DISABLED\s*$/)}
                      onCheckedChange={(checked) => {
                        // When enabling text watermark, keep previously set text or use default value
                        // When disabling text watermark, clear text content
                        const isLineDisabled = data.watermarkText.includes("LINE_DISABLED")
                        if (checked) {
                          const textValue =
                            data.watermarkText.replace("LINE_DISABLED", "").trim() || "OFFICIAL DOCUMENT"
                          handleChange("watermarkText", isLineDisabled ? textValue + " LINE_DISABLED" : textValue)
                        } else {
                          handleChange("watermarkText", isLineDisabled ? "LINE_DISABLED" : "")
                        }
                      }}
                    />
                  </div>

                  {/* Text Watermark Specific Settings - Only shown when text watermark is enabled */}
                  {data.watermarkText && !data.watermarkText.match(/^\s*LINE_DISABLED\s*$/) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="watermarkText">Watermark Text</Label>
                        <Input
                          id="watermarkText"
                          name="watermarkText"
                          value={data.watermarkText.replace("LINE_DISABLED", "").trim()}
                          onChange={(e) => {
                            const isLineDisabled = data.watermarkText.includes("LINE_DISABLED")
                            handleChange(
                              "watermarkText",
                              isLineDisabled ? e.target.value + " LINE_DISABLED" : e.target.value,
                            )
                          }}
                          placeholder="e.g., VERIFIED, AUTHENTIC, OFFICIAL DOCUMENT"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermarkSize">Text Size ({data.watermarkSize}px)</Label>
                        <Slider
                          id="watermarkSize"
                          min={8}
                          max={64}
                          step={1}
                          value={[Number.parseInt(data.watermarkSize) || 14]}
                          onValueChange={(values) => handleSliderChange("watermarkSize", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkColor">Text Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="textWatermarkColor"
                            name="watermarkColor"
                            type="color"
                            value={data.watermarkColor}
                            onChange={(e) => handleChange("watermarkColor", e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <span className="text-sm">{data.watermarkColor}</span>
                        </div>
                        <p className="text-xs text-gray-500">Recommend using light colors or colors similar to paper color</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkOpacity">Text Opacity ({data.watermarkOpacity}%)</Label>
                        <Slider
                          id="textWatermarkOpacity"
                          min={1}
                          max={30}
                          step={1}
                          value={[data.watermarkOpacity]}
                          onValueChange={(values) => handleSliderChange("watermarkOpacity", values[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textWatermarkAngle">Text Angle ({data.watermarkAngle}°)</Label>
                        <Slider
                          id="textWatermarkAngle"
                          min={-90}
                          max={90}
                          step={1}
                          value={[Number.parseInt(data.watermarkAngle) || -30]}
                          onValueChange={(values) => handleSliderChange("watermarkAngle", values[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Left Tilt</span>
                          <span>Vertical</span>
                          <span>Right Tilt</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2 border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Watermark Application Tips:</h3>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Text watermark is suitable for more important certificates to increase authority</li>
                    <li>Line watermark is suitable as a background element without interfering with main content</li>
                    <li>Watermark color should be similar to background color, opacity between 5-15% works best</li>
                    <li>Adjusting watermark angle can make it look more natural, generally recommend -30° to -45°</li>
                    <li>Both watermarks can be used simultaneously, but be careful not to block main content</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Pattern Settings */}
          <TabsContent value="pattern" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enablePattern"
                checked={data.enablePattern}
                onCheckedChange={(checked) => handleChange("enablePattern", checked)}
              />
              <h3 className="text-lg font-medium">Enable Decorative Pattern</h3>
            </div>

            {data.enablePattern && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="patternType">Pattern Type</Label>
                  <Select value={data.patternType} onValueChange={(value) => handleChange("patternType", value)}>
                    <SelectTrigger id="patternType">
                      <SelectValue placeholder="Select pattern type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternPosition">Pattern Position</Label>
                  <Select
                    value={data.patternPosition}
                    onValueChange={(value) => handleChange("patternPosition", value)}
                  >
                    <SelectTrigger id="patternPosition">
                      <SelectValue placeholder="Select pattern position" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_POSITION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternColor">Pattern Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="patternColor"
                      name="patternColor"
                      type="color"
                      value={data.patternColor}
                      onChange={(e) => handleChange("patternColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <span className="text-sm">{data.patternColor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternOpacity">Pattern Opacity ({data.patternOpacity}%)</Label>
                  <Slider
                    id="patternOpacity"
                    min={5}
                    max={50}
                    step={1}
                    value={[data.patternOpacity]}
                    onValueChange={(values) => handleSliderChange("patternOpacity", values[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patternSize">Pattern Size ({data.patternSize}px)</Label>
                  <Slider
                    id="patternSize"
                    min={10}
                    max={100}
                    step={1}
                    value={[Number.parseInt(data.patternSize) || 30]}
                    onValueChange={(values) => handleSliderChange("patternSize", values[0])}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Border Settings */}
          <TabsContent value="border" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enableBorder"
                checked={data.enableBorder}
                onCheckedChange={(checked) => handleChange("enableBorder", checked)}
              />
              <h3 className="text-lg font-medium">Enable Border</h3>
            </div>

            {data.enableBorder && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="borderColor">Border Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="borderColor"
                      name="borderColor"
                      type="color"
                      value={data.borderColor}
                      onChange={(e) => handleChange("borderColor", e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <span className="text-sm">{data.borderColor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borderStyle">Border Style</Label>
                  <Select value={data.borderStyle} onValueChange={(value) => handleChange("borderStyle", value)}>
                    <SelectTrigger id="borderStyle">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CertificateDesignForm
