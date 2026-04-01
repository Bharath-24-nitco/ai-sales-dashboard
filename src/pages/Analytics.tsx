import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { api, CompanyInsight } from "@/lib/api";
import { Search, Brain, Loader2, Lightbulb, Users, Zap, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Analytics() {
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<CompanyInsight | null>(null);
  const [emailDraft, setEmailDraft] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const { toast } = useToast();

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    setLoading(true);
    setInsight(null);
    setEmailDraft("");
    try {
      const result = await api.researchCompany(companyName, domain || undefined);
      setInsight(result);
      toast({ title: "Research complete", description: `Insights generated for ${companyName}` });
    } catch (err: any) {
      toast({
        title: "Research failed",
        description: err.message || "Make sure the backend is running",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!insight) return;
    setEmailLoading(true);
    try {
      const res = await api.generateEmail("Prospect", insight.company_name, insight as any);
      setEmailDraft(res.email_draft);
    } catch (err: any) {
      toast({ title: "Email generation failed", description: err.message, variant: "destructive" });
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <DashboardLayout title="AI Insights" subtitle="AI-powered company research & lead intelligence">
      {/* Research Form */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Company Research</CardTitle>
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
              Powered by Serper + AI
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter a company name to fetch real-time intelligence from the web
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Company name (e.g. Stripe, HubSpot)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-9 pl-8 text-sm"
              />
            </div>
            <Input
              placeholder="Domain (optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="h-9 text-sm sm:w-48"
            />
            <Button type="submit" size="sm" disabled={loading || !companyName.trim()} className="h-9 gap-1.5">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
              {loading ? "Researching..." : "Research"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">{insight.company_name}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{insight.industry}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.summary}</p>
                  <div>
                    <p className="text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wide">Technologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {insight.technologies.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        insight.score_recommendation >= 80
                          ? "bg-success/10 text-success"
                          : insight.score_recommendation >= 60
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {insight.score_recommendation}
                    </span>
                    AI Lead Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">Based on company signals, growth patterns, and pain point alignment.</p>
                  <Button size="sm" variant="outline" onClick={handleGenerateEmail} disabled={emailLoading} className="w-full gap-1.5 text-xs">
                    {emailLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Mail className="h-3 w-3" />}
                    Generate Outreach Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Key People & Pain Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" /> Key People
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {insight.key_people.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold">
                        {p.name?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-muted-foreground">{p.title}</p>
                      </div>
                    </div>
                  ))}
                  {insight.key_people.length === 0 && (
                    <p className="text-xs text-muted-foreground">No key people found</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4 text-warning" /> Pain Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {insight.pain_points.map((p, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="text-destructive mt-0.5">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-primary" /> Talking Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {insight.talking_points.map((t, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="text-success mt-0.5">→</span> {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recent News */}
            {insight.recent_news.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Recent News</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {insight.recent_news.map((n, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Badge
                        variant="outline"
                        className={`text-[9px] mt-0.5 ${
                          n.sentiment === "positive"
                            ? "bg-success/10 text-success border-success/20"
                            : n.sentiment === "negative"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {n.sentiment}
                      </Badge>
                      <div>
                        <p className="text-xs font-medium">{n.headline}</p>
                        <p className="text-[11px] text-muted-foreground">{n.summary}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Email Draft */}
            {emailDraft && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-primary" /> AI-Generated Outreach Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea value={emailDraft} readOnly className="min-h-[160px] text-xs" />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Sources */}
            {insight.sources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide pt-0.5">Sources:</span>
                {insight.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-primary hover:underline truncate max-w-[200px]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!insight && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-sm font-semibold mb-1">No research yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Enter a company name above to fetch real-time intelligence from the web and generate AI-powered sales insights.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
