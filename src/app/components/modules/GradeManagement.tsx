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
import { students, courses } from '../../data/mockData';
import { Plus, Pencil, Trash2, FileText, Calculator } from 'lucide-react';

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  assessmentType: 'Midterm' | 'Final' | 'Assignment' | 'Quiz' | 'Project' | 'Lab';
  assessmentName: string;
  score: number;
  maxScore: number;
  weight: number;
  date: string;
  feedback?: string;
}

export function GradeManagement() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    assessmentType: 'Assignment' as Grade['assessmentType'],
    assessmentName: '',
    score: 0,
    maxScore: 100,
    weight: 10,
    date: new Date().toISOString().split('T')[0],
    feedback: '',
  });

  const course = courses.find(c => c.id === selectedCourse);
  const enrolledStudents = students.filter(s => 
    s.enrolledCourses.includes(course?.code || '')
  );

  const handleAddGrade = () => {
    const student = students.find(s => s.id === formData.studentId);
    if (!student) return;

    const newGrade: Grade = {
      id: `GRADE-${Date.now()}`,
      studentId: formData.studentId,
      studentName: student.name,
      courseId: selectedCourse,
      ...formData,
    };

    setGrades([...grades, newGrade]);
    setIsDialogOpen(false);
    setFormData({
      studentId: '',
      assessmentType: 'Assignment',
      assessmentName: '',
      score: 0,
      maxScore: 100,
      weight: 10,
      date: new Date().toISOString().split('T')[0],
      feedback: '',
    });
  };

  const handleDeleteGrade = (gradeId: string) => {
    setGrades(grades.filter(g => g.id !== gradeId));
  };

  const getStudentGrades = (studentId: string) => {
    return grades.filter(g => g.studentId === studentId && g.courseId === selectedCourse);
  };

  const calculateStudentAverage = (studentId: string) => {
    const studentGrades = getStudentGrades(studentId);
    if (studentGrades.length === 0) return null;

    const totalWeight = studentGrades.reduce((sum, g) => sum + g.weight, 0);
    const weightedSum = studentGrades.reduce((sum, g) => 
      sum + ((g.score / g.maxScore) * 100 * g.weight), 0
    );

    return totalWeight > 0 ? (weightedSum / totalWeight) : 0;
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'E';
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 50) return 'text-orange-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const courseGrades = grades.filter(g => g.courseId === selectedCourse);
  const assessmentTypes = Array.from(new Set(courseGrades.map(g => g.assessmentType)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Grade Management</h1>
          <p className="text-gray-600">Record and manage student grades</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
              <DialogDescription>Enter assessment details and student score</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student</Label>
                  <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {enrolledStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.studentId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assessment Type</Label>
                  <Select value={formData.assessmentType} onValueChange={(value: any) => setFormData({ ...formData, assessmentType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Assignment">Assignment</SelectItem>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                      <SelectItem value="Midterm">Midterm</SelectItem>
                      <SelectItem value="Final">Final Exam</SelectItem>
                      <SelectItem value="Project">Project</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assessment Name</Label>
                <Input
                  placeholder="e.g., Assignment 1, Midterm Exam"
                  value={formData.assessmentName}
                  onChange={(e) => setFormData({ ...formData, assessmentName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Score</Label>
                  <Input
                    type="number"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Score</Label>
                  <Input
                    type="number"
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (%)</Label>
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Feedback (Optional)</Label>
                <Input
                  placeholder="Comments for the student"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                />
              </div>

              <Button onClick={handleAddGrade} className="w-full">
                Add Grade
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Course</CardTitle>
          <CardDescription>Choose a course to manage grades</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.code} - {course.name} ({course.enrolledStudents} students)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{enrolledStudents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{assessmentTypes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{courseGrades.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {enrolledStudents.length > 0
                ? (enrolledStudents
                    .map(s => calculateStudentAverage(s.id))
                    .filter(avg => avg !== null)
                    .reduce((sum, avg) => sum + (avg || 0), 0) /
                    enrolledStudents.filter(s => calculateStudentAverage(s.id) !== null).length
                  ).toFixed(1)
                : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gradebook" className="w-full">
        <TabsList>
          <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="gradebook">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Gradebook</CardTitle>
                  <CardDescription>Overview of all student grades in {course?.code}</CardDescription>
                </div>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Grades
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Grades Recorded</TableHead>
                    <TableHead>Current Average</TableHead>
                    <TableHead>Letter Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledStudents.map((student) => {
                    const studentGrades = getStudentGrades(student.id);
                    const average = calculateStudentAverage(student.id);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{studentGrades.length}</TableCell>
                        <TableCell>
                          {average !== null ? (
                            <span className={`font-semibold ${getGradeColor(average)}`}>
                              {average.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-gray-400">No grades</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {average !== null ? (
                            <Badge variant={average >= 60 ? 'default' : 'destructive'}>
                              {getLetterGrade(average)}
                            </Badge>
                          ) : (
                            <Badge variant="outline">-</Badge>
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Records</CardTitle>
              <CardDescription>All graded assessments for this course</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{grade.assessmentName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{grade.assessmentType}</Badge>
                      </TableCell>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell>
                        {grade.score}/{grade.maxScore}
                      </TableCell>
                      <TableCell>
                        <span className={getGradeColor((grade.score / grade.maxScore) * 100)}>
                          {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>{grade.weight}%</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteGrade(grade.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {courseGrades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                        No grades recorded yet. Click "Add Grade" to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['A', 'B', 'C', 'D', 'E'].map(letter => {
                    const count = enrolledStudents.filter(s => {
                      const avg = calculateStudentAverage(s.id);
                      return avg !== null && getLetterGrade(avg) === letter;
                    }).length;
                    const percentage = enrolledStudents.length > 0 
                      ? (count / enrolledStudents.length) * 100 
                      : 0;

                    return (
                      <div key={letter}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Grade {letter}</span>
                          <span>{count} students ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              letter === 'A' ? 'bg-green-500' :
                              letter === 'B' ? 'bg-blue-500' :
                              letter === 'C' ? 'bg-orange-500' :
                              letter === 'D' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessmentTypes.map(type => {
                    const typeGrades = courseGrades.filter(g => g.assessmentType === type);
                    const avgScore = typeGrades.length > 0
                      ? typeGrades.reduce((sum, g) => sum + ((g.score / g.maxScore) * 100), 0) / typeGrades.length
                      : 0;

                    return (
                      <div key={type} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{type}</span>
                          <Badge variant="outline">{typeGrades.length} grades</Badge>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Average:</span>
                          <span className={`font-semibold ${getGradeColor(avgScore)}`}>
                            {avgScore.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {assessmentTypes.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No assessment data available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}