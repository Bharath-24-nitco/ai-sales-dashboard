import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, Lead } from "@/lib/api";
import { Search, Plus, Filter, Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  new: "bg-info/10 text-info border-info/20",
  contacted: "bg-warning/10 text-warning border-warning/20",
  qualified: "bg-primary/10 text-primary border-primary/20",
  proposal: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  won: "bg-success/10 text-success border-success/20",
  lost: "bg-destructive/10 text-destructive border-destructive/20",
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-success/10 text-success"
      : score >= 60
      ? "bg-warning/10 text-warning"
      : "bg-destructive/10 text-destructive";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      {score}
    </span>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function Leads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        const data = await api.getLeads({ status: statusFilter, search: search || undefined });
        setLeads(data);
      } catch (e: any) {
        toast({ title: "Failed to load leads", description: e.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    const debounce = setTimeout(fetchLeads, 300);
    return () => clearTimeout(debounce);
  }, [search, statusFilter]);

  return (
    <DashboardLayout title="Leads" subtitle="Manage and track your sales leads">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-base font-semibold">All Leads</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add Lead
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 w-full sm:w-[140px] text-xs">
                  <Filter className="h-3 w-3 mr-1.5" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Lead</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Score</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider hidden md:table-cell">Source</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider hidden lg:table-cell">Value</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider hidden lg:table-cell">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {lead.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.company}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><ScoreBadge score={lead.score} /></TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${statusColor[lead.status]}`}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{lead.source}</TableCell>
                        <TableCell className="hidden lg:table-cell text-xs font-medium">{formatCurrency(lead.value)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{timeAgo(lead.updated_at)}</TableCell>
                      </TableRow>
                    ))}
                    {leads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                          No leads found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
