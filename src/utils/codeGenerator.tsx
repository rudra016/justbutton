import { ButtonConfig } from '@/app/page';

export function generateButtonCode(config: ButtonConfig, exportType: 'react' | 'html' | 'css' | 'tailwind'): string {
  switch (exportType) {
    case 'react':
      return generateReactCode(config);
    case 'html':
      return generateHTMLCode(config);
    case 'css':
      return generateCSSCode(config);
    case 'tailwind':
      return `className="${generateTailwindClasses(config)}"`;
    default:
      return '';
  }
}

function generateReactCode(config: ButtonConfig): string {
  const className = generateTailwindClasses(config);
  const inlineStyles = generateInlineStyles(config);
  const hoverStyles = generateHoverStyles(config);
  
  // Create complete styles objects that include all properties that might change
  const createCompleteStylesObjects = () => {
    if (!config.hoverEffect || Object.keys(hoverStyles).length === 0) {
      return '';
    }

    // Create a complete base styles object that includes reset values for hover properties
    const completeBaseStyles = { ...inlineStyles };
    const completeHoverStyles = { ...inlineStyles, ...hoverStyles };

    // Ensure transform is properly handled
    if (hoverStyles.transform && !completeBaseStyles.transform) {
      completeBaseStyles.transform = 'none';
    }

    return `
  const baseStyles = ${JSON.stringify(completeBaseStyles, null, 4)};
  
  const hoverStyles = ${JSON.stringify(completeHoverStyles, null, 4)};

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, hoverStyles);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, baseStyles);
  };`;
  };

  const styleHandlers = createCompleteStylesObjects();
  const baseStylesDeclaration = styleHandlers ? '' : `
  const baseStyles = ${JSON.stringify(inlineStyles, null, 4)};`;

  return `import React from 'react';

interface CustomButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CustomButton({ 
  children = "${config.text}", 
  onClick, 
  disabled = ${config.disabled}, 
  className = "" 
}: CustomButtonProps) {${baseStylesDeclaration}${styleHandlers}

  return (
    <button
      className={\`${className} \${className}\`}
      style={baseStyles}
      ${config.hoverEffect && Object.keys(hoverStyles).length > 0 ? `onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}` : ''}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Usage:
// <CustomButton onClick={() => console.log('Clicked!')}>
//   ${config.text}
// </CustomButton>`;
}

function generateHTMLCode(config: ButtonConfig): string {
  const inlineStyles = generateInlineStyles(config);
  const hoverStyles = generateHoverStyles(config);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Button</title>
  <style>
    .custom-button {
${Object.entries(inlineStyles).map(([key, value]) => `      ${camelToKebab(key)}: ${value};`).join('\n')}
    }
    
${config.hoverEffect ? `    .custom-button:hover {
${Object.entries(hoverStyles).map(([key, value]) => `      ${camelToKebab(key)}: ${value};`).join('\n')}
    }` : ''}

    .custom-button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <button class="custom-button"${config.disabled ? ' disabled' : ''}>
    ${config.text}
  </button>
</body>
</html>`;
}

function generateCSSCode(config: ButtonConfig): string {
  const inlineStyles = generateInlineStyles(config);
  const hoverStyles = generateHoverStyles(config);
  
  return `.custom-button {
${Object.entries(inlineStyles).map(([key, value]) => `  ${camelToKebab(key)}: ${value};`).join('\n')}
}

${config.hoverEffect ? `.custom-button:hover {
${Object.entries(hoverStyles).map(([key, value]) => `  ${camelToKebab(key)}: ${value};`).join('\n')}
}

` : ''}
.custom-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.custom-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}`;
}

function generateTailwindClasses(config: ButtonConfig): string {
  const classes: string[] = [];

  // Base
  classes.push('inline-flex', 'items-center', 'justify-center', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');

  // Padding
  if (config.paddingX === config.paddingY) {
    const px = Math.round(config.paddingX / 4);
    if (px) classes.push(`p-${px}`);
  } else {
    if (config.paddingY) classes.push(`py-${Math.round(config.paddingY / 4)}`);
    if (config.paddingX) classes.push(`px-${Math.round(config.paddingX / 4)}`);
  }

  // Font size
  if (config.fontSize) {
    if (config.fontSize <= 12) classes.push('text-xs');
    else if (config.fontSize <= 14) classes.push('text-sm');
    else if (config.fontSize <= 16) classes.push('text-base');
    else if (config.fontSize <= 18) classes.push('text-lg');
    else if (config.fontSize <= 24) classes.push('text-xl');
    else classes.push('text-2xl');
  }

  // Font weight
  if (config.fontWeight) {
    classes.push(`font-[${config.fontWeight}]`);
  }

  // Border radius
  if (config.borderRadius !== undefined) {
    if (config.borderRadius === 0) classes.push('rounded-none');
    else if (config.borderRadius <= 4) classes.push('rounded-sm');
    else if (config.borderRadius <= 8) classes.push('rounded');
    else if (config.borderRadius <= 16) classes.push('rounded-md');
    else if (config.borderRadius <= 999) classes.push('rounded-full');
    else classes.push(`rounded-[${config.borderRadius}px]`);
  }

  // Border
  if (config.borderWidth && config.borderWidth > 0) {
    if (config.borderWidth === 1) classes.push('border');
    else classes.push(`border-[${config.borderWidth}px]`);
    if (config.borderColor) {
      if (config.borderColor.startsWith('#')) {
        classes.push(`border-[${config.borderColor}]`);
      } else {
        classes.push(`border-[${config.borderColor}]`);
      }
    }
  } else {
    classes.push('border-0');
  }

  // Background
  if (config.backgroundType === 'gradient' && config.gradientBackground) {
    classes.push('bg-gradient-to-r'); // fallback, direction not in config
    // Try to extract from gradient string
    // No direct Tailwind class for custom gradients, so output as comment
    classes.push(`[background:${config.gradientBackground}]`);
  } else if (config.backgroundColor) {
    if (config.backgroundColor.startsWith('#')) {
      classes.push(`bg-[${config.backgroundColor}]`);
    } else {
      classes.push(`bg-[${config.backgroundColor}]`);
    }
  }

  // Text color
  if (config.textColor) {
    if (config.textColor.startsWith('#')) {
      classes.push(`text-[${config.textColor}]`);
    } else {
      classes.push(`text-[${config.textColor}]`);
    }
  }

  // Shadow
  if (config.customShadow) {
    classes.push(`shadow-[${config.customShadow}]`);
  } else if (config.shadow && config.shadow !== 'none') {
    classes.push(`shadow-${config.shadow}`);
  }

  // Transform
  if (config.transform && config.transform !== 'none') {
    classes.push(`[transform:${config.transform}]`);
  }

  // Transition
  if (config.transitionDuration) {
    classes.push(`duration-[${config.transitionDuration}ms]`);
  }
  if (config.transitionTimingFunction) {
    classes.push(`ease-[${config.transitionTimingFunction}]`);
  }
  if (config.transitionDelay) {
    classes.push(`delay-[${config.transitionDelay}ms]`);
  }

  // Disabled
  if (config.disabled) {
    classes.push('cursor-not-allowed', 'opacity-50');
  } else {
    classes.push('cursor-pointer');
  }

  // Hover (basic support)
  if (config.hoverEffect) {
    if (config.hoverBackgroundType === 'gradient' && config.hoverGradientBackground) {
      classes.push('hover:bg-gradient-to-r');
      classes.push(`hover:[background:${config.hoverGradientBackground}]`);
    } else if (config.hoverBackgroundColor) {
      classes.push(`hover:bg-[${config.hoverBackgroundColor}]`);
    }
    if (config.hoverTextColor) {
      classes.push(`hover:text-[${config.hoverTextColor}]`);
    }
    if (config.hoverBorderColor) {
      classes.push(`hover:border-[${config.hoverBorderColor}]`);
    }
    if (config.hoverTransform) {
      classes.push(`hover:[transform:${config.hoverTransform}]`);
    }
    if (config.hoverShadow) {
      classes.push(`hover:shadow-[${config.hoverShadow}]`);
    }
  }

  return classes.join(' ');
}


function generateInlineStyles(config: ButtonConfig): Record<string, string> {
  const styles: Record<string, string> = {
    padding: `${config.paddingY}px ${config.paddingX}px`,
    borderRadius: `${config.borderRadius}px`,
    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight.toString(),
    color: config.textColor,
    cursor: config.disabled ? 'not-allowed' : 'pointer',
    opacity: config.disabled ? '0.5' : '1',
    transition: `all ${config.transitionDuration}ms ${config.transitionTimingFunction} ${config.transitionDelay}ms`,
  };

  // Handle background based on type
  if (config.backgroundType === 'gradient') {
    if (config.gradientBackground) {
      styles.background = config.gradientBackground;
    } else {
      styles.backgroundColor = config.backgroundColor;
    }
  } else {
    styles.backgroundColor = config.backgroundColor;
  }

  // Border
  if (config.borderWidth > 0) {
    styles.border = `${config.borderWidth}px solid ${config.borderColor}`;
  } else {
    styles.border = 'none';
  }

  // Shadow
  if (config.customShadow) {
    styles.boxShadow = config.customShadow;
  } else if (config.shadow !== 'none') {
    styles.boxShadow = getShadowValue(config.shadow);
  }

  // Transform
  if (config.transform && config.transform !== 'none') {
    styles.transform = config.transform;
  }

  return styles;
}

function generateHoverStyles(config: ButtonConfig): Record<string, string> {
  if (!config.hoverEffect) return {};

  const styles: Record<string, string> = {};

  // Handle background based on type
  if (config.hoverBackgroundType === 'gradient') {
    if (config.hoverGradientBackground) {
      styles.background = config.hoverGradientBackground;
    }
  } else {
    // Solid background
    if (config.hoverBackgroundColor) {
      styles.backgroundColor = config.hoverBackgroundColor;
    }
  }

  if (config.hoverTextColor) {
    styles.color = config.hoverTextColor;
  }

  if (config.hoverBorderColor) {
    styles.borderColor = config.hoverBorderColor;
  }

  if (config.hoverTransform && config.hoverTransform !== 'none' && config.hoverTransform.trim() !== '') {
    styles.transform = config.hoverTransform;
  }

  if (config.hoverShadow) {
    styles.boxShadow = config.hoverShadow;
  }

  return styles;
}

function getShadowValue(shadow: string): string {
  const shadowMap: Record<string, string> = {
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };
  
  return shadowMap[shadow] || 'none';
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}