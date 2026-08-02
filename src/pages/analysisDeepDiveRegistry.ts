import type { ComponentType } from "react";

type DeepDiveLoader = () => Promise<{ default: ComponentType<any> }>;

const deepDiveLoaders: Record<string, DeepDiveLoader> = {
  Nvidia: () => import("../components/NvidiaDeepDive"),
  NovoNordisk: () => import("../components/NovoNordiskDeepDive/NovoNordiskDeepDive"),
  Evolution: () => import("../components/analysis/EvolutionDeepDive"),
  Investor: () => import("../components/analysis/InvestorDeepDive"),
  Volvo: () => import("../components/analysis/VolvoDeepDive"),
  Swedbank: () => import("../components/analysis/SwedbankDeepDive"),
  NewWave: () => import("../components/analysis/NewWaveDeepDive"),
  Ericsson: () => import("../components/analysis/EricssonDeepDive"),
  Handelsbanken: () => import("../components/analysis/HandelsbankenDeepDive"),
  AQGroup: () => import("../components/analysis/AQGroupAnalysis"),
  Nibe: () => import("../components/analysis/NibeDeepDive"),
  Axfood: () => import("../components/analysis/AxfoodDeepDive"),
  ABB: () => import("../components/analysis/ABBDeepDive"),
  Plejd: () => import("../components/analysis/PlejdDeepDive"),
  Meta: () => import("../components/analysis/MetaDeepDive"),
};

export function getDeepDiveLoader(key: string): DeepDiveLoader | undefined {
  return deepDiveLoaders[key];
}
