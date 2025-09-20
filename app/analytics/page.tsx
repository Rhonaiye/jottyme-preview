'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/ui/pageHeader';
import { 
  BarChart3,
  TrendingUp,
  MessageCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Download,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import SidebarLayout from '@/components/ui/sideBar';
import { JottyAIButton } from '@/components/ui/jottyAiButton';

interface AnalyticsProps {
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

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  percentage: string;
}

interface ChartData {
  day: string;
  value: number;
  label?: string;
}

// Mock data for different time ranges
const mockData = {
  '7d': {
    metrics: [
      { 
        label: 'Total Projects', 
        value: '12', 
        change: '+3 this week',
        trend: 'up' as const,
        percentage: '+33%',
        icon: BarChart3
      },
      { 
        label: 'Total Comments', 
        value: '47', 
        change: '+12 this week',
        trend: 'up' as const,
        percentage: '+34%',
        icon: MessageCircle
      },
      { 
        label: 'Average Response', 
        value: '2.4h', 
        change: '20% faster',
        trend: 'up' as const,
        percentage: '-20%',
        icon: Clock
      }
    ],
    chart: [
      { day: 'Mon', value: 8, label: 'Monday: 8 comments' },
      { day: 'Tue', value: 12, label: 'Tuesday: 12 comments' },
      { day: 'Wed', value: 6, label: 'Wednesday: 6 comments' },
      { day: 'Thu', value: 15, label: 'Thursday: 15 comments' },
      { day: 'Fri', value: 9, label: 'Friday: 9 comments' },
      { day: 'Sat', value: 4, label: 'Saturday: 4 comments' },
      { day: 'Sun', value: 7, label: 'Sunday: 7 comments' }
    ],
    insight: {
      title: 'Great Week!',
      message: 'Your response time improved by 20% this week. Thursday was your most active day with 15 comments.'
    }
  },
  '30d': {
    metrics: [
      { 
        label: 'Total Projects', 
        value: '28', 
        change: '+8 this month',
        trend: 'up' as const,
        percentage: '+40%',
        icon: BarChart3
      },
      { 
        label: 'Total Comments', 
        value: '184', 
        change: '+52 this month',
        trend: 'up' as const,
        percentage: '+39%',
        icon: MessageCircle
      },
      { 
        label: 'Average Response', 
        value: '3.1h', 
        change: '15% faster',
        trend: 'up' as const,
        percentage: '-15%',
        icon: Clock
      }
    ],
    chart: [
      { day: 'Week 1', value: 32, label: 'Week 1: 32 comments' },
      { day: 'Week 2', value: 45, label: 'Week 2: 45 comments' },
      { day: 'Week 3', value: 38, label: 'Week 3: 38 comments' },
      { day: 'Week 4', value: 69, label: 'Week 4: 69 comments' }
    ],
    insight: {
      title: 'Steady Growth!',
      message: 'Your engagement increased by 39% this month. Week 4 showed exceptional activity with 69 comments.'
    }
  },
  '90d': {
    metrics: [
      { 
        label: 'Total Projects', 
        value: '89', 
        change: '+23 this quarter',
        trend: 'up' as const,
        percentage: '+35%',
        icon: BarChart3
      },
      { 
        label: 'Total Comments', 
        value: '567', 
        change: '+156 this quarter',
        trend: 'up' as const,
        percentage: '+38%',
        icon: MessageCircle
      },
      { 
        label: 'Average Response', 
        value: '2.8h', 
        change: '25% faster',
        trend: 'up' as const,
        percentage: '-25%',
        icon: Clock
      }
    ],
    chart: [
      { day: 'Month 1', value: 156, label: 'Month 1: 156 comments' },
      { day: 'Month 2', value: 203, label: 'Month 2: 203 comments' },
      { day: 'Month 3', value: 208, label: 'Month 3: 208 comments' }
    ],
    insight: {
      title: 'Excellent Quarter!',
      message: 'Your response time improved by 25% over the quarter. Consistent growth in engagement and project volume.'
    }
  }
};

 function Analytics({ 
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
}: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const currentData = mockData[timeRange];
  const maxValue = Math.max(...currentData.chart.map(d => d.value));

  const handleTimeRangeChange = async (newRange: '7d' | '30d' | '90d') => {
    if (newRange === timeRange) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setTimeRange(newRange);
    setIsLoading(false);
  };

  const handleExport = () => {
    toast.success('Analytics exported successfully!');
  };

  return (
    <PageHeader 
      title="Analytics" 
      description="Track your feedback and engagement"
      maxWidth="max-w-4xl"
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
      <div className="space-y-8 lg:space-y-12 ">
        {/* Header with Time Range Selector and Export */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center flex-1">
            <div className="bg-card rounded-xl p-1 flex border border-border w-full max-w-sm">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range as '7d' | '30d' | '90d')}
                  disabled={isLoading}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-[#6a49fc] text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="hidden sm:inline">
                    {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
                  </span>
                  <span className="sm:hidden">
                    {range}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Subtle Export Button */}
          <motion.button
            onClick={handleExport}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 self-center sm:self-auto group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Download className="w-4 h-4 group-hover:text-[#6a49fc] transition-colors duration-200" />
            <span>Export</span>
          </motion.button>
        </div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 lg:space-y-8"
            >
              {/* Skeleton for metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i} 
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Skeleton 
                     
                      className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl mx-auto" 
                    />
                    <div className="space-y-2">
                      <Skeleton 
                        
                        className="h-8 lg:h-10 rounded mx-6 lg:mx-8" 
                      />
                      <Skeleton 
                        
                        className="h-5 lg:h-6 rounded mx-3 lg:mx-4" 
                      />
                      <Skeleton 
                    
                        className="h-4 rounded mx-4 lg:mx-6" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skeleton for chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-4"
              >
                <Skeleton  className="h-6 w-32" />
                <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                  <Skeleton  className="h-64 lg:h-80 w-full rounded-xl" />
                </div>
              </motion.div>

              {/* Skeleton for insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-3"
              >
                <Skeleton  className="h-6 w-24" />
                <Skeleton  className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={timeRange}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 lg:space-y-12"
            >
              {/* Key Metrics - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                {currentData.metrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <motion.div
                      key={`${timeRange}-${metric.label}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="group"
                    >
                      {/* Desktop Layout */}
                      <div className="text-center space-y-3 lg:space-y-4 hidden sm:block">
                        <motion.div 
                          className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#6a49fc]/10 rounded-2xl group-hover:bg-[#6a49fc]/20 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-[#6a49fc]" />
                        </motion.div>
                        
                        <div className="space-y-2">
                          <motion.div 
                            className="text-2xl lg:text-4xl font-semibold text-foreground"
                            key={`value-${timeRange}-${metric.value}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-base lg:text-lg text-foreground font-medium">{metric.label}</div>
                          <motion.div 
                            className={`flex items-center justify-center gap-1 text-xs lg:text-sm ${
                              metric.trend === 'up' ? 'text-[#00a63e]' : 'text-[#ff6b6b]'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                          >
                            {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />}
                            <span>{metric.change}</span>
                            <span className="text-muted-foreground ml-1">({metric.percentage})</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Mobile Layout - Clean & Simple */}
                      <div className="sm:hidden bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="inline-flex items-center justify-center w-10 h-10 bg-[#6a49fc]/10 rounded-xl"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                              <IconComponent className="w-5 h-5 text-[#6a49fc]" />
                            </motion.div>
                            <div className="text-base text-foreground font-medium">{metric.label}</div>
                          </div>
                          <motion.div 
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              metric.trend === 'up' 
                                ? 'bg-[#00a63e]/10 text-[#00a63e]' 
                                : 'bg-[#ff6b6b]/10 text-[#ff6b6b]'
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                          >
                            {metric.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            <span>{metric.percentage}</span>
                          </motion.div>
                        </div>
                        
                        <div className="space-y-2">
                          <motion.div 
                            className="text-3xl font-semibold text-foreground"
                            key={`value-mobile-${timeRange}-${metric.value}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                          >
                            {metric.value}
                          </motion.div>
                          
                          <div className="text-xs text-muted-foreground">
                            {metric.change}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Enhanced Chart - Responsive */}
              <div className="bg-card border border-border rounded-2xl p-4 lg:p-8 hover:border-[#6a49fc]/30 transition-colors duration-300">
                <div className="text-center mb-6 lg:mb-8">
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                    Comments {timeRange === '7d' ? 'This Week' : timeRange === '30d' ? 'This Month' : 'This Quarter'}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {timeRange === '7d' ? 'Daily' : timeRange === '30d' ? 'Weekly' : 'Monthly'} feedback activity
                  </p>
                </div>

                <div className="relative">
                  {/* Chart - Responsive Height and Spacing */}
                  <div className="h-32 sm:h-40 lg:h-48 flex items-end justify-center gap-3 sm:gap-4 lg:gap-6 relative px-2">
                    {currentData.chart.map((data, index) => (
                      <div key={`${timeRange}-${data.day}`} className="flex flex-col items-center gap-2 lg:gap-3 relative flex-1 max-w-12 lg:max-w-16">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: `${(data.value / maxValue) * 80}px`, opacity: 1 }}
                          transition={{ 
                            delay: index * 0.1, 
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }}
                          className="w-full bg-gradient-to-t from-[#6a49fc] to-[#8b6bff] rounded-t-lg cursor-pointer hover:from-[#5a3efc] hover:to-[#7a5bff] transition-colors duration-200 relative group"
                          onMouseEnter={() => setHoveredBar(index)}
                          onMouseLeave={() => setHoveredBar(null)}
                          whileHover={{ scale: 1.05 }}
                          style={{ minHeight: '8px' }}
                        >
                          {/* Tooltip - Responsive */}
                          <AnimatePresence>
                            {hoveredBar === index && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute -top-8 lg:-top-12 left-1/2 transform -translate-x-1/2 bg-accent border border-border rounded-lg px-2 lg:px-3 py-1 lg:py-2 text-xs text-foreground whitespace-nowrap shadow-lg z-10"
                              >
                                <span className="hidden sm:inline">{data.label}</span>
                                <span className="sm:hidden">{data.value}</span>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent border-r border-b border-border rotate-45 -mt-1" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <motion.span 
                          className="text-xs lg:text-sm text-muted-foreground font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          <span className="hidden sm:inline">{data.day}</span>
                          <span className="sm:hidden">{data.day.slice(0, 3)}</span>
                        </motion.span>
                      </div>
                    ))}
                  </div>

                  {/* Chart Info - Responsive */}
                  <motion.div 
                    className="mt-4 lg:mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Info className="w-3 h-3" />
                    <span className="hidden sm:inline">Hover over bars for detailed information</span>
                    <span className="sm:hidden">Tap bars for details</span>
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Insights - Responsive */}
              <motion.div 
                className="bg-gradient-to-br from-[#6a49fc]/5 to-[#8b6bff]/5 border border-[#6a49fc]/20 rounded-2xl p-6 lg:p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-[#6a49fc]/10 rounded-xl mb-3 lg:mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[#6a49fc]" />
                </motion.div>
                
                <motion.h3 
                  className="text-lg lg:text-xl font-semibold text-foreground mb-2"
                  key={`title-${timeRange}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentData.insight.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm lg:text-base"
                  key={`message-${timeRange}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {currentData.insight.message}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageHeader>
  );
}



const AnalyticsPage = ()=> {
  return (
   <SidebarLayout>
      <Analytics/>
      <JottyAIButton/>
   </SidebarLayout>
  )
}

export default AnalyticsPage