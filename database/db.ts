import { INITIAL_DATABASE_STATE } from "./initialData";

// Type definitions for query results
export interface DbResult<T = any> {
  data: T | null;
  error: Error | null;
}

export type DbTableMap = typeof INITIAL_DATABASE_STATE;
export type TableName = keyof DbTableMap | string;

// In-memory store initialized with seed state
class LocalDatabaseStore {
  private tables: Record<string, any[]> = {};

  constructor() {
    this.reset();
  }

  public reset() {
    this.tables = JSON.parse(JSON.stringify(INITIAL_DATABASE_STATE));
  }

  public getTable(tableName: string): any[] {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }
    return this.tables[tableName];
  }

  public setTable(tableName: string, rows: any[]) {
    this.tables[tableName] = rows;
  }

  public getRawStore() {
    return this.tables;
  }
}

export const localStore = new LocalDatabaseStore();

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getPrimaryKeyField(tableName: string): string {
  switch (tableName) {
    case "companies":
      return "company_id";
    case "opportunities":
      return "opportunity_id";
    case "candidate_profiles":
      return "candidate_id";
    case "applications":
      return "application_id";
    case "interview_schedules":
      return "interview_id";
    case "institutions":
      return "institution_id";
    case "institution_students":
      return "institution_student_id";
    case "academia_researchers":
      return "researcher_id";
    case "academia_opportunities":
      return "research_opportunity_id";
    case "academia_applications":
      return "research_application_id";
    case "support_tickets":
      return "ticket_id";
    case "support_ticket_messages":
      return "message_id";
    case "student_resume_details":
      return "resume_detail_id";
    case "student_skills":
      return "skill_id";
    case "student_portfolio_projects":
      return "project_id";
    case "student_external_analyses":
      return "analysis_id";
    case "student_learning_roadmaps":
      return "roadmap_id";
    case "student_certificates":
      return "certificate_id";
    case "courses":
      return "course_id";
    default:
      return "id";
  }
}

// Chainable Query Builder imitating Supabase / PostgREST
export class QueryBuilder implements PromiseLike<DbResult<any>> {
  private tableName: string;
  private operation: "select" | "insert" | "update" | "delete" = "select";
  private selectQuery: string = "*";
  private payload: any = null;
  private updates: any = null;
  private filters: Array<{ column: string; value: any }> = [];
  private orderConfig: { column: string; ascending: boolean } | null = null;
  private isSingle: boolean = false;
  private isMaybeSingle: boolean = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(query: string = "*"): this {
    this.selectQuery = query;
    return this;
  }

  insert(payload: any): this {
    this.operation = "insert";
    this.payload = payload;
    return this;
  }

  update(updates: any): this {
    this.operation = "update";
    this.updates = updates;
    return this;
  }

  delete(): this {
    this.operation = "delete";
    return this;
  }

  eq(column: string, value: any): this {
    this.filters.push({ column, value });
    return this;
  }

  order(column: string, options: { ascending?: boolean } = { ascending: true }): this {
    this.orderConfig = {
      column,
      ascending: options.ascending !== false
    };
    return this;
  }

  single(): this {
    this.isSingle = true;
    return this;
  }

  maybeSingle(): this {
    this.isMaybeSingle = true;
    return this;
  }

