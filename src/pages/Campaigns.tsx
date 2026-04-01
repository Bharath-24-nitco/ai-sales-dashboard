import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { campaigns } from "@/data/mockData";
import { Plus, Mail, PlayCircle, PauseCircle, CheckCircle, FileEdit } from "lucide-react";
import { motion } from "framer-motion";

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  active: { icon: PlayCircle, color: "bg-success/10 text-success border-success/20", label: "Active" },
  paused: { icon: PauseCircle, color: "bg-warning/10 text-warning border-warning/20", label: "Paused" },
  completed: { icon: CheckCircle, color: "bg-primary/10 text-primary border-primary/20", label: "Completed" },
  draft: { icon: FileEdit, color: "bg-muted text-muted-foreground border-muted", label: "Draft" },
};

export default function Campaigns() {
  return (
    <DashboardLayout title="Campaigns" subtitle="Manage outreach campaigns and sequences">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">All Campaigns</h2>
          <Badge variant="secondary" className="text-[10px]">{campaigns.length}</Badge>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {campaigns.map((campaign, i) => {
          const config = statusConfig[campaign.status];
          const StatusIcon = config.icon;
          const openRate = campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0;
          const replyRate = campaign.sent > 0 ? Math.round((campaign.replied / campaign.sent) * 100) : 0;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-semibold">{campaign.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{campaign.type}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${config.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <p className="text-lg font-bold">{campaign.sent.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{campaign.opened.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{campaign.replied}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Replied</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{campaign.meetings}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Meetings</p>
                    </div>
                  </div>

                  {campaign.sent > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Open Rate</span>
                        <span className="font-medium">{openRate}%</span>
                      </div>
                      <Progress value={openRate} className="h-1.5" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Reply Rate</span>
                        <span className="font-medium">{replyRate}%</span>
                      </div>
                      <Progress value={replyRate} className="h-1.5" />
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground">
                    Started {new Date(campaign.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
