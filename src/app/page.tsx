"use client";

import { useState } from "react";
import { ButtonCustomizer } from "@/components/ButtonCustomizer";
import { ButtonPreview } from "@/components/ButtonPreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-switcher";
import { FaXTwitter } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import Link from "next/link";

export interface ButtonConfig {
  variant: string;
  size: string;
  text: string;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  backgroundType?: "solid" | "gradient";
  gradientBackground?: string;
  hoverBackgroundType?: "solid" | "gradient";
  hoverGradientBackground?: string;
  textColor: string;
  borderWidth: number;
  borderColor: string;
  shadow: string;
  customShadow: string;
  transform: string;
  hoverEffect: boolean;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  hoverShadow?: string;
  hoverTransform: string;
  transitionDuration: number;
  transitionTimingFunction: string;
  transitionDelay: number;
  disabled: boolean;
}

const defaultConfig: ButtonConfig = {
  variant: "default",
  size: "md",
  text: "Button",
  paddingX: 16,
  paddingY: 8,
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  backgroundColor: "#3b82f6",
  textColor: "#ffffff",
  borderWidth: 0,
  borderColor: "#3b82f6",
  shadow: "sm",
  customShadow: "",
  transform: "none",
  hoverEffect: true,
  hoverBackgroundColor: "#2563eb",
  hoverTextColor: "#ffffff",
  hoverBorderColor: "#2563eb",
  hoverShadow: undefined,
  hoverTransform: "none",
  transitionDuration: 150,
  transitionTimingFunction: "ease-in-out",
  transitionDelay: 0,
  disabled: false,
};

export default function Home() {
  const { theme } = useTheme();
  const [config, setConfig] = useState<ButtonConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<"design" | "templates">("design");

  const handleConfigChange = (newConfig: Partial<ButtonConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleTemplateSelect = (templateConfig: ButtonConfig) => {
    setConfig(templateConfig);
  };

  return (
    <div className="min-h-screen pb-80 bg-background dark:bg-background">
      {/* Header */}
      <header className="bg-background dark:bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="flex gap-0 items-center text-2xl text-foreground font-sans italic font-light">
              <Image
                src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
                alt="Logo"
                width={62}
                height={62}
                priority
              />
              JustButton
            </h1>
            {/* <div className="text-sm text-muted-foreground">
              Design and export custom Tailwind buttons
            </div> */}
            <div className="flex items-center gap-4">
              <Link href="https://coff.ee/rudra016" target="_blank">
                <SiBuymeacoffee className="cursor-pointer text-black dark:text-white" />
              </Link>
              <Link href="https://x.com/sudo_rudra" target="_blank">
                <FaXTwitter className="cursor-pointer text-black dark:text-white" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div
              className="bg-background rounded-lg shadow-sm border dark:border-neutral-700 sticky top-8"
              style={{ height: "calc(100vh - 8rem)", maxHeight: "800px" }}
            >
              {/* Tabs Header */}
              <div className="p-6 border-b dark:border-neutral-700">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "design" | "templates")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-1 font-sans font-light">
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Scrollable Tab Content with fog effect */}

              <div
                className="overflow-y-auto"
                style={{ height: "calc(100% - 100px)" }}
              >
                <div className="p-6">
                  <Tabs
                    value={activeTab}
                    onValueChange={(value) =>
                      setActiveTab(value as "design" | "templates")
                    }
                    className="w-full"
                  >
                    <TabsContent value="design" className="space-y-6">
                      <ButtonCustomizer
                        config={config}
                        onConfigChange={handleConfigChange}
                      />
                    </TabsContent>

                    <TabsContent value="templates" className="space-y-6">
                      <TemplateSelector
                        onTemplateSelect={handleTemplateSelect}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              <div className="absolute bottom-0 rounded-b-lg left-0 w-full h-10 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
            </div>
          </div>
          {/* Preview Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div style={{ maxHeight: "800px" }}>
              <ButtonPreview config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
