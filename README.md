# Student ID Generator

A comprehensive web application for generating professional student documents including ID cards, certificates, schedules, admission letters, and transcripts. Built with Next.js and React, featuring a modern UI and customizable design options.

## 🎯 Features

### 1. **Student ID Card Generator**
- Portrait and landscape card layouts
- Customizable design elements (colors, fonts, borders)
- Photo upload support
- QR code and barcode generation
- Export to high-quality images

### 2. **Certificate of Enrollment**
- Professional certificate design
- Watermark support (line and text watermarks)
- Customizable patterns and borders
- Multiple export quality options
- Complete student and academic information

### 3. **Course Schedule Generator**
- Weekly and compact view modes
- Multiple course management
- Time format customization (12h/24h)
- Course color coding
- Display options (weekends, instructors, locations, etc.)

### 4. **Admission Letter Generator**
- Formal letter templates
- Customizable content sections
- Signature support
- Watermark and border options
- Professional formatting

### 5. **Transcript Generator**
- Academic transcript creation
- Course and grade management
- GPA calculation
- Multiple semester support
- Export functionality

## 🚀 Technology Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Management**: React Hook Form
- **Export**: html2canvas
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd student-id-generator
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Usage

1. **Select Document Type**: Choose from ID Card, Certificate, Schedule, Admission Letter, or Transcript
2. **Fill Information**: Enter student and institutional details
3. **Customize Design**: Adjust colors, fonts, watermarks, and other design elements
4. **Preview**: Review your document in real-time
5. **Export**: Download as high-quality PNG image

## 🎨 Customization Options

- **Colors**: Header, text, background, accent colors
- **Fonts**: Multiple font family options
- **Watermarks**: Text and line watermarks with customizable opacity and angle
- **Borders**: Various border styles and colors
- **Patterns**: Decorative patterns for certificates
- **Export Quality**: Low, Medium, High, and Ultra quality options

## 📁 Project Structure

```
student-id-generator/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── id-card/          # ID card components
│   ├── certificate/      # Certificate components
│   ├── schedule/         # Schedule components
│   ├── admission-letter/ # Admission letter components
│   ├── transcript/       # Transcript components
│   ├── layout/           # Layout components
│   └── ui/               # UI component library
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and constants
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

This project is supported by **[ChatTempMail](https://chat-tempmail.com)** - AI-Powered Temporary Email Service. ChatTempMail provides secure, temporary email addresses for quick and private communication needs.

Visit [ChatTempMail](https://chat-tempmail.com) to experience AI-powered temporary email service with advanced features and privacy protection.

---

Made with ❤️ using Next.js and React

