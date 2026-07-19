# Profilöversikt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Bygg om profilsidan till en kompakt medlemsdashboard där aktiva checklistor prioriteras före bevakade bolag, senaste publiceringar och sparade analyser.

**Architecture:** Behåll den befintliga tvåkolumnslayouten i `Profile.tsx`, men skapa små, återanvändbara översiktskomponenter för checklistor och publiceringsflöde. Återanvänd befintliga API:er och analysdata; ingen ny backendmodell eller lässtatus.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Tailwind CSS v4, lucide-react, Node's built-in test runner with `tsx`.

## Global Constraints

- Huvudkolumnens ordning är exakt: checklistor, bevakade bolag, senaste analyser/rapportkommentarer, sparade analyser.
- Vänsterkolumnen får inte innehålla investeringsnavigation; ta bort “Mina checklistor”.
- Checklistor på profilsidan filtreras till status som inte är `completed`.
- Senaste publiceringar är generella, inte märkta som “nya för dig”.
- Sektionerna ska vara begränsade på profilsidan och länka vidare till fullständiga vyer.
- Ingen koppling mellan bevakning och checklistor, lässtatus eller mejlnotiser i denna ändring.

---

### Task 1: Lägg till testbar dashboardlogik

**Files:**
- Create: `src/lib/profileOverview.ts`
- Create: `src/lib/__tests__/profileOverview.test.ts`

**Interfaces:**
- `getStartedChecklists(items: SavedChecklistLike[]): SavedChecklistLike[]`
- `getAnsweredCount(answers: Record<string, unknown>): number`
- `getLatestPublications(items: AnalysisData[], limit?: number): AnalysisData[]`

- [ ] **Step 1: Write the failing tests**

Testa att slutförda checklistor filtreras bort, att endast de 12 kända fråge-id:na räknas som besvarade och att senaste publiceringar sorteras på `updatedAt` med `date` som fallback och begränsas till tre.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --import tsx --test src/lib/__tests__/profileOverview.test.ts`

Expected: FAIL because `src/lib/profileOverview.ts` does not exist.

- [ ] **Step 3: Implement the minimal pure helpers**

Importera `STOCK_CHECKLIST_QUESTIONS` från `src/data/stockChecklist.ts`, filtrera `status !== "completed"`, räkna svar via frågornas id:n och sortera analysdata fallande på `updatedAt || date`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --import tsx --test src/lib/__tests__/profileOverview.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/lib/profileOverview.ts src/lib/__tests__/profileOverview.test.ts && git commit -m "test: add profile overview helpers"`

### Task 2: Bygg sektionen för checklistor att fortsätta

**Files:**
- Create: `src/components/community/ChecklistOverview.tsx`
- Modify: `src/pages/Profile.tsx`

**Interfaces:**
- `ChecklistOverview` hämtar `/api/stock-checklists` med användarens Firebase-token.
- Varje rad renderar `companyName`, `ticker`, progression `answered av 12`, `updatedAt` och en länk till `/aktiechecklista?checklistId={id}`.

- [ ] **Step 1: Add component states and API mapping**

Återanvänd mönstret från `SavedChecklists`: loading, error, auth-token och delete-free read-only rendering. Mappa API-svar till lokalt typade poster och använd `getStartedChecklists` samt `getAnsweredCount`.

- [ ] **Step 2: Add empty and populated states**

Visa “Du har inga påbörjade checklistor.” och “Starta en checklista” när filtret blir tomt. Visa “Visa alla checklistor” i sektionshuvudet till `/mina-checklistor`.

- [ ] **Step 3: Mount the section first in `Profile.tsx`**

Lägg in komponenten före bevakningslistan och ge sidan huvudrubriken `Min översikt`.

- [ ] **Step 4: Verify component behavior**

Run: `npm run lint`

Expected: TypeScript passes with no errors.

- [ ] **Step 5: Commit**

Run: `git add src/components/community/ChecklistOverview.tsx src/pages/Profile.tsx && git commit -m "feat: prioritize active checklists on profile"`

### Task 3: Lägg till senaste analyser och begränsa sparade analyser

**Files:**
- Create: `src/components/community/RecentPublications.tsx`
- Modify: `src/components/community/SavedAnalyses.tsx`
- Modify: `src/pages/Profile.tsx`

**Interfaces:**
- `RecentPublications` renderar tre poster från `analyses` via `getLatestPublications` och länkar till `/analys/{slug}`.
- `SavedAnalyses` får prop `limit?: number` och visar “Visa alla sparade analyser” till `/analys` när listan är begränsad.

- [ ] **Step 1: Implement recent publication feed**

Visa innehållstyp med `CONTENT_TYPE_LABELS`, ticker/bolag, titel, datum och länk. Använd ingen “ny”-etikett eller användarspecifik status.

- [ ] **Step 2: Add `limit` to `SavedAnalyses`**

Behåll hämtning, borttagning och tomläge, men rendera `savedList.slice(0, limit)` när `limit` finns. Visa länken vidare efter listan när fler poster kan finnas.

- [ ] **Step 3: Mount both sections in the requested order**

I `Profile.tsx`, placera `RecentPublications` före `SavedAnalyses` och använd `limit={4}`.

- [ ] **Step 4: Run lint and unit tests**

Run: `npm run lint && node --import tsx --test src/lib/__tests__/profileOverview.test.ts`

Expected: TypeScript and all existing tests pass.

- [ ] **Step 5: Commit**

Run: `git add src/components/community/RecentPublications.tsx src/components/community/SavedAnalyses.tsx src/pages/Profile.tsx && git commit -m "feat: add recent publications to profile overview"`

### Task 4: Renodla vänsterkolumnen och verifiera renderad layout

**Files:**
- Modify: `src/pages/Profile.tsx`

- [ ] **Step 1: Remove duplicated checklist navigation**

Ta bort knappen “Mina checklistor” från profilkortet. Behåll konto/profil, medlemsstatus, redigera profil och logga ut.

- [ ] **Step 2: Harmonize section headers and responsive spacing**

Använd samma visuella rubrikmönster, tydliga fokusmarkeringar och stapling på smala skärmar. Säkerställ att knappar inte bara blir synliga via hover.

- [ ] **Step 3: Run the app and inspect the profile route**

Run: `npm run dev`

Flow: `/profil` → kontrollera huvudrubrik och sektionsordning → klicka “Fortsätt”, “Visa alla checklistor”, analyslänk och “Visa alla sparade analyser”.

- [ ] **Step 4: Check desktop and mobile screenshots**

Kontrollera att vänsterkolumnen ligger separat, att huvudkolumnen innehåller alla investeringssektioner och att ingen horisontell overflow uppstår.

- [ ] **Step 5: Commit final layout polish**

Run: `git add src/pages/Profile.tsx && git commit -m "style: refine profile dashboard hierarchy"`
