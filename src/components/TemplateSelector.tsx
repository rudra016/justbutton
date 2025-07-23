import { ButtonConfig } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TemplateSelectorProps {
  onTemplateSelect: (config: ButtonConfig) => void;
}

const templates: Array<{ name: string; config: ButtonConfig }> = [
  {
    name: "Ghost Inset",
    config: {
      variant: "ghost-inset",
      size: "md",
      text: "Ghost Inset",
      paddingX: 16, // Tailwind `px-4` = 1rem = 16px
      paddingY: 6, // Tailwind `py-1.5` = 0.375rem = 6px
      borderRadius: 6, // `rounded-md` ≈ 6px
      fontSize: 14, // `text-sm` ≈ 14px
      fontWeight: 400,
      backgroundColor: "#f5f5f5", // neutral-100
      textColor: "#1f2937", // neutral-800
      borderWidth: 1,
      borderColor: "#d4d4d4", // neutral-300
      shadow: "inset",
      customShadow: "0px 4px 8px 0px var(--color-neutral-300) inset",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#e5e7eb", // neutral-200
      hoverTextColor: "#1f2937", // stays same
      hoverBorderColor: "#d4d4d4", // remains same
      hoverShadow: "0px 4px 8px 0px var(--color-neutral-300) inset",
      hoverTransform: "none",
      transitionDuration: 200, // Tailwind `transition-colors` default
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
 
  {
    name: "Invert It",
    config: {
      variant: "invert-it",
      size: "md",
      text: "Invert it",
      paddingX: 32, // px-8
      paddingY: 8, // py-2
      borderRadius: 6, // rounded-md
      fontSize: 14,
      fontWeight: 700, // font-bold
      backgroundColor: "#7c3aed", // violet-600
      textColor: "#ffffff",
      borderWidth: 2,
      borderColor: "transparent",

      shadow: "none",
      customShadow: "",

      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#ffffff",
      hoverTextColor: "#7c3aed", // violet-600
      hoverBorderColor: "#7c3aed",
      hoverShadow: "none",
      hoverTransform: "none",

      transitionDuration: 200,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Purple to Blue",
    config: {
      variant: "gradient-purple-blue",
      size: "md",
      text: "Purple to Blue",
      paddingX: 20, // px-5 = 1.25rem = 20px
      paddingY: 10, // py-2.5 = 0.625rem = 10px
      borderRadius: 8, // rounded-lg ≈ 8px
      fontSize: 14, // text-sm
      fontWeight: 500, // font-medium
      backgroundColor: "linear-gradient(to bottom right, #8b5cf6, #3b82f6)", // from-purple-600 to-blue-500
      textColor: "#ffffff",
      borderWidth: 0,
      borderColor: "transparent",
  
      shadow: "none",
      customShadow: "",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "linear-gradient(to bottom left, #8b5cf6, #3b82f6)", // hover:bg-gradient-to-bl
      hoverTextColor: "#ffffff",
      hoverBorderColor: "transparent",
      hoverShadow: "none",
      hoverTransform: "none",
  
      transitionDuration: 200,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false
    }
  },  
  {
    name: "NeoGlass Glow",
    config: {
      variant: "neo-glass",
      size: "md",
      text: "NeoGlass",
      paddingX: 28,
      paddingY: 10,
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: "rgba(255, 255, 255, 0.1)", // frosted glass effect
      textColor: "#e0e0e0",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",

      shadow: "custom",
      customShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1)",

      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "rgba(255, 255, 255, 0.15)",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#8b5cf6", // violet glow
      hoverShadow: "0 0 12px #8b5cf6", // outer glow effect
      hoverTransform: "none",

      transitionDuration: 300,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Lifted Shadow",
    config: {
      variant: "lifted-shadow",
      size: "md",
      text: "Lift Off",
      paddingX: 24,
      paddingY: 10,
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: "#0f172a", // slate-900
      textColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#1e293b", // slate-800
  
      shadow: "custom",
      customShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#1e293b",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#334155", // slate-700
      hoverShadow: "0px 6px 20px rgba(0, 0, 0, 0.6)",
      hoverTransform: "translateY(-2px)",
  
      transitionDuration: 200,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false
    }
  },
   {
    name: "Figma Outline",
    config: {
      variant: "figma-outline",
      size: "md",
      text: "Figma Outline",
      paddingX: 24,
      paddingY: 8,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 700,
      backgroundColor: "transparent",
      textColor: "#000000",
      borderWidth: 1,
      borderColor: "#000000",
      shadow: "none",
      customShadow: "0 0 0 3px #000000 inset",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "transparent",
      hoverTextColor: "#000000",
      hoverBorderColor: "#000000",
      hoverShadow: undefined,
      hoverTransform: "translateY(-0.25rem)",
      transitionDuration: 400,
      transitionTimingFunction: "ease-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Pastel Pop",
    config: {
      variant: "pastel-pop",
      size: "md",
      text: "Pop It",
      paddingX: 24,
      paddingY: 10,
      borderRadius: 9999,
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: "#fcd34d", // yellow-300
      textColor: "#000000",
      borderWidth: 2,
      borderColor: "#facc15", // yellow-400
  
      shadow: "custom",
      customShadow: "0px 0px 0px rgba(0,0,0,0)",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#a78bfa", // violet-400
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#8b5cf6", // violet-500
      hoverShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
      hoverTransform: "scale(1.05)",
  
      transitionDuration: 150,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false
    }
  },
  {
    name: "Monochrome Switch",
    config: {
      variant: "monochrome-switch",
      size: "md",
      text: "Switch",
      paddingX: 20,
      paddingY: 8,
      borderRadius: 4,
      fontSize: 13,
      fontWeight: 600,
      backgroundColor: "#000000",
      textColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#000000",
  
      shadow: "none",
      customShadow: "",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#ffffff",
      hoverTextColor: "#000000",
      hoverBorderColor: "#000000",
      hoverShadow: "none",
      hoverTransform: "none",
  
      transitionDuration: 200,
      transitionTimingFunction: "ease",
      transitionDelay: 0,
      disabled: false
    }
  },
  {
    name: "Cyber Pulse",
    config: {
      variant: "cyber-pulse",
      size: "md",
      text: "Pulse",
      paddingX: 28,
      paddingY: 10,
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: "#ffffff", // true black
      textColor: "#22d3ee",       // cyan-400
      borderWidth: 1,
      borderColor: "#0ea5e9",     // sky-500
  
      shadow: "custom",
      customShadow: "0 0 10px #22d3ee",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#ffffff",
      hoverTextColor: "#67e8f9",
      hoverBorderColor: "#67e8f9",
      hoverShadow: "0 0 20px #67e8f9, 0 0 40px #67e8f9",
      hoverTransform: "scale(1.03)",
  
      transitionDuration: 300,
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDelay: 0,
      disabled: false
    }
  },    
  {
    name: "Frozen Glass Pop",
    config: {
      variant: "frozen-glass",
      size: "md",
      text: "Frosted",
      paddingX: 24,
      paddingY: 10,
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: "rgba(255, 255, 255, 0.08)", // frosty glass
      textColor: "#e0f2fe", // light blue
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.15)",
  
      shadow: "custom",
      customShadow: "inset 0 0 4px rgba(255, 255, 255, 0.1)",
  
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "rgba(255, 255, 255, 0.15)",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#7dd3fc", // sky-300
      hoverShadow: "0 0 30px rgba(125, 211, 252, 0.5)",
      hoverTransform: "scale(1.04)",
  
      transitionDuration: 300,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false
    }
  },  
  {
    name: "Top Gradient",
    config: {
      variant: "top-gradient",
      size: "md",
      text: "Top Gradient",
      paddingX: 32, // px-8
      paddingY: 8, // py-2
      borderRadius: 9999, // rounded-full
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: "#1f1f1f", // dark base
      textColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#3f3f46",

      shadow: "custom",
      customShadow: "0 -2px 4px 0 #8b5cf6", // top glow effect (like top inset or gradient illusion)

      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#1f1f1f",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#3f3f46",
      hoverShadow: "0 -2px 8px 0 #a78bfa", // slightly stronger glow on hover
      hoverTransform: "none",

      transitionDuration: 200,
      transitionTimingFunction: "ease-in-out",
      transitionDelay: 0,
      disabled: false,
    },
  },

  {
    name: "Neon Cyberpunk",
    config: {
      variant: "neon",
      size: "md",
      text: "NEON STYLE",
      paddingX: 24,
      paddingY: 12,
      borderRadius: 0,
      fontSize: 14,
      fontWeight: 700,
      backgroundColor: "#000000",
      textColor: "#00ff88",
      borderWidth: 2,
      borderColor: "#00ff88",
      shadow: "none",
      customShadow: "0 0 10px #00ff88, inset 0 0 10px rgba(0, 255, 136, 0.1)",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#00ff88",
      hoverTextColor: "#000000",
      hoverBorderColor: "#00ff88",
      hoverShadow: undefined,
      hoverTransform: "none",
      transitionDuration: 300,
      transitionTimingFunction: "ease-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Soft Rounded",
    config: {
      variant: "soft",
      size: "lg",
      text: "Soft Button",
      paddingX: 28,
      paddingY: 14,
      borderRadius: 50,
      fontSize: 15,
      fontWeight: 500,
      backgroundColor: "#f59e0b",
      textColor: "#ffffff",
      borderWidth: 0,
      borderColor: "#f59e0b",
      shadow: "md",
      customShadow: "",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#d97706",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#d97706",
      hoverShadow: undefined,
      hoverTransform: "translateY(-1px)",
      transitionDuration: 200,
      transitionTimingFunction: "ease-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Glass Morphism",
    config: {
      variant: "glass",
      size: "md",
      text: "Glass Effect",
      paddingX: 20,
      paddingY: 10,
      borderRadius: 16,
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      textColor: "#1f2937",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
      shadow: "lg",
      customShadow: "",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "rgba(255, 255, 255, 0.3)",
      hoverTextColor: "#1f2937",
      hoverBorderColor: "rgba(255, 255, 255, 0.4)",
      hoverShadow: undefined,
      hoverTransform: "translateY(-1px)",
      transitionDuration: 200,
      transitionTimingFunction: "ease-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
  {
    name: "Retro 80s",
    config: {
      variant: "retro",
      size: "md",
      text: "RETRO 80s",
      paddingX: 24,
      paddingY: 10,
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 800,
      backgroundColor: "#ec4899",
      textColor: "#ffffff",
      borderWidth: 3,
      borderColor: "#ffffff",
      shadow: "xl",
      customShadow: "4px 4px 0px #1f2937",
      transform: "none",
      hoverEffect: true,
      hoverBackgroundColor: "#db2777",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#ffffff",
      hoverShadow: undefined,
      hoverTransform: "translate(-2px, -2px)",
      transitionDuration: 100,
      transitionTimingFunction: "ease-out",
      transitionDelay: 0,
      disabled: false,
    },
  },
];

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const renderPreviewButton = (config: ButtonConfig) => {
    const buttonStyles = {
      padding: `${config.paddingY}px ${config.paddingX}px`,
      borderRadius: `${config.borderRadius}px`,
      fontSize: `${config.fontSize}px`,
      fontWeight: config.fontWeight,
      color: config.textColor,
      background:
        config.backgroundType === "gradient" && config.gradientBackground
          ? config.gradientBackground
          : config.backgroundColor,
      border:
        config.borderWidth > 0
          ? `${config.borderWidth}px solid ${config.borderColor}`
          : "none",
      boxShadow:
        config.customShadow ||
        (config.shadow !== "none" ? `var(--shadow-${config.shadow})` : "none"),
      transform: config.transform,
      transition: `all ${config.transitionDuration}ms ${config.transitionTimingFunction}`,
      cursor: "pointer",
      minWidth: "120px",
    };

    return (
  <>
    <style jsx>{`
      .template-preview-btn:hover {
        transform: ${config.hoverTransform || "none"} !important;
      }
    `}</style>
    <button style={buttonStyles} className="template-preview-btn">
      {config.text}
    </button>
  </>
);
  };

  return (
    <div className="space-y-4">
      <style jsx>{`
        :root {
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <div className="text-sm text-foreground mb-4">
        Choose from pre-designed button templates to get started quickly.
      </div>

      {templates.map((template, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-sans font-light">
              {template.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Preview */}
            <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
              {renderPreviewButton(template.config)}
            </div>

            {/* Select Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full cursor-pointer"
              onClick={() => onTemplateSelect(template.config)}
            >
              Use This Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