  // Implementation of PromiseLike so 'await db.from(...)' directly works
  then<TResult1 = DbResult<any>, TResult2 = never>(
    onfulfilled?: ((value: DbResult<any>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute(): Promise<DbResult<any>> {
    try {
      const table = localStore.getTable(this.tableName);
      const pk = getPrimaryKeyField(this.tableName);

      // --- 1. INSERT OPERATION ---
      if (this.operation === "insert") {
        const item = { ...this.payload };
        if (!item[pk]) {
          item[pk] = generateUuid();
        }
        if (!item.created_at) {
          item.created_at = new Date().toISOString();
        }
        if (!item.updated_at && (this.tableName === "companies" || this.tableName === "opportunities" || this.tableName === "applications")) {
          item.updated_at = new Date().toISOString();
        }
        // Handle lifecycle state aliases
        if (item.lifecycle_status && !item.lifecycle_state) {
          item.lifecycle_state = item.lifecycle_status;
        } else if (item.lifecycle_state && !item.lifecycle_status) {
          item.lifecycle_status = item.lifecycle_state;
        }

        table.push(item);

        if (this.isSingle || this.isMaybeSingle) {
          return { data: item, error: null };
        }
        return { data: [item], error: null };
      }

      // --- 2. UPDATE OPERATION ---
      if (this.operation === "update") {
        let matchedCount = 0;
        let lastUpdated: any = null;

        for (let i = 0; i < table.length; i++) {
          const row = table[i];
          const matches = this.filters.every((f) => {
            // handle lifecycle aliases
            if (f.column === "lifecycle_status" && row.lifecycle_state !== undefined) {
              return row.lifecycle_status === f.value || row.lifecycle_state === f.value;
            }
            return String(row[f.column]) === String(f.value);
          });

          if (matches) {
            table[i] = {
              ...row,
              ...this.updates,
              updated_at: new Date().toISOString()
            };
            lastUpdated = table[i];
            matchedCount++;
          }
        }

        if (this.isSingle) {
          if (!lastUpdated) {
            return { data: null, error: new Error(`Row not found for update in ${this.tableName}`) };
          }
          return { data: lastUpdated, error: null };
        }
        if (this.isMaybeSingle) {
          return { data: lastUpdated, error: null };
        }
        return { data: lastUpdated, error: null };
      }

      // --- 3. DELETE OPERATION ---
      if (this.operation === "delete") {
        const initialLen = table.length;
        const remaining = table.filter((row) => {
          return !this.filters.every((f) => String(row[f.column]) === String(f.value));
        });
        localStore.setTable(this.tableName, remaining);
        return { data: null, error: null };
      }

      // --- 4. SELECT OPERATION ---
      let result = table.filter((row) => {
        return this.filters.every((f) => {
          if (f.column === "lifecycle_status") {
            return row.lifecycle_status === f.value || row.lifecycle_state === f.value;
          }
          if (f.column === "lifecycle_state") {
            return row.lifecycle_state === f.value || row.lifecycle_status === f.value;
          }
          return String(row[f.column]) === String(f.value);
        });
      });

      // Expand Foreign Key Relations if requested in selectQuery
      result = result.map((row) => this.expandRelations(row, this.selectQuery));

      // Sorting / Order
      if (this.orderConfig) {
        const { column, ascending } = this.orderConfig;
        result.sort((a, b) => {
          const valA = a[column];
          const valB = b[column];
          if (valA === valB) return 0;
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          if (typeof valA === "string" && typeof valB === "string") {
            return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
      }

      if (this.isSingle) {
        if (result.length === 0) {
          return { data: null, error: new Error(`JSON object requested, but no rows returned for ${this.tableName}`) };
        }
        return { data: result[0], error: null };
      }

      if (this.isMaybeSingle) {
        return { data: result.length > 0 ? result[0] : null, error: null };
      }

      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
  }

  private expandRelations(row: any, selectQuery: string): any {
    const copy = { ...row };

    // Expand companies relation inside opportunities
    if (this.tableName === "opportunities" && selectQuery.includes("companies")) {
      const companies = localStore.getTable("companies");
      const matchedCompany = companies.find((c) => c.company_id === row.company_id);
      if (matchedCompany) {
        copy.companies = {
          company_id: matchedCompany.company_id,
          display_name: matchedCompany.display_name,
          industry: matchedCompany.industry,
          headquarters_location: matchedCompany.headquarters_location,
          website: matchedCompany.website,
          legal_name: matchedCompany.legal_name,
          company_size: matchedCompany.company_size
        };
      } else {
        copy.companies = null;
      }
    }

    // Expand opportunities relation inside applications
    if (this.tableName === "applications" && selectQuery.includes("opportunities")) {
      const opportunities = localStore.getTable("opportunities");
      const opp = opportunities.find((o) => o.opportunity_id === row.opportunity_id);
      if (opp) {
        copy.opportunities = {
          opportunity_id: opp.opportunity_id,
          title: opp.title,
          type: opp.opportunity_type || "Full-time Job",
          location: opp.location,
          company_id: opp.company_id
        };
      } else {
        copy.opportunities = null;
      }
    }

    // Expand candidate_profiles relation inside applications
    if (this.tableName === "applications" && selectQuery.includes("candidate_profiles")) {
      const candidates = localStore.getTable("candidate_profiles");
      const cand = candidates.find((c) => c.candidate_id === row.candidate_id);
      if (cand) {
        copy.candidate_profiles = {
          candidate_id: cand.candidate_id,
          full_name: cand.full_name,
          email: cand.email,
          current_title_or_program: cand.current_title_or_program,
          cgpa: cand.cgpa,
          skills: cand.skills
        };
      } else {
        copy.candidate_profiles = null;
      }
    }

    return copy;
  }
}

// Database client instance providing .from(tableName)
import { createClient } from "@supabase/supabase-js";

let supabaseClient: any = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const url = typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined;
  const key = typeof process !== "undefined" ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY) : undefined;
  if (url && key) {
    try {
      supabaseClient = createClient(url, key);
      return supabaseClient;
    } catch (e) {
      console.warn("Notice: Falling back to local relational query engine:", e);
    }
  }
  return null;
}

export const db = {
  from(tableName: string): any {
    const sb = getSupabaseClient();
    if (sb) {
      return sb.from(tableName);
    }
    return new QueryBuilder(tableName);
  }
};

export default db;
