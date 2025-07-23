import { ButtonConfig } from "@/app/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ButtonCustomizerProps {
  config: ButtonConfig;
  onConfigChange: (config: Partial<ButtonConfig>) => void;
}

const shadowOptions = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2X Large" },
];

const transitionTimingOptions = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In Out" },
];

const fontWeightOptions = [
  { value: 100, label: "Thin" },
  { value: 200, label: "Extra Light" },
  { value: 300, label: "Light" },
  { value: 400, label: "Normal" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semi Bold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
  { value: 900, label: "Black" },
];

const gradientPresets = [
  { name: "None", value: "none" },
  { name: "Purple to Blue", value: "linear-gradient(135deg, #8b5cf6, #3b82f6)" },
  { name: "Pink to Orange", value: "linear-gradient(135deg, #ec4899, #f97316)" },
  { name: "Green to Blue", value: "linear-gradient(135deg, #10b981, #3b82f6)" },
  { name: "Red to Pink", value: "linear-gradient(135deg, #ef4444, #ec4899)" },
  { name: "Yellow to Red", value: "linear-gradient(135deg, #eab308, #ef4444)" },
  { name: "Indigo to Purple", value: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
  { name: "Sunset", value: "linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)" },
  { name: "Ocean", value: "linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)" },
];

export function ButtonCustomizer({
  config,
  onConfigChange,
}: ButtonCustomizerProps) {
  return (
    <div className="space-y-6">
      {/* Text Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Text Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="pb-2" htmlFor="text">
              Button Text
            </Label>
            <Input
              id="text"
              value={config.text}
              onChange={(e) => onConfigChange({ text: e.target.value })}
              placeholder="Enter button text"
            />
          </div>
        </CardContent>
      </Card>

      {/* Size & Spacing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Size & Spacing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Padding X: {config.paddingX}px</Label>
            <Slider
              value={[config.paddingX]}
              onValueChange={([value]) => onConfigChange({ paddingX: value })}
              max={80}
              min={0}
              step={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Padding Y: {config.paddingY}px</Label>
            <Slider
              value={[config.paddingY]}
              onValueChange={([value]) => onConfigChange({ paddingY: value })}
              max={40}
              min={0}
              step={2}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Border Radius: {config.borderRadius}px</Label>
            <Slider
              value={[config.borderRadius]}
              onValueChange={([value]) =>
                onConfigChange({ borderRadius: value })
              }
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Font Size: {config.fontSize}px</Label>
            <Slider
              value={[config.fontSize]}
              onValueChange={([value]) => onConfigChange({ fontSize: value })}
              max={32}
              min={10}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="pb-2" htmlFor="fontWeight">
              Font Weight
            </Label>
            <Select
              value={config.fontWeight.toString()}
              onValueChange={(value) =>
                onConfigChange({ fontWeight: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeightOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
  <div>
    <Label className="pb-2" htmlFor="backgroundType">
      Background Style
    </Label>
    <Select
      value={config.backgroundType || "solid"}
      onValueChange={(value) =>
        onConfigChange({ backgroundType: value as "solid" | "gradient" })
      }
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="solid">Solid</SelectItem>
        <SelectItem value="gradient">Gradient</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {config.backgroundType === "gradient" ? (
    <div className="space-y-2">
      <Label className="pb-2" htmlFor="gradientBackground">
        Gradient Preset
      </Label>
      <Select
        value={config.gradientBackground === undefined ? "none" : config.gradientBackground}
        onValueChange={(value) => {
          if (value === "none") {
            onConfigChange({ gradientBackground: undefined });
          } else {
            onConfigChange({ gradientBackground: value });
          }
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {gradientPresets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label className="pb-2" htmlFor="gradientBackgroundCustom">
        Custom Gradient CSS
      </Label>
      <Input
        id="gradientBackgroundCustom"
        value={config.gradientBackground || ""}
        onChange={(e) =>
          onConfigChange({ gradientBackground: e.target.value === "" ? undefined : e.target.value })
        }
        placeholder="e.g., linear-gradient(135deg, #8b5cf6, #3b82f6)"
      />
    </div>
  ) : (
    <div>
      <Label className="pb-2" htmlFor="backgroundColor">
        Background Color
      </Label>
      <Input
        id="backgroundColor"
        type="color"
        value={config.backgroundColor}
        onChange={(e) =>
          onConfigChange({ backgroundColor: e.target.value })
        }
        className="h-10"
      />
    </div>
  )}

  <div>
    <Label className="pb-2" htmlFor="textColor">
      Text Color
    </Label>
    <Input
      id="textColor"
      type="color"
      value={config.textColor}
      onChange={(e) => onConfigChange({ textColor: e.target.value })}
      className="h-10"
    />
  </div>
</CardContent>
      </Card>

      {/* Border */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Border
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Border Width: {config.borderWidth}px</Label>
            <Slider
              value={[config.borderWidth]}
              onValueChange={([value]) =>
                onConfigChange({ borderWidth: value })
              }
              max={8}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          {config.borderWidth > 0 && (
            <div>
              <Label className="pb-2" htmlFor="borderColor">
                Border Color
              </Label>
              <Input
                id="borderColor"
                type="color"
                value={config.borderColor}
                onChange={(e) =>
                  onConfigChange({ borderColor: e.target.value })
                }
                className="h-10"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shadow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Shadow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="pb-2" htmlFor="shadow">
              Shadow Type
            </Label>
            <Select
              value={config.customShadow && config.customShadow.trim() !== "" ? "custom" : config.shadow}
              onValueChange={(value) => {
                if (value === "custom") return;
                onConfigChange({ shadow: value, customShadow: "" });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shadowOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                {config.customShadow && config.customShadow.trim() !== "" && (
                  <SelectItem key="custom" value="custom">
                    Custom Shadow
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="pb-2" htmlFor="customShadow">
              Custom Shadow (CSS)
            </Label>
            <Input
              id="customShadow"
              value={config.customShadow}
              onChange={(e) => onConfigChange({ customShadow: e.target.value })}
              placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hover Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Hover Effects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="hoverEffect"
              checked={config.hoverEffect}
              onCheckedChange={(checked) =>
                onConfigChange({ hoverEffect: checked })
              }
            />
            <Label htmlFor="hoverEffect">Enable Hover Effects</Label>
          </div>

          {config.hoverEffect && (
  <>
    <Separator />
    <div>
      <Label className="pb-2" htmlFor="hoverBackgroundType">
        Hover Background Style
      </Label>
      <Select
        value={config.hoverBackgroundType || "solid"}
        onValueChange={(value) =>
          onConfigChange({ hoverBackgroundType: value as "solid" | "gradient" })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="solid">Solid</SelectItem>
          <SelectItem value="gradient">Gradient</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {config.hoverBackgroundType === "gradient" ? (
      <div className="space-y-2">
        <Label className="pb-2" htmlFor="hoverGradientBackground">
          Hover Gradient Preset
        </Label>
        <Select
          value={config.hoverGradientBackground === undefined ? "none" : config.hoverGradientBackground}
          onValueChange={(value) => {
            if (value === "none") {
              onConfigChange({ hoverGradientBackground: undefined });
            } else {
              onConfigChange({ hoverGradientBackground: value });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {gradientPresets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="pb-2" htmlFor="hoverGradientBackgroundCustom">
          Custom Hover Gradient CSS
        </Label>
        <Input
          id="hoverGradientBackgroundCustom"
          value={config.hoverGradientBackground || ""}
          onChange={(e) =>
            onConfigChange({ hoverGradientBackground: e.target.value === "" ? undefined : e.target.value })
          }
          placeholder="e.g., linear-gradient(135deg, #8b5cf6, #3b82f6)"
        />
      </div>
    ) : (
      <div>
        <Label className="pb-2" htmlFor="hoverBackgroundColor">
          Hover Background
        </Label>
        <Input
          id="hoverBackgroundColor"
          type="color"
          value={config.hoverBackgroundColor}
          onChange={(e) =>
            onConfigChange({ hoverBackgroundColor: e.target.value })
          }
          className="h-10"
        />
      </div>
    )}

              <div>
                <Label className="pb-2" htmlFor="hoverTextColor">
                  Hover Text Color
                </Label>
                <Input
                  id="hoverTextColor"
                  type="color"
                  value={config.hoverTextColor}
                  onChange={(e) =>
                    onConfigChange({ hoverTextColor: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div>
                <Label className="pb-2" htmlFor="hoverBorderColor">
                  Hover Border Color
                </Label>
                <Input
                  id="hoverBorderColor"
                  type="color"
                  value={config.hoverBorderColor}
                  onChange={(e) =>
                    onConfigChange({ hoverBorderColor: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div>
                <Label className="pb-2" htmlFor="hoverTransform">
                  Hover Transform
                </Label>
                <Input
                  id="hoverTransform"
                  value={config.hoverTransform}
                  onChange={(e) =>
                    onConfigChange({ hoverTransform: e.target.value })
                  }
                  placeholder="e.g., translateY(-2px) scale(1.05)"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Transitions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            Transitions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Duration: {config.transitionDuration}ms</Label>
            <Slider
              value={[config.transitionDuration]}
              onValueChange={([value]) =>
                onConfigChange({ transitionDuration: value })
              }
              max={1000}
              min={0}
              step={50}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="pb-2" htmlFor="transitionTimingFunction">
              Timing Function
            </Label>
            <Select
              value={config.transitionTimingFunction}
              onValueChange={(value) =>
                onConfigChange({ transitionTimingFunction: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {transitionTimingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Delay: {config.transitionDelay}ms</Label>
            <Slider
              value={[config.transitionDelay]}
              onValueChange={([value]) =>
                onConfigChange({ transitionDelay: value })
              }
              max={500}
              min={0}
              step={25}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* State */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-editorial font-light">
            State
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="disabled"
              checked={config.disabled}
              onCheckedChange={(checked) =>
                onConfigChange({ disabled: checked })
              }
            />
            <Label htmlFor="disabled">Disabled</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
