'use client'
import { useState, useEffect } from 'react';
import SidebarLayout from '@/components/ui/sideBar';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/pageHeader';
import { Search, Grid3X3, List, Plus, Eye, Share2, Clock, Users, MessageSquare, Globe, FileText, Image, FileType, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ShareModal } from '@/components/modals/shareModal';
import { JottyAIButton } from '@/components/ui/jottyAiButton';
import { NewProjectModal } from '@/components/modals/newProjectModal';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

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
}

type ViewMode = 'grid' | 'list';

const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();

  if (diffInMs < 0) return 'In the future';

  const seconds = Math.floor(diffInMs / 1000);
  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30.44); // Approximate month length
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [shareModalProject, setShareModalProject] = useState<ProjectData | null>(null);
  const [deleteModalProject, setDeleteModalProject] = useState<ProjectData | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async (): Promise<ProjectData[]> => {
    setIsLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch('https://jottymebackend-production.up.railway.app/api/project', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const apiProjects = Array.isArray(responseData.data) ? responseData.data : [];
        const mappedProjects = apiProjects.map((p: any) => ({
          id: p._id,
          name: p.name,
          type: (p.type.charAt(0).toUpperCase() + p.type.slice(1)) as 'Website' | 'PDF' | 'Image' | 'Document',
          url: p.sourceUrl?.[0] || '',
          updatedAt: formatRelativeTime(p.updatedAt),
          collaborators: p.collaborators?.length || 0,
          comments: p.comments?.length || 0,
          owner: true,
          thumbnail: p.previewImage,
        }));
        setProjects(mappedProjects);
        return mappedProjects;
      } else {
        console.error('Failed to fetch projects');
        setProjects([]);
        return [];
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = Array.isArray(projects) ? projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const hasProjectsOrLoading = isLoading || filteredProjects.length > 0;

  const handleShareProject = (project: ProjectData) => {
    setShareModalProject(project);
  };

  const handleCloseShareModal = () => {
    setShareModalProject(null);
  };

  const handleDeleteProject = (project: ProjectData) => {
    setDeleteModalProject(project);
  };

  const confirmDeleteProject = async () => {
    if (!deleteModalProject) return;
    const currentId = deleteModalProject.id;
    setIsDeleting(true);
    setDeleteModalProject(null);
    try {
      const token = Cookies.get('token');
      await fetch(`https://jottymebackend-production.up.railway.app/api/project/${currentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    const newProjects = await fetchProjects();
    const isDeleted = !newProjects.some(p => p.id === currentId);
    if (isDeleted) {
      toast.success("Project deleted successfully");
    } else {
      toast.error("Failed to delete project");
    }
    setIsDeleting(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalProject(null);
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
            onClick={()=>setIsNewProjectModalOpen(true)}
            className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgb(106,73,252,0.3)] transition-all duration-200 font-medium text-sm"
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">New Project</span>
            <span className="xs:hidden">New</span>
          </Button>
        </motion.div>
      </div>

      {/* Search and View Controls - Only show if loading or has projects */}
      {hasProjectsOrLoading && (
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
      )}

      {/* Projects */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />
        ) : filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            <GridView projects={filteredProjects} onProjectClick={(project) => onProjectClick?.(createProjectData(project))} onShareProject={handleShareProject} onDeleteProject={handleDeleteProject} />
          ) : (
            <ListView projects={filteredProjects} onProjectClick={(project) => onProjectClick?.(createProjectData(project))} onShareProject={handleShareProject} onDeleteProject={handleDeleteProject} />
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 space-y-4"
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-foreground">No projects yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">Get started by creating your first project to begin collaborating and gathering feedback.</p>
            <Button 
              onClick={() => setIsNewProjectModalOpen(true)}
              className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgb(106,73,252,0.3)] transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          </motion.div>
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

      {/* Delete Confirmation Modal */}
      {deleteModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border rounded-lg p-6 sm:p-8 max-w-md w-full mx-4"
          >
            <div className="text-center space-y-4">
              <Trash2 className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-semibold text-foreground">Delete Project?</h3>
              <p className="text-muted-foreground">Are you sure you want to delete "{deleteModalProject.name}"? This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                  className="px-4"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteProject}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white px-4"
                >
                  {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <NewProjectModal onClose={()=>setIsNewProjectModalOpen(false)} isOpen={isNewProjectModalOpen}/>
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

function GridView({ projects, onProjectClick, onShareProject, onDeleteProject }: { projects: ProjectData[], onProjectClick?: (project: any) => void, onShareProject?: (project: ProjectData) => void, onDeleteProject?: (project: ProjectData) => void }) {
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
              src={project.thumbnail || (project.url ? `https://image.thum.io/get/width/400/crop/800/${project.url}` : '')} 
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2">
              <Button 
                size="sm" 
                className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white h-7 sm:h-8 px-2 sm:px-3 rounded-lg shadow-lg hover:shadow-[0_4px_20px_rgba(106,73,252,0.4)] transition-all duration-200 text-xs"
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
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-7 sm:h-8 px-2 sm:px-3 rounded-lg transition-all duration-200 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareProject?.(project);
                }}
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Share
              </Button>
              <Button 
                variant="ghost"
                size="sm" 
                className="bg-red-500/20 backdrop-blur-sm border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300 h-7 sm:h-8 px-2 sm:px-3 rounded-lg transition-all duration-200 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject?.(project);
                }}
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Delete
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

function ListView({ projects, onProjectClick, onShareProject, onDeleteProject }: { projects: ProjectData[], onProjectClick?: (project: any) => void, onShareProject?: (project: ProjectData) => void, onDeleteProject?: (project: ProjectData) => void }) {
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
            <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 sm:flex-initial h-7 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all text-xs"
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
                className="flex-1 sm:flex-initial h-7 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareProject?.(project);
                }}
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 sm:flex-initial h-7 sm:h-8 px-2 sm:px-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject?.(project);
                }}
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Delete
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
       <JottyAIButton/>
    </SidebarLayout>
  )
}

export default ProjectsPage