export interface NetlifyHumanField {
  title: string
  name: string
  value: string | number | boolean | null
}

export interface NetlifyFormPayloadDataSystemFields {
  ip: string // [PII]
  user_agent: string
  referrer: string // FQDN source of the form
}

export interface NetlifyFormPayload {
  id: string
  form_id: string
  form_name: string
  number: number
  title: string | null
  email: string // [PII]
  name: string // [PII]
  first_name: string // [PII]
  last_name: string // [PII]
  company: string | null
  summary: string
  body: string
  data: NetlifyFormPayloadDataSystemFields & Record<string, string | number | boolean | undefined>
  created_at: string
  human_fields: Record<string, string | number | boolean | undefined>
  ordered_human_fields: NetlifyHumanField[]
  site_url: string
  site_name: string
}

export interface NetlifySiteMetadata {
  id: string
  site_id: string
  plan: string
  name: string
  custom_domain: string | null
  url: string
  admin_url: string
  deploy_url: string
  created_at: string
  updated_at: string
  account_slug: string
  account_name: string
  // We can trim the rest of the site metadata or use Record<string, unknown>
  // for the deeply nested build settings if they aren't used in your logic.
  build_settings: Record<string, unknown>
  published_deploy: Record<string, unknown>
}

/**
 * The final shape of the body passed to submission-created.ts
 */
export interface NetlifySubmissionBody {
  payload: NetlifyFormPayload
  site: NetlifySiteMetadata
}
