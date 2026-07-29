import { Project } from '@/types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj_01h8x1',
    title: 'Apex Design System v3.0 Engine',
    slug: 'apex-design-system-v3',
    summary: 'Universal component tokens, accessible primitives, and fluid typography system.',
    description: 'Complete overhaul of our core component tokenization engine with zero-runtime CSS support, full WAI-ARIA compliance, and dark-first color palettes tailored for high-density SaaS interfaces.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    status: 'PUBLISHED',
    priority: 'URGENT',
    tags: ['Design System', 'Tailwind', 'Tokens', 'UI/UX'],
    views: 4230,
    featured: true,
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Principal Designer'
    },
    createdAt: '2026-06-15T10:30:00Z',
    updatedAt: '2026-07-20T14:20:00Z'
  },
  {
    id: 'prj_02h8x2',
    title: 'Distributed Event Streaming Service',
    slug: 'distributed-event-streaming-service',
    summary: 'High-throughput real-time message bus handling up to 50k events per second.',
    description: 'Architected an in-memory event dispatch framework backed by rust workers with automatic dead-letter queueing and gRPC stream compression for microservice telemetry.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    category: 'Engineering',
    status: 'PUBLISHED',
    priority: 'HIGH',
    tags: ['Distributed Systems', 'gRPC', 'Rust', 'Kafka'],
    views: 8910,
    featured: true,
    author: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Staff Engineer'
    },
    createdAt: '2026-05-10T08:15:00Z',
    updatedAt: '2026-07-18T09:45:00Z'
  },
  {
    id: 'prj_03h8x3',
    title: 'AI Command Palette & Copilot Action System',
    slug: 'ai-command-palette-copilot',
    summary: 'Keyboard-first contextual workspace search powered by local vector embeddings.',
    description: 'Integrated quick action modal (Cmd+K) supporting fuzzy semantic match across documents, user permissions, workflow triggers, and contextual AI summary generation.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    category: 'Product',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    tags: ['AI', 'Vector Search', 'UX', 'Keyboard Shortcuts'],
    views: 3120,
    featured: true,
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'Lead Product Manager'
    },
    createdAt: '2026-07-01T11:00:00Z',
    updatedAt: '2026-07-25T16:10:00Z'
  },
  {
    id: 'prj_04h8x4',
    title: 'Zero-Trust Security & Audit Telemetry Dashboard',
    slug: 'zero-trust-security-telemetry',
    summary: 'Granular access logging, biometric token validation, and IP anomaly detection.',
    description: 'Comprehensive compliance and audit trail visualization with instant session revocation, geo-fencing policies, and real-time security alerts.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    category: 'Infrastructure',
    status: 'PUBLISHED',
    priority: 'MEDIUM',
    tags: ['Security', 'OAuth2', 'Compliance', 'Audit Log'],
    views: 1840,
    featured: false,
    author: {
      name: 'Devon Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'DevOps & Security Lead'
    },
    createdAt: '2026-04-20T14:50:00Z',
    updatedAt: '2026-07-10T12:00:00Z'
  },
  {
    id: 'prj_05h8x5',
    title: 'Developer Portal & API Key Management Suite',
    slug: 'developer-portal-api-management',
    summary: 'Self-serve API token generation with scope-based rate limits and analytics.',
    description: 'Public developer console providing sandbox API keys, live interactive request builders, Webhook test triggers, and usage billing thresholds.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    category: 'Engineering',
    status: 'DRAFT',
    priority: 'MEDIUM',
    tags: ['API', 'Developer Experience', 'Webhooks', 'Portal'],
    views: 950,
    featured: false,
    author: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Staff Engineer'
    },
    createdAt: '2026-07-12T09:30:00Z',
    updatedAt: '2026-07-28T08:20:00Z'
  },
  {
    id: 'prj_06h8x6',
    title: 'Q3 Enterprise Product Rebrand & Growth Campaign',
    slug: 'q3-enterprise-rebrand-campaign',
    summary: 'Marketing landing pages, interactive product demos, and press kit materials.',
    description: 'Coordinated launch collateral across digital media channels featuring custom WebGL motion interactive graphics, customer case studies, and ROI calculators.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    category: 'Marketing',
    status: 'PUBLISHED',
    priority: 'LOW',
    tags: ['Marketing', 'Brand', 'Growth', 'Launch'],
    views: 6540,
    featured: false,
    author: {
      name: 'Aria Montgomery',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Growth Marketing Manager'
    },
    createdAt: '2026-03-01T15:00:00Z',
    updatedAt: '2026-06-30T17:30:00Z'
  }
];
