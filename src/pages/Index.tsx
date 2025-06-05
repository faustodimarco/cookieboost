import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Copy, Eye, Settings, Palette, FileText, Code, Cookie } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ColorSelector } from '@/components/ui/ColorSelector';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../quill-custom.css'; // custom styles for Quill

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface WidgetConfig {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  borderRadius: string;
  buttonRadius: string;
  fontFamily: string;
  title: string;
  description: string; // now HTML
  privacyPolicyUrl: string;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center';
  acceptAllText: string;
  rejectAllText: string;
  customizeText: string;
  necessaryText: string;
  functionalText: string;
  analyticsText: string;
  marketingText: string;
  necessaryScripts: string;
  functionalScripts: string;
  analyticsScripts: string;
  marketingScripts: string;
  // Text size controls
  titleTextSize: string;
  descriptionTextSize: string;
  buttonTextSize: string;
  categoryTextSize: string;
  privacyLinkTextSize: string;
  // Individual button colors
  acceptButtonBg: string;
  acceptButtonText: string;
  rejectButtonBg: string;
  rejectButtonText: string;
  rejectButtonBorder: string;
  customizeButtonBg: string;
  customizeButtonText: string;
  saveButtonBg: string;
  saveButtonText: string;
  cancelButtonBg: string;
  cancelButtonText: string;
  cancelButtonBorder: string;
  // Toggle colors
  toggleActiveColor: string;
  toggleInactiveColor: string;
  modalTitle: string;
  modalNecessaryDescription: string;
  modalFunctionalDescription: string;
  modalAnalyticsDescription: string;
  modalMarketingDescription: string;
  // Add modal category titles and modal button texts
  modalNecessaryTitle: string;
  modalFunctionalTitle: string;
  modalAnalyticsTitle: string;
  modalMarketingTitle: string;
  modalSaveButtonText: string;
  modalCancelButtonText: string;
  // New: icon SVG markup for settings icon
  settingsIconSvg: string;
  modalSubtitle: string; // new, HTML
  cookieStorageDays: number; // new: how long to store consent
}

