'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../ui/layout';
import { ArrowLeft, Link as LinkIcon, Globe, Code, Image, DollarSign, FileText, Share2, Check, Edit3, Loader2, Zap, ExternalLink, AlertTriangle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas-pro';


interface WebsiteData {
  title?: string;
  description?: string;
  siteName?: string;
  favicon?: string;
  image?: string;
  domain?: string;
  type?: string;
  isResponsive?: boolean;
  author?: string;
  proxyUrls?: string[]; // Array of proxy URLs to try for iframe loading
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
  };
  url?: string;
  status?: 'success' | 'error' | 'loading';
  error?: string;
  canEmbed?: boolean; // Whether the website can be embedded in iframe
}

const supportedTypes = [
  { icon: Globe, label: 'Websites', color: '#6A49FC' },
  { icon: Code, label: 'Documentation', color: '#51A2FF' },
  { icon: Image, label: 'Portfolios', color: '#C27AFF' },
  { icon: DollarSign, label: 'E-commerce', color: '#05DF72' },
  { icon: FileText, label: 'Blogs', color: '#FCC800' },
  { icon: Share2, label: 'Social Media', color: '#FB64B6' },
];

const examples = [
  { label: 'Invena Creative', url: 'https://html.themewant.com/invena/onepage-one.html' },
  { label: 'Redox Agency', url: 'https://html.ravextheme.com/redox/light/design-agency.html' },
  { label: 'Redox Parallax', url: 'https://html.ravextheme.com/redox/dark/parallax-carousal.html' },
  { label: 'Redox IT', url: 'https://html.ravextheme.com/redox/dark/it-solution.html' },
  { label: 'Invena Portfolio', url: 'https://html.themewant.com/invena/' },
  { label: 'FlyPro', url: 'https://www.flypro.io/' },
];

