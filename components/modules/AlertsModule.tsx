import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { alerts as initialAlerts, interventions as initialInterventions } from '../../data/mockData';
import { AlertTriangle, CheckCircle, Eye, XCircle } from 'lucide-react';

export function AlertsModule() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [interventions, setInterventions] = useState(initialInterventions);

  const handleMarkViewed = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'Viewed' as const } : a));
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'Resolved' as const } : a));
  };

  const newAlerts = alerts.filter(a => a.status === 'New');
  const viewedAlerts = alerts.filter(a => a.status === 'Viewed');
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-orange-500" />
          Alerts & Notifications
        </h1>
        <p className="text-gray-600">Monitor and manage student risk alerts and interventions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{alerts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-orange-600">New Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{newAlerts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-blue-600">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{viewedAlerts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-green-600">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Alerts ({alerts.length})</TabsTrigger>
          <TabsTrigger value="new">New ({newAlerts.length})</TabsTrigger>
          <TabsTrigger value="viewed">Viewed ({viewedAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AlertsTable alerts={alerts} onMarkViewed={handleMarkViewed} onResolve={handleResolveAlert} />
        </TabsContent>

        <TabsContent value="new">
          <AlertsTable alerts={newAlerts} onMarkViewed={handleMarkViewed} onResolve={handleResolveAlert} />
        </TabsContent>

        <TabsContent value="viewed">
          <AlertsTable alerts={viewedAlerts} onMarkViewed={handleMarkViewed} onResolve={handleResolveAlert} />
        </TabsContent>

        <TabsContent value="resolved">
          <AlertsTable alerts={resolvedAlerts} onMarkViewed={handleMarkViewed} onResolve={handleResolveAlert} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Active Interventions</CardTitle>
          <CardDescription>Track intervention progress and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interventions.map((intervention) => (
                <TableRow key={intervention.id}>
                  <TableCell className="font-medium">{intervention.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{intervention.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{intervention.description}</TableCell>
                  <TableCell>{intervention.assignedTo}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        intervention.status === 'Completed' ? 'default' :
                        intervention.status === 'In Progress' ? 'secondary' :
                        'outline'
                      }
                    >
                      {intervention.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {intervention.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(intervention.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AlertsTable({ 
  alerts, 
  onMarkViewed, 
  onResolve 
}: { 
  alerts: typeof initialAlerts;
  onMarkViewed: (id: string) => void;
  onResolve: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.studentName}</TableCell>
                <TableCell>
                  <Badge variant="outline">{alert.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    alert.severity === 'High' ? 'destructive' :
                    alert.severity === 'Medium' ? 'default' :
                    'secondary'
                  }>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">{alert.message}</TableCell>
                <TableCell>{new Date(alert.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    alert.status === 'New' ? 'default' :
                    alert.status === 'Viewed' ? 'secondary' :
                    'outline'
                  }>
                    {alert.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {alert.status === 'New' && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onMarkViewed(alert.id)}
                        title="Mark as Viewed"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    {alert.status !== 'Resolved' && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onResolve(alert.id)}
                        title="Resolve"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
