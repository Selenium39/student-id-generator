"use client"

import type React from "react"
import type { FormComponentProps } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PROGRAM_TYPE_OPTIONS } from "@/lib/constants"
import { useFormContext } from "react-hook-form"

/**
 * Student Information Form Component
 * Used for inputting student's personal and academic information
 */
export const InfoForm: React.FC<FormComponentProps> = ({ formData, onChange }) => {
  // Get form context
  const form = useFormContext()

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    onChange(name, value)
  }

  // Calculate enrollment year options (10 years back from current year)
  const currentYear = new Date().getFullYear()
  const enrollmentYears = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i
    return { label: year.toString(), value: year.toString() }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ID Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter student name"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Student ID */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter student ID"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Faculty */}
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter faculty/school"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Degree Type */}
          <FormField
            control={form.control}
            name="programType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree Type</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleSelectChange("programType", value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROGRAM_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Enrollment Year */}
          <FormField
            control={form.control}
            name="enrollmentYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enrollment Year</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleSelectChange("enrollmentYear", value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select enrollment year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {enrollmentYears.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Valid Until */}
          <FormField
            control={form.control}
            name="validityEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid Until</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Format: YYYY/MM (e.g.: 2028/06)"
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">School Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* University Name */}
            <FormField
              control={form.control}
              name="universityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university name"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Website */}
            <FormField
              control={form.control}
              name="universityWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university website"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University Address */}
            <FormField
              control={form.control}
              name="universityAddress"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>University Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university address"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Information */}
            <FormField
              control={form.control}
              name="universityContact"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university contact"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Official Signature */}
            <FormField
              control={form.control}
              name="officialSignature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Signature</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter registrar signature"
                      onChange={(e) => {
                        field.onChange(e)
                        handleInputChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoForm
