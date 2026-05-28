export type HoldingType = "none" | "direct" | "indirect";

export type AnalysisDisclosure = {
  companyName: string;
  holdingType: HoldingType;
  holdingText: string;
  indirectExposure?: string;
  commercialRelationship: string;
};

export const holdingsDisclosureUpdatedAt = "2026-05-28";

export const analysisDisclosures = {
  nordea: {
    companyName: "Nordea Bank Abp",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Nordea Bank Abp enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda aktie- och indexfonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Nordea Bank Abp i samband med denna analys."
  },
  nibe: {
    companyName: "NIBE Industrier AB",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i NIBE Industrier AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till NIBE Industrier AB i samband med denna analys."
  },
  aqGroup: {
    companyName: "AQ Group AB",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i AQ Group AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till AQ Group AB i samband med denna analys."
  },
  swedbank: {
    companyName: "Swedbank AB",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Swedbank AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Swedbank AB i samband med denna analys."
  },
  ericsson: {
    companyName: "Telefonaktiebolaget LM Ericsson",
    holdingType: "indirect",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Telefonaktiebolaget LM Ericsson enligt innehavsredovisning senast uppdaterad 28 maj 2026.",
    indirectExposure:
      "Författaren äger aktier i Investor AB genom Investor A och Investor B. Investor AB är ägare i Ericsson, vilket innebär att författaren har en indirekt ekonomisk exponering mot det analyserade bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Telefonaktiebolaget LM Ericsson i samband med denna analys."
  },
  handelsbanken: {
    companyName: "Svenska Handelsbanken AB",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Svenska Handelsbanken AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Svenska Handelsbanken AB i samband med denna analys."
  },
  newWave: {
    companyName: "New Wave Group AB",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i New Wave Group AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till New Wave Group AB i samband med denna analys."
  },
  volvo: {
    companyName: "AB Volvo",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i AB Volvo enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till AB Volvo i samband med denna analys."
  },
  investor: {
    companyName: "Investor AB",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i Investor AB genom både Investor A och Investor B enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Investor AB i samband med denna analys."
  },
  evolution: {
    companyName: "Evolution AB",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Evolution AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Evolution AB i samband med denna analys."
  },
  nvidia: {
    companyName: "NVIDIA Corporation",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i NVIDIA Corporation enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till NVIDIA Corporation i samband med denna analys."
  },
  alphabet: {
    companyName: "Alphabet Inc.",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i Alphabet Inc. genom Alphabet Class A enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Alphabet Inc. i samband med denna analys."
  },
  microsoft: {
    companyName: "Microsoft Corporation",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i Microsoft Corporation enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Microsoft Corporation i samband med denna analys."
  },
  apple: {
    companyName: "Apple Inc.",
    holdingType: "direct",
    holdingText:
      "Författaren äger aktier direkt i Apple Inc. enligt innehavsredovisning senast uppdaterad 28 maj 2026. Detta utgör ett ekonomiskt intresse i det bolag som analyseras.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Apple Inc. i samband med denna analys."
  },
  novoNordisk: {
    companyName: "Novo Nordisk A/S",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Novo Nordisk A/S enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda globala aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Novo Nordisk A/S i samband med denna analys."
  },
  sbb: {
    companyName: "Samhällsbyggnadsbolaget i Norden AB",
    holdingType: "none",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Samhällsbyggnadsbolaget i Norden AB enligt innehavsredovisning senast uppdaterad 28 maj 2026. Författaren äger breda svenska aktiefonder som indirekt kan ha exponering mot bolaget.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Samhällsbyggnadsbolaget i Norden AB i samband med denna analys."
  },
  saab: {
    companyName: "Saab AB",
    holdingType: "indirect",
    holdingText:
      "Författaren äger inte aktier eller andra finansiella instrument direkt i Saab AB enligt innehavsredovisning senast uppdaterad 28 maj 2026.",
    indirectExposure:
      "Författaren äger aktier i Investor AB genom Investor A och Investor B. Investor AB är en betydande ägare i Saab AB. Författaren har därmed en indirekt ekonomisk exponering mot Saab AB genom sitt innehav i Investor AB.",
    commercialRelationship:
      "Börsanalys.se har inte mottagit ersättning från och har ingen kommersiell relation till Saab AB i samband med denna analys."
  }
} as const satisfies Record<string, AnalysisDisclosure>;

export type AnalysisDisclosureKey = keyof typeof analysisDisclosures;
