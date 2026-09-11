import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { API } from "./src/services/api";
import { localStore } from "./database/db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request body parser
  app.use(express.json());

  // =========================================================
  // SYSTEM & DATABASE STATUS APIS
  // =========================================================

  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      service: "CareerCue Full-Stack API Engine",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/database/status", (req: Request, res: Response) => {
    try {
      const rawStore = localStore.getRawStore();
      const tables: Record<string, number> = {};
      for (const [tName, rows] of Object.entries(rawStore)) {
        tables[tName] = Array.isArray(rows) ? rows.length : 0;
      }
      res.json({
        success: true,
        engine: "PostgreSQL Schema / Relational Query Engine",
        totalTables: Object.keys(tables).length,
        tables
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/database/schema", (req: Request, res: Response) => {
    try {
      const schemaPath = path.join(__dirname, "database", "schema.sql");
      if (fs.existsSync(schemaPath)) {
        const schemaContent = fs.readFileSync(schemaPath, "utf-8");
        res.type("text/plain").send(schemaContent);
      } else {
        res.status(404).send("-- Schema file not found");
      }
    } catch (error: any) {
      res.status(500).send(`-- Error loading schema: ${error.message}`);
    }
  });

  // =========================================================
  // CANDIDATE APIS
  // =========================================================

  app.post("/api/candidate", async (req: Request, res: Response) => {
    try {
      const data = await API.createCandidate(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/candidate/by-email/:email", async (req: Request, res: Response) => {
    try {
      const data = await API.getCandidateByEmail(req.params.email);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.get("/api/candidate/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.getCandidate(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.put("/api/candidate/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.updateCandidate(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // RESUME APIS
  // =========================================================

  app.get("/api/resume/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getResume(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.post("/api/resume", async (req: Request, res: Response) => {
    try {
      const data = await API.createResume(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/resume/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.updateResume(req.params.candidateId, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // SKILLS APIS
  // =========================================================

  app.get("/api/skills/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getSkills(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/skills", async (req: Request, res: Response) => {
    try {
      const data = await API.addSkill(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/skills/:skillId", async (req: Request, res: Response) => {
    try {
      const data = await API.updateSkill(req.params.skillId, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/skills/:skillId", async (req: Request, res: Response) => {
    try {
      const success = await API.deleteSkill(req.params.skillId);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // PORTFOLIO APIS
  // =========================================================

  app.get("/api/portfolio/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getPortfolio(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/portfolio", async (req: Request, res: Response) => {
    try {
      const data = await API.addPortfolioProject(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/portfolio/:projectId", async (req: Request, res: Response) => {
    try {
      const data = await API.updatePortfolioProject(req.params.projectId, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/portfolio/:projectId", async (req: Request, res: Response) => {
    try {
      const success = await API.deletePortfolioProject(req.params.projectId);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // AI / EXTERNAL ANALYSIS APIS
  // =========================================================

  app.get("/api/external-analyses/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getExternalAnalyses(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/external-analyses", async (req: Request, res: Response) => {
    try {
      const data = await API.addExternalAnalysis(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // LEARNING ROADMAP APIS
  // =========================================================

  app.get("/api/roadmap/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getRoadmap(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/roadmap", async (req: Request, res: Response) => {
    try {
      const data = await API.addRoadmap(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/roadmap/:roadmapId", async (req: Request, res: Response) => {
    try {
      const data = await API.updateRoadmap(req.params.roadmapId, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // COMPANIES APIS
  // =========================================================

  app.get("/api/companies", async (req: Request, res: Response) => {
    try {
      const data = await API.getCompanies();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/companies/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.getCompany(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.post("/api/companies", async (req: Request, res: Response) => {
    try {
      const data = await API.createCompany(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/companies/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.updateCompany(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/companies/test", async (req: Request, res: Response) => {
    try {
      const data = await API.createTestCompany(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // OPPORTUNITIES APIS
  // =========================================================

  app.get("/api/opportunities", async (req: Request, res: Response) => {
    try {
      const data = await API.getOpportunities();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/opportunities/published", async (req: Request, res: Response) => {
    try {
      const data = await API.getPublishedOpportunities();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/opportunities/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.getOpportunity(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.post("/api/opportunities", async (req: Request, res: Response) => {
    try {
      const data = await API.createOpportunity(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/opportunities/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.updateOpportunity(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // APPLICATIONS APIS
  // =========================================================

  app.post("/api/applications/apply", async (req: Request, res: Response) => {
    try {
      const data = await API.apply(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/applications/candidate/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getApplicationsByCandidate(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/applications/opportunity/:opportunityId", async (req: Request, res: Response) => {
    try {
      const data = await API.getApplicationsByOpportunity(req.params.opportunityId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.put("/api/applications/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.updateApplication(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // INTERVIEWS APIS
  // =========================================================

  app.get("/api/interviews/:applicationId", async (req: Request, res: Response) => {
    try {
      const data = await API.getInterviews(req.params.applicationId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/interviews", async (req: Request, res: Response) => {
    try {
      const data = await API.createInterview(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // INSTITUTIONS APIS
  // =========================================================

  app.get("/api/institutions", async (req: Request, res: Response) => {
    try {
      const data = await API.getInstitutions();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/institutions/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.getInstitution(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.get("/api/institutions/:id/students", async (req: Request, res: Response) => {
    try {
      const data = await API.getInstitutionStudents(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // ACADEMIA APIS
  // =========================================================

  app.get("/api/academia/researchers", async (req: Request, res: Response) => {
    try {
      const data = await API.getResearchers();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/academia/researchers/:id", async (req: Request, res: Response) => {
    try {
      const data = await API.getResearcher(req.params.id);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, error: error.message });
    }
  });

  app.get("/api/academia/opportunities", async (req: Request, res: Response) => {
    try {
      const data = await API.getAcademiaOpportunities();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/academia/apply", async (req: Request, res: Response) => {
    try {
      const data = await API.applyToAcademiaOpportunity(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // SUPPORT APIS
  // =========================================================

  app.post("/api/support/tickets", async (req: Request, res: Response) => {
    try {
      const data = await API.createSupportTicket(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/support/tickets/user/:userId", async (req: Request, res: Response) => {
    try {
      const data = await API.getSupportTickets(req.params.userId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/support/tickets/:ticketId/messages", async (req: Request, res: Response) => {
    try {
      const data = await API.getTicketMessages(req.params.ticketId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/support/tickets/messages", async (req: Request, res: Response) => {
    try {
      const data = await API.addTicketMessage(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // COURSES APIS
  // =========================================================

  app.get("/api/courses", async (req: Request, res: Response) => {
    try {
      const data = await API.getCourses();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // CERTIFICATES APIS
  // =========================================================

  app.get("/api/certificates/:candidateId", async (req: Request, res: Response) => {
    try {
      const data = await API.getCertificates(req.params.candidateId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.post("/api/certificates", async (req: Request, res: Response) => {
    try {
      const data = await API.postCertificate(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/certificates/:id", async (req: Request, res: Response) => {
    try {
      const success = await API.deleteCertificate(req.params.id);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // ADMIN & STUDENT MANAGEMENT APIS
  // =========================================================

  app.get("/api/students", async (req: Request, res: Response) => {
    try {
      const data = await API.getAllStudents();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/students/:id", async (req: Request, res: Response) => {
    try {
      const success = await API.deleteStudent(req.params.id);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/companies/:id", async (req: Request, res: Response) => {
    try {
      const success = await API.deleteCompany(req.params.id);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // =========================================================
  // VITE MIDDLEWARE SETUP (Express + Vite SPA)
  // =========================================================

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CareerCue Server] API & Database engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