const Index = () => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(true);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  const [config, setConfig] = useState<WidgetConfig>({
    primaryColor: '#007AFF',
    secondaryColor: '#34C759',
    textColor: '#1D1D1F',
    backgroundColor: '#FFFFFF',
    borderRadius: '8',
    buttonRadius: '6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    title: 'We value your privacy',
    description: '<p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. <a href="https://example.com/privacy-policy" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>',
    privacyPolicyUrl: 'https://example.com/privacy-policy',
    position: 'bottom-right',
    acceptAllText: 'Accept All',
    rejectAllText: 'Reject All',
    customizeText: 'Customize',
    necessaryText: 'Necessary cookies are required for the website to function properly.',
    functionalText: 'Functional cookies help perform certain functionalities like sharing content.',
    analyticsText: 'Analytics cookies help us understand how visitors interact with our website.',
    marketingText: 'Marketing cookies are used to provide visitors with relevant ads.',
    necessaryScripts: '',
    functionalScripts: '',
    analyticsScripts: '',
    marketingScripts: '',
    // Text sizes
    titleTextSize: '18',
    descriptionTextSize: '14',
    buttonTextSize: '14',
    categoryTextSize: '15',
    privacyLinkTextSize: '12',
    // Individual button colors
    acceptButtonBg: '#3B82F6',
    acceptButtonText: '#FFFFFF',
    rejectButtonBg: 'transparent',
    rejectButtonText: '#374151',
    rejectButtonBorder: '#D1D5DB',
    customizeButtonBg: '#1F2937',
    customizeButtonText: '#FFFFFF',
    saveButtonBg: '#3B82F6',
    saveButtonText: '#FFFFFF',
    cancelButtonBg: 'transparent',
    cancelButtonText: '#374151',
    cancelButtonBorder: '#D1D5DB',
    // Toggle colors
    toggleActiveColor: '#3B82F6',
    toggleInactiveColor: '#cccccc',
    modalTitle: 'Customize Cookie Preferences',
    modalNecessaryDescription: 'Necessary cookies are required for the website to function properly.',
    modalFunctionalDescription: 'Functional cookies help perform certain functionalities like sharing content.',
    modalAnalyticsDescription: 'Analytics cookies help us understand how visitors interact with our website.',
    modalMarketingDescription: 'Marketing cookies are used to provide visitors with relevant ads.',
    modalNecessaryTitle: 'Necessary Cookies',
    modalFunctionalTitle: 'Functional Cookies',
    modalAnalyticsTitle: 'Analytics Cookies',
    modalMarketingTitle: 'Marketing Cookies',
    modalSaveButtonText: 'Save Preferences',
    modalCancelButtonText: 'Cancel',
    // Default SVG for the settings icon
    settingsIconSvg: `<svg xmlns="http://www.w3.org/2000/svg" style="width: 60%; height: 60%; display: block; margin: 0 auto;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cookie w-5 h-5 text-white"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>`,
    modalSubtitle: '<p>You can choose which categories of cookies you want to allow. <i>Essential cookies</i> are always enabled.</p>',
    cookieStorageDays: 180, // default 180 days
  });

  // Utility: convert pasted <script> tags into the registerCookieScript pattern
  const convertScriptToRegister = (
    input: string,
    category: 'necessary' | 'functional' | 'analytics' | 'marketing',
  ) => {
    // If it already uses the registerCookieScript pattern, leave untouched
    if (/registerCookieScript\s*\(/i.test(input)) {
      return input.trim();
    }

    // Split input by script tags to handle multiple scripts
    const scripts = input.split(/<\/?script[^>]*>/gi).filter(s => s.trim());
    
    // Convert each script and join them
    return scripts.map(script => {
      const innerCode = script.trim();
      if (!innerCode) return '';
      
      return `// Auto-converted script\nwindow.registerCookieScript('${category}', function() {\n  const script = document.createElement('script');\n  script.async = true;\n  script.setAttribute('data-cookie-script', '${category}');\n  script.innerHTML = \`\n${innerCode}\n  \`;\n  document.head.appendChild(script);\n});`;
    }).join('\n\n');
  };

  // NEW: Ensure scripts without the registration wrapper are converted
  const sanitizeScript = (
    content: string,
    category: 'necessary' | 'functional' | 'analytics' | 'marketing',
  ) => {
    // If it already contains our wrapper, just trim whitespace
    if (/registerCookieScript\s*\(/i.test(content)) {
      return content.trim();
    }
    // If it includes <script> tags or plain JS code, convert it
    if (/<script[^>]*>/i.test(content) || /<\/script>/i.test(content)) {
      return convertScriptToRegister(content, category);
    }
    return content.trim();
  };

  // Generic paste handler for the script Textareas
  const handleScriptPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>,
    category: 'necessary' | 'functional' | 'analytics' | 'marketing',
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const converted = convertScriptToRegister(pasted, category);
    setConfig(prev => ({
      ...prev,
      [`${category}Scripts`]: prev[`${category}Scripts`] 
        ? `${prev[`${category}Scripts`]}`.trim() + '\n\n' + converted
        : converted,
    } as any));
  };

  const generateEmbedCode = () => {
    // Prepare sanitized scripts so that even manually typed code is safe
    const necessaryScripts = sanitizeScript(config.necessaryScripts, 'necessary');
    const functionalScripts = sanitizeScript(config.functionalScripts, 'functional');
    const analyticsScripts = sanitizeScript(config.analyticsScripts, 'analytics');
    const marketingScripts = sanitizeScript(config.marketingScripts, 'marketing');

    const positionStyle = config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;';
    const horizontalStyle = config.position.includes('right') ? 'right: 20px;' : 
                           config.position.includes('left') ? 'left: 20px;' : 
                           'left: 50%; transform: translateX(-50%);';

    const storageDays = config.cookieStorageDays;

    const widgetCode = `<!-- Cookie Consent Widget -->
<div id="cookie-consent-widget" style="
  position: fixed;
  ${positionStyle}
  ${horizontalStyle}
  max-width: min(400px, calc(100vw - 40px));
  width: 100%;
  background: ${config.backgroundColor};
  border: 1px solid #E5E7EB;
  border-radius: ${config.borderRadius}px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: clamp(20px, 5vw, 24px);
  font-family: inherit;
  z-index: 999999;
  display: block;
  box-sizing: border-box;
">
  <h3 style="
    margin: 0 0 16px 0;
    color: ${config.textColor};
    font-size: clamp(${Math.round(parseInt(config.titleTextSize) * 0.9)}px, 4vw, ${config.titleTextSize}px);
    font-weight: 600;
    line-height: 1.3;
    font-family: inherit;
  ">${config.title}</h3>
  <div style="margin: 0 0 20px 0; color: ${config.textColor}; font-size: ${config.descriptionTextSize}px; line-height: 1.5; font-family: inherit;">${config.description}</div>
  <div style="
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    font-family: inherit;
  ">
    <button onclick="acceptAllCookies()" style="
      background: ${config.acceptButtonBg};
      color: ${config.acceptButtonText};
      border: none;
      padding: 8px 16px;
      border-radius: ${config.buttonRadius}px;
      font-size: ${config.buttonTextSize}px;
      font-weight: 500;
      cursor: pointer;
      flex: 1;
      min-width: 80px;
      transition: all 0.2s ease;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
    " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${config.acceptAllText}</button>
    <button onclick="rejectAllCookies()" style="
      background: ${config.rejectButtonBg};
      color: ${config.rejectButtonText};
      border: 1px solid ${config.rejectButtonBorder};
      padding: 8px 16px;
      border-radius: ${config.buttonRadius}px;
      font-size: ${config.buttonTextSize}px;
      font-weight: 500;
      cursor: pointer;
      flex: 1;
      min-width: 80px;
      transition: all 0.2s ease;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
    " onmouseover="this.style.backgroundColor='#F3F4F6'" onmouseout="this.style.backgroundColor='${config.rejectButtonBg}'">${config.rejectAllText}</button>
    <button onclick="openCustomizeModalAndHideWidget()" style="
      background: ${config.customizeButtonBg};
      color: ${config.customizeButtonText};
      border: none;
      padding: 8px 16px;
      border-radius: ${config.buttonRadius}px;
      font-size: ${config.buttonTextSize}px;
      font-weight: 500;
      cursor: pointer;
      flex: 1;
      min-width: 80px;
      transition: all 0.2s ease;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
    " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${config.customizeText}</button>
  </div>
  <div style="text-align: center; font-family: inherit;">
    <a href="${config.privacyPolicyUrl}" target="_blank" style="
      color: ${config.primaryColor};
      font-size: ${config.privacyLinkTextSize}px;
      text-decoration: underline;
      transition: opacity 0.2s ease;
      font-family: inherit;
    " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Privacy Policy</a>
  </div>
</div>

<!-- Cookie Settings Icon (Always visible after consent) -->
<div id="cookie-settings-icon" style="
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  background: ${config.toggleActiveColor};
  border-radius: 50%;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2147483646;
  transition: all 0.3s ease;
  box-sizing: border-box;
  overflow: hidden;
  font-family: inherit;
" onclick="toggleCustomizeModal()" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
  ${config.settingsIconSvg}
</div>

<!-- Customize Modal -->
<div id="cookie-customize-modal" style="
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  font-family: inherit;
">
  <div style="
    background: ${config.backgroundColor};
    border-radius: ${config.borderRadius}px;
    padding: clamp(20px, 5vw, 24px);
    max-width: min(500px, calc(100vw - 40px));
    width: 100%;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    box-sizing: border-box;
    font-family: inherit;
  ">
    <h3 style="
      margin: 0 0 24px 0;
      color: ${config.textColor};
      font-size: clamp(${Math.round(parseInt(config.titleTextSize) * 1.1)}px, 4vw, ${Math.round(parseInt(config.titleTextSize) * 1.2)}px);
      font-weight: 600;
      line-height: 1.3;
      font-family: inherit;
    ">${config.modalTitle}</h3>
    <div style="margin: 0 0 16px 0; color: ${config.textColor}; font-size: clamp(${Math.round(parseInt(config.descriptionTextSize) * 0.9)}px, 3.5vw, ${config.descriptionTextSize}px); line-height: 1.5; font-family: inherit;">${config.modalSubtitle}</div>
    
    <div style="
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #E5E7EB;
      border-radius: ${config.buttonRadius}px;
      font-family: inherit;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 8px;
        font-family: inherit;
      ">
        <strong style="
          color: ${config.textColor};
          font-size: clamp(${Math.round(parseInt(config.categoryTextSize) * 0.9)}px, 3.5vw, ${config.categoryTextSize}px);
          font-family: inherit;
        ">${config.modalNecessaryTitle}</strong>
        <span style="
          background: #10B981;
          color: white;
          padding: 4px 12px;
          border-radius: ${Math.min(parseInt(config.buttonRadius), 12)}px;
          font-size: clamp(${Math.round(parseInt(config.privacyLinkTextSize) * 0.9)}px, 2.5vw, ${config.privacyLinkTextSize}px);
          white-space: nowrap;
          font-family: inherit;
        ">Always Active</span>
      </div>
      <p style="
        margin: 0;
        color: ${config.textColor};
        font-size: clamp(${Math.round(parseInt(config.descriptionTextSize) * 0.85)}px, 3vw, ${Math.round(parseInt(config.descriptionTextSize) * 0.95)}px);
        line-height: 1.4;
        font-family: inherit;
      ">${config.modalNecessaryDescription}</p>
    </div>

    <div style="
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #E5E7EB;
      border-radius: ${config.buttonRadius}px;
      font-family: inherit;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 8px;
        font-family: inherit;
      ">
        <strong style="
          color: ${config.textColor};
          font-size: clamp(${Math.round(parseInt(config.categoryTextSize) * 0.9)}px, 3.5vw, ${config.categoryTextSize}px);
          font-family: inherit;
        ">${config.modalFunctionalTitle}</strong>
        <label class="cookie-toggle" style="
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
          font-family: inherit;
        ">
          <input type="checkbox" id="functional-toggle" checked style="opacity: 0; position: absolute; width: 100%; height: 100%; margin: 0; cursor: pointer; font-family: inherit;">
          <span class="toggle-slider" style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${config.toggleInactiveColor};
            transition: 0.3s;
            border-radius: 26px;
            pointer-events: none;
            font-family: inherit;
          ">
            <span class="toggle-thumb" style="
              position: absolute;
              height: 20px;
              width: 20px;
              left: 3px;
              bottom: 3px;
              background-color: white;
              transition: 0.3s;
              border-radius: 50%;
              font-family: inherit;
            "></span>
          </span>
        </label>
      </div>
      <p style="
        margin: 0;
        color: ${config.textColor};
        font-size: clamp(${Math.round(parseInt(config.descriptionTextSize) * 0.85)}px, 3vw, ${Math.round(parseInt(config.descriptionTextSize) * 0.95)}px);
        line-height: 1.4;
        font-family: inherit;
      ">${config.modalFunctionalDescription}</p>
    </div>

    <div style="
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #E5E7EB;
      border-radius: ${config.buttonRadius}px;
      font-family: inherit;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 8px;
        font-family: inherit;
      ">
        <strong style="
          color: ${config.textColor};
          font-size: clamp(${Math.round(parseInt(config.categoryTextSize) * 0.9)}px, 3.5vw, ${config.categoryTextSize}px);
          font-family: inherit;
        ">${config.modalAnalyticsTitle}</strong>
        <label class="cookie-toggle" style="
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
          font-family: inherit;
        ">
          <input type="checkbox" id="analytics-toggle" checked style="opacity: 0; position: absolute; width: 100%; height: 100%; margin: 0; cursor: pointer; font-family: inherit;">
          <span class="toggle-slider" style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${config.toggleInactiveColor};
            transition: 0.3s;
            border-radius: 26px;
            pointer-events: none;
            font-family: inherit;
          ">
            <span class="toggle-thumb" style="
              position: absolute;
              height: 20px;
              width: 20px;
              left: 3px;
              bottom: 3px;
              background-color: white;
              transition: 0.3s;
              border-radius: 50%;
              font-family: inherit;
            "></span>
          </span>
        </label>
      </div>
      <p style="
        margin: 0;
        color: ${config.textColor};
        font-size: clamp(${Math.round(parseInt(config.descriptionTextSize) * 0.85)}px, 3vw, ${Math.round(parseInt(config.descriptionTextSize) * 0.95)}px);
        line-height: 1.4;
        font-family: inherit;
      ">${config.modalAnalyticsDescription}</p>
    </div>

    <div style="
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #E5E7EB;
      border-radius: ${config.buttonRadius}px;
      font-family: inherit;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 8px;
        font-family: inherit;
      ">
        <strong style="
          color: ${config.textColor};
          font-size: clamp(${Math.round(parseInt(config.categoryTextSize) * 0.9)}px, 3.5vw, ${config.categoryTextSize}px);
          font-family: inherit;
        ">${config.modalMarketingTitle}</strong>
        <label class="cookie-toggle" style="
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
          flex-shrink: 0;
          cursor: pointer;
          font-family: inherit;
        ">
          <input type="checkbox" id="marketing-toggle" checked style="opacity: 0; position: absolute; width: 100%; height: 100%; margin: 0; cursor: pointer; font-family: inherit;">
          <span class="toggle-slider" style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${config.toggleInactiveColor};
            transition: 0.3s;
            border-radius: 26px;
            pointer-events: none;
            font-family: inherit;
          ">
            <span class="toggle-thumb" style="
              position: absolute;
              height: 20px;
              width: 20px;
              left: 3px;
              bottom: 3px;
              background-color: white;
              transition: 0.3s;
              border-radius: 50%;
              font-family: inherit;
            "></span>
          </span>
        </label>
      </div>
      <p style="
        margin: 0;
        color: ${config.textColor};
        font-size: clamp(${Math.round(parseInt(config.descriptionTextSize) * 0.85)}px, 3vw, ${Math.round(parseInt(config.descriptionTextSize) * 0.95)}px);
        line-height: 1.4;
        font-family: inherit;
      ">${config.modalMarketingDescription}</p>
    </div>

    <div style="
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      font-family: inherit;
    ">
      <button onclick="saveCustomPreferences()" style="
        background: ${config.saveButtonBg};
        color: ${config.saveButtonText};
        border: none;
        padding: 12px 20px;
        border-radius: ${config.buttonRadius}px;
        font-size: clamp(${Math.round(parseInt(config.buttonTextSize) * 0.9)}px, 3.5vw, ${config.buttonTextSize}px);
        font-weight: 500;
        cursor: pointer;
        flex: 1;
        min-width: 120px;
        transition: all 0.2s ease;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
      " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${config.modalSaveButtonText}</button>
      <button onclick="cancelCustomizeModal()" style="
        background: ${config.cancelButtonBg};
        color: ${config.cancelButtonText};
        border: 1px solid ${config.cancelButtonBorder};
        padding: 12px 20px;
        border-radius: ${config.buttonRadius}px;
        font-size: clamp(${Math.round(parseInt(config.buttonTextSize) * 0.9)}px, 3.5vw, ${config.buttonTextSize}px);
        font-weight: 500;
        cursor: pointer;
        min-width: 80px;
        transition: all 0.2s ease;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
      " onmouseover="this.style.backgroundColor='#F3F4F6'" onmouseout="this.style.backgroundColor='${config.cancelButtonBg}'">${config.modalCancelButtonText}</button>
    </div>
  </div>
</div>

<style>
@media (max-width: 640px) {
  #cookie-consent-widget {
    bottom: 10px !important;
    left: 10px !important;
    right: 10px !important;
    max-width: none !important;
    transform: none !important;
  }
  #cookie-consent-widget div[style*="flex"] button {
    flex-basis: 100% !important;
    margin-bottom: 8px !important;
  }
  #cookie-customize-modal > div {
    margin: 10px !important;
    max-height: calc(100vh - 20px) !important;
  }
  #cookie-settings-icon {
    bottom: 10px !important;
    left: 10px !important;
    width: 45px !important;
    height: 45px !important;
    min-width: 45px !important;
    min-height: 45px !important;
  }
}
#cookie-settings-icon {
  z-index: 2147483646 !important;
}
#cookie-consent-widget {
  z-index: 2147483646 !important;
}
.cookie-toggle input:checked + .toggle-slider {
  background-color: ${config.toggleActiveColor} !important;
}

.cookie-toggle input:checked + .toggle-slider .toggle-thumb {
  transform: translateX(24px) !important;
}
</style>

<script>
// Global variable to store script loading functions
window.cookieScriptLoaders = {
  necessary: [],
  functional: [],
  analytics: [],
  marketing: []
};

// Function to register scripts for different categories
window.registerCookieScript = function(category, scriptFunction) {
  if (window.cookieScriptLoaders[category]) {
    window.cookieScriptLoaders[category].push(scriptFunction);
  }
};

// Execute user-registered scripts
${config.necessaryScripts}

${config.functionalScripts}

${config.analyticsScripts}

${config.marketingScripts}

// Script execution functions
function executeScripts(consent) {
  // Remove existing dynamic scripts
  const existingScripts = document.querySelectorAll('[data-cookie-script]');
  existingScripts.forEach(script => script.remove());

  // Always execute necessary scripts
  if (consent.necessary) {
    window.cookieScriptLoaders.necessary.forEach(function(scriptFunction) {
      try {
        scriptFunction();
      } catch (e) {
        console.error('Error executing necessary script:', e);
      }
    });
    console.log("Necessary cookies enabled");
  }

  // Execute functional scripts if consented
  if (consent.functional) {
    window.cookieScriptLoaders.functional.forEach(function(scriptFunction) {
      try {
        scriptFunction();
      } catch (e) {
        console.error('Error executing functional script:', e);
      }
    });
    console.log("Functional cookies enabled");
  }

  // Execute analytics scripts if consented
  if (consent.analytics) {
    window.cookieScriptLoaders.analytics.forEach(function(scriptFunction) {
      try {
        scriptFunction();
      } catch (e) {
        console.error('Error executing analytics script:', e);
      }
    });
    console.log("Analytics cookies enabled");
  }

  // Execute marketing scripts if consented
  if (consent.marketing) {
    window.cookieScriptLoaders.marketing.forEach(function(scriptFunction) {
      try {
        scriptFunction();
      } catch (e) {
        console.error('Error executing marketing script:', e);
      }
    });
    console.log("Marketing cookies enabled");
  }
}

function getConsentExpiry(days) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

function acceptAllCookies() {
  const consent = {
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true,
    timestamp: Date.now(),
    expires: getConsentExpiry(${storageDays})
  };
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
  executeScripts(consent);
  hideWidget();
  showCookieIcon();
}

function rejectAllCookies() {
  const consent = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    expires: getConsentExpiry(${storageDays})
  };
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
  executeScripts(consent);
  hideWidget();
  showCookieIcon();
}

function openCustomizeModalAndHideWidget() {
  document.getElementById('cookie-customize-modal').style.display = 'flex';
  document.getElementById('cookie-consent-widget').style.display = 'none';
  // Set all toggles to checked by default unless user has preferences
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent) {
    const consent = JSON.parse(savedConsent);
    document.getElementById('functional-toggle').checked = consent.functional !== undefined ? consent.functional : true;
    document.getElementById('analytics-toggle').checked = consent.analytics !== undefined ? consent.analytics : true;
    document.getElementById('marketing-toggle').checked = consent.marketing !== undefined ? consent.marketing : true;
  } else {
    document.getElementById('functional-toggle').checked = true;
    document.getElementById('analytics-toggle').checked = true;
    document.getElementById('marketing-toggle').checked = true;
  }
  updateAllToggles();
}

function cancelCustomizeModal() {
  document.getElementById('cookie-customize-modal').style.display = 'none';
  // Only show widget if consent does not exist
  const savedConsent = localStorage.getItem('cookieConsent');
  if (!savedConsent) {
    document.getElementById('cookie-consent-widget').style.display = 'block';
  }
}

function toggleCustomizeModal() {
  const modal = document.getElementById('cookie-customize-modal');
  const isVisible = modal.style.display === 'flex';
  modal.style.display = isVisible ? 'none' : 'flex';
  if (!isVisible) {
    // Load current preferences when opening modal
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      const consent = JSON.parse(savedConsent);
      document.getElementById('functional-toggle').checked = consent.functional !== undefined ? consent.functional : true;
      document.getElementById('analytics-toggle').checked = consent.analytics !== undefined ? consent.analytics : true;
      document.getElementById('marketing-toggle').checked = consent.marketing !== undefined ? consent.marketing : true;
    } else {
      document.getElementById('functional-toggle').checked = true;
      document.getElementById('analytics-toggle').checked = true;
      document.getElementById('marketing-toggle').checked = true;
    }
    updateAllToggles();
  }
}

function saveCustomPreferences() {
  const functional = document.getElementById('functional-toggle').checked;
  const analytics = document.getElementById('analytics-toggle').checked;
  const marketing = document.getElementById('marketing-toggle').checked;
  const consent = {
    necessary: true,
    functional: functional,
    analytics: analytics,
    marketing: marketing,
    timestamp: Date.now(),
    expires: getConsentExpiry(${storageDays})
  };
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
  executeScripts(consent);
  hideWidget();
  showCookieIcon();
  document.getElementById('cookie-customize-modal').style.display = 'none';
}

function hideWidget() {
  document.getElementById('cookie-consent-widget').style.display = 'none';
}

function showCookieIcon() {
  document.getElementById('cookie-settings-icon').style.display = 'flex';
}

function updateAllToggles() {
  const toggles = document.querySelectorAll('.cookie-toggle');
  toggles.forEach(function(toggle) {
    const input = toggle.querySelector('input');
    const slider = toggle.querySelector('.toggle-slider');
    updateToggleAppearance(input, slider);
  });
}

function updateToggleAppearance(input, slider) {
  const thumb = slider.querySelector('.toggle-thumb');
  if (input.checked) {
    slider.style.backgroundColor = '${config.toggleActiveColor}';
    thumb.style.transform = 'translateX(24px)';
  } else {
    slider.style.backgroundColor = '${config.toggleInactiveColor}';
    thumb.style.transform = 'translateX(0)';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if consent already exists
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent) {
    const consent = JSON.parse(savedConsent);
    if (consent.expires && Date.now() > consent.expires) {
      // Expired: clear and show widget
      localStorage.removeItem('cookieConsent');
      document.getElementById('cookie-consent-widget').style.display = 'block';
      document.getElementById('cookie-settings-icon').style.display = 'none';
    } else {
      executeScripts(consent);
      hideWidget();
      showCookieIcon();
    }
  }

  // Enhanced toggle functionality
  const toggles = document.querySelectorAll('.cookie-toggle');
  toggles.forEach(function(toggle) {
    const input = toggle.querySelector('input');
    const slider = toggle.querySelector('.toggle-slider');
    
    // Handle click on the entire toggle
    slider.addEventListener('click', function() {
      input.checked = !input.checked;
      updateToggleAppearance(input, slider);
    });
    
    // Handle direct input change
    input.addEventListener('change', function() {
      updateToggleAppearance(input, slider);
    });
    
    // Initialize appearance
    updateToggleAppearance(input, slider);
  });
});
</script>`;
    return widgetCode.trim();
  };

  const copyEmbedCode = async () => {
    const code = generateEmbedCode();
    await navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Enhanced widget code with individual styling controls"
    });
  };

  const getPositionStyles = () => {
    switch (config.position) {
      case 'bottom-left':
        return {
          bottom: '20px',
          left: '20px'
        };
      case 'bottom-right':
        return {
          bottom: '20px',
          right: '20px'
        };
      case 'top-left':
        return {
          top: '20px',
          left: '20px'
        };
      case 'top-right':
        return {
          top: '20px',
          right: '20px'
        };
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      default:
        return {
          bottom: '20px',
          right: '20px'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-[#F2F2F7]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-[#38383A] bg-[#1C1C1E]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-[#007AFF] to-[#5856D6] rounded-lg flex items-center justify-center shadow-sm">
                <Cookie className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-[17px] font-semibold text-[#F2F2F7] tracking-tight">Cookie Consent Builder</h1>
                <p className="text-[13px] text-[#8E8E93] -mt-0.5">Privacy-first widget generator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-69px)]">
        {/* Left Panel - Configuration */}
        <div className="bg-[#2C2C2E]/60 w-[420px] border-r border-[#38383A] bg-[#1C1C1E] overflow-y-auto">
          <div>
            <Card className="bg-transparent border-none">
              <CardHeader className="pb-3 pt-4 px-5">
                <CardTitle className="flex items-center space-x-2.5 text-[#F2F2F7] text-[16px] font-semibold">
                  <Settings className="w-4 h-4 text-[#007AFF]" />
                  <span>Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Tabs defaultValue="styling" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-[#1C1C1E] rounded-lg px-1 border border-[#38383A]">
                    <TabsTrigger 
                      value="styling" 
                      className="data-[state=active]:bg-[#007AFF] data-[state=active]:text-white text-[#8E8E93] data-[state=active]:shadow-sm rounded-md transition-all text-[12px] font-medium py-2"
                    >
                      <Palette className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger 
                      value="typography" 
                      className="data-[state=active]:bg-[#007AFF] data-[state=active]:text-white text-[#8E8E93] data-[state=active]:shadow-sm rounded-md transition-all text-[10px] font-medium py-2"
                    >
                      T
                    </TabsTrigger>
                    <TabsTrigger 
                      value="buttons" 
                      className="data-[state=active]:bg-[#007AFF] data-[state=active]:text-white text-[#8E8E93] data-[state=active]:shadow-sm rounded-md transition-all text-[10px] font-medium py-2"
                    >
                      B
                    </TabsTrigger>
                    <TabsTrigger 
                      value="content" 
                      className="data-[state=active]:bg-[#007AFF] data-[state=active]:text-white text-[#8E8E93] data-[state=active]:shadow-sm rounded-md transition-all text-[12px] font-medium py-2"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger 
                      value="scripts" 
                      className="data-[state=active]:bg-[#007AFF] data-[state=active]:text-white text-[#8E8E93] data-[state=active]:shadow-sm rounded-md transition-all text-[12px] font-medium py-2"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="styling" className="space-y-5 mt-5">
                    <div className="space-y-4">
                      <ColorSelector
                        label="Primary Color"
                        value={config.primaryColor}
                        onChange={color => setConfig({ ...config, primaryColor: color })}
                        onClear={() => setConfig({ ...config, primaryColor: "#007AFF" })}
                      />
                      <ColorSelector
                        label="Secondary Color"
                        value={config.secondaryColor}
                        onChange={color => setConfig({ ...config, secondaryColor: color })}
                        onClear={() => setConfig({ ...config, secondaryColor: "#34C759" })}
                      />
                      <ColorSelector
                        label="Text Color"
                        value={config.textColor}
                        onChange={color => setConfig({ ...config, textColor: color })}
                        onClear={() => setConfig({ ...config, textColor: "#1D1D1F" })}
                      />
                      <ColorSelector
                        label="Background Color"
                        value={config.backgroundColor}
                        onChange={color => setConfig({ ...config, backgroundColor: color })}
                        onClear={() => setConfig({ ...config, backgroundColor: "#FFFFFF" })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="borderRadius" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Border Radius</Label>
                        <Input 
                          id="borderRadius" 
                          type="number" 
                          value={config.borderRadius} 
                          onChange={e => setConfig({...config, borderRadius: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonRadius" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Button Radius</Label>
                        <Input 
                          id="buttonRadius" 
                          type="number" 
                          value={config.buttonRadius} 
                          onChange={e => setConfig({...config, buttonRadius: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="position" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Position</Label>
                      <select 
                        className="w-full p-2.5 border border-[#48484A] rounded-lg bg-[#1C1C1E] text-[#F2F2F7] text-[14px] focus:border-[#007AFF] focus:outline-none appearance-none cursor-pointer" 
                        value={config.position} 
                        onChange={e => setConfig({...config, position: e.target.value as any})}
                      >
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="top-left">Top Left</option>
                        <option value="center">Center</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[#F2F2F7] text-[14px] font-medium">Toggle Colors</h4>
                      <ColorSelector
                        label="Toggle Active Color"
                        value={config.toggleActiveColor}
                        onChange={color => setConfig({ ...config, toggleActiveColor: color })}
                        onClear={() => setConfig({ ...config, toggleActiveColor: "#3B82F6" })}
                      />
                      <ColorSelector
                        label="Toggle Inactive Color"
                        value={config.toggleInactiveColor}
                        onChange={color => setConfig({ ...config, toggleInactiveColor: color })}
                        onClear={() => setConfig({ ...config, toggleInactiveColor: "#cccccc" })}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-5 mt-5">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="titleTextSize" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Title Text Size (px)</Label>
                        <Input 
                          id="titleTextSize" 
                          type="number" 
                          value={config.titleTextSize} 
                          onChange={e => setConfig({...config, titleTextSize: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="descriptionTextSize" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Description Text Size (px)</Label>
                        <Input 
                          id="descriptionTextSize" 
                          type="number" 
                          value={config.descriptionTextSize} 
                          onChange={e => setConfig({...config, descriptionTextSize: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonTextSize" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Button Text Size (px)</Label>
                        <Input 
                          id="buttonTextSize" 
                          type="number" 
                          value={config.buttonTextSize} 
                          onChange={e => setConfig({...config, buttonTextSize: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryTextSize" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Category Text Size (px)</Label>
                        <Input 
                          id="categoryTextSize" 
                          type="number" 
                          value={config.categoryTextSize} 
                          onChange={e => setConfig({...config, categoryTextSize: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="privacyLinkTextSize" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Privacy Link Text Size (px)</Label>
                        <Input 
                          id="privacyLinkTextSize" 
                          type="number" 
                          value={config.privacyLinkTextSize} 
                          onChange={e => setConfig({...config, privacyLinkTextSize: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="buttons" className="space-y-5 mt-5">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-[#F2F2F7] text-[14px] font-medium mb-4">Accept Button</h4>
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Accept Button BG"
                                value={config.acceptButtonBg}
                                onChange={color => setConfig({ ...config, acceptButtonBg: color })}
                                onClear={() => setConfig({ ...config, acceptButtonBg: "#3B82F6" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Accept Button Text"
                                value={config.acceptButtonText}
                                onChange={color => setConfig({ ...config, acceptButtonText: color })}
                                onClear={() => setConfig({ ...config, acceptButtonText: "#FFFFFF" })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#F2F2F7] text-[14px] font-medium mb-4 mt-8">Reject Button</h4>
                        <div className="flex flex-col gap-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Reject Button BG"
                                value={config.rejectButtonBg}
                                onChange={color => setConfig({ ...config, rejectButtonBg: color })}
                                onClear={() => setConfig({ ...config, rejectButtonBg: "transparent" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Reject Button Text"
                                value={config.rejectButtonText}
                                onChange={color => setConfig({ ...config, rejectButtonText: color })}
                                onClear={() => setConfig({ ...config, rejectButtonText: "#374151" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Reject Button Border"
                                value={config.rejectButtonBorder}
                                onChange={color => setConfig({ ...config, rejectButtonBorder: color })}
                                onClear={() => setConfig({ ...config, rejectButtonBorder: "#D1D5DB" })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#F2F2F7] text-[14px] font-medium mb-4 mt-8">Customize Button</h4>
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Customize Button BG"
                                value={config.customizeButtonBg}
                                onChange={color => setConfig({ ...config, customizeButtonBg: color })}
                                onClear={() => setConfig({ ...config, customizeButtonBg: "#1F2937" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Customize Button Text"
                                value={config.customizeButtonText}
                                onChange={color => setConfig({ ...config, customizeButtonText: color })}
                                onClear={() => setConfig({ ...config, customizeButtonText: "#FFFFFF" })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#38383A]" />

                      <div>
                        <h4 className="text-[#F2F2F7] text-[14px] font-medium mb-4">Save Button (Modal)</h4>
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Save Button BG"
                                value={config.saveButtonBg}
                                onChange={color => setConfig({ ...config, saveButtonBg: color })}
                                onClear={() => setConfig({ ...config, saveButtonBg: "#3B82F6" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Save Button Text"
                                value={config.saveButtonText}
                                onChange={color => setConfig({ ...config, saveButtonText: color })}
                                onClear={() => setConfig({ ...config, saveButtonText: "#FFFFFF" })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#F2F2F7] text-[14px] font-medium mb-4 mt-8">Cancel Button (Modal)</h4>
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Cancel Button BG"
                                value={config.cancelButtonBg}
                                onChange={color => setConfig({ ...config, cancelButtonBg: color })}
                                onClear={() => setConfig({ ...config, cancelButtonBg: "transparent" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Cancel Button Text"
                                value={config.cancelButtonText}
                                onChange={color => setConfig({ ...config, cancelButtonText: color })}
                                onClear={() => setConfig({ ...config, cancelButtonText: "#374151" })}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <ColorSelector
                                label="Cancel Button Border"
                                value={config.cancelButtonBorder}
                                onChange={color => setConfig({ ...config, cancelButtonBorder: color })}
                                onClear={() => setConfig({ ...config, cancelButtonBorder: "#D1D5DB" })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-5 mt-5">
                    <div>
                      <Label htmlFor="title" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Widget Title</Label>
                      <Input 
                        id="title" 
                        value={config.title} 
                        onChange={e => setConfig({...config, title: e.target.value})}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Description</Label>
                      <ReactQuill
                        id="description"
                        theme="snow"
                        value={config.description}
                        onChange={value => setConfig({...config, description: value})}
                        modules={{ toolbar: [['bold', 'italic', 'underline', 'link']] }}
                        className="border-[#48484A] rounded-lg text-[#1C1C1E]"
                        style={{ minHeight: 120, marginBottom: 8}}
                      />
                      <p className="text-[13px] text-[#8E8E93] mt-1">Supports <b>links</b>, <u>underline</u>, and <i>italic</i>.</p>
                    </div>
                    <div>
                      <Label htmlFor="privacyPolicyUrl" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Privacy Policy URL</Label>
                      <Input 
                        id="privacyPolicyUrl" 
                        value={config.privacyPolicyUrl} 
                        onChange={e => setConfig({...config, privacyPolicyUrl: e.target.value})}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <Separator className="bg-[#38383A]" />
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="acceptAllText" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Accept Button Text</Label>
                        <Input 
                          id="acceptAllText" 
                          value={config.acceptAllText} 
                          onChange={e => setConfig({...config, acceptAllText: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rejectAllText" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Reject Button Text</Label>
                        <Input 
                          id="rejectAllText" 
                          value={config.rejectAllText} 
                          onChange={e => setConfig({...config, rejectAllText: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customizeText" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Customize Button Text</Label>
                        <Input 
                          id="customizeText" 
                          value={config.customizeText} 
                          onChange={e => setConfig({...config, customizeText: e.target.value})}
                          className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                        />
                      </div>
                    </div>
                    <Separator className="bg-[#38383A]" />
                    <div>
                      <Label htmlFor="modalTitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Modal Title</Label>
                      <Input
                        id="modalTitle"
                        value={config.modalTitle}
                        onChange={e => setConfig({ ...config, modalTitle: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalNecessaryDescription" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Necessary Cookies Description</Label>
                      <Textarea
                        id="modalNecessaryDescription"
                        value={config.modalNecessaryDescription}
                        onChange={e => setConfig({ ...config, modalNecessaryDescription: e.target.value })}
                        rows={2}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalFunctionalDescription" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Functional Cookies Description</Label>
                      <Textarea
                        id="modalFunctionalDescription"
                        value={config.modalFunctionalDescription}
                        onChange={e => setConfig({ ...config, modalFunctionalDescription: e.target.value })}
                        rows={2}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalAnalyticsDescription" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Analytics Cookies Description</Label>
                      <Textarea
                        id="modalAnalyticsDescription"
                        value={config.modalAnalyticsDescription}
                        onChange={e => setConfig({ ...config, modalAnalyticsDescription: e.target.value })}
                        rows={2}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalMarketingDescription" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Marketing Cookies Description</Label>
                      <Textarea
                        id="modalMarketingDescription"
                        value={config.modalMarketingDescription}
                        onChange={e => setConfig({ ...config, modalMarketingDescription: e.target.value })}
                        rows={2}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>
                    <Separator className="bg-[#38383A]" />
                    <div>
                      <Label htmlFor="modalNecessaryTitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Necessary Category Title</Label>
                      <Input
                        id="modalNecessaryTitle"
                        value={config.modalNecessaryTitle}
                        onChange={e => setConfig({ ...config, modalNecessaryTitle: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalFunctionalTitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Functional Category Title</Label>
                      <Input
                        id="modalFunctionalTitle"
                        value={config.modalFunctionalTitle}
                        onChange={e => setConfig({ ...config, modalFunctionalTitle: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalAnalyticsTitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Analytics Category Title</Label>
                      <Input
                        id="modalAnalyticsTitle"
                        value={config.modalAnalyticsTitle}
                        onChange={e => setConfig({ ...config, modalAnalyticsTitle: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalMarketingTitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Marketing Category Title</Label>
                      <Input
                        id="modalMarketingTitle"
                        value={config.modalMarketingTitle}
                        onChange={e => setConfig({ ...config, modalMarketingTitle: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <Separator className="bg-[#38383A]" />
                    <div>
                      <Label htmlFor="modalSaveButtonText" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Save Button Text (Modal)</Label>
                      <Input
                        id="modalSaveButtonText"
                        value={config.modalSaveButtonText}
                        onChange={e => setConfig({ ...config, modalSaveButtonText: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modalCancelButtonText" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Cancel Button Text (Modal)</Label>
                      <Input
                        id="modalCancelButtonText"
                        value={config.modalCancelButtonText}
                        onChange={e => setConfig({ ...config, modalCancelButtonText: e.target.value })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                    </div>
                    <Separator className="bg-[#38383A]" />
                    <div>
                      <Label htmlFor="settingsIconSvg" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Settings Icon SVG (for the floating button)</Label>
                      <Textarea
                        id="settingsIconSvg"
                        value={config.settingsIconSvg}
                        onChange={e => setConfig({ ...config, settingsIconSvg: e.target.value })}
                        rows={5}
                        className="font-mono text-[12px] bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg focus:border-[#007AFF] focus:ring-0 resize-none"
                        placeholder="Paste your SVG markup here"
                      />
                      <p className="text-[13px] text-[#8E8E93] mt-1">Paste a valid SVG element. The default is a cookie icon. Only the SVG markup will be rendered inside the floating settings button.</p>
                    </div>
                    <div>
                      <Label htmlFor="modalSubtitle" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Modal Subtitle/Description (under title)</Label>
                      <ReactQuill
                        id="modalSubtitle"
                        theme="snow"
                        value={config.modalSubtitle}
                        onChange={value => setConfig({...config, modalSubtitle: value})}
                        modules={{ toolbar: [['bold', 'italic', 'underline', 'link']] }}
                        className="quill-rich text-[#1C1C1E] border-none"
                        style={{ minHeight: 100, marginBottom: 8}}
                      />
                      <p className="text-[13px] text-[#8E8E93] mt-1">Supports <b>links</b>, <u>underline</u>, and <i>italic</i>.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="scripts" className="space-y-5 mt-5">
                    <div>
                      <Label htmlFor="cookieStorageDays" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Cookie Storage Time (days)</Label>
                      <Input
                        id="cookieStorageDays"
                        type="number"
                        min={1}
                        value={config.cookieStorageDays}
                        onChange={e => setConfig({ ...config, cookieStorageDays: Number(e.target.value) })}
                        className="bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg text-[14px] focus:border-[#007AFF] focus:ring-0"
                      />
                      <p className="text-[13px] text-[#8E8E93] mt-1">How long to remember user consent before asking again.</p>
                    </div>
                    <div className="bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 p-4 rounded-xl">
                      <h4 className="font-medium text-[#FF9F0A] mb-2 text-[14px]">Improved Script Management</h4>
                      <p className="text-[13px] text-[#FF9F0A]/80 leading-relaxed">
                        Scripts are now registered using functions to avoid tag conflicts. Use the `window.registerCookieScript()` pattern.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="necessaryScripts" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Necessary Scripts</Label>
                      <p className="text-[13px] text-[#8E8E93] mb-2">Scripts required for basic functionality (always executed)</p>
                      <Textarea 
                        id="necessaryScripts" 
                        value={config.necessaryScripts} 
                        onChange={e => setConfig({...config, necessaryScripts: e.target.value})}
                        onPaste={e => handleScriptPaste(e, 'necessary')}
                        rows={6} 
                        className="font-mono text-[12px] bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="functionalScripts" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Functional Scripts</Label>
                      <p className="text-[13px] text-[#8E8E93] mb-2">Scripts for enhanced functionality</p>
                      <Textarea 
                        id="functionalScripts" 
                        value={config.functionalScripts} 
                        onChange={e => setConfig({...config, functionalScripts: e.target.value})}
                        onPaste={e => handleScriptPaste(e, 'functional')}
                        rows={6} 
                        className="font-mono text-[12px] bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="analyticsScripts" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Analytics Scripts</Label>
                      <p className="text-[13px] text-[#8E8E93] mb-2">Analytics and performance tracking scripts</p>
                      <Textarea 
                        id="analyticsScripts" 
                        value={config.analyticsScripts} 
                        onChange={e => setConfig({...config, analyticsScripts: e.target.value})}
                        onPaste={e => handleScriptPaste(e, 'analytics')}
                        rows={6} 
                        className="font-mono text-[12px] bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketingScripts" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Marketing Scripts</Label>
                      <p className="text-[13px] text-[#8E8E93] mb-2">Marketing and advertising scripts</p>
                      <Textarea 
                        id="marketingScripts" 
                        value={config.marketingScripts} 
                        onChange={e => setConfig({...config, marketingScripts: e.target.value})}
                        onPaste={e => handleScriptPaste(e, 'marketing')}
                        rows={6} 
                        className="font-mono text-[12px] bg-[#1C1C1E] border-[#48484A] text-[#F2F2F7] rounded-lg focus:border-[#007AFF] focus:ring-0 resize-none"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="embed" className="space-y-5 mt-5">
                    <div className="bg-[#2C2C2E] border border-[#48484A] p-4 rounded-xl">
                      <h4 className="font-medium text-[#F2F2F7] mb-3 text-[14px]">Implementation Guide</h4>
                      <ol className="text-[13px] text-[#8E8E93] space-y-1.5 leading-relaxed">
                        <li>1. Customize your widget using the configuration tabs</li>
                        <li>2. Add your tracking scripts using the registration pattern</li>
                        <li>3. Preview your widget in real-time on the right</li>
                        <li>4. Copy the embed code and paste it before &lt;/body&gt;</li>
                        <li>5. Scripts will load based on user consent - no conflicts!</li>
                      </ol>
                    </div>

                    <div>
                      <Label htmlFor="embedCode" className="text-[#F2F2F7] text-[14px] font-medium mb-2 block">Embed Code</Label>
                      <Textarea 
                        id="embedCode" 
                        value={generateEmbedCode()} 
                        readOnly 
                        rows={8} 
                        className="font-mono text-[11px] bg-[#1C1C1E] border-[#48484A] text-[#8E8E93] rounded-lg resize-none cursor-text"
                      />
                    </div>

                    <Button 
                      onClick={copyEmbedCode} 
                      className="w-full bg-[#007AFF] hover:bg-[#0056CC] text-white border-0 rounded-lg text-[14px] font-medium py-2.5 shadow-sm transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Embed Code
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-[#1C1C1E]">
          <div>
            <Card className="bg-transparent border-none ">
              <CardHeader className="pb-3 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2.5 text-[#F2F2F7] text-[16px] font-semibold">
                    <Eye className="w-4 h-4 text-[#007AFF]" />
                    <span>Live Preview</span>
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    <Switch 
                      checked={showPreview} 
                      onCheckedChange={setShowPreview} 
                      className="data-[state=checked]:bg-[#007AFF]"
                    />
                    <Label className="text-[#8E8E93] text-[14px] font-medium">Show Widget</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="relative bg-transparent rounded-xl overflow-hidden border border-[#48484A] shadow-inner" style={{minHeight: '500px'}}>
                  {/* Mock website content */}
                  <div className="p-8 text-center">
                    <h3 className="text-[20px] font-semibold text-[#F2F2F7] mb-4 tracking-tight">Your Website Preview</h3>
                    <p className="text-[#8E8E93] mb-6 text-[14px] leading-relaxed">This is how your cookie consent widget will appear on your website.</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#2C2C2E]/80 p-4 rounded-xl border border-[#48484A]">
                        <div className="h-3 bg-[#48484A] rounded-md mb-3"></div>
                        <div className="h-2.5 bg-[#3A3A3C] rounded-md"></div>
                      </div>
                      <div className="bg-[#2C2C2E]/80 p-4 rounded-xl border border-[#48484A]">
                        <div className="h-3 bg-[#48484A] rounded-md mb-3"></div>
                        <div className="h-2.5 bg-[#3A3A3C] rounded-md"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cookie Widget Preview */}
                  {showPreview && (
                    <>
                      <div 
                        className="absolute max-w-sm shadow-2xl transition-all duration-300 backdrop-blur-xl"
                        style={{
                          ...getPositionStyles(),
                          backgroundColor: config.backgroundColor,
                          borderRadius: `${config.borderRadius}px`,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '20px',
                          fontFamily: config.fontFamily,
                          zIndex: 10,
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        <h3 className="font-semibold mb-3 tracking-tight" style={{
                          color: config.textColor,
                          fontSize: `${config.titleTextSize}px`
                        }}>
                          {config.title}
                        </h3>
                        {config.description && (
                          <div
                            className="mb-4"
                            style={{ color: config.textColor, fontSize: `${config.descriptionTextSize}px`, lineHeight: 1.5, fontFamily: config.fontFamily }}
                            dangerouslySetInnerHTML={{ __html: config.description }}
                          />
                        )}
                        <div className="flex gap-2.5 flex-wrap mb-4">
                          <Button 
                            size="sm" 
                            className="font-medium px-4 py-2 shadow-sm transition-all hover:scale-105"
                            style={{
                              backgroundColor: config.acceptButtonBg,
                              color: config.acceptButtonText,
                              flex: 1,
                              minWidth: '80px',
                              borderRadius: `${config.buttonRadius}px`,
                              border: 'none',
                              fontSize: `${config.buttonTextSize}px`
                            }}
                          >
                            {config.acceptAllText}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="font-medium px-4 py-2 shadow-sm transition-all hover:scale-105"
                            style={{
                              color: config.rejectButtonText,
                              borderColor: config.rejectButtonBorder,
                              backgroundColor: config.rejectButtonBg,
                              flex: 1,
                              minWidth: '80px',
                              borderRadius: `${config.buttonRadius}px`,
                              fontSize: `${config.buttonTextSize}px`
                            }}
                          >
                            {config.rejectAllText}
                          </Button>
                          <Button 
                            size="sm" 
                            className="font-medium px-4 py-2 shadow-sm transition-all hover:scale-105"
                            style={{
                              backgroundColor: config.customizeButtonBg,
                              color: config.customizeButtonText,
                              flex: 1,
                              minWidth: '80px',
                              borderRadius: `${config.buttonRadius}px`,
                              border: 'none',
                              fontSize: `${config.buttonTextSize}px`
                            }}
                          >
                            {config.customizeText}
                          </Button>
                        </div>
                        <div className="text-center">
                          <a href="#" className="font-medium" style={{
                            color: config.primaryColor, 
                            textDecoration: 'none',
                            fontSize: `${config.privacyLinkTextSize}px`
                          }}>
                            Privacy Policy
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Button 
                    onClick={copyEmbedCode} 
                    size="sm"
                    className="bg-[#007AFF] hover:bg-[#0056CC] text-white border-0 rounded-lg text-[13px] font-medium px-3 py-2 shadow-sm transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

