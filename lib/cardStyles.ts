import type { CardStyle, CardOrientation } from "./types"

// Define card style configurations for different styles
export const cardStyleConfigs = {
  // Modern style configuration
  modern: {
    portrait: {
      container: "overflow-hidden rounded-lg shadow-lg",
      header: "mb-5 flex items-center justify-between",
      mainContent: "flex flex-col sm:flex-row gap-5",
      photo: "h-36 w-28 overflow-hidden rounded border bg-white shadow-sm",
      infoContainer: "flex-1 space-y-3",
      footer: "mt-5 border-t border-white/20 pt-4",
      bottomBar: "bg-black/10 p-2 text-center text-xs",
      // Back side
      backContainer: "mt-4 overflow-hidden rounded-lg shadow-lg",
      backHeader: "mb-5 flex items-center justify-between",
      backContent: "relative z-10 space-y-4",
      backFooter: "relative z-10 bg-black/10 p-2 text-center text-xs",
    },
    landscape: {
      container: "relative overflow-hidden rounded-lg shadow-lg",
      header: "flex items-center mb-4",
      mainContent: "flex-1 flex",
      leftContent: "w-[55%] flex flex-col justify-between",
      rightContent: "w-[45%] flex flex-col items-end justify-between",
      photo: "h-[6.5rem] w-[5.5rem] overflow-hidden rounded border bg-white shadow-sm",
      // Back side
      backContainer: "mt-4 relative overflow-hidden rounded-lg shadow-lg",
      backHeader: "flex items-center justify-between mb-3 border-b border-gray-200 pb-2",
      backContent: "flex text-sm",
      backLeftContent: "w-[60%] pr-3",
      backRightContent: "w-[40%]",
    },
  },

  // Classic style configuration
  classic: {
    portrait: {
      container: "overflow-hidden rounded-md border-2 border-gray-300 bg-white shadow-md",
      header: "relative border-b-2 border-gray-300 p-4",
      mainContent: "relative p-4",
      photo: "h-36 w-28 overflow-hidden rounded border shadow-sm",
      infoContainer: "flex-1 space-y-2",
      bottomBar: "border-t-2 border-gray-300 bg-gray-100 p-2 text-center text-xs text-gray-600",
      // Back side
      backContainer: "mt-4 overflow-hidden rounded-md border-2 border-gray-300 bg-white shadow-md",
      backHeader: "relative border-b-2 border-gray-300 p-4",
      backContent: "relative p-4",
      backInfoSection: "relative z-10 space-y-3",
      backFooter: "border-t-2 border-gray-300 bg-gray-100 p-2 text-center text-xs text-gray-600",
    },
    landscape: {
      // Configuration similar to landscape modern style, but with different borders and shadows
      container: "relative overflow-hidden rounded-md border-2 border-gray-300 bg-white shadow-md",
      header: "flex items-center mb-4 border-b border-gray-200 pb-2",
      mainContent: "flex-1 flex",
      leftContent: "w-[55%] flex flex-col justify-between",
      rightContent: "w-[45%] flex flex-col items-end justify-between",
      photo: "h-[6.5rem] w-[5.5rem] overflow-hidden rounded border bg-white shadow-sm",
      // Back side
      backContainer: "mt-4 relative overflow-hidden rounded-md border-2 border-gray-300 bg-white shadow-md",
      backHeader: "flex items-center justify-between mb-3 border-b border-gray-200 pb-2",
      backContent: "flex text-sm",
      backLeftContent: "w-[60%] pr-3",
      backRightContent: "w-[40%]",
    },
  },

  // Minimal style configuration
  minimal: {
    portrait: {
      container: "relative overflow-hidden rounded-xl bg-white shadow-lg",
      header: "mb-6 flex items-center justify-between",
      mainContent: "flex flex-col sm:flex-row gap-4",
      photo: "h-36 w-28 overflow-hidden rounded-lg shadow-md",
      infoContainer: "flex-1 space-y-2",
      // Back side
      backContainer: "mt-4 relative overflow-hidden rounded-xl bg-white shadow-lg",
      backHeader: "flex items-center justify-between mb-6",
      backContent: "space-y-5",
      backFooter: "border-t border-gray-100 pt-3 mt-4",
    },
    landscape: {
      container: "relative overflow-hidden rounded-xl bg-white shadow-lg",
      header: "flex items-center mb-4",
      mainContent: "flex-1 flex",
      leftContent: "w-[55%] flex flex-col justify-between",
      rightContent: "w-[45%] flex flex-col items-end justify-between",
      photo: "h-[6.5rem] w-[5.5rem] overflow-hidden rounded-lg shadow-sm",
      // Back side
      backContainer: "mt-4 relative overflow-hidden rounded-xl bg-white shadow-lg",
      backHeader: "flex items-center justify-between mb-3",
      backContent: "flex text-sm",
      backLeftContent: "w-[60%] pr-3",
      backRightContent: "w-[40%]",
    },
  },
}

// Helper function to get style configuration by card style and orientation
export const getCardStyleConfig = (style: CardStyle = "modern", orientation: CardOrientation = "portrait") => {
  return cardStyleConfigs[style][orientation]
}

// Get common styles for card realistic texture effects
export const getRealisticCardStyles = (orientation: CardOrientation) => {
  return {
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)",
    backgroundImage: "linear-gradient(145deg, #ffffff, #f5f7fa)",
    photo: {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      border: "1px solid rgba(0,0,0,0.08)",
    },
    texture: {
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgIDAgLjA1IDAgMCAwICAwIDAgLjA1IDAgMCAgMCAwIDAgLjA1IDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')",
      backgroundSize: "cover",
    },
    // Magnetic stripe effect unique to landscape cards
    magneticStripe:
      orientation === "landscape"
        ? {
            background: "linear-gradient(to right, #2d2d2d, #1a1a1a, #2d2d2d)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
            texture: {
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
            },
          }
        : undefined,
    // Holographic anti-counterfeiting effect
    hologram:
      orientation === "landscape"
        ? {
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(125,185,232,0.4), rgba(125,185,232,0.1))",
            opacity: 0.7,
            backdropFilter: "hue-rotate(45deg)",
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.6)",
          }
        : undefined,
  }
}

// Helper function to get watermark styles
export const getWatermarkStyles = (formData: any) => {
  return {
    background: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent ${formData.watermarkLineWidth}px,
      rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100}) ${formData.watermarkLineWidth}px,
      rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100}) ${Number(formData.watermarkLineWidth) * 2}px
    )`,
    text: {
      color: `rgba(${Number.parseInt(formData.watermarkColor.slice(1, 3), 16)}, ${Number.parseInt(formData.watermarkColor.slice(3, 5), 16)}, ${Number.parseInt(formData.watermarkColor.slice(5, 7), 16)}, ${Number(formData.watermarkOpacity) / 100})`,
      letterSpacing: "2px",
      width: "100%",
      fontSize: `${Number(formData.watermarkSize) * 0.8 + 1.5}rem`,
      transform: `rotate(${formData.watermarkAngle}deg)`,
    },
  }
}
