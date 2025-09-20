'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/pageHeader';
import UnicornScene from '@/components/ui/unicornScene';
import { 
  Plus, 
  Upload, 
  Link, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Eye, 
  Star,
  Zap,
  PlayCircle,
  Sparkles,
  MousePointer2,
  Share2,
  PenTool,
  Globe,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import SidebarLayout from '@/components/ui/sideBar';

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  updatedAt: string;
  icon: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

const mockProjects: ProjectItem[] = [
  {
    id: '1',
    name: 'Invena - Creative Agency',
    type: 'Website',
    updatedAt: '2h ago',
    icon: '🎨'
  },
  {
    id: '2', 
    name: 'Redox - Design Agency',
    type: 'Website', 
    updatedAt: '1d ago',
    icon: '💼'
  },
  {
    id: '3',
    name: 'Redox - Parallax Carousel',
    type: 'Website',
    updatedAt: '2d ago',
    icon: '🌊'
  },
  {
    id: '4',
    name: 'Redox - IT Solutions',
    type: 'Website',
    updatedAt: '3d ago',
    icon: '💻'
  }
];

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'approved',
    target: 'Invena - Creative Agency',
    time: '10 minutes ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=c0aede'
  },
  {
    id: '2', 
    user: 'Samuel Chen',
    action: 'added comments to',
    target: 'Redox - Design Agency',
    time: '2h ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel&backgroundColor=a78bfa'
  },
  {
    id: '3',
    user: 'Mike Johnson', 
    action: 'uploaded new version',
    target: 'Redox - Parallax Carousel',
    time: '4h ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=06b6d4'
  },
  {
    id: '4',
    user: 'Lisa Wang', 
    action: 'shared project',
    target: 'Redox - IT Solutions',
    time: '1d ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=10b981'
  }
];

// Project mapping with real URLs for project view
const projectDataMapping: Record<string, any> = {
  'Invena - Creative Agency': {
    id: 'proj-1',
    name: 'Invena - Creative Agency',
    url: 'https://html.themewant.com/invena/onepage-one.html',
    type: 'website',
    title: 'Invena - Creative Agency',
    description: 'Modern creative agency template with elegant design and smooth animations for showcasing creative work and services.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=html.themewant.com&sz=64',
    siteName: 'Invena',
    domain: 'html.themewant.com'
  },
  'Redox - Design Agency': {
    id: 'proj-2',
    name: 'Redox - Design Agency',
    url: 'https://html.ravextheme.com/redox/light/design-agency.html',
    type: 'website',
    title: 'Redox - Design Agency',
    description: 'Professional design agency website template featuring clean layouts and modern typography for creative businesses.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Redox - Parallax Carousel': {
    id: 'proj-3',
    name: 'Redox - Parallax Carousel',
    url: 'https://html.ravextheme.com/redox/dark/parallax-carousal.html',
    type: 'website',
    title: 'Redox - Parallax Carousel',
    description: 'Stunning dark theme template with immersive parallax scrolling effects and dynamic carousel presentations.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Redox - IT Solutions': {
    id: 'proj-4',
    name: 'Redox - IT Solutions',
    url: 'https://html.ravextheme.com/redox/dark/it-solution.html',
    type: 'website',
    title: 'Redox - IT Solutions',
    description: 'Technology-focused template designed for IT companies and tech startups with modern dark theme and professional layouts.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Invena - Portfolio Hub': {
    id: 'proj-5',
    name: 'Invena - Portfolio Hub',
    url: 'https://html.themewant.com/invena/',
    type: 'website',
    title: 'Invena - Portfolio Hub',
    description: 'Comprehensive portfolio template showcasing multiple layouts and design variations for creative professionals.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=html.themewant.com&sz=64',
    siteName: 'Invena',
    domain: 'html.themewant.com'
  },
  'FlyPro - Aviation Services': {
    id: 'proj-6',
    name: 'FlyPro - Aviation Services',
    url: 'https://www.flypro.io/',
    type: 'website',
    title: 'FlyPro - Aviation Services',
    description: 'Professional aviation services platform providing comprehensive solutions for pilots, airlines, and aviation businesses.',
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: 'https://www.google.com/s2/favicons?domain=flypro.io&sz=64',
    siteName: 'FlyPro',
    domain: 'www.flypro.io'
  }
};

interface DashboardProps {
  onImportClick?: () => void;
  onUploadClick?: () => void;
  onMyProjectsClick?: () => void;
  onSharedWithMeClick?: () => void;
  onProjectClick?: (project: any) => void;
  onNavigateToSettings?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToActivity?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
  onMobileMenuClick?: () => void;
  onNewProjectClick?: () => void;
}

 function Dashboard({ 
  onImportClick, 
  onUploadClick, 
  onMyProjectsClick, 
  onSharedWithMeClick, 
  onProjectClick, 
  onNavigateToSettings, 
  onNavigateToAnalytics, 
  onNavigateToActivity,
  onSearchClick,
  onNotificationsClick,
  onAvatarClick,
  onMobileMenuClick,
  onNewProjectClick
}: DashboardProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Handle project clicks with real project data
  const handleProjectClick = (project: ProjectItem) => {
    const realProjectData = projectDataMapping[project.name];
    if (realProjectData && onProjectClick) {
      onProjectClick(realProjectData);
    }
  };

  // Quick demo handler
  const handleQuickDemo = () => {
    const demoProject = projectDataMapping['Invena - Creative Agency'];
    if (demoProject && onProjectClick) {
      onProjectClick(demoProject);
    }
  };

  return (
    <PageHeader 
      title="Dashboard" 
      description="Your collaboration hub for feedback and design reviews"
      maxWidth="max-w-[1400px]"
      onMobileMenuClick={onMobileMenuClick}
      onSearchClick={onSearchClick}
      onNotificationsClick={onNotificationsClick}
      onAvatarClick={onAvatarClick}
      onNavigateToSettings={onNavigateToSettings}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToActivity={onNavigateToActivity}
      onProjectClick={onProjectClick}
    >
      {/* Interactive Demo Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12 overflow-hidden"
      >
        {/* UnicornStudio Background - Only on this section and only in dark theme */}
        {isDarkTheme && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <UnicornScene 
              projectId="KqwdWMLErJuqy9OSaExb"
              width="100%"
              height="100%"
              scale={1}
              dpi={1}
              fps={30}
              className="w-full h-full"
              altText="Magical unicorn cursor effects"
              lazyLoad={false}
              isVisible={true}
            />
          </div>
        )}
        
        <Card className="border border-border bg-gradient-to-br from-[#6a49fc]/5 via-transparent to-slate-500/5 backdrop-blur-sm relative z-10">
          <CardContent className="md:p-12 pt-[32px] pr-[32px] pb-[50px] pl-[32px]">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 mx-[0px] my-[11px] mt-[11px] mr-[0px] mb-[-28px] ml-[0px]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Trusted by 10,000+ teams</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-[#6a49fc] to-slate-700 dark:from-slate-100 dark:via-[#c27aff] dark:to-slate-300 bg-clip-text text-transparent">
                    Click. Comment. Collaborate.
                  </h1>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Leave feedback directly on any website or design. No more confusing revision rounds.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#6a49fc] rounded-full"></div>
                      <span className="text-muted-foreground">90% faster feedback loops</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#6a49fc] rounded-full"></div>
                      <span className="text-muted-foreground">Zero design handoff confusion</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <Button
                    onClick={handleQuickDemo}
                    className="bg-black hover:bg-gray-800 dark:bg-[#6a49fc] dark:hover:bg-[#5a3bec] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(106,73,252,0.3)] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    See Live Demo
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onNewProjectClick}
                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-3 rounded-lg flex items-center gap-2"
                  >
                    <Link className="w-4 h-4" />
                    Start Your Project
                  </Button>
                </motion.div>
              </div>

              {/* Right Interactive Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                  {/* Mock Browser Header */}
                  <div className="bg-muted h-8 flex items-center px-4 gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <div className="text-xs text-muted-foreground flex-1 text-center truncate px-2 min-w-0">
                      <span className="hidden sm:inline">app.jottyme.com/project/creative-agency</span>
                      <span className="sm:hidden">app.jottyme.com/project/...</span>
                    </div>
                  </div>
                  
                  {/* Mock Website Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 mt-[0px] mr-[0px] mb-[12px] ml-[0px]">
                    {/* Mock content */}
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                      <div className="flex gap-2">
                        <div className="h-8 bg-[#6a49fc]/20 rounded px-3 flex items-center">
                          <div className="h-2 bg-[#6a49fc] rounded w-12" />
                        </div>
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded px-3 flex items-center">
                          <div className="h-2 bg-slate-400 rounded w-8" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Demo Pins */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.3 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-[#6a49fc] rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveDemo('comment')}
                    >
                      <MessageSquare className="w-3 h-3 text-white" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.3 }}
                      className="absolute bottom-6 left-6 w-6 h-6 bg-slate-800 dark:bg-slate-200 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveDemo('annotation')}
                    >
                      <PenTool className="w-3 h-3 text-white dark:text-slate-800" />
                    </motion.div>

                    {/* Demo Tooltips */}
                    {activeDemo === 'comment' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-12 right-4 bg-card border border-border rounded-lg p-3 shadow-xl min-w-[200px]"
                      >
                        <p className="text-xs font-medium">💬 Contextual Feedback</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click anywhere to leave precise comments
                        </p>
                      </motion.div>
                    )}
                    
                    {activeDemo === 'annotation' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-14 left-6 bg-card border border-border rounded-lg p-3 shadow-xl min-w-[200px]"
                      >
                        <p className="text-xs font-medium">✏️ Visual Markup</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Draw and highlight directly on designs
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Floating action hint */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#6a49fc] text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  <MousePointer2 className="w-3 h-3" />
                  Interactive preview
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Get Started Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Get Started in Seconds</h2>
          <p className="text-muted-foreground">Choose how you'd like to begin collaborating on your designs</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-[#6a49fc]/20 dark:border-[#6a49fc]/30 hover:border-[#6a49fc]/40 dark:hover:border-[#6a49fc]/50 dark:bg-[#6a49fc]/5 transition-colors cursor-pointer group" onClick={onImportClick}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6a49fc]/10 dark:bg-[#6a49fc]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Link className="w-6 h-6 text-[#6a49fc] dark:text-[#c27aff]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Import from URL</h3>
                  <p className="text-sm text-muted-foreground">Paste any website, Figma file, or prototype link to start reviewing</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-[#6a49fc] dark:group-hover:text-[#c27aff] group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200/60 dark:border-blue-800/60 hover:border-blue-300 dark:hover:border-blue-700 dark:bg-blue-500/5 transition-colors cursor-pointer group" onClick={onUploadClick}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Upload Files</h3>
                  <p className="text-sm text-muted-foreground">Drop PDFs, images, or documents for instant review and feedback</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Value Proposition Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Why Teams Choose Jottyme</h2>
          <p className="text-muted-foreground">Built for modern design teams who demand efficiency and clarity</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: "Precision Feedback",
              description: "Leave contextual comments exactly where needed - no more vague feedback or confusion",
              color: "blue",
              baseColor: "#3b82f6",
              demo: () => setActiveDemo('comment'),
              removeHoverBorder: true
            },
            {
              icon: PenTool,
              title: "Visual Markup",
              description: "Draw, highlight, and annotate directly on designs for crystal-clear communication",
              color: "emerald",
              baseColor: "#10b981",
              demo: () => setActiveDemo('annotation')
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Centralize all feedback and discussions in one organized, searchable workspace",
              color: "orange",
              baseColor: "#f97316",
              demo: () => setActiveDemo('share')
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={feature.demo}
            >
              <Card className={`h-full border-border ${feature.removeHoverBorder ? '' : `hover:border-${feature.color}-200 dark:hover:border-${feature.color}-700`} transition-all duration-300 hover:shadow-lg`}>
                <CardContent className="p-6 space-y-4">
                  <div className="transition-transform group-hover:scale-110">
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects & Activity Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                Recent Projects
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onMyProjectsClick} className="text-xs">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="w-10 h-10 bg-slate-500/10 dark:bg-slate-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">{project.name}</p>
                    <p className="text-xs text-muted-foreground">Updated {project.updatedAt}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Activity Feed
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onNavigateToActivity} className="text-xs">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageHeader>
  );
}


function DashboardPage() {
  return (
    <SidebarLayout>
        <Dashboard/>
    </SidebarLayout>
  )
}

export default DashboardPage