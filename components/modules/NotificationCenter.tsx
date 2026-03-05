import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle, XCircle, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Low GPA Warning',
      message: 'Your current GPA (2.3) has fallen below the minimum threshold of 2.5. Please schedule a meeting with your academic advisor.',
      date: '2026-02-27T10:30:00',
      read: false,
      action: {
        label: 'Schedule Meeting',
        url: '/student/advisor',
      },
    },
    {
      id: '2',
      type: 'warning',
      title: 'Attendance Alert',
      message: 'Your attendance in CS301 (Algorithms) is at 68%, below the required 75%. Improve attendance to avoid academic penalties.',
      date: '2026-02-26T14:20:00',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Grade Posted',
      message: 'Your grade for Assignment 3 in CS302 has been posted: B+ (87/100)',
      date: '2026-02-25T09:15:00',
      read: true,
      action: {
        label: 'View Grade',
        url: '/student/courses',
      },
    },
    {
      id: '4',
      type: 'success',
      title: 'Tutoring Session Scheduled',
      message: 'Your peer tutoring session for CS301 has been scheduled for Tuesday, March 2 at 3:00 PM in Library Room 204.',
      date: '2026-02-24T16:45:00',
      read: true,
    },
    {
      id: '5',
      type: 'info',
      title: 'Course Registration Opens',
      message: 'Registration for Fall 2026 semester opens on March 15, 2026. Start planning your schedule now.',
      date: '2026-02-23T08:00:00',
      read: true,
    },
    {
      id: '6',
      type: 'warning',
      title: 'Midterm Exam Reminder',
      message: 'Midterm exam for MATH201 is scheduled for March 5, 2026 at 10:00 AM in Building A, Room 101.',
      date: '2026-02-22T12:00:00',
      read: true,
    },
    {
      id: '7',
      type: 'info',
      title: 'Study Group Invitation',
      message: 'You have been invited to join the CS301 study group. Meetings every Wednesday at 4:00 PM.',
      date: '2026-02-21T11:30:00',
      read: true,
      action: {
        label: 'Join Group',
        url: '/student',
      },
    },
    {
      id: '8',
      type: 'success',
      title: 'Scholarship Application',
      message: 'Your application for the Merit Scholarship has been received and is under review.',
      date: '2026-02-20T15:20:00',
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-orange-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Bell className="w-8 h-8" />
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with important alerts and information
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{notifications.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-600">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-600">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {notifications.filter(n => n.type === 'alert' || n.type === 'warning').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-600">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {notifications.filter(n => {
                const date = new Date(n.date);
                const today = new Date();
                return date.toDateString() === today.toDateString();
              }).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
            getIcon={getIcon}
            getBorderColor={getBorderColor}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="unread">
          <NotificationList
            notifications={unreadNotifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
            getIcon={getIcon}
            getBorderColor={getBorderColor}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="read">
          <NotificationList
            notifications={readNotifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
            getIcon={getIcon}
            getBorderColor={getBorderColor}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  getIcon: (type: Notification['type']) => React.ReactNode;
  getBorderColor: (type: Notification['type']) => string;
  formatDate: (date: string) => string;
}

function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
  getIcon,
  getBorderColor,
  formatDate,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No notifications</p>
          <p className="text-gray-400 text-sm">You're all caught up!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getBorderColor(notification.type)} ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="default" className="ml-2 text-xs">
                            New
                          </Badge>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(notification.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      {notification.action && (
                        <Button size="sm" variant="outline">
                          {notification.action.label}
                        </Button>
                      )}
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(notification.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
