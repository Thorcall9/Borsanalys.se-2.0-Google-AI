# Investor AB – omprövning av NAV-tillväxt och Base-scenario
**Status:** FORSKNINGSUTKAST / NOT_PUBLISH_READY  
**Datum:** 2026-10-17  
**Avser:** Investor AB v11.2; analysens värderingsdatum 2028-12-31  
**Versionsprincip:** separat förhandsgren; publicerad Investor-analys får inte ändras.

## 1. Frågan
Base-värdet ca 441 SEK i v11.2 DRAFT_002 bygger på cirka 8,2 % annualiserad NAV-avkastning **före utdelningar**, följt av 7,5 % substansrabatt 2028. Den prognosen är inte övertygande förankrad i Investors dokumenterade långsiktiga NAV-värdeskapande. Värdet 441 ska därför inte behandlas som rimligt bara för att det produceras korrekt av en formel. Omvänt är tidigare totalavkastning ingen garanti för framtida avkastning.

## 2. Fakta och primära ankare
- Q3 2026: justerat NAV 1 258,0 mdkr, eller 411 kr/aktie, per 30 september 2026. Q3 +4 %; 2026 jan–sep +17 % med utdelning återlagd (Investor Q3 2026).
- Justerat NAV med utdelning återlagd hade omkring 15,6 %/år senaste fem åren per 30 september 2026 (Investor Q3 2026 performance overview, F20 i dossiern).
- Investor årsredovisning 2025: justerat NAV +14 % år 2025 inklusive återlagd utdelning; 2024 +20 %; genomsnittlig NAV-tillväxt senaste fem år omkring 17 %/år per december 2025. Patricia -9 % totalavkastning 2025; Noterade Bolag +22 % (Investors 2025 bokslut).
- Investors eget avkastningskrav är 8–9 %/år. Kravet är inte en försäkran om framtida NAV-tillväxt eller aktieavkastning.
- Q3 2026 tillgångsandelar: Noterade Bolag ca 74 %, Patricia Industries ca 19 %, Investeringar i EQT ca 7 % av justerade tillgångar (F19).
- Q1 2026: rullande förvaltningskostnad 0,07 % av justerat NAV; detta är inte samma sak som total koncernfinansieringskostnad.
- Per 16 oktober 2026: Investor B 422,60 kr. Per 30 september 2026: Q3:s NAV är 411 kr/aktie. Att dividera oktoberkurs med september-NAV ger inte ett samtida marknads-premiemått.
- Historik för justerad A+B-substansrabatt: ca 7,6 % median vid 13 kvartalsslut (3 år), 10,4 % vid 21 kvartalsslut (5 år), 14,7 % vid endast tio årsslut (2016–25). **Äldre kvartalspunkter ej slutligt verifierade och observationsfrekvensen skiljer sig.**
- Beslutad utdelning från och med 16 oktober 2026: 1,60 kr med betalning november 2026. Utdelningar 2027 och 2028 är analytiska antaganden, inte beslutade.

**Källor**
1. Investor Q3 2026: https://www.investorab.com/sv/investerare-media/rapporter-presentationer/2026
2. Investor 2025 bokslut och årsredovisning: https://www.investorab.com/investors-media/reports-presentations/2025
3. Investor årsredovisning 2025: https://financialfilings.com/filings/investor/annual-report/2026/33055256/
4. Investor strategi, avkastningskrav: https://www.investorab.com/about-investor/our-strategy
5. Förvaltningskostnad Q1 2026: https://financialfilings.com/filings/investor/interim-quarterly-report/2026/34696703/
6. Investors historiska nyckeltal: https://www.investorab.com/sv/investerare-media/finansiell-data
7. Beslutad utdelning 2026: https://www.investorab.com/corporate-governance/annual-general-meeting/agm-2026

## 3. Modell-definition – förhindra dubbelräkning
Låt R vara den viktade **årliga totalavkastningen på tillgångssegmenten**, med ägda dotterbolags kassaflöden och värdeförändringar inkluderade i avkastningen. Modellen antar konstanta portföljvikter.

    R_portfölj = 0,74 * R_not + 0,19 * R_pat + 0,07 * R_eqt

    R_NAV_före_utdelningar = R_portfölj/(1-0,018) - 0,0007 - (0,018 * 0,04)

Här är 0,018 nettobelåning (faktisk Q3-nivå som modellankare). Förvaltningskostnad 0,0007 är rapporterad Q1-nivå (approximation för prognos). Finansieringsräntan **4,0 % är ett uttryckligt antagande** och skall inte beskrivas som rapporterat lånevillkor. Total modellerad kostnadsdragning = 0,142 procentenheter/år, mot tidigare godtyckliga 0,30 procentenheter/år. Samtliga kostnadsmått bör uppdateras när 2026 års faktiska finansnetto sammanställts.

    NAV_2028 = NAV_2026-09-30 * (1+R_NAV)^2,2533
               - kapitaliserat värde av kontantutdelning 2026-11, 2027 och 2028

    Kurs_2028 = NAV_2028*(1 - slutrabatt)
    Kontant-TSR = (Kurs_2028 + utdelningar 12,80 SEK) / 422,60 - 1

Utdelningarna återinvesteras inte. De betalas ur det värdeskapande som redan ingår i NAV-avkastningen. Kontant-TSR är därmed inte den samma som en tidsviktad reinvesterad TSR. Annualisering från kursdatum 2026-10-16: 2,2094 år.

## 4. Provisorisk segmentkalibrering (ASSUMPTION, INTE FACT)
- **Bear (30 %):** Noterat -5,0 %, Patricia -8,0 %, EQT -10,0 %/år. Slutrabatt 16 %. Samvarierande negativ risk för bolagsvärden och holdingbolagsrabatt.
- **Base (50 %):** Noterat +10,5 %, Patricia +12,5 %, EQT +11,0 %/år. Viktat tillgångsbidrag 10,91 %. Efter 1,8 % nettobelåning och kostnad/finansiering = cirka **10,97 % NAV-totalavkastning före utdelningar** per år. Slutrabatt lämnas **7,5 %** tills starkare empiriska belägg för permanent lägre rabatt föreligger.
- **Bull (20 %):** Noterat +13 %, Patricia +16 %, EQT +15 %/år; slutpremie 3 %.

**Varför Base ~11 % och inte 15,6 %?** Det är ca 30 % lägre än Investors observerade femårstakt, men över bolagets 8–9 % avkastningskrav. Det är en normaliseringshypotes med explicita segmentantaganden, inte en säker prognos och inte ännu en bottom-up-modell från varje innehavs intjäning/kassa/multipel. Historiska NAV-totalavkastningsmått och segmentavkastning måste kontrolleras för definitionsskillnader.

**Varför behålls 7,5 % slutrabatt i Base?** Den ligger i närheten av vår preliminära treårsmedian. Om rabatten antas vara strukturellt lägre krävs separat stöd. Vi ska inte justera både NAV-tillväxt och rabatt uppåt enbart för att en högre riktkurs uppfattas rimligare.

## 5. Illustrativa scenarioresultat (beräknas automatiskt i TypeScript)
Valuation date 2028-12-31, NAV-start 411 kr, kursankare 422,60 kr, antagna framtida kontantutdelningar totalt 12,80 kr:

| Scenario | Framtida NAV/aktie | Slutrabatt | Kurs 2028 | Kontant-TSR från kursankaret | Årlig motsvarighet |
|---|---:|---:|---:|---:|---:|
| Bear | ca 344 kr | 16 % | ca 289 kr | ca -28,6 % | ca -14,1 % |
| Base | ca 505 kr | 7,5 % | ca 467 kr | ca +13,6 % | ca +6,0 % |
| Bull | ca 535 kr | -3 % | ca 551 kr | ca +33,5 % | ca +14,0 % |

Utdelningssummering: 1,60 + 5,60 + 5,60 = 12,80 kr, varav 2027 och 2028 är osäkra.

### Base: testa en lägre rabatt utan att hävda att den är sannolik
| Slutrabatt | Base-kurs 2028 | Kontant-TSR/år |
|---|---:|---:|
| 7,5 % | ca 467 kr | ca 6,0 % |
| 5,0 % | ca 480 kr | ca 7,2 % |
| 0 % | ca 505 kr | ca 9,7 % |
| -3 % premie | ca 520 kr | ca 11,1 % |

### Viktat värde är INTE Base
Med de oförändrade sannolikheterna 30/50/20 blir det sannolikhetsvägda terminalvärdet ca **431 kr**, dvs ca 2,2 % årlig kontant-TSR. En stor negativ Bear-svans förklarar skillnaden. **30/50/20 är subjektiva sannolikheter, inte kalibrerade frekvenser.** Värdet skall ej ges sken av statistisk precision eller presenteras ensamt som värdet av Investor.

## 6. Kvarvarande publiceringshinder
1. Fullständiga och verifierade ursprungstabeller för 10 års kvartalsrabatt saknas. Fler intervall behövs före statistisk percentilbedömning.
2. Segmentavkastningarna ovan är normaliserade hypotetiska nivåer. Bolagsvis prognos för noterade toppinnehav, resultat/marginaler och kassa i Patricias större dotterbolag samt EQT:s fund/aktie-exponering saknas.
3. Patricia värderas delvis med extern EV/EBITDA. Utan bolagsvis EBITDA- och multipelbrygga får en precis multipelkänslighet inte anges.
4. Finansieringskostnad på 4 % och central drag måste testas mot Investors faktiska redovisade finansnetto.
5. Utdelningsprognoser för 2027–2028 och avkastningssannolikheter saknar externt facit.
6. Den modellerade 2028-avkastningen är beroende av framtida rabatter som kan variera med makroläge. Kombinerade stressutfall ska bibehållas.
7. Rekommendations- och riskgrindar för v11.2 är ännu inte slutgiltigt verifierade.

## 7. Beslut
Aktivera provisoriskt **Base cirka 11 % NAV-totalavkastning före utdelning och oförändrad 7,5 % slutrabatt**. Publiceringsstatus förblir NOT_PUBLISH_READY. **Ingen livepublicering, inga villkorslösa köpzoner eller löften om framtida NAV.**
