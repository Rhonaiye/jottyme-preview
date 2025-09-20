'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../../components/ui/pageHeader';
import { 
  Search, 
  MessageCircle, 
  Share, 
  UserPlus, 
  Clock,
  ChevronRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import SidebarLayout from '@/components/ui/sideBar';

interface ActivityItem {
  id: string;
  type: 'comment' | 'share' | 'join'| 'approval' | 'update';
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  project: string;
  content?: string;
  timestamp: string;
  timeAgo: string;
}

interface ActivityProps {
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

const mockActivityData: ActivityItem[] = [
  {
    id: '1',
    type: 'comment',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    action: 'added a comment',
    project: 'Invena - Creative Agency',
    content: 'The creative agency template looks amazing! I love how smooth the animations are and the modern aesthetic. Very professional.',
    timestamp: '2 minutes ago',
    timeAgo: '2 minutes ago'
  },
  {
    id: '2',
    type: 'share',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    action: 'shared project with 3 team members',
    project: 'Redox - Design Agency',
    timestamp: '1 hour ago',
    timeAgo: '1 hour ago'
  },
  {
    id: '3',
    type: 'join',
    user: {
      name: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    action: 'joined as collaborator',
    project: 'Redox - Parallax Carousel',
    timestamp: '1 day ago',
    timeAgo: '1 day ago'
  },
  {
    id: '4',
    type: 'comment',
    user: {
      name: 'Lisa Wang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    action: 'added a comment',
    project: 'Redox - IT Solutions',
    content: 'The dark theme IT solutions template is perfect for tech companies. The layouts are clean and the typography is excellent.',
    timestamp: '2 days ago',
    timeAgo: '2 days ago'
  },
  {
    id: '5',
    type: 'approval',
    user: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    },
    action: 'approved design changes',
    project: 'Invena - Portfolio Hub',
    timestamp: '3 days ago',
    timeAgo: '3 days ago'
  },
  {
    id: '6',
    type: 'update',
    user: {
      name: 'Emma Taylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    action: 'updated project files',
    project: 'FlyPro - Aviation Services',
    timestamp: '1 week ago',
    timeAgo: '1 week ago'
  }
];

// Mock projects mapping for activity references
const mockProjects: Record<string, any> = {
  'Invena - Creative Agency': {
    id: 'proj-1',
    name: 'Invena - Creative Agency',
    type: 'website',
    url: 'https://html.themewant.com/invena/onepage-one.html',
    title: 'Invena - Creative Agency',
    description: 'Modern creative agency template with elegant design and smooth animations for showcasing creative work and services.',
    isResponsive: true,
    createdAt: '2024-01-15',
    favicon: 'https://www.google.com/s2/favicons?domain=html.themewant.com&sz=64',
    siteName: 'Invena',
    author: 'Invena Team',
    domain: 'html.themewant.com'
  },
  'Redox - Design Agency': {
    id: 'proj-2',
    name: 'Redox - Design Agency', 
    type: 'website',
    url: 'https://html.ravextheme.com/redox/light/design-agency.html',
    title: 'Redox - Design Agency',
    description: 'Professional design agency website template featuring clean layouts and modern typography for creative businesses.',
    isResponsive: true,
    createdAt: '2024-01-12',
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Redox - Parallax Carousel': {
    id: 'proj-3',
    name: 'Redox - Parallax Carousel',
    type: 'website',
    url: 'https://html.ravextheme.com/redox/dark/parallax-carousal.html',
    title: 'Redox - Parallax Carousel',
    description: 'Stunning dark theme template with immersive parallax scrolling effects and dynamic carousel presentations.',
    isResponsive: true,
    createdAt: '2024-01-10',
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Redox - IT Solutions': {
    id: 'proj-4',
    name: 'Redox - IT Solutions',
    type: 'website',
    url: 'https://html.ravextheme.com/redox/dark/it-solution.html',
    title: 'Redox - IT Solutions',
    description: 'Technology-focused template designed for IT companies and tech startups with modern dark theme and professional layouts.',
    isResponsive: true,
    createdAt: '2024-01-08',
    favicon: 'https://www.google.com/s2/favicons?domain=html.ravextheme.com&sz=64',
    siteName: 'Redox',
    domain: 'html.ravextheme.com'
  },
  'Invena - Portfolio Hub': {
    id: 'proj-5',
    name: 'Invena - Portfolio Hub',
    type: 'website',
    url: 'https://html.themewant.com/invena/',
    title: 'Invena - Portfolio Hub',
    description: 'Comprehensive portfolio template showcasing multiple layouts and design variations for creative professionals.',
    isResponsive: true,
    createdAt: '2024-01-06',
    favicon: 'https://www.google.com/s2/favicons?domain=html.themewant.com&sz=64',
    siteName: 'Invena',
    domain: 'html.themewant.com'
  },
  'FlyPro - Aviation Services': {
    id: 'proj-6',
    name: 'FlyPro - Aviation Services',
    type: 'website',
    url: 'https://www.flypro.io/',
    title: 'FlyPro - Aviation Services',
    description: 'Professional aviation services platform providing comprehensive solutions for pilots, airlines, and aviation businesses.',
    isResponsive: true,
    createdAt: '2024-01-05',
    favicon: 'https://www.google.com/s2/favicons?domain=flypro.io&sz=64',
    siteName: 'FlyPro',
    domain: 'www.flypro.io'
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'comment':
      return MessageCircle;
    case 'share':
      return Share;
    case 'join':
      return UserPlus;
    default:
      return MessageCircle;
  }
};

const getActivityIconColor = (type: string) => {
  switch (type) {
    case 'comment':
      return 'text-blue-400';
    case 'share':
      return 'text-green-400';
    case 'join':
      return 'text-purple-400';
    default:
      return 'text-blue-400';
  }
};

// Component for expandable comment content
function CommentContent({ content, activityId }: { content: string; activityId: string }) {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  
  const isExpanded = expandedComments.has(activityId);

  const toggleExpanded = () => {
    const newExpandedComments = new Set(expandedComments);
    if (newExpandedComments.has(activityId)) {
      newExpandedComments.delete(activityId);
    } else {
      newExpandedComments.add(activityId);
    }
    setExpandedComments(newExpandedComments);
  };

  return (
    <div className="bg-accent rounded-[10px] p-3 sm:p-4 mt-2">
      <p className={`text-foreground/80 text-sm sm:text-base leading-relaxed ${
        isExpanded ? '' : 'line-clamp-1 sm:line-clamp-none'
      }`}>
        {content}
      </p>
      <motion.button
        onClick={toggleExpanded}
        className="flex items-center gap-1 mt-2 text-violet-400 text-xs sm:text-sm font-medium hover:text-violet-300 transition-colors sm:hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>
          {isExpanded ? 'Show less' : 'Read more'}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </motion.button>
    </div>
  );
}

 function Activity({ 
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
}: ActivityProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(mockActivityData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredActivities(mockActivityData);
      return;
    }
    
    const filtered = mockActivityData.filter(activity =>
      activity.user.name.toLowerCase().includes(query.toLowerCase()) ||
      activity.project.toLowerCase().includes(query.toLowerCase()) ||
      activity.action.toLowerCase().includes(query.toLowerCase()) ||
      activity.content?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  const handleActivityClick = (activity: ActivityItem) => {
    const project = mockProjects[activity.project];
    if (project && onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <PageHeader 
      title="Recent Activity" 
      description="Stay updated on your team's latest actions and feedback"
      maxWidth="max-w-[1200px]"
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
      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search activity..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-9 bg-input border border-border rounded-[8px] pl-12 pr-4 text-foreground placeholder-muted-foreground text-[14px] focus:outline-none focus:border-[#6a49fc] transition-colors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Activity List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredActivities.map((activity, index) => {
          const IconComponent = getActivityIcon(activity.type);
          const iconColor = getActivityIconColor(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-[14px] p-3 sm:p-[25px]"
            >
              <div className="flex gap-3 sm:gap-4 items-start">
                {/* Activity Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent border border-border rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                  {/* User Info Header */}
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[rgba(106,73,252,0.2)] overflow-hidden flex-shrink-0">
                      <img 
                        src={activity.user.avatar} 
                        alt={activity.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                        <span className="text-foreground font-medium text-sm sm:text-base">{activity.user.name}</span>
                        <span className="text-muted-foreground font-normal text-sm">{activity.action}</span>
                      </div>
                      {/* Project Name - Mobile optimized */}
                      <div className="mt-0.5 sm:mt-0">
                        <span className="text-violet-400 font-normal text-sm sm:text-base truncate block sm:inline">{activity.project}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content (if applicable) - Enhanced for mobile */}
                  {activity.content && (
                    <CommentContent content={activity.content} activityId={activity.id} />
                  )}

                  {/* Footer - Improved mobile layout */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground text-xs sm:text-sm">{activity.timeAgo}</span>
                    </div>
                    
                    <motion.button
                      className="flex items-center gap-1.5 text-violet-400 text-xs sm:text-sm font-medium hover:text-violet-300 transition-colors flex-shrink-0"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleActivityClick(activity)}
                    >
                      <span>{activity.type === 'comment' ? 'View' : 'Open'}</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && searchQuery && (
        <div className="py-12 text-center">
          <div className="text-muted-foreground text-base">
            No activity found matching "{searchQuery}"
          </div>
        </div>
      )}
    </PageHeader>
  );
}



const ActivityPage = ()=> {
  return (
   <SidebarLayout>
     <Activity/>
   </SidebarLayout>
  )
}

export default ActivityPage