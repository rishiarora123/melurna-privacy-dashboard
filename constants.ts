import { MelurnaData } from './types';

export const MOCK_DATA: MelurnaData = {
  summary: {
    overview: {
      scans_performed: 5,
      total_companies: 5,
      total_third_parties: 186,
      scan_activity: [
        { date: 'Sep 01', scans: 1 },
        { date: 'Sep 10', scans: 2 },
        { date: 'Sep 20', scans: 5 },
        { date: 'Oct 01', scans: 3 },
        { date: 'Oct 15', scans: 8 },
        { date: 'Nov 01', scans: 12 },
      ]
    },
    risk_score: 660,
    scores: {
      geo_risk: 590,
      security: 413,
      compliance: 700,
      availability: 980,
      vendor: 300,
    },
    categories: [
      { name: 'Environmental Data', count: 1776, risk: 'Low', ip_count: 45 },
      { name: 'Unrelated', count: 1045, risk: 'Low', ip_count: 32 },
      { name: 'App/Device Identifiers', count: 564, risk: 'Medium', ip_count: 89 },
      { name: 'Corporate Data', count: 234, risk: 'Medium', ip_count: 12 },
      { name: 'User Behavior Metrics', count: 1840, risk: 'High', ip_count: 156 },
      { name: 'Highly Sensitive Data', count: 134, risk: 'High', ip_count: 8 },
      { name: 'Personally Identifiable Data', count: 56, risk: 'High', ip_count: 4 },
    ],
    vendors: [
      { name: 'BetterHelp', domain: 'betterhelp.com', type: 'First Party', count: 5561 },
      { name: 'Amazon', domain: 'amazon.com', type: 'First Party', count: 2208 },
      { name: 'Klaviyo Inc', domain: 'klaviyo.com', type: 'First Party', count: 2011 },
      { name: 'Twitch', domain: 'twitch.tv', type: 'First Party', count: 514 },
      { name: 'Google', domain: 'google-analytics.com', type: 'Third Party', count: 3200, share_percentage: 12.5 },
      { name: 'Facebook', domain: 'facebook.com', type: 'Third Party', count: 1500, share_percentage: 8.2 },
      { name: 'Hotjar', domain: 'hotjar.com', type: 'Third Party', count: 800, share_percentage: 3.1 },
      { name: 'Criteo', domain: 'criteo.com', type: 'Third Party', count: 450, share_percentage: 1.5 },
      { name: 'DoubleVerify', domain: 'doubleverify.com', type: 'Third Party', count: 210, share_percentage: 0.8 },
    ]
  },
  sentinels: [
    {
      type: "Email",
      value: "executive@melurna.com",
      count: 12,
      risk_level: "High",
      locations: [
        { domain: "analytics.google.com", ip: "142.250.180.174", country: "US" },
        { domain: "ads.facebook.com", ip: "157.240.229.35", country: "US" },
      ],
    },
    {
      type: "SessionID",
      value: "sid_99283_axz",
      count: 45,
      risk_level: "Medium",
      locations: [
        { domain: "api.internal-tool.io", ip: "10.0.0.5", country: "US" },
      ],
    },
    {
      type: "SSN",
      value: "XXX-XX-9281",
      count: 1,
      risk_level: "High",
      locations: [
        { domain: "unsecured-logging.net", ip: "82.11.22.33", country: "RU" },
      ],
    },
    {
      type: "ProductID",
      value: "sku_99123",
      count: 8,
      risk_level: "Low",
      locations: [
        { domain: "shop-cdn.com", ip: "23.44.11.22", country: "DE" },
      ],
    },
    {
      type: "Phone",
      value: "+1-555-0192",
      count: 5,
      risk_level: "Medium",
      locations: [
        { domain: "marketing-tracker.io", ip: "54.22.11.33", country: "US" },
      ]
    },
    {
      type: "Address",
      value: "123 Cyber Way, Silicon Valley",
      count: 2,
      risk_level: "High",
      locations: [
        { domain: "data-broker.biz", ip: "192.168.1.1", country: "CN" },
      ]
    }
  ],
  traffic_log: [
    {
      timestamp: "2023-10-27T10:00:01Z",
      method: "POST",
      url: "https://analytics.google.com/collect",
      domain: "analytics.google.com",
      hostname: "analytics.google.com",
      response_code: 200,
      destination_ip: "142.250.180.174",
      destination_country: "US",
      is_third_party: true,
      has_sentinels: true,
      category: "User Behavior Metrics"
    },
    {
      timestamp: "2023-10-27T10:00:02Z",
      method: "GET",
      url: "http://unsecured-logging.net/log?data=...",
      domain: "unsecured-logging.net",
      hostname: "unsecured-logging.net",
      response_code: 200,
      destination_ip: "82.11.22.33",
      destination_country: "RU",
      is_third_party: true,
      has_sentinels: true,
      category: "Highly Sensitive Data"
    },
    {
      timestamp: "2023-10-27T10:00:05Z",
      method: "GET",
      url: "https://api.melurna.io/v1/dashboard",
      domain: "melurna.io",
      hostname: "api.melurna.io",
      response_code: 200,
      destination_ip: "104.21.55.2",
      destination_country: "US",
      is_third_party: false,
      has_sentinels: false,
      category: "Corporate Data"
    },
    {
      timestamp: "2023-10-27T10:01:12Z",
      method: "POST",
      url: "https://ads.facebook.com/tr",
      domain: "facebook.com",
      hostname: "ads.facebook.com",
      response_code: 200,
      destination_ip: "157.240.229.35",
      destination_country: "US",
      is_third_party: true,
      has_sentinels: true,
      category: "User Behavior Metrics"
    },
    {
      timestamp: "2023-10-27T10:01:15Z",
      method: "GET",
      url: "https://shop-cdn.com/assets/img.png",
      domain: "shop-cdn.com",
      hostname: "shop-cdn.com",
      response_code: 304,
      destination_ip: "23.44.11.22",
      destination_country: "DE",
      is_third_party: true,
      has_sentinels: false,
      category: "Environmental Data"
    },
    {
      timestamp: "2023-10-27T10:02:00Z",
      method: "GET",
      url: "https://api.internal-tool.io/heartbeat",
      domain: "api.internal-tool.io",
      hostname: "api.internal-tool.io",
      response_code: 200,
      destination_ip: "10.0.0.5",
      destination_country: "US",
      is_third_party: false,
      has_sentinels: true,
      category: "App/Device Identifiers"
    },
    {
      timestamp: "2023-10-27T10:02:05Z",
      method: "GET",
      url: "https://unknown-tracker.xyz/pixel",
      domain: "unknown-tracker.xyz",
      hostname: "unknown-tracker.xyz",
      response_code: 500,
      destination_ip: "1.1.1.1",
      destination_country: "CN",
      is_third_party: true,
      has_sentinels: false,
      category: "Unrelated"
    }
  ],
};