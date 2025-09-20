import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Clock,
  Trash2,
  Check,
  Bell
} from 'lucide-react';
import { Button } from '../ui/button';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'activity';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  project?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Project exported successfully',
    message: 'Website Redesign project has been exported to PDF.',
    timestamp: '2 min ago',
    isRead: false,
    project: 'Website Redesign'
  },
  {
    id: '2',
    type: 'activity',
    title: 'New comment on project',
    message: 'Sarah Johnson left a comment on the homepage design.',
    timestamp: '1 hour ago',
    isRead: false,
    project: 'E-commerce App'
  },
  {
    id: '3',
    type: 'info',
    title: 'Project shared with you',
    message: 'Alex Chen shared "Mobile App Redesign" project with you.',
    timestamp: '3 hours ago',
    isRead: true,
    project: 'Mobile App Redesign'
  },
  {
    id: '4',
    type: 'activity',
    title: 'Project status updated',
    message: 'Landing Page project has been marked as completed.',
    timestamp: '1 day ago',
    isRead: true,
    project: 'Landing Page'
  }
];

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#05DF72]" strokeWidth={1.5} />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.5} />;
      case 'info':
        return <Info className="w-5 h-5 text-[#3B82F6]" strokeWidth={1.5} />;
      case 'activity':
        return <Clock className="w-5 h-5 text-[#6a49fc]" strokeWidth={1.5} />;
      default:
        return <Info className="w-5 h-5 text-[#99a1af]" strokeWidth={1.5} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-6">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-[400px] max-w-[90vw] bg-card border border-border rounded-[16px] shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[rgba(106,73,252,0.1)] dark:bg-[rgba(106,73,252,0.15)] rounded-[8px] flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#6a49fc]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-foreground font-medium text-[16px]">Notifications</h2>
                  {unreadCount > 0 && (
                    <p className="text-muted-foreground text-[12px] mt-0.5">{unreadCount} new</p>
                  )}
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-accent rounded-[8px] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-2 text-[13px] font-medium rounded-[8px] transition-all ${
                    filter === 'all'
                      ? 'bg-[rgba(106,73,252,0.15)] text-[#6a49fc] border border-[rgba(106,73,252,0.3)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  All
                </motion.button>
                <motion.button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-2 text-[13px] font-medium rounded-[8px] transition-all ${
                    filter === 'unread'
                      ? 'bg-[rgba(106,73,252,0.15)] text-[#6a49fc] border border-[rgba(106,73,252,0.3)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-[#6a49fc] text-white text-[10px] rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
              </div>

              {unreadCount > 0 && (
                <motion.button
                  onClick={markAllAsRead}
                  className="text-[13px] text-[#6a49fc] hover:text-[#8b6bff] transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mark all read
                </motion.button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-[12px] flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-medium text-[14px] mb-2">
                  {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                </h3>
                <p className="text-muted-foreground text-[12px] leading-relaxed">
                  {filter === 'unread' 
                    ? 'You have no unread notifications.'
                    : 'New notifications will appear here.'
                  }
                </p>
              </div>
            ) : (
              <div>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-accent transition-colors group cursor-pointer ${
                      !notification.isRead ? 'bg-[rgba(106,73,252,0.04)] dark:bg-[rgba(106,73,252,0.08)]' : ''
                    } ${index !== filteredNotifications.length - 1 ? 'border-b border-border' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className={`font-medium text-[14px] leading-[20px] mb-1 ${
                              !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-[13px] leading-[18px] mb-3 ${
                              !notification.isRead ? 'text-foreground opacity-90' : 'text-muted-foreground'
                            }`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground text-[11px] font-medium">
                                {notification.timestamp}
                              </span>
                              {notification.project && (
                                <>
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                                  <span className="text-[#8b6bff] text-[11px] font-medium">
                                    {notification.project}
                                  </span>
                                </>
                              )}
                              {!notification.isRead && (
                                <>
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                                  <div className="w-2 h-2 bg-[#6a49fc] rounded-full"></div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.isRead && (
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="w-7 h-7 flex items-center justify-center hover:bg-accent rounded-[6px] transition-colors"
                                title="Mark as read"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Check className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                              </motion.button>
                            )}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="w-7 h-7 flex items-center justify-center hover:bg-destructive/20 rounded-[6px] transition-colors group/delete"
                              title="Delete notification"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-muted-foreground group-hover/delete:text-destructive" strokeWidth={1.5} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="px-6 py-4 border-t border-border">
              <motion.button 
                className="w-full text-[#6a49fc] hover:text-[#8b6bff] text-[13px] font-medium transition-colors py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View all notifications
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}