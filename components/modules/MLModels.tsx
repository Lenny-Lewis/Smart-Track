import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, Trophy, Activity, TrendingUp } from 'lucide-react';
import { mlModels, featureImportance } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function MLModels() {
  const bestModel = mlModels.reduce((best, current) => 
    current.accuracy > best.accuracy ? current : best
  );

  const comparisonData = mlModels.map(model => ({
    name: model.model.replace(' (XGBoost)', '').replace(' (MLP)', ''),
    Accuracy: model.accuracy * 100,
    Precision: model.precision * 100,
    Recall: model.recall * 100,
    F1: model.f1Score * 100,
    'ROC-AUC': model.rocAuc * 100,
  }));

  const radarData = [
    { metric: 'Accuracy', ...Object.fromEntries(mlModels.map(m => [m.model, m.accuracy * 100])) },
    { metric: 'Precision', ...Object.fromEntries(mlModels.map(m => [m.model, m.precision * 100])) },
    { metric: 'Recall', ...Object.fromEntries(mlModels.map(m => [m.model, m.recall * 100])) },
    { metric: 'F1 Score', ...Object.fromEntries(mlModels.map(m => [m.model, m.f1Score * 100])) },
    { metric: 'ROC-AUC', ...Object.fromEntries(mlModels.map(m => [m.model, m.rocAuc * 100])) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Brain className="w-8 h-8" />
          Machine Learning Models
        </h1>
        <p className="text-gray-600">Risk prediction model performance and evaluation metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Models Trained</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlModels.length}</div>
            <p className="text-xs text-muted-foreground">Active algorithms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Model</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{bestModel.model}</div>
            <p className="text-xs text-muted-foreground">Accuracy: {(bestModel.accuracy * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mlModels.reduce((sum, m) => sum + m.accuracy, 0) / mlModels.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all models</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Importance</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of all metrics across models</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Accuracy" fill="#3b82f6" />
                  <Bar dataKey="Precision" fill="#22c55e" />
                  <Bar dataKey="Recall" fill="#f59e0b" />
                  <Bar dataKey="F1" fill="#8b5cf6" />
                  <Bar dataKey="ROC-AUC" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <h4 className="font-semibold mb-4">Radar Chart - Comprehensive View</h4>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    {mlModels.map((model, idx) => (
                      <Radar
                        key={model.model}
                        name={model.model}
                        dataKey={model.model}
                        stroke={['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'][idx]}
                        fill={['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'][idx]}
                        fillOpacity={0.3}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="space-y-4">
            {mlModels.map((model) => (
              <Card key={model.model}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{model.model}</CardTitle>
                    {model.model === bestModel.model && (
                      <Badge className="bg-yellow-500">
                        <Trophy className="w-3 h-3 mr-1" />
                        Best Performance
                      </Badge>
                    )}
                  </div>
                  <CardDescription>Detailed performance metrics and evaluation scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Accuracy</span>
                        <span className="text-sm font-bold">{(model.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.accuracy * 100} />
                      <p className="text-xs text-gray-500 mt-1">Overall correctness</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Precision</span>
                        <span className="text-sm font-bold">{(model.precision * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.precision * 100} />
                      <p className="text-xs text-gray-500 mt-1">Positive prediction accuracy</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Recall</span>
                        <span className="text-sm font-bold">{(model.recall * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.recall * 100} />
                      <p className="text-xs text-gray-500 mt-1">True positive rate</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">F1 Score</span>
                        <span className="text-sm font-bold">{(model.f1Score * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.f1Score * 100} />
                      <p className="text-xs text-gray-500 mt-1">Harmonic mean</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">ROC-AUC</span>
                        <span className="text-sm font-bold">{(model.rocAuc * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.rocAuc * 100} />
                      <p className="text-xs text-gray-500 mt-1">Area under curve</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance Analysis</CardTitle>
              <CardDescription>SHAP values showing which factors most influence risk predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.5]} />
                  <YAxis type="category" dataKey="feature" width={150} />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Feature Explanations:</h4>
                {featureImportance.map((feature) => (
                  <div key={feature.feature} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{feature.feature}</h5>
                      <Badge>{(feature.importance * 100).toFixed(0)}%</Badge>
                    </div>
                    <Progress value={feature.importance * 100} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {feature.feature === 'Attendance Rate' && 'Student attendance percentage is the strongest predictor of academic risk.'}
                      {feature.feature === 'Previous GPA' && 'Historical academic performance significantly impacts future success predictions.'}
                      {feature.feature === 'Failed Assessments' && 'Number of failed tests and assignments contributes to risk assessment.'}
                      {feature.feature === 'Study Hours' && 'Self-reported weekly study hours show moderate correlation with outcomes.'}
                      {feature.feature === 'Participation Score' && 'Class participation metrics have minor predictive value.'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
