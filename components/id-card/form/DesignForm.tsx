"use client"

import type React from "react"
import type { FormComponentProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { CARD_ORIENTATION_OPTIONS, CARD_STYLE_OPTIONS, CODE_TYPE_OPTIONS } from "@/lib/constants"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * Card Design Form Component
 * Used for configuring card style, color, orientation and other design-related options
 */
export const DesignForm: React.FC<FormComponentProps> = ({ formData, onChange, onFileChange }) => {
  // Get form context
  const form = useFormContext()

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    onChange(name, value)
  }

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    onChange(name, checked)
  }

  // Handle slider changes
  const handleSliderChange = (name: string, value: number[]) => {
    onChange(name, String(value[0]))
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
            <TabsTrigger value="media">Media Settings</TabsTrigger>
            <TabsTrigger value="watermark">Watermark Settings</TabsTrigger>
            <TabsTrigger value="back">Back Settings</TabsTrigger>
          </TabsList>

          {/* Basic settings tab */}
          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Card Orientation */}
              <FormField
                control={form.control}
                name="orientation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Orientation</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("orientation", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card orientation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARD_ORIENTATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose card display orientation (portrait or landscape)</FormDescription>
                  </FormItem>
                )}
              />

              {/* Card Style */}
              <FormField
                control={form.control}
                name="cardStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Style</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("cardStyle", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARD_STYLE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the visual style of the card</FormDescription>
                  </FormItem>
                )}
              />

              {/* Card Color */}
              <FormField
                control={form.control}
                name="cardColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Color</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Text Color */}
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Code Type */}
              <FormField
                control={form.control}
                name="codeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleSelectChange("codeType", value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select code type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CODE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the type of verification code displayed on the card</FormDescription>
                  </FormItem>
                )}
              />

              {/* Realistic Effect */}
              <FormField
                control={form.control}
                name="realisticEffect"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Realistic Effect</FormLabel>
                      <FormDescription>Enable realistic card texture effect</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("realisticEffect", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Media settings tab */}
          <TabsContent value="media">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {/* Upload Photo */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Photo</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "photo")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="w-32 h-40 border rounded overflow-hidden">
                          <img
                            src={formData.photo || "/placeholder.svg"}
                            alt="Student Photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="photoUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            Choose Photo
                          </Label>
                          <FormDescription className="mt-2">Please upload a standard ID photo, preferably 3:4 aspect ratio</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Upload Logo */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Logo</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="logoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "logo")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="w-16 h-16 border rounded overflow-hidden">
                          <img
                            src={formData.logo || "/placeholder.svg"}
                            alt="School Logo"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="logoUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            Choose Logo
                          </Label>
                          <FormDescription className="mt-2">Upload school or organization logo</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Upload Background Image */}
              <FormField
                control={form.control}
                name="backgroundImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Background Image</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="backgroundUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "backgroundImage")}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <div className="h-16 w-24 overflow-hidden rounded border">
                          <img
                            src={formData.backgroundImage || "/placeholder.svg?height=60&width=90"}
                            alt="Background"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="backgroundUpload"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center"
                          >
                            Choose Background
                          </Label>
                          <FormDescription className="mt-2">Upload card background image</FormDescription>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Background Opacity */}
              <FormField
                control={form.control}
                name="backgroundOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Opacity: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[Number.parseInt(field.value) || 0]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("backgroundOpacity", value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>Adjust background image opacity</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Watermark settings tab */}
          <TabsContent value="watermark">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Enable Watermark */}
              <FormField
                control={form.control}
                name="enableWatermark"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Watermark</FormLabel>
                      <FormDescription>Display semi-transparent watermark on card</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("enableWatermark", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Watermark Text */}
              <FormField
                control={form.control}
                name="watermarkText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Text</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        placeholder="Enter watermark text"
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                    <FormDescription>Watermark text displayed on the card</FormDescription>
                  </FormItem>
                )}
              />

              {/* Watermark Color */}
              <FormField
                control={form.control}
                name="watermarkColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Color</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="w-16 h-10 p-1"
                        disabled={!formData.enableWatermark}
                      />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        className="flex-1"
                        disabled={!formData.enableWatermark}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Watermark Size */}
              <FormField
                control={form.control}
                name="watermarkSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Size: {field.value}px</FormLabel>
                    <FormControl>
                      <Slider
                        min={8}
                        max={64}
                        step={1}
                        value={[Number.parseInt(field.value) || 32]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkSize", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Watermark Angle */}
              <FormField
                control={form.control}
                name="watermarkAngle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Angle: {field.value}°</FormLabel>
                    <FormControl>
                      <Slider
                        min={-90}
                        max={90}
                        step={1}
                        value={[Number.parseInt(field.value) || 45]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkAngle", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Watermark Opacity */}
              <FormField
                control={form.control}
                name="watermarkOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Opacity: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[Number.parseInt(field.value) || 10]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("watermarkOpacity", value)
                        }}
                        disabled={!formData.enableWatermark}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Back settings tab */}
          <TabsContent value="back">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Enable Back */}
              <FormField
                control={form.control}
                name="backEnabled"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Back</FormLabel>
                      <FormDescription>Generate card back information</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          handleSwitchChange("backEnabled", checked)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Back Title */}
              <FormField
                control={form.control}
                name="backTitle"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Back Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter back title"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Terms of Use */}
              <FormField
                control={form.control}
                name="termsOfUse"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Terms of Use</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter terms of use"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                        rows={3}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Lost Card Information */}
              <FormField
                control={form.control}
                name="lostCardInfo"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Lost Card Information</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter lost card handling information"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Access List */}
              <FormField
                control={form.control}
                name="accessList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access List</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter access permissions (comma separated)"
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Back Logo */}
              <FormField
                control={form.control}
                name="backLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Back Logo</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        type="file"
                        id="backLogoUpload"
                        accept="image/*"
                        onChange={(e) => onFileChange && onFileChange(e, "backLogo")}
                        className="hidden"
                        disabled={!formData.backEnabled}
                      />
                      <div className="flex gap-2">
                        <div className="w-16 h-16 border rounded overflow-hidden">
                          <img
                            src={formData.backLogo || "/placeholder.svg"}
                            alt="Back Logo"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Label
                            htmlFor="backLogoUpload"
                            className={`cursor-pointer bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-center ${!formData.backEnabled ? "opacity-50 pointer-events-none" : ""}`}
                          >
                            Choose Back Logo
                          </Label>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              {/* Back Logo Opacity */}
              <FormField
                control={form.control}
                name="backLogoOpacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Opacity: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[Number.parseInt(field.value) || 70]}
                        onValueChange={(value) => {
                          field.onChange(String(value[0]))
                          handleSliderChange("backLogoOpacity", value)
                        }}
                        disabled={!formData.backEnabled}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default DesignForm
