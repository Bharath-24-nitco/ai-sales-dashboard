/**
 * API client for AI-SALES_LEAD FastAPI backend.
 * Update API_BASE_URL to point to your running FastAPI server.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

// --- Types matching backend schemas ---
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  score: number;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  source: string;
  value: number;
  notes: string;
  created_at: string;
  updated_at: string;
  ai_insights?: Record<string, unknown> | null;
}

export interface CompanyInsight {
  company_name: string;
  summary: string;
  industry: string;
  key_people: { name: string; title: string; relevance: string }[];
  recent_news: { headline: string; summary: string; date: string; sentiment: string }[];
  technologies: string[];
  pain_points: string[];
  talking_points: string[];
  score_recommendation: number;
  sources: string[];
}

export interface DashboardStats {
  total_leads: number;
  pipeline_value: number;
  conversion_rate: number;
  avg_deal_size: number;
  leads_by_status: Record<string, number>;
  leads_by_source: Record<string, number>;
  monthly_revenue: { month: string; revenue: number; leads: number }[];
  pipeline_stages: { stage: string; count: number; value: number }[];
}

export interface LeadScore {
  score: number;
  reasoning: string;
  next_action: string;
  risk_factors: string[];
}

// --- API functions ---
export const api = {
  // Health
  health: () => request<{ status: string }>("/api/health"),

  // Leads
  getLeads: (params?: { status?: string; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== "all") qs.set("status", params.status);
    if (params?.search) qs.set("search", params.search);
    return request<Lead[]>(`/api/leads/?${qs}`);
  },
  getLead: (id: string) => request<Lead>(`/api/leads/${id}`),
  createLead: (data: Omit<Lead, "id" | "created_at" | "updated_at" | "ai_insights">) =>
    request<Lead>("/api/leads/", { method: "POST", body: JSON.stringify(data) }),
  updateLead: (id: string, data: Partial<Lead>) =>
    request<Lead>(`/api/leads/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteLead: (id: string) =>
    request<void>(`/api/leads/${id}`, { method: "DELETE" }),

  // Research & AI
  researchCompany: (company_name: string, domain?: string) =>
    request<CompanyInsight>("/api/research/company", {
      method: "POST",
      body: JSON.stringify({ company_name, domain }),
    }),
  generateEmail: (lead_name: string, company_name: string, insights: Record<string, unknown>, tone?: string) =>
    request<{ email_draft: string }>("/api/research/email-draft", {
      method: "POST",
      body: JSON.stringify({ lead_name, company_name, insights, tone }),
    }),
  scoreLead: (lead_data: Record<string, unknown>) =>
    request<LeadScore>("/api/research/score", {
      method: "POST",
      body: JSON.stringify({ lead_data }),
    }),

  // Analytics
  getDashboardStats: () => request<DashboardStats>("/api/analytics/dashboard"),
};
