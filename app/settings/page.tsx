'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/ui/layout';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  CreditCard, 
  Sun, 
  Moon, 
  Monitor,
  Globe,
  Download,
  Lock,
  Trash2,
  Check,
  Upload,
  ChevronRight,
  Settings as SettingsIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useTheme } from '@/providers/usetheme';
import SidebarLayout from '@/components/ui/sideBar';
import { JottyAIButton } from '@/components/ui/jottyAiButton';

type SettingsTab = 'profile' | 'notifications' | 'appearance' | 'security' | 'billing';
type Theme = 'light' | 'dark' | 'system';

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tabs: TabConfig[] = [
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    description: 'Manage your personal information'
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: Bell,
    description: 'Control how you receive updates'
  },
  { 
    id: 'appearance', 
    label: 'Appearance', 
    icon: Palette,
    description: 'Customize your interface'
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: Shield,
    description: 'Protect your account'
  },
  { 
    id: 'billing', 
    label: 'Billing', 
    icon: CreditCard,
    description: 'Manage your subscription'
  },
];

interface NotificationSettings {
  comments: boolean;
  shares: boolean;
  projectUpdates: boolean;
  weeklyDigest: boolean;
  emailNotifications: boolean;
}

interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
}

const billingHistory: BillingHistoryItem[] = [
  { id: '1', date: 'Dec 15, 2024', description: 'Pro Plan - Monthly', amount: '$15.00', status: 'paid' },
  { id: '2', date: 'Nov 15, 2024', description: 'Pro Plan - Monthly', amount: '$15.00', status: 'paid' },
  { id: '3', date: 'Oct 15, 2024', description: 'Pro Plan - Monthly', amount: '$15.00', status: 'paid' },
];