export function ImportURL() {
  const [url, setUrl] = useState('');
  const [debouncedUrl, setDebouncedUrl] = useState('');
  const [projectName, setProjectName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const router = useRouter();

  const onBack = ()=>{
    router.push('/my-projects')
  }

  const onMobileMenuClick = () => {};
  const onSearchClick = () => {};
  const onNotificationsClick = () => {};
  const onAvatarClick = () => {};
  const onNavigateToSettings = () => {};
  const onNavigateToMyProjects = () => router.push('/my-projects');
  const onNavigateToAnalytics = () => {};
  const onNavigateToActivity = () => {};

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUrl(url);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  useEffect(() => {
    if (isValidUrl(debouncedUrl) && debouncedUrl !== websiteData?.url) {
      detectWebsite(debouncedUrl);
    }
  }, [debouncedUrl]);

  // Simplified website data extraction without external APIs
  const extractWebsiteData = async (inputUrl: string): Promise<WebsiteData> => {
    try {
      // Ensure URL has protocol
      let normalizedUrl = inputUrl;
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = 'https://' + inputUrl;
      }

      // Parse the URL to extract basic information
      const urlObj = new URL(normalizedUrl);
      const domain = urlObj.hostname.replace('www.', '');
      const siteName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
      
      // Determine website type and colors based on domain
      let type = 'Website';
      let primaryColor = '#6a49fc';
      
      // Smart type detection based on well-known domains
      if (domain.includes('github')) {
        type = 'Development Platform';
        primaryColor = '#24292f';
      } else if (domain.includes('stripe')) {
        type = 'Payment Platform';
        primaryColor = '#635bff';
      } else if (domain.includes('figma')) {
        type = 'Design Tool';
        primaryColor = '#f24e1e';
      } else if (domain.includes('linear')) {
        type = 'Project Management';
        primaryColor = '#5e6ad2';
      } else if (domain.includes('docs') || domain.includes('documentation')) {
        type = 'Documentation';
        primaryColor = '#51a2ff';
      } else if (domain.includes('blog')) {
        type = 'Blog';
        primaryColor = '#fcc800';
      } else if (domain.includes('shop') || domain.includes('store')) {
        type = 'E-commerce';
        primaryColor = '#05df72';
      } else if (domain.includes('portfolio')) {
        type = 'Portfolio';
        primaryColor = '#c27aff';
      }

      // Generate basic proxy URLs for iframe embedding
      const proxyUrls = [
        normalizedUrl, // Try direct URL first
      ];

      // Dynamic iframe embedding test
      const testIframeEmbedding = (): Promise<boolean> => {
        return new Promise((resolve) => {
          const testIframe = document.createElement('iframe');
          testIframe.style.position = 'absolute';
          testIframe.style.top = '-9999px';
          testIframe.style.left = '-9999px';
          testIframe.style.width = '1px';
          testIframe.style.height = '1px';
          testIframe.style.visibility = 'hidden';
          testIframe.src = normalizedUrl;
          
          let resolved = false;
          
          const cleanup = () => {
            if (testIframe.parentNode) {
              document.body.removeChild(testIframe);
            }
          };
          
          const resolveOnce = (canEmbed: boolean) => {
            if (!resolved) {
              resolved = true;
              cleanup();
              resolve(canEmbed);
            }
          };
          
          // Success case - iframe loads successfully
          testIframe.onload = () => {
            // If iframe loads, it means embedding works
            // (CORS errors when accessing content are normal and don't indicate blocking)
            resolveOnce(true);
          };
          
          // Error case - iframe fails to load (site blocks embedding)
          testIframe.onerror = () => {
            resolveOnce(false);
          };
          
          // Timeout case - if nothing happens in 3 seconds, assume blocked
          setTimeout(() => {
            resolveOnce(false);
          }, 3000);
          
          // Add to DOM to start loading
          document.body.appendChild(testIframe);
        });
      };

      // Test embedding capability
      const canEmbed = await testIframeEmbedding();

      return {
        title: `${siteName} - ${type}`,
        description: `Website content from ${domain}`,
        siteName,
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        domain,
        type,
        isResponsive: true,
        proxyUrls,
        theme: {
          primaryColor,
          backgroundColor: '#ffffff'
        },
        url: normalizedUrl,
        status: 'success',
        canEmbed // Add embedding capability info
      };
    } catch (error) {
      console.error('Error parsing URL:', error);
      throw new Error('Invalid URL format');
    }
  };

  const detectWebsite = async (inputUrl: string) => {
    if (!inputUrl.trim() || !isValidUrl(inputUrl)) return;
    
    setIsDetecting(true);
    setWebsiteData(null);
    
    try {
      const data = await extractWebsiteData(inputUrl);
      setWebsiteData(data);
      setProjectName(`${data.siteName || 'Website'} Review`);
      
      toast.success('Website detected successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect website';
      console.error('Website detection error:', error);
      
      if (errorMessage.includes('Invalid URL')) {
        toast.error('Please enter a valid URL.');
      } else {
        toast.error('Failed to detect website. Please check the URL and try again.');
      }
      
      // Create minimal website data for fallback
      try {
        const normalizedUrl = inputUrl.startsWith('http') ? inputUrl : 'https://' + inputUrl;
        const urlObj = new URL(normalizedUrl);
        const domain = urlObj.hostname.replace('www.', '');
        const siteName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
        
        setWebsiteData({
          title: `${siteName} - Website`,
          description: `Website content from ${domain}`,
          siteName,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
          domain,
          type: 'Website',
          isResponsive: true,
          proxyUrls: [normalizedUrl],
          theme: {
            primaryColor: '#6a49fc',
            backgroundColor: '#ffffff'
          },
          url: normalizedUrl,
          status: 'error',
          error: 'Limited website data available. You can still create a project.'
        });
      } catch (fallbackError) {
        setWebsiteData({
          status: 'error',
          error: 'Invalid URL format',
          url: inputUrl
        });
      }
    } finally {
      setIsDetecting(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Clear any previous website data when URL changes
    if (newUrl !== websiteData?.url) {
      setWebsiteData(null);
      setProjectName('');
    }
  };

  const handleCreateProject = async () => {
    if (!url.trim() || !projectName.trim()) {
      toast.error('Please enter a valid URL and project name');
      return;
    }
    
    if (!websiteData) {
      toast.error('Please wait for website detection to complete');
      return;
    }
    
    setIsImporting(true);
    
    try {
      const token = getCookie('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formData = new FormData();
      formData.append('name', projectName);
      formData.append('type', 'website');
      formData.append('sourceUrl', url);

      // Capture preview image using html2canvas (note: may not capture cross-origin iframe content fully)
      if (websiteData) {
        const previewElement = document.querySelector('.preview-content') as HTMLElement;
        if (previewElement) {
          const canvas = await html2canvas(previewElement, { 
            scale: 1, 
            useCORS: true,
            allowTaint: true 
          });
          canvas.toBlob((blob) => {
            if (blob) {
              formData.append('siteImagePreview', blob, 'preview.png');
            }
          }, 'image/png');
        }
      }

      const response = await fetch('https://jottymebackend-production.up.railway.app/api/project/link', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const projectData = await response.json();
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast.success('Project created successfully!');
      
      // Navigate to project view
      //setTimeout(() => {
       // onProjectCreated(projectData);
      //}, 800);
    } catch (error) {
      console.error('Error creating project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
      toast.error(errorMessage);
    } finally {
      setIsImporting(false);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      // Allow URLs without protocol
      const testUrl = string.startsWith('http') ? string : 'https://' + string;
      new URL(testUrl);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Layout 
      onMobileMenuClick={onMobileMenuClick}
      onSearchClick={onSearchClick}
      onNotificationsClick={onNotificationsClick}
      onAvatarClick={onAvatarClick}
      onNavigateToSettings={onNavigateToSettings}
      onNavigateToMyProjects={onNavigateToMyProjects}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToActivity={onNavigateToActivity}
      onProjectClick={onNavigateToMyProjects}
    >
      <div className="max-w-[672px] mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground text-[14px] mb-4 sm:mb-6 hover:text-foreground transition-colors touch-manipulation"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            disabled={isImporting}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </motion.button>
          
          <h1 className="text-foreground text-[20px] sm:text-[24px] font-semibold mb-2">Import from URL</h1>
          <p className="text-muted-foreground text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px]">
            Import any website or web page for review and collaboration. We'll create a<br className="hidden sm:block" />
            project automatically with full metadata detection.
          </p>
        </motion.div>

        {/* URL Input Form */}
        <motion.div
          className="bg-card border border-border rounded-[14px] p-4 sm:p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="text-foreground text-[14px] font-medium block mb-3">
                Website URL
              </label>
              
              <div className="relative">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={handleUrlChange}
                  className={`bg-input h-10 pr-12 text-foreground ${
                    url && !isValidUrl(url) 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-border focus:border-[#6a49fc]'
                  } transition-colors touch-manipulation`}
                  disabled={isImporting}
                />
                <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              {url && !isValidUrl(url) && (
                <motion.p 
                  className="text-red-400 text-[12px] mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Please enter a valid URL starting with http:// or https://
                </motion.p>
              )}
            </div>

            {/* Quick Examples */}
            <div>
              <p className="text-muted-foreground text-[12px] mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <motion.button
                    key={example.label}
                    onClick={() => {
                      setUrl(example.url);
                      detectWebsite(example.url);
                    }}
                    className="bg-input border border-border rounded-[8px] px-3 py-1.5 text-muted-foreground text-[12px] font-medium hover:border-[#6a49fc] hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    whileHover={{ scale: isImporting ? 1 : 1.02 }}
                    whileTap={{ scale: isImporting ? 1 : 0.98 }}
                    disabled={isImporting || isDetecting}
                  >
                    {example.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Website Preview Section */}
        <AnimatePresence>
          {(isDetecting || websiteData) && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {/* Error State */}
              {websiteData?.status === 'error' && websiteData.error && (
                <div className="bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.2)] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#ff6b6b] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-[#ff6b6b] text-[14px] font-medium mb-1">
                        Detection Issue
                      </h3>
                      <p className="text-[#e67e7e] text-[13px] leading-relaxed">
                        {websiteData.error}
                      </p>
                      <p className="text-[#d19393] text-[12px] mt-1">
                        You can still create a project - live preview will be attempted during collaboration.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Static Note - Appears just before preview */}
              {websiteData && (
                <div className="bg-blue-50 dark:bg-[rgba(59,130,246,0.08)] border border-blue-200 dark:border-[rgba(59,130,246,0.15)] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-blue-800 dark:text-blue-300 text-[14px] font-medium mb-1">
                        Live Preview
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200/90 text-[13px] leading-relaxed">
                        If the preview below appears blank or won't load, try a different website URL. Some sites block previews for security, but you can still create projects and collaborate.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Website Preview */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {isDetecting ? (
                  // Loading State
                  <div className="w-full h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="w-12 h-12 border-2 border-[#6a49fc] border-t-transparent rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-muted-foreground text-[16px] font-medium mb-2">Loading website...</p>
                      <p className="text-muted-foreground text-[14px]">Preparing live preview</p>
                    </div>
                  </div>
                ) : websiteData ? (
                  // Full Website Preview
                  <div className="w-full">
                    {/* Browser Header */}
                    <div className="bg-card h-12 flex items-center px-4 border-b border-border">
                      <div className="flex items-center gap-2 mr-4">
                        <div className="w-3 h-3 bg-[#fb2c36] rounded-full" />
                        <div className="w-3 h-3 bg-[#f0b100] rounded-full" />
                        <div className="w-3 h-3 bg-[#00c950] rounded-full" />
                      </div>
                    
                      <div className="flex-1 flex items-center px-3 h-8 bg-input rounded-md">
                        <span className="text-foreground text-[14px] flex items-center gap-2">
                          {websiteData.favicon && (
                            <img 
                              src={websiteData.favicon} 
                              alt="Favicon" 
                              className="w-4 h-4 rounded-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          {websiteData.domain}
                        </span>
                      </div>
                      
                      <button className="p-1.5 hover:bg-accent rounded transition-colors ml-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    
                    {/* Website Content */}
                    <div className="relative h-[500px] bg-white preview-content">
                      {/* Primary iframe attempt */}
                      <iframe
                        src={websiteData.url}
                        className="w-full h-full border-0"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        title={`Preview of ${websiteData.siteName}`}
                        onLoad={(e) => {
                          // Hide fallback if iframe loads successfully
                          const container = (e.target as HTMLIFrameElement).parentElement;
                          const fallback = container?.querySelector('.iframe-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'none';
                        }}
                        onError={(e) => {
                          // Hide iframe and show fallback on error
                          (e.target as HTMLIFrameElement).style.display = 'none';
                          const container = (e.target as HTMLIFrameElement).parentElement;
                          const fallback = container?.querySelector('.iframe-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      
                      {/* Professional Fallback for Blocked Websites */}
                      <div className="iframe-fallback w-full h-full bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f1f3f4] flex items-center justify-center">
                        <div className="text-center space-y-6 p-8 max-w-md">
                          <div className="space-y-4">
                            {/* Website Info Header */}
                            <div className="flex items-center justify-center gap-3 mb-4">
                              {websiteData.favicon && (
                                <img 
                                  src={websiteData.favicon} 
                                  alt="Favicon" 
                                  className="w-10 h-10 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              )}
                              <div className="text-left">
                                <h3 className="text-[#101828] text-[16px] font-semibold">{websiteData.siteName || websiteData.title}</h3>
                                <p className="text-[#4a5565] text-[14px]">{websiteData.domain}</p>
                              </div>
                            </div>
                            
                            {/* Informative Message */}
                            <div className="bg-[rgba(106,73,246,0.05)] border border-[rgba(106,73,246,0.1)] rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-[#6a49fc] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div className="text-left">
                                  <h4 className="text-[#6a49fc] text-[14px] font-semibold mb-1">Preview Restricted</h4>
                                  <p className="text-[#4a5565] text-[13px] leading-relaxed">
                                    This website has security settings that prevent iframe embedding. You can still collaborate on it - the full website will open in a new tab when needed.
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Website Mockup */}
                            <div className="bg-white rounded-lg shadow-sm border border-[rgba(0,0,0,0.1)] p-4 mx-auto max-w-xs">
                              {/* Mini Browser Header */}
                              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[rgba(0,0,0,0.05)]">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-[#ff5f57] rounded-full" />
                                  <div className="w-2 h-2 bg-[#ffbd2e] rounded-full" />
                                  <div className="w-2 h-2 bg-[#28ca42] rounded-full" />
                                </div>
                                <div className="flex-1 bg-[#f5f5f5] rounded-sm h-4 flex items-center px-2 ml-2">
                                  <span className="text-[#666] text-[10px] truncate">{websiteData.domain}</span>
                                </div>
                              </div>
                              
                              {/* Content Preview */}
                              <div className="space-y-3">
                                <div className="text-center space-y-2">
                                  <div className="w-8 h-8 mx-auto rounded-md flex items-center justify-center" 
                                       style={{ backgroundColor: websiteData.theme?.primaryColor + '20' || 'rgba(106,73,252,0.2)' }}>
                                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: websiteData.theme?.primaryColor || '#6a49fc' }} />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="h-2 bg-[#333] rounded w-16 mx-auto" />
                                    <div className="h-1.5 bg-[#666] rounded w-10 mx-auto" />
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="h-1 bg-[#e0e0e0] rounded w-full" />
                                  <div className="h-1 bg-[#e0e0e0] rounded w-3/4" />
                                  <div className="h-1 bg-[#e0e0e0] rounded w-1/2" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-1">
                                  <div className="h-4 rounded-sm" style={{ backgroundColor: websiteData.theme?.primaryColor + '15' || 'rgba(106,73,252,0.15)' }} />
                                  <div className="h-4 rounded-sm" style={{ backgroundColor: websiteData.theme?.primaryColor + '15' || 'rgba(106,73,252,0.15)' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="pt-2">
                            <a 
                              href={websiteData.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-2 bg-[#6a49fc] text-white px-4 py-2.5 rounded-lg hover:bg-[#5a3bec] transition-colors font-medium text-[14px] shadow-sm"
                            >
                              <span>View Full Website</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Website Metadata Footer */}
                    <div className="bg-card border-t border-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-foreground text-[15px] font-medium line-clamp-1">
                            {websiteData.title}
                          </h4>
                          <p className="text-muted-foreground text-[13px] line-clamp-1">
                            {websiteData.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                          <span className={`px-2 py-1 rounded-md font-medium ${
                            websiteData.type === 'Blog' ? 'bg-[rgba(252,200,0,0.1)] text-[#fcc800]' : 
                            websiteData.type === 'E-commerce' ? 'bg-[rgba(5,223,114,0.1)] text-[#05df72]' : 
                            websiteData.type === 'Documentation' ? 'bg-[rgba(81,162,255,0.1)] text-[#51a2ff]' : 
                            websiteData.type === 'Portfolio' ? 'bg-[rgba(194,122,255,0.1)] text-[#c27aff]' : 
                            'bg-[rgba(106,73,252,0.1)] text-[#6a49fc]'
                          }`}>
                            {websiteData.type}
                          </span>
                          {websiteData.isResponsive && (
                            <span className="bg-[rgba(5,223,114,0.1)] text-[#05df72] px-2 py-1 rounded-md font-medium">
                              📱 Responsive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Project Creation Section */}
              {websiteData && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-foreground text-[16px] font-semibold block mb-2">
                        Create Your Project
                      </label>
                      <p className="text-muted-foreground text-[14px] mb-4">
                        {websiteData.status === 'error' 
                          ? 'Even with limited data, you can still create a project for collaboration'
                          : 'Give your project a descriptive name to start collaborating'
                        }
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          placeholder="Enter project name"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="bg-input border-border text-foreground pr-10 text-[15px] h-12 focus:border-[#6a49fc] focus:ring-2 focus:ring-[rgba(106,73,252,0.2)] touch-manipulation"
                          disabled={isImporting}
                        />
                        <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <Button
                        onClick={handleCreateProject}
                        disabled={!websiteData || !projectName.trim() || isImporting}
                        className="bg-[#6a49fc] hover:bg-[#5a3efc] disabled:bg-[rgba(106,73,252,0.3)] text-white font-semibold h-12 px-8 rounded-[10px] flex items-center justify-center gap-2 transition-all duration-200 touch-manipulation hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-lg"
                      >
                        {isImporting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            {websiteData.status === 'error' ? 'Create Anyway' : 'Create Project'}
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {websiteData.status === 'error' && (
                      <div className="bg-[rgba(106,73,252,0.1)] border border-[rgba(106,73,252,0.2)] rounded-lg p-3 mt-4">
                        <p className="text-[#9b8bf5] text-[12px] leading-relaxed">
                          💡 <span className="font-medium">Tip:</span> Projects with limited metadata can still be collaborated on. 
                          The system will attempt to load the website during reviews and comments.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supported Types */}
        {!websiteData && (
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <p className="text-muted-foreground text-[13px] sm:text-[14px] mb-3">
              We automatically detect and support all types of websites
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {supportedTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.label}
                    className="flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-3 h-3" style={{ color: type.color }} />
                    <span className="text-muted-foreground text-[11px] sm:text-[12px]">{type.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}