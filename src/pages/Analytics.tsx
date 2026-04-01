import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiInsights, monthlyRevenue, pipelineData } from "@/data/mockData";
import { Brain, Lightbulb, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const iconMap = {
  opportunity: Lightbulb,
  warning: AlertTriangle,
  recommendation: Sparkles,
};

const impactColor = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-info/10 text-info",
};

const conversionData = [
  { metric: "Open Rate", current: 55, benchmark: 45 },
  { metric: "Reply Rate", current: 18, benchmark: 12 },
  { metric: "Meeting Rate", current: 8, benchmark: 5 },
  { metric: "Close Rate", current: 24, benchmark: 18 },
  { metric: "Upsell Rate", current: 12, benchmark: 8 },
];

export default function Analytics() {
  return (
    <DashboardLayout title="AI Insights" subtitle="AI-powered analytics and recommendations">
      {/* AI Insights Cards */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">AI Recommendations</h2>
          <Badge variant="secondary" className="text-[10px]">
            {aiInsights.length} insights
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {aiInsights.map((insight, i) => {
            const Icon = iconMap[insight.type];
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-tight">{insight.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {insight.description}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${impactColor[insight.impact]}`}
                          >
                            {insight.impact} impact
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Lead Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={pipelineData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 13%, 50%)" />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    tick={{ fontSize: 11 }}
                    stroke="hsl(215, 13%, 50%)"
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(214, 20%, 90%)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(217, 91%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Performance vs Benchmark</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={conversionData}>
                  <PolarGrid stroke="hsl(214, 20%, 90%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="hsl(217, 91%, 50%)"
                    fill="hsl(217, 91%, 50%)"
                    fillOpacity={0.15}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="hsl(142, 71%, 45%)"
                    fill="hsl(142, 71%, 45%)"
                    fillOpacity={0.1}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(214, 20%, 90%)",
                      fontSize: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Prediction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold">Revenue Prediction</CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
                AI Forecast
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={[
                  ...monthlyRevenue,
                  { month: "Jul", revenue: 95000, leads: 225 },
                  { month: "Aug", revenue: 108000, leads: 248 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 13%, 50%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 13%, 50%)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(214, 20%, 90%)",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(217, 91%, 50%)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
