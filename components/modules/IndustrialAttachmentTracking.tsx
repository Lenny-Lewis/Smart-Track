import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { students, industrialAttachments, type IndustrialAttachment } from '../../data/mockData';
import { Briefcase, Plus, CheckCircle, Clock, AlertCircle, Building2, Calendar, User } from 'lucide-react';
import { Progress } from '../ui/progress';

export function IndustrialAttachmentTracking() {
  const [attachments, setAttachments] = useState<IndustrialAttachment[]>(industrialAttachments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    company: '',
    startDate: '',
    endDate: '',
    supervisor: '',
  });

  const handleAddAttachment = () => {
    const newAttachment: IndustrialAttachment = {
      id: `IA${Date.now()}`,
      studentId: formData.studentId,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'Pending Approval',
      supervisor: formData.supervisor,
    };

    setAttachments([...attachments, newAttachment]);
    setIsDialogOpen(false);
    
    // Reset form
    setFormData({
      studentId: '',
      company: '',
      startDate: '',
      endDate: '',
      supervisor: '',
    });
  };

  const getAttachmentStatus = (attachment: IndustrialAttachment) => {
    const today = new Date();
    const endDate = new Date(attachment.endDate);
    
    if (attachment.status === 'Completed') return 'Completed';
    if (attachment.status === 'Pending Approval') return 'Pending Approval';
    if (today < new Date(attachment.startDate)) return 'Not Started';
    if (today > endDate) return 'Overdue';
    return 'Ongoing';
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getProgressPercentage = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (today < start) return 0;
    if (today > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();
    return (elapsed / total) * 100;
  };

  const eligibleStudents = students.filter(s => s.year >= 3); // Only year 3 and 4
  const ongoingAttachments = attachments.filter(a => getAttachmentStatus(a) === 'Ongoing');
  const completedAttachments = attachments.filter(a => a.status === 'Completed');
  const pendingApproval = attachments.filter(a => a.status === 'Pending Approval');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Briefcase className="w-8 h-8" />
            Industrial Attachment Tracking
          </h1>
          <p className="text-gray-600">Monitor student industrial attachment placements and progress</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Register Attachment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register Industrial Attachment</DialogTitle>
              <DialogDescription>Enter student placement details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {eligibleStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.studentId}) - Year {student.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Company/Organization</Label>
                <Input
                  placeholder="e.g., Safaricom PLC, KCB Bank"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industry Supervisor</Label>
                <Input
                  placeholder="e.g., Mr. John Maina"
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                />
              </div>

              <Button onClick={handleAddAttachment} className="w-full">
                Register Attachment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{attachments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-600">Ongoing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{ongoingAttachments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{completedAttachments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-600">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{pendingApproval.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Attachments</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AttachmentTable attachments={attachments} getAttachmentStatus={getAttachmentStatus} getDaysRemaining={getDaysRemaining} getProgressPercentage={getProgressPercentage} />
        </TabsContent>

        <TabsContent value="ongoing">
          <AttachmentTable 
            attachments={attachments.filter(a => getAttachmentStatus(a) === 'Ongoing')} 
            getAttachmentStatus={getAttachmentStatus} 
            getDaysRemaining={getDaysRemaining}
            getProgressPercentage={getProgressPercentage}
          />
        </TabsContent>

        <TabsContent value="completed">
          <AttachmentTable 
            attachments={attachments.filter(a => a.status === 'Completed')} 
            getAttachmentStatus={getAttachmentStatus} 
            getDaysRemaining={getDaysRemaining}
            getProgressPercentage={getProgressPercentage}
          />
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Attachment placements awaiting university approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attachments.filter(a => a.status === 'Pending Approval').map(attachment => {
                  const student = students.find(s => s.id === attachment.studentId);
                  return (
                    <div key={attachment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{student?.name}</p>
                          <p className="text-sm text-gray-600">{student?.studentId} • Year {student?.year}</p>
                        </div>
                        <Badge variant="secondary">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span>{attachment.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{attachment.supervisor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(attachment.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(attachment.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Request Changes
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {attachments.filter(a => a.status === 'Pending Approval').length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No pending approvals
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Companies Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Companies</CardTitle>
          <CardDescription>Organizations hosting our students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from(new Set(attachments.map(a => a.company))).map(company => {
              const companyAttachments = attachments.filter(a => a.company === company);
              return (
                <div key={company} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{company}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {companyAttachments.length} student{companyAttachments.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AttachmentTable({ 
  attachments, 
  getAttachmentStatus, 
  getDaysRemaining,
  getProgressPercentage 
}: { 
  attachments: IndustrialAttachment[];
  getAttachmentStatus: (a: IndustrialAttachment) => string;
  getDaysRemaining: (date: string) => number;
  getProgressPercentage: (start: string, end: string) => number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attachment Records</CardTitle>
        <CardDescription>Student industrial attachment details</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Admission No.</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attachments.map((attachment) => {
              const student = students.find(s => s.id === attachment.studentId);
              const status = getAttachmentStatus(attachment);
              const daysRemaining = getDaysRemaining(attachment.endDate);
              const progress = getProgressPercentage(attachment.startDate, attachment.endDate);
              
              return (
                <TableRow key={attachment.id}>
                  <TableCell className="font-medium">{student?.name}</TableCell>
                  <TableCell>{student?.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {attachment.company}
                    </div>
                  </TableCell>
                  <TableCell>{attachment.supervisor}</TableCell>
                  <TableCell className="text-sm">
                    <div>{new Date(attachment.startDate).toLocaleDateString()}</div>
                    <div className="text-gray-500">to {new Date(attachment.endDate).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={progress} />
                      <span className="text-xs whitespace-nowrap">{progress.toFixed(0)}%</span>
                    </div>
                    {status === 'Ongoing' && daysRemaining > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{daysRemaining} days left</p>
                    )}
                  </TableCell>
                  <TableCell>
                    {status === 'Completed' && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {status === 'Ongoing' && (
                      <Badge variant="default">
                        <Clock className="w-3 h-3 mr-1" />
                        Ongoing
                      </Badge>
                    )}
                    {status === 'Pending Approval' && (
                      <Badge variant="secondary">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {status === 'Not Started' && (
                      <Badge variant="outline">
                        Not Started
                      </Badge>
                    )}
                    {status === 'Overdue' && (
                      <Badge variant="destructive">
                        Overdue
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {attachments.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                  No attachment records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