function Settings({ 
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
}: { 
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
}) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { theme: selectedTheme, setTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [selectedTimezone, setSelectedTimezone] = useState('PST');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    comments: true,
    shares: true,
    projectUpdates: true,
    weeklyDigest: false,
    emailNotifications: true,
  });
  const [profileData, setProfileData] = useState({
    firstName: 'Samuel',
    lastName: 'Chen',
    email: 'samuel@jottyme.app',
    role: 'Product Designer'
  });

  const handleNavigateToSettings = () => {
    // Already in settings, just close any modals
  };

  const handleNavigateToBilling = () => {
    setActiveTab('billing');
  };

  const handleNavigateToPrivacy = () => {
    setActiveTab('security');
  };

  const handleNavigateToNotifications = () => {
    setActiveTab('notifications');
  };

  const updateNotification = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    const notificationNames = {
      comments: 'Comment notifications',
      shares: 'Share notifications', 
      projectUpdates: 'Project update notifications',
      weeklyDigest: 'Weekly digest',
      emailNotifications: 'Email notifications'
    };
    toast.success(`${notificationNames[key]} ${value ? 'enabled' : 'disabled'}`);
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    toast.success(`Theme changed to ${theme}`);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs border capitalize ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const SettingSection = ({ title, description, children }: { 
    title: string; 
    description?: string; 
    children: React.ReactNode 
  }) => (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-foreground font-medium mb-1">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {children}
    </div>
  );

  const SettingItem = ({ 
    label, 
    description, 
    children,
    last = false 
  }: { 
    label: string; 
    description?: string; 
    children: React.ReactNode;
    last?: boolean;
  }) => (
    <div className={`flex items-center justify-between py-4 ${!last ? 'border-b border-border' : ''}`}>
      <div className="flex-1">
        <h4 className="text-foreground font-medium">{label}</h4>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="ml-6">
        {children}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <SettingSection title="Profile Picture" description="Update your avatar">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-[#6a49fc]/20 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Samuel&hair=long01,long02,long03,long04&backgroundColor=b6e3f4" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              className="bg-[#6a49fc] hover:bg-[#5940d9] text-white h-9 px-4 flex items-center gap-2"
              onClick={() => toast.info('Photo upload coming soon!')}
            >
              <Upload className="w-4 h-4" />
              Change Photo
            </Button>
            <p className="text-muted-foreground text-sm">JPG, PNG up to 2MB</p>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Personal Information" description="Update your profile details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-foreground">First Name</Label>
            <Input 
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              className="bg-input-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Last Name</Label>
            <Input 
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
              className="bg-input-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Email</Label>
            <Input 
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-input-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Role</Label>
            <Input 
              value={profileData.role}
              onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
              className="bg-input-background border-border text-foreground"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button 
            className="bg-[#6a49fc] hover:bg-[#5940d9] text-white"
            onClick={handleSaveProfile}
          >
            Save Changes
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            Cancel
          </Button>
        </div>
      </SettingSection>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <SettingSection title="Notification Preferences" description="Choose how you want to be notified">
        <div className="space-y-0">
          <SettingItem 
            label="Comments" 
            description="Get notified when someone comments on your projects"
          >
            <Switch 
              checked={notifications.comments}
              onCheckedChange={(checked) => updateNotification('comments', checked)}
            />
          </SettingItem>

          <SettingItem 
            label="Shares" 
            description="Get notified when projects are shared with you"
          >
            <Switch 
              checked={notifications.shares}
              onCheckedChange={(checked) => updateNotification('shares', checked)}
            />
          </SettingItem>

          <SettingItem 
            label="Project Updates" 
            description="Get notified about project activity and changes"
          >
            <Switch 
              checked={notifications.projectUpdates}
              onCheckedChange={(checked) => updateNotification('projectUpdates', checked)}
            />
          </SettingItem>

          <SettingItem 
            label="Weekly Digest" 
            description="Get a weekly summary of your activity"
          >
            <Switch 
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => updateNotification('weeklyDigest', checked)}
            />
          </SettingItem>

          <SettingItem 
            label="Email Notifications" 
            description="Receive notifications via email"
            last
          >
            <Switch 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => updateNotification('emailNotifications', checked)}
            />
          </SettingItem>
        </div>
      </SettingSection>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <SettingSection title="Theme" description="Choose your preferred theme">
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor }
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <motion.button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id as Theme)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-[#6a49fc] bg-[#6a49fc]/10'
                    : 'border-border hover:border-[#6a49fc]/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 text-foreground" />
                <span className="text-foreground text-xs">{theme.label}</span>
                {selectedTheme === theme.id && (
                  <div className="w-3 h-3 bg-[#6a49fc] rounded-full flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </SettingSection>

      <SettingSection title="Language & Region" description="Set your language and timezone preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-foreground">Language</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-input-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
                <SelectItem value="fr-FR">Français</SelectItem>
                <SelectItem value="de-DE">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Timezone</Label>
            <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
              <SelectTrigger className="bg-input-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingSection>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <SettingSection title="Password" description="Update your account password">
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label className="text-foreground">Current Password</Label>
            <Input
              type="password"
              className="bg-input-background border-border text-foreground"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">New Password</Label>
            <Input
              type="password"
              className="bg-input-background border-border text-foreground"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Confirm Password</Label>
            <Input
              type="password"
              className="bg-input-background border-border text-foreground"
              placeholder="Confirm new password"
            />
          </div>
          <Button className="bg-[#6a49fc] hover:bg-[#5940d9] text-white">
            Update Password
          </Button>
        </div>
      </SettingSection>

      <SettingSection title="Account Security" description="Manage your account security settings">
        <div className="space-y-0">
          <SettingItem 
            label="Two-Factor Authentication" 
            description="Add an extra layer of security to your account"
            last
          >
            <Button variant="outline" className="bg-input-background border-border text-foreground hover:bg-accent hover:border-[#6a49fc]/50">
              Enable 2FA
            </Button>
          </SettingItem>
        </div>
      </SettingSection>

      <SettingSection title="Danger Zone" description="Irreversible actions">
        <div className="space-y-4">
          <Button
            variant="destructive"
            className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
            onClick={() => toast.error('Account deletion is not available in this demo')}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
          <p className="text-[#99a1af] text-sm">
            Deleting your account will permanently remove all your projects, comments, and data. This action cannot be undone.
          </p>
        </div>
      </SettingSection>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <SettingSection title="Current Plan" description="Manage your subscription">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-foreground font-medium mb-1">Pro Plan</h4>
            <p className="text-muted-foreground mb-1">$15/month • Billed monthly</p>
            <p className="text-muted-foreground text-sm">Next billing date: January 15, 2025</p>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <span className="bg-[#6a49fc]/20 text-[#6a49fc] px-3 py-1 rounded-full text-sm border border-[#6a49fc]/30">
              Active
            </span>
            <Button className="bg-[#6a49fc] hover:bg-[#5940d9] text-white">
              Change Plan
            </Button>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Payment Method" description="Manage your payment information">
        <div className="bg-card rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#6a49fc] w-10 h-6 rounded flex items-center justify-center">
              <span className="text-white text-xs font-semibold">VISA</span>
            </div>
            <div>
              <p className="text-foreground">•••• •••• •••• 4242</p>
              <p className="text-muted-foreground text-sm">Expires 12/26</p>
            </div>
          </div>
          <Button className="bg-[#6a49fc] hover:bg-[#5940d9] text-white">
            Update
          </Button>
        </div>
      </SettingSection>

      <SettingSection title="Billing History" description="View your past invoices">
        <div className="space-y-3">
          {billingHistory.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">{item.date}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">{item.amount}</span>
                <StatusBadge status={item.status} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent"
                  onClick={() => toast.info('Download started')}
                >
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SettingSection>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'security':
        return renderSecurityTab();
      case 'billing':
        return renderBillingTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <Layout
      onNavigateToSettings={handleNavigateToSettings}
      onNavigateToBilling={handleNavigateToBilling}
      onNavigateToPrivacy={handleNavigateToPrivacy}
      onNavigateToNotifications={handleNavigateToNotifications}
      onMobileMenuClick={onMobileMenuClick}
      onSearchClick={onSearchClick}
      onNotificationsClick={onNotificationsClick}
      onAvatarClick={onAvatarClick}
      onNavigateToMyProjects={onNavigateToMyProjects}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToActivity={onNavigateToActivity}
      onProjectClick={onNavigateToMyProjects}
    >
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#6a49fc]/20 rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-[#6a49fc]" />
              </div>
              <div>
                <h1 className="text-foreground font-semibold text-2xl">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-card border border-border rounded-xl p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                          isActive
                            ? 'bg-[#6a49fc] text-white'
                            : 'text-foreground hover:bg-accent'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{tab.label}</div>
                          <div className={`text-sm ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                            {tab.description}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                          isActive ? 'rotate-90' : ''
                        }`} />
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}



function SettingsPage() {
  return (
   <SidebarLayout>
      <Settings/>
      <JottyAIButton/>
   </SidebarLayout>
  )
}

export default SettingsPage