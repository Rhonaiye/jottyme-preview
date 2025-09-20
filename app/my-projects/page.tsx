'use client'
import { useState } from 'react';
import SidebarLayout from '@/components/ui/sideBar';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/pageHeader';
import { Search, Grid3X3, List, Plus, Eye, Share2, Clock, Users, MessageSquare, Globe, FileText, Image, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ShareModal } from '@/components/modals/shareModal';

interface ProjectData {
  id: string;
  name: string;
  type: 'Website' | 'PDF' | 'Image' | 'Document';
  url?: string;
  updatedAt: string;
  collaborators: number;
  comments: number;
  owner: boolean;
  thumbnail?: string;
  icon: string;
}

const mockProjects: ProjectData[] = [
  {
    id: '1',
    name: 'Invena - Creative Agency',
    type: 'Website',
    url: 'https://html.themewant.com/invena/onepage-one.html',
    updatedAt: '2 hours ago',
    collaborators: 4,
    comments: 12,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://html.themewant.com/invena/onepage-one.html',
    icon: '🎨'
  },
  {
    id: '2',
    name: 'Redox - Design Agency',
    type: 'Website',
    url: 'https://html.ravextheme.com/redox/light/design-agency.html',
    updatedAt: '1 day ago',
    collaborators: 6,
    comments: 18,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://html.ravextheme.com/redox/light/design-agency.html',
    icon: '💼'
  },
  {
    id: '3',
    name: 'Redox - Parallax Carousel',
    type: 'Website',
    url: 'https://html.ravextheme.com/redox/dark/parallax-carousal.html',
    updatedAt: '2 days ago',
    collaborators: 3,
    comments: 9,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://html.ravextheme.com/redox/dark/parallax-carousal.html',
    icon: '🌊'
  },
  {
    id: '4',
    name: 'Redox - IT Solutions',
    type: 'Website',
    url: 'https://html.ravextheme.com/redox/dark/it-solution.html',
    updatedAt: '3 days ago',
    collaborators: 8,
    comments: 25,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://html.ravextheme.com/redox/dark/it-solution.html',
    icon: '💻'
  },
  {
    id: '5',
    name: 'Invena - Portfolio Hub',
    type: 'Website',
    url: 'https://html.themewant.com/invena/',
    updatedAt: '4 days ago',
    collaborators: 5,
    comments: 14,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://html.themewant.com/invena/',
    icon: '🎯'
  },
  {
    id: '6',
    name: 'FlyPro - Aviation Services',
    type: 'Website',
    url: 'https://www.flypro.io/',
    updatedAt: '1 week ago',
    collaborators: 7,
    comments: 20,
    owner: true,
    thumbnail: 'https://image.thum.io/get/width/400/crop/800/https://www.flypro.io/',
    icon: '✈️'
  }
];

type ViewMode = 'grid' | 'list';

// Project mapping with complete data for project view
const createProjectData = (project: ProjectData) => {
  return {
    id: project.id,
    name: project.name,
    url: project.url || '',
    type: 'website',
    title: project.name,
    description: `${project.type} project - ${project.collaborators} collaborators, ${project.comments} comments`,
    isResponsive: true,
    createdAt: new Date().toISOString(),
    favicon: `https://www.google.com/s2/favicons?domain=${new URL(project.url || 'https://example.com').hostname}&sz=64`,
    siteName: project.name.split(' - ')[0] || project.name,
    domain: project.url ? new URL(project.url).hostname : 'example.com',
    thumbnail: project.thumbnail
  };
};

interface MyProjectsProps {
  onBack?: () => void;
  onProjectClick?: (project: any) => void;
  onNewProjectClick?: () => void;
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

function MyProjects({ 
  onBack, 
  onProjectClick, 
  onNewProjectClick, 
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
}: MyProjectsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shareModalProject, setShareModalProject] = useState<ProjectData | null>(null);

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareProject = (project: ProjectData) => {
    setShareModalProject(project);
  };

  const handleCloseShareModal = () => {
    setShareModalProject(null);
  };

  return (
    <PageHeader 
      title="My Projects" 
      description="Your creative work and collaborations in one place"
      maxWidth="max-w-[1400px]"
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
      onProjectClick={onProjectClick}
    >
      {/* Header Stats and Actions */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={onNewProjectClick}
            className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgb(106,73,252,0.3)] transition-all duration-200 font-medium text-sm"
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">New Project</span>
            <span className="xs:hidden">New</span>
          </Button>
        </motion.div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="relative w-full sm:w-96">
          <Input 
            placeholder="Search your projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground pl-10 sm:pl-11 h-10 sm:h-11 rounded-lg focus:border-[#6a49fc] focus:ring-1 focus:ring-[#6a49fc] transition-all"
          />
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="bg-card border border-border rounded-lg p-1 flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`h-8 sm:h-9 px-3 sm:px-4 rounded-lg transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-[#6a49fc] text-white shadow-md' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('list')}
            className={`h-8 sm:h-9 px-3 sm:px-4 rounded-lg transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-[#6a49fc] text-white shadow-md' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />
        ) : viewMode === 'grid' ? (
          <GridView projects={filteredProjects} onProjectClick={(project) => onProjectClick?.(createProjectData(project))} onShareProject={handleShareProject} />
        ) : (
          <ListView projects={filteredProjects} onProjectClick={(project) => onProjectClick?.(createProjectData(project))} onShareProject={handleShareProject} />
        )}
      </motion.div>

      {/* Share Modal */}
      {shareModalProject && (
        <ShareModal
          isOpen={!!shareModalProject}
          onClose={handleCloseShareModal}
          project={{
            id: shareModalProject.id,
            name: shareModalProject.name,
            url: shareModalProject.url || '',
            type: shareModalProject.type
          }}
        />
      )}
    </PageHeader>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div 
          key={i} 
          className="bg-card border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Skeleton  className="h-32 sm:h-48 w-full" />
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <Skeleton  className="h-4 sm:h-5 w-full" />
              <Skeleton  className="h-3 sm:h-4 w-3/4" />
            </div>
            <div className="flex justify-between">
              <Skeleton  className="h-3 sm:h-4 w-16" />
              <Skeleton  className="h-3 sm:h-4 w-16" />
            </div>
            <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border">
              <Skeleton className="h-5 sm:h-6 w-16" />
              <Skeleton  className="h-7 sm:h-8 w-20" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div 
          key={i} 
          className="bg-card border border-border rounded-lg p-4 sm:p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton  className="w-12 h-12 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton  className="h-4 w-48" />
                <Skeleton  className="h-3 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton  className="h-6 w-16" />
              <Skeleton  className="h-8 w-20" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GridView({ projects, onProjectClick, onShareProject }: { projects: ProjectData[], onProjectClick?: (project: any) => void, onShareProject?: (project: ProjectData) => void }) {
  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'Website':
        return <Globe className="h-5 w-5 text-[#51a2ff]" />;
      case 'PDF':
        return <FileType className="h-5 w-5 text-[#ff6467]" />;
      case 'Document':
        return <FileText className="h-5 w-5 text-[#05df72]" />;
      case 'Image':
        return <Image className="h-5 w-5 text-[#c27aff]" />;
      default:
        return <Globe className="h-5 w-5 text-[#51a2ff]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-card border border-border rounded-lg overflow-hidden group hover:border-[rgba(106,73,252,0.4)] hover:shadow-[0_8px_30px_rgba(106,73,252,0.15)] transition-all duration-300 cursor-pointer"
          onClick={() => onProjectClick?.(project)}
        >
          {/* Thumbnail */}
          <div className="h-32 sm:h-48 relative overflow-hidden">
            <img 
              src={project.thumbnail} 
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Top badges */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
              <div className="bg-black/20 backdrop-blur-sm rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                {getProjectIcon(project.type)}
                <span className="text-xs text-white/80">{project.type}</span>
              </div>
            </div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
              <Badge className="bg-[rgba(106,73,252,0.9)] backdrop-blur-sm border-[rgba(106,73,252,0.4)] text-white hover:bg-[rgba(106,73,252,0.9)] text-xs px-1.5 sm:px-2 py-0.5">
                <span className="text-xs">Owner</span>
              </Badge>
            </div>

            {/* Bottom right stats */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center gap-2">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{project.comments}</span>
              </div>
            </div>

            {/* Bottom left stats */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1">
                <Users className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{project.collaborators}</span>
              </div>
            </div>

            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3">
              <Button 
                size="sm" 
                className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white h-8 sm:h-9 px-3 sm:px-4 rounded-lg shadow-lg hover:shadow-[0_4px_20px_rgba(106,73,252,0.4)] transition-all duration-200 text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectClick?.(project);
                }}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View
              </Button>
              <Button 
                variant="ghost"
                size="sm" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-8 sm:h-9 px-3 sm:px-4 rounded-lg transition-all duration-200 text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareProject?.(project);
                }}
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-foreground font-medium text-sm sm:text-base mb-1 sm:mb-2 truncate group-hover:text-[#a78bfa] transition-colors">{project.name}</h3>
              <p className="text-muted-foreground text-xs">Updated {project.updatedAt}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ListView({ projects, onProjectClick, onShareProject }: { projects: ProjectData[], onProjectClick?: (project: any) => void, onShareProject?: (project: ProjectData) => void }) {
  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'Website':
        return <Globe className="h-6 w-6 text-[#51a2ff]" />;
      case 'PDF':
        return <FileType className="h-6 w-6 text-[#ff6467]" />;
      case 'Document':
        return <FileText className="h-6 w-6 text-[#05df72]" />;
      case 'Image':
        return <Image className="h-6 w-6 text-[#c27aff]" />;
      default:
        return <Globe className="h-6 w-6 text-[#51a2ff]" />;
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-card border border-border rounded-lg p-4 sm:p-6 group hover:border-[rgba(106,73,252,0.4)] hover:shadow-[0_4px_20px_rgba(106,73,252,0.1)] transition-all duration-300 cursor-pointer"
          onClick={() => onProjectClick?.(project)}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
            {/* Left side - Project info */}
            <div className="flex items-center gap-3 sm:gap-5 flex-1 w-full">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-accent rounded-xl flex items-center justify-center border border-border flex-shrink-0">
                {getProjectIcon(project.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <h3 className="text-foreground font-medium text-sm sm:text-base group-hover:text-[#a78bfa] transition-colors truncate">{project.name}</h3>
                  <Badge variant="secondary" className="bg-accent text-foreground hover:bg-accent text-xs px-2 py-0.5">
                    {project.type}
                  </Badge>
                  <Badge className="bg-[rgba(106,73,252,0.2)] text-[#a78bfa] border-[rgba(106,73,252,0.3)] hover:bg-[rgba(106,73,252,0.2)] text-xs px-2 py-0.5">
                    Owner
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    {project.updatedAt}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{project.collaborators} collaborators</span>
                    <span className="sm:hidden">{project.collaborators}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{project.comments} comments</span>
                    <span className="sm:hidden">{project.comments}</span>
                  </span>
                </div>
                
                {project.url && (
                  <div className="text-xs text-muted-foreground font-mono bg-accent rounded-md px-2 py-1 inline-block truncate max-w-full">
                    {project.url}
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 sm:flex-initial h-8 sm:h-9 px-3 sm:px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectClick?.(project);
                }}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 sm:flex-initial h-8 sm:h-9 px-3 sm:px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareProject?.(project);
                }}
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


const ProjectsPage = ()=> {
  return (
    <SidebarLayout>
       <MyProjects/>
    </SidebarLayout>
  )
}

export default ProjectsPage