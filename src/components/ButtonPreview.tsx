"use client";
import { ButtonConfig } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useState } from "react";
import { generateButtonCode } from "@/utils/codeGenerator";
import { useRef, useEffect } from "react";
interface ButtonPreviewProps {
  config: ButtonConfig;
}

export function ButtonPreview({ config }: ButtonPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [exportType, setExportType] = useState<"react" | "html" | "css">(
    "react"
  );
  const clickSoundsRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    clickSoundsRef.current = [
      new Audio("/click-1.mp3"),
      new Audio("/click-2.mp3"),
      new Audio("/click-3.mp3"),
      new Audio("/click-4.mp3"),
      new Audio("/click-5.mp3"),
    ];
    clickSoundsRef.current.forEach((audio) => {
      audio.volume = 0.5; // optional: adjust volume
      audio.preload = "auto";
    });
  }, []);

  const playRandomClickSound = () => {
    const randomIndex = Math.floor(
      Math.random() * clickSoundsRef.current.length
    );
    const sound = clickSoundsRef.current[randomIndex];
    sound.currentTime = 0; // rewind to start
    sound.play();
  };
  const buttonStyles = {
    padding: `${config.paddingY}px ${config.paddingX}px`,
    borderRadius: `${config.borderRadius}px`,
    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight,
    color: config.textColor,
    background:
      config.backgroundType === "gradient"
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
    transition: `all ${config.transitionDuration}ms ${config.transitionTimingFunction} ${config.transitionDelay}ms`,
    cursor: config.disabled ? "not-allowed" : "pointer",
    opacity: config.disabled ? 0.5 : 1,
  };

  const hoverStyles = config.hoverEffect
    ? {
        background:
          config.hoverBackgroundType === "gradient"
            ? config.hoverGradientBackground
            : config.hoverBackgroundColor,
        color: config.hoverTextColor || undefined,
        borderColor: config.hoverBorderColor || undefined,
        transform: config.hoverTransform || undefined,
        boxShadow: config.hoverShadow || buttonStyles.boxShadow || undefined,
      }
    : {
        background: undefined,
        color: undefined,
        borderColor: undefined,
        transform: undefined,
        boxShadow: undefined,
      };

  const handleCopy = async () => {
    const code = generateButtonCode(config, exportType);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const code = generateButtonCode(config, exportType);
    const filename = `button.${exportType === "css" ? "css" : exportType === "html" ? "html" : "jsx"}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans font-light">
            Preview (Press the button for a surprise sound)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[200px] bg-background rounded-lg border-2 border-dashed border-neutral-700">
            <style jsx>{`
              .custom-button:hover {
                background: ${hoverStyles.background} !important;
                color: ${hoverStyles.color || "inherit"} !important;
                border-color: ${hoverStyles.borderColor} !important;
                transform: ${hoverStyles.transform} !important;
                box-shadow: ${hoverStyles.boxShadow};
              }
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
            <button
              className="custom-button"
              style={buttonStyles}
              disabled={config.disabled}
              onClick={playRandomClickSound}
            >
              {config.text}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans font-light">Export Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            {(["react", "html", "css"] as const).map((type) => (
              <Button
                key={type}
                variant={exportType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setExportType(type)}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="relative">
            <pre className="bg-background text-foreground p-4 rounded-lg text-sm overflow-x-auto max-h-96">
              <code>{generateButtonCode(config, exportType)}</code>
            </pre>

            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-3 w-3 cursor-pointer" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
              >
                <Download className="h-3 w-3 cursor-pointer" />
              </Button>
            </div>

            {copied && (
              <div className="absolute top-12 right-2 bg-foreground text-background text-xs px-2 py-1 rounded">
                Copied!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans font-light">
            Usage Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground space-y-2">
          {exportType === "react" && (
            <div>
              <p>• Copy the component code above</p>
              <p>
                • Make sure you have Tailwind CSS configured in your project
              </p>
              <p>• Import and use the component in your React application</p>
            </div>
          )}
          {exportType === "html" && (
            <div>
              <p>• Copy the HTML code above</p>
              <p>• Include Tailwind CSS in your HTML file</p>
              <p>• Add the custom styles to your CSS or style tag</p>
            </div>
          )}
          {exportType === "css" && (
            <div>
              <p>• Copy the CSS code above</p>
              <p>• Add it to your stylesheet</p>
              <p>• Apply the .custom-button class to your button elements</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
