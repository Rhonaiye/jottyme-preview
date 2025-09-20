'use client'
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/pageHeader';
import { 
  Upload,
  Eye,
  Copy,
  Check,
  Globe,
  Palette,
  Building2,
  ImageIcon,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SidebarLayout from '@/components/ui/sideBar';
import { JottyAIButton } from '@/components/ui/jottyAiButton';

interface BrandingProps {
  onBack?: () => void;
  onMobileMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToMyProjects?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToActivity?: () => void;
}

interface BrandingSettings {
  companyName: string;
  brandColor: string;
  logo: File | null;
  logoUrl: string;
}

const PRESET_COLORS = [
  '#6a49fc', // Purple (Jottyme brand)
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
];

function Branding({ 
  onBack, 
  onMobileMenuClick,
  onSearchClick,
  onNotificationsClick,
  onAvatarClick,
  onNavigateToSettings,
  onNavigateToBilling,
  onNavigateToPrivacy,
  onNavigateToNotifications,
  onNavigateToMyProjects,
  onNavigateToAnalytics,
  onNavigateToActivity
}: BrandingProps) {
  const [settings, setSettings] = useState<BrandingSettings>({
    companyName: 'Your Company',
    brandColor: '#6a49fc',
    logo: null,
    logoUrl: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCompanyNameChange = (name: string) => {
    setSettings(prev => ({ ...prev, companyName: name }));
  };

  const handleColorChange = (color: string) => {
    setSettings(prev => ({ ...prev, brandColor: color }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSettings(prev => ({ 
        ...prev, 
        logo: file,
        logoUrl: URL.createObjectURL(file)
      }));
      toast.success('Logo uploaded successfully!');
    }
  };

  const handleSave = () => {
    toast.success('Branding settings saved successfully!');
  };

  const handleCopyLink = () => {
    const link = `${settings.companyName.toLowerCase().replace(/\s+/g, '')}.jottyme.com/project-name`;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const handleExport = () => {
    toast.success('Brand assets exported successfully!');
  };

  return (
    <PageHeader 
      title="Brand Your Links" 
      description="Customize how your shared projects appear to clients"
      maxWidth="max-w-6xl"
      onMobileMenuClick={onMobileMenuClick}
      onSearchClick={onSearchClick}
      onNotificationsClick={onNotificationsClick}
      onAvatarClick={onAvatarClick}
      onNavigateToSettings={onNavigateToSettings}
      onNavigateToBilling={onNavigateToBilling}
      onNavigateToPrivacy={onNavigateToPrivacy}
      onNavigateToNotifications={onNavigateToNotifications}
      onNavigateToMyProjects={onNavigateToMyProjects}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToActivity={onNavigateToActivity}
    >
      <div className="space-y-8">
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-accent hover:bg-accent/80 border border-border hover:border-[#6a49fc]/30 text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Export Assets
          </button>
          
          <Button
            onClick={handleSave}
            className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white"
          >
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column - Settings */}
          <div className="space-y-6 flex flex-col h-full">
            {/* Company Name */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#6a49fc]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#6a49fc]" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Company Name</h3>
                  <p className="text-muted-foreground text-sm">How your brand appears to clients</p>
                </div>
              </div>
              
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleCompanyNameChange(e.target.value)}
                className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#6a49fc] transition-colors"
                placeholder="Enter your company name"
              />
            </motion.div>

            {/* Brand Color */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#6a49fc]/10 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-[#6a49fc]" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Brand Color</h3>
                  <p className="text-muted-foreground text-sm">Primary color for your brand</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Color Presets - Using flex with small gap for clean spacing */}
                <div className="flex gap-2">
                  {PRESET_COLORS.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`relative w-8 h-8 rounded-lg transition-all ${
                        settings.brandColor === color 
                          ? 'ring-2 ring-foreground ring-offset-2 ring-offset-card z-10' 
                          : 'hover:scale-105 hover:z-10'
                      }`}
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {settings.brandColor === color && (
                        <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Color Options */}
                <div className="space-y-3">
                  {/* Color Picker */}
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.brandColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-8 h-8 rounded-lg border-2 border-border bg-transparent cursor-pointer"
                    />
                    <span className="text-muted-foreground text-sm">Color Picker</span>
                  </div>

                  {/* Text Input */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg border-2 border-border"
                      style={{ backgroundColor: settings.brandColor }}
                    />
                    <input
                      type="text"
                      value={settings.brandColor.toUpperCase()}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="flex-1 h-10 bg-input border border-border rounded-lg px-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#6a49fc] transition-colors font-mono text-sm"
                      placeholder="#6A49FC"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Logo */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-6 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#6a49fc]/10 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-[#6a49fc]" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium mb-1">Company Logo</h3>
                  <p className="text-muted-foreground text-sm">Upload your brand logo</p>
                </div>
              </div>
              
              <div 
                className="relative border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-[#6a49fc] transition-colors group flex-1 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                
                {settings.logoUrl ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.logoUrl} 
                      alt="Company logo" 
                      className="max-w-24 max-h-24 object-contain mx-auto"
                    />
                    <p className="text-muted-foreground text-sm">Click to change logo</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto group-hover:text-[#6a49fc] transition-colors" />
                    <div>
                      <p className="text-foreground mb-1">Drop your logo here</p>
                      <p className="text-muted-foreground text-sm">or click to browse (PNG, JPG, SVG)</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6 flex flex-col h-full">
            <motion.div 
              className="bg-card border border-border rounded-2xl p-6 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#6a49fc]/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#6a49fc]" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Live Preview</h3>
                    <p className="text-muted-foreground text-sm">How clients see your brand</p>
                  </div>
                </div>
                
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-accent hover:bg-accent/80 border border-border hover:border-[#6a49fc]/30 text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </div>

              {/* Browser Preview */}
              <div className="bg-card rounded-xl overflow-hidden border border-border flex-1">
                {/* Browser Header */}
                <div className="bg-accent px-4 py-3 border-b border-border flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#fb2c36] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#f0b100] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#00c950] rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-input rounded-lg px-3 py-1.5 flex items-center gap-2 border border-border">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm truncate">
                      {settings.companyName.toLowerCase().replace(/\s+/g, '')}.jottyme.com
                    </span>
                  </div>
                </div>

                {/* Page Content */}
                <div className="bg-background p-6 space-y-6">
                  {/* Header with Brand */}
                  <div className="flex items-center gap-4 pb-4 border-b border-border" style={{ borderColor: `${settings.brandColor}20` }}>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: settings.brandColor }}
                    >
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                      ) : (
                        <span className="text-white font-semibold">
                          {settings.companyName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-foreground font-semibold">{settings.companyName}</h2>
                      <p className="text-muted-foreground text-sm">Project Review Portal</p>
                    </div>
                  </div>

                  {/* Sample Project */}
                  <div className="space-y-4">
                    <h3 className="text-foreground font-medium">Website Redesign Project</h3>
                    <div className="bg-accent rounded-lg p-6 text-center">
                      <div 
                        className="w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${settings.brandColor}10` }}
                      >
                        <ImageIcon className="w-8 h-8" style={{ color: settings.brandColor }} />
                      </div>
                      <p className="text-muted-foreground text-sm">Your project preview</p>
                    </div>
                    
                    <button
                      className="w-full py-3 pl-4 pr-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity text-left"
                      style={{ backgroundColor: settings.brandColor }}
                    >
                      Leave Feedback
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-muted-foreground text-xs">
                      Powered by <span className="font-medium text-[#6a49fc]">Jottyme</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* URL Preview */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-[#6a49fc]" />
                <h3 className="text-foreground font-medium mb-1">Your Branded URL</h3>
              </div>
              
              <div className="bg-accent px-4 py-3 flex items-center gap-3 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#fb2c36] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#f0b100] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#00c950] rounded-full"></div>
                </div>
                <div className="flex-1 bg-input rounded-lg px-3 py-1.5 flex items-center gap-2 border border-border">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm truncate">
                    {settings.companyName.toLowerCase().replace(/\s+/g, '')}.jottyme.com
                  </span>
                </div>
              </div>

              <div className="bg-accent border border-border rounded-xl p-4 mt-4">
                <p className="text-muted-foreground text-sm mb-2">Clients will visit:</p>
                <p className="text-foreground font-mono text-sm break-all">
                  {settings.companyName.toLowerCase().replace(/\s+/g, '')}.jottyme.com/project-name
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageHeader>
  );
}




const BrandingPage = ()=> {
  return (
    <SidebarLayout>
        <Branding />
        <JottyAIButton/>
    </SidebarLayout>
  )
}

export default BrandingPage