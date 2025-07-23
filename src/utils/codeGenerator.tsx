import { ButtonConfig } from '@/app/page';

export function generateButtonCode(config: ButtonConfig, exportType: 'react' | 'html' | 'css'): string {
  switch (exportType) {
    case 'react':
      return generateReactCode(config);
    case 'html':
      return generateHTMLCode(config);
    case 'css':
      return generateCSSCode(config);
    default:
      return '';
  }
}

function generateReactCode(config: ButtonConfig): string {
  const className = generateTailwindClasses(config);
  const inlineStyles = generateInlineStyles(config);
  
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
}: CustomButtonProps) {
  return (
    <button
      className={\`${className} \${className}\`}
      style={${JSON.stringify(inlineStyles, null, 8)}}
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
  const classes = [];
  
  // Base classes
  classes.push('inline-flex', 'items-center', 'justify-center', 'font-medium', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
  
  // Conditional classes based on config
  if (config.disabled) {
    classes.push('cursor-not-allowed', 'opacity-50');
  }
  
  return classes.join(' ');
}

function generateInlineStyles(config: ButtonConfig): Record<string, string> {
  const styles: Record<string, string> = {
    padding: `${config.paddingY}px ${config.paddingX}px`,
    borderRadius: `${config.borderRadius}px`,
    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight.toString(),
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    cursor: config.disabled ? 'not-allowed' : 'pointer',
    opacity: config.disabled ? '0.5' : '1',
    transition: `all ${config.transitionDuration}ms ${config.transitionTimingFunction} ${config.transitionDelay}ms`,
  };

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

  if (config.hoverBackgroundColor) {
    styles.backgroundColor = config.hoverBackgroundColor;
  }

  if (config.hoverTextColor) {
    styles.color = config.hoverTextColor;
  }

  if (config.hoverBorderColor && config.borderWidth > 0) {
    styles.borderColor = config.hoverBorderColor;
  }

  if (config.hoverTransform && config.hoverTransform !== 'none') {
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