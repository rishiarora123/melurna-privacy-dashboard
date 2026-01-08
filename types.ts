export interface TrafficRequest {
  timestamp: string;
  method: string;
  url: string;
  domain: string;
  hostname: string;
  response_code: number;
  destination_ip: string;
  destination_country: string;
  is_third_party: boolean;
  has_sentinels: boolean;
  category?: string;
}

export interface SentinelLocation {
  domain: string;
  ip: string;
  country: string;
}

export interface Sentinel {
  type: "Email" | "SSN" | "SessionID" | "ProductID" | "Phone" | "Address";
  value: string;
  count: number;
  risk_level: "High" | "Medium" | "Low";
  locations: SentinelLocation[];
}

export interface Scores {
  geo_risk: number;
  security: number;
  compliance: number;
  availability: number;
  vendor: number;
}

export interface OverviewStats {
  scans_performed: number;
  total_companies: number;
  total_third_parties: number;
  scan_activity: { date: string; scans: number }[];
}

export interface CategoryStat {
  name: string;
  count: number;
  risk: "High" | "Medium" | "Low";
  ip_count: number;
}

export interface VendorStat {
  name: string;
  domain: string;
  type: "First Party" | "Third Party";
  count: number;
  share_percentage?: number;
}

export interface Summary {
  overview: OverviewStats;
  risk_score: number;
  scores: Scores;
  categories: CategoryStat[];
  vendors: VendorStat[];
}

export interface MelurnaData {
  summary: Summary;
  sentinels: Sentinel[];
  traffic_log: TrafficRequest[];
}