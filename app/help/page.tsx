'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/ui/layout';
import { 
  Search, 
  MessageCircle, 
  Send, 
  HelpCircle,
  Lightbulb,
  Bug,
  ChevronRight,
  CheckCircle,
  Clock,
  Zap,
  Users,
  Video,
  Heart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SidebarLayout from '@/components/ui/sideBar';
import { JottyAIButton } from '@/components/ui/jottyAiButton';

interface HelpItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  readTime?: string;
}

interface FeedbackType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const helpArticles: HelpItem[] = [
  {
    id: '1',
    title: 'Getting Started with Jottyme',
    description: 'Learn the basics of creating and managing projects',
    category: 'Getting Started',
    icon: Zap,
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'How to Import and Share Projects',
    description: 'Step-by-step guide to importing URLs and sharing with your team',
    category: 'Projects',
    icon: Send,
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'Using Comments and Annotations',
    description: 'Master the feedback tools for effective collaboration',
    category: 'Collaboration',
    icon: MessageCircle,
    readTime: '4 min read'
  },
  {
    id: '4',
    title: 'Managing Team Members',
    description: 'Add team members and control project permissions',
    category: 'Team Management',
    icon: Users,
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Advanced Features Guide',
    description: 'Explore powerful features for experienced users',
    category: 'Advanced',
    icon: Lightbulb,
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems',
    category: 'Troubleshooting',
    icon: HelpCircle,
    readTime: '6 min read'
  }
];

const feedbackTypes: FeedbackType[] = [
  {
    id: 'feature',
    title: 'Feature Request',
    description: 'Suggest new features or improvements',
    icon: Lightbulb,
    color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
  },
  {
    id: 'bug',
    title: 'Report a Bug',
    description: 'Let us know about issues you\'ve encountered',
    icon: Bug,
    color: 'border-red-500/30 bg-red-500/10 text-red-400'
  },
  {
    id: 'general',
    title: 'General Feedback',
    description: 'Share your thoughts and suggestions',
    icon: Heart,
    color: 'border-pink-500/30 bg-pink-500/10 text-pink-400'
  }
];

interface HelpFeedbackProps {
  onBack?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToNotifications?: () => void;
  onMobileMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
  onNavigateToMyProjects?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToActivity?: () => void;
}

function HelpFeedback({ 
  onBack, 
  onNavigateToSettings, 
  onNavigateToBilling, 
  onNavigateToPrivacy, 
  onNavigateToNotifications, 
  onMobileMenuClick,
  onSearchClick,
  onNotificationsClick,
  onAvatarClick,
  onNavigateToMyProjects,
  onNavigateToAnalytics,
  onNavigateToActivity
}: HelpFeedbackProps) {
  const [activeTab, setActiveTab] = useState<'help' | 'feedback'>('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackType, setFeedbackType] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredArticles = searchQuery 
    ? helpArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpArticles;

  const handleSubmitFeedback = async () => {
    if (!feedbackType || !feedbackText.trim()) {
      toast.error('Please select a feedback type and provide details');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you! Your feedback has been sent successfully.');
    setFeedbackText('');
    setFeedbackType('');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <Layout
      onNavigateToSettings={onNavigateToSettings}
      onNavigateToBilling={onNavigateToBilling}
      onNavigateToPrivacy={onNavigateToPrivacy}
      onNavigateToNotifications={onNavigateToNotifications}
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
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#6a49fc]/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#6a49fc]" />
              </div>
              <div>
                <h1 className="text-foreground font-semibold text-2xl">Help & Support</h1>
                <p className="text-muted-foreground">Get help, find answers, or share feedback</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-card p-1 rounded-xl w-fit border border-border">
              <motion.button
                onClick={() => setActiveTab('help')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'help' 
                    ? 'bg-[#6a49fc] text-white shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </div>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'feedback' 
                    ? 'bg-[#6a49fc] text-white shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Feedback
                </div>
              </motion.button>
            </div>
          </div>

          {/* Help Tab Content */}
          {activeTab === 'help' && (
            <div className="space-y-8">
              {/* Search */}
              <div>
                <h2 className="text-foreground font-medium mb-4">Search Help Articles</h2>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-[#6a49fc]"
                  />
                </div>
              </div>

              {/* Help Articles */}
              <div>
                <h2 className="text-foreground font-medium mb-4">
                  {searchQuery ? `Search Results (${filteredArticles.length})` : 'Popular Articles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArticles.map((article, index) => {
                    const Icon = article.icon;
                    return (
                      <motion.div
                        key={article.id}
                        className="bg-card border border-border rounded-xl p-6 hover:border-[#6a49fc]/50 transition-all cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => toast.info('Article coming soon!')}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#6a49fc]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#6a49fc]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[#6a49fc] text-sm bg-[#6a49fc]/10 px-2 py-1 rounded">
                                {article.category}
                              </span>
                              {article.readTime && (
                                <span className="text-muted-foreground text-sm flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.readTime}
                                </span>
                              )}
                            </div>
                            <h3 className="text-foreground font-medium mb-2 group-hover:text-[#6a49fc] transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{article.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#6a49fc] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-foreground font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      Try searching with different keywords or browse our quick actions above.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Feedback Tab Content */}
          {activeTab === 'feedback' && (
            <div className="max-w-2xl space-y-8">
              {/* Feedback Type Selection */}
              <div>
                <h2 className="text-foreground font-medium mb-4">What type of feedback do you have?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {feedbackTypes.map((type, index) => {
                    const Icon = type.icon;
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => setFeedbackType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          feedbackType === type.id
                            ? type.color
                            : 'border-border bg-card hover:border-[#6a49fc]/30'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5" />
                          <span className="text-foreground font-medium">{type.title}</span>
                          {feedbackType === type.id && (
                            <CheckCircle className="w-4 h-4 ml-auto" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{type.description}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Form */}
              <div className="space-y-6">
                <div>
                  <label className="text-foreground font-medium mb-3 block">
                    Tell us more about your feedback
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Please provide as much detail as possible. This helps us understand your needs better..."
                    className="w-full h-32 bg-card border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#6a49fc] transition-colors resize-none"
                  />
                  <p className="text-muted-foreground text-sm mt-2">
                    {feedbackText.length}/500 characters
                  </p>
                </div>

                <div>
                  <label className="text-foreground font-medium mb-3 block">
                    Email (optional)
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-[#6a49fc]"
                  />
                  <p className="text-muted-foreground text-sm mt-2">
                    We'll only use this to follow up on your feedback if needed.
                  </p>
                </div>

                <Button
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackType || !feedbackText.trim() || isSubmitting}
                  className="bg-[#6a49fc] hover:bg-[#5a3efc] text-white disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}




const HelpFeedbackPage = ()=> {
  return (
    <SidebarLayout>
        <HelpFeedback/>
        <JottyAIButton/>
    </SidebarLayout>
  )
}

export default HelpFeedbackPage