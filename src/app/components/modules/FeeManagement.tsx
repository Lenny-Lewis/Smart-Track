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
import { students, feePayments, type FeePayment } from '../../data/mockData';
import { DollarSign, CreditCard, AlertTriangle, CheckCircle, Download, Plus, Receipt } from 'lucide-react';
import { Progress } from '../ui/progress';

const SEMESTER_FEE = 50000; // KES 50,000 per semester

export function FeeManagement() {
  const [payments, setPayments] = useState<FeePayment[]>(feePayments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    amount: 0,
    paymentMethod: 'M-PESA',
    receiptNumber: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleRecordPayment = () => {
    const student = students.find(s => s.id === formData.studentId);
    if (!student) return;

    const newPayment: FeePayment = {
      id: `FP${Date.now()}`,
      studentId: formData.studentId,
      amount: formData.amount,
      date: formData.date,
      semester: 'Semester 2, 2025/2026',
      paymentMethod: formData.paymentMethod,
      receiptNumber: formData.receiptNumber || `REC${Date.now()}`,
    };

    setPayments([...payments, newPayment]);
    setIsDialogOpen(false);
    
    // Reset form
    setFormData({
      studentId: '',
      amount: 0,
      paymentMethod: 'M-PESA',
      receiptNumber: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const getStudentPayments = (studentId: string) => {
    return payments.filter(p => p.studentId === studentId);
  };

  const getTotalPaid = (studentId: string) => {
    return getStudentPayments(studentId).reduce((sum, p) => sum + p.amount, 0);
  };

  const getPaymentProgress = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    const totalPaid = SEMESTER_FEE - student.feeBalance;
    return (totalPaid / SEMESTER_FEE) * 100;
  };

  const studentsWithBalances = students.filter(s => s.feeBalance > 0).sort((a, b) => b.feeBalance - a.feeBalance);
  const totalOutstanding = students.reduce((sum, s) => sum + s.feeBalance, 0);
  const totalCollected = students.reduce((sum, s) => sum + (SEMESTER_FEE - s.feeBalance), 0);
  const studentsFullyPaid = students.filter(s => s.feeBalance === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            Fee Management System
          </h1>
          <p className="text-gray-600">Track student fee payments and balances</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Fee Payment</DialogTitle>
              <DialogDescription>Enter payment details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.studentId}) - Balance: KES {student.feeBalance.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount (KES)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M-PESA">M-PESA</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Bank Deposit">Bank Deposit</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Receipt/Transaction Number</Label>
                <Input
                  placeholder="e.g., ABC123XYZ"
                  value={formData.receiptNumber}
                  onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                />
              </div>

              <Button onClick={handleRecordPayment} className="w-full">
                <Receipt className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-600">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              KES {totalCollected.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-600">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              KES {totalOutstanding.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-600">Fully Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {studentsFullyPaid} / {students.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-600">With Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {studentsWithBalances.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="balances" className="w-full">
        <TabsList>
          <TabsTrigger value="balances">Fee Balances</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="statements">Fee Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="balances">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Fee Balances</CardTitle>
                  <CardDescription>Current semester fee status for all students</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admission No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const paid = SEMESTER_FEE - student.feeBalance;
                    const progress = getPaymentProgress(student.id);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>Year {student.year}</TableCell>
                        <TableCell>KES {SEMESTER_FEE.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          KES {paid.toLocaleString()}
                        </TableCell>
                        <TableCell className={student.feeBalance > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                          KES {student.feeBalance.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={progress} className={progress === 100 ? '' : 'bg-red-100'} />
                            <span className="text-xs whitespace-nowrap">{progress.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.feeBalance === 0 ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Cleared
                            </Badge>
                          ) : student.feeBalance > 30000 ? (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Critical
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Transaction History</CardTitle>
              <CardDescription>Recent fee payments recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Admission No.</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const student = students.find(s => s.id === payment.studentId);
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.receiptNumber}</TableCell>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell className="font-medium">{student?.studentId}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          KES {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {payment.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{payment.semester}</TableCell>
                      </TableRow>
                    );
                  })}
                  {payments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                        No payment records yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  High Balance Alert
                </CardTitle>
                <CardDescription>Students with balances over KES 30,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentsWithBalances.filter(s => s.feeBalance > 30000).map(student => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                        <Badge variant="destructive">
                          KES {student.feeBalance.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{student.department}</span>
                        <span>•</span>
                        <span>Year {student.year}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Generate Fee Statement
                      </Button>
                    </div>
                  ))}
                  {studentsWithBalances.filter(s => s.feeBalance > 30000).length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No students with high balances
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Exam Card Eligibility
                </CardTitle>
                <CardDescription>Students cleared for exam cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.filter(s => s.feeBalance === 0 || s.feeBalance < 5000).map(student => (
                    <div key={student.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                        {student.feeBalance === 0 ? (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            KES {student.feeBalance.toLocaleString()}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{student.department}</span>
                        <span>•</span>
                        <span>Year {student.year}</span>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        <Download className="w-3 h-3 mr-2" />
                        Generate Exam Card
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
