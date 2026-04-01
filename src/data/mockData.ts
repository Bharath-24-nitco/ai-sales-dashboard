export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  source: string;
  value: string;
  lastActivity: string;
  avatar?: string;
}

export const leads: Lead[] = [
  { id: "1", name: "Sarah Chen", company: "TechFlow Inc", email: "sarah@techflow.com", score: 92, status: "qualified", source: "LinkedIn", value: "$45,000", lastActivity: "2 hours ago" },
  { id: "2", name: "Marcus Johnson", company: "DataVault Co", email: "marcus@datavault.co", score: 87, status: "proposal", source: "Website", value: "$72,000", lastActivity: "4 hours ago" },
  { id: "3", name: "Emily Rodriguez", company: "CloudSync", email: "emily@cloudsync.io", score: 78, status: "contacted", source: "Referral", value: "$38,000", lastActivity: "1 day ago" },
  { id: "4", name: "James Park", company: "NexGen Labs", email: "james@nexgen.com", score: 95, status: "won", source: "Cold Email", value: "$120,000", lastActivity: "3 days ago" },
  { id: "5", name: "Aisha Patel", company: "GrowthMetrics", email: "aisha@growthmetrics.io", score: 64, status: "new", source: "LinkedIn", value: "$28,000", lastActivity: "5 hours ago" },
  { id: "6", name: "David Kim", company: "Innovate AI", email: "david@innovateai.com", score: 81, status: "qualified", source: "Conference", value: "$55,000", lastActivity: "12 hours ago" },
  { id: "7", name: "Lisa Thompson", company: "ScaleUp Corp", email: "lisa@scaleup.com", score: 43, status: "lost", source: "Website", value: "$32,000", lastActivity: "2 days ago" },
  { id: "8", name: "Ryan O'Brien", company: "Apex Digital", email: "ryan@apex.digital", score: 88, status: "proposal", source: "Referral", value: "$95,000", lastActivity: "6 hours ago" },
  { id: "9", name: "Nina Kowalski", company: "Bright Path", email: "nina@brightpath.co", score: 71, status: "contacted", source: "LinkedIn", value: "$41,000", lastActivity: "1 day ago" },
  { id: "10", name: "Tom Harris", company: "Velocity SaaS", email: "tom@velocity.io", score: 56, status: "new", source: "Cold Email", value: "$19,000", lastActivity: "3 hours ago" },
];

export const pipelineData = [
  { stage: "New", count: 45, value: 180000 },
  { stage: "Contacted", count: 32, value: 256000 },
  { stage: "Qualified", count: 18, value: 342000 },
  { stage: "Proposal", count: 12, value: 480000 },
  { stage: "Won", count: 8, value: 640000 },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 42000, leads: 120 },
  { month: "Feb", revenue: 55000, leads: 145 },
  { month: "Mar", revenue: 48000, leads: 132 },
  { month: "Apr", revenue: 71000, leads: 178 },
  { month: "May", revenue: 63000, leads: 156 },
  { month: "Jun", revenue: 89000, leads: 210 },
];

export const leadSources = [
  { name: "LinkedIn", value: 35, color: "hsl(217, 91%, 50%)" },
  { name: "Website", value: 28, color: "hsl(142, 71%, 45%)" },
  { name: "Referral", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Cold Email", value: 12, color: "hsl(280, 67%, 55%)" },
  { name: "Conference", value: 5, color: "hsl(199, 89%, 48%)" },
];

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  type: string;
  sent: number;
  opened: number;
  replied: number;
  meetings: number;
  startDate: string;
}

export const campaigns: Campaign[] = [
  { id: "1", name: "Q2 Enterprise Outreach", status: "active", type: "Email Sequence", sent: 1240, opened: 682, replied: 156, meetings: 34, startDate: "2026-03-01" },
  { id: "2", name: "SaaS Decision Makers", status: "active", type: "LinkedIn + Email", sent: 890, opened: 445, replied: 98, meetings: 22, startDate: "2026-03-10" },
  { id: "3", name: "Product Launch Follow-up", status: "completed", type: "Email Blast", sent: 2100, opened: 1365, replied: 312, meetings: 67, startDate: "2026-02-15" },
  { id: "4", name: "Re-engagement Series", status: "paused", type: "Email Sequence", sent: 560, opened: 224, replied: 45, meetings: 8, startDate: "2026-03-20" },
  { id: "5", name: "Conference Attendee Nurture", status: "draft", type: "Multi-channel", sent: 0, opened: 0, replied: 0, meetings: 0, startDate: "2026-04-01" },
];

export const aiInsights = [
  { id: "1", type: "opportunity" as const, title: "High-value lead cluster detected", description: "12 leads from the FinTech sector show 3x higher engagement. Consider targeted campaign.", confidence: 94, impact: "high" as const },
  { id: "2", type: "warning" as const, title: "Pipeline velocity slowing", description: "Average time from Qualified to Proposal increased by 4 days. Review bottlenecks.", confidence: 87, impact: "medium" as const },
  { id: "3", type: "recommendation" as const, title: "Optimal send time identified", description: "Emails sent Tuesday 9-11 AM have 42% higher open rates for your audience.", confidence: 91, impact: "high" as const },
  { id: "4", type: "opportunity" as const, title: "Cross-sell potential", description: "8 existing accounts match profile for premium tier upgrade worth ~$340K.", confidence: 82, impact: "high" as const },
  { id: "5", type: "warning" as const, title: "3 leads at risk of churning", description: "Engagement scores dropped 40%+ for DataVault, CloudSync, Bright Path. Immediate follow-up recommended.", confidence: 89, impact: "medium" as const },
];
