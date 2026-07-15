import React, { useState, useRef } from "react";

export interface FinancialFlowData {
  companyName: string;
  currency: string; // e.g. "MSEK" or "Mkr"
  year?: string;
  segments: { name: string; value: number }[];
  revenue: number;
  cogs: number; // Cost of Goods Sold (negative or positive, we will show absolute)
  grossProfit: number;
  opex: number; // Operating Expenses (negative or positive)
  ebita: number; // Operating profit before amortization
  depreciation: number; // Depreciation & Amortization (negative or positive)
  ebit: number; // Operating profit
  taxAndFinance: number; // Financial items & tax (negative or positive)
  netProfit: number; // Period net income
}

interface FinancialFlowProps {
  data: FinancialFlowData;
}

interface TooltipState {
  x: number;
  y: number;
  title: string;
  value: string;
  desc: string;
  color: string;
  visible: boolean;
}

export default function FinancialFlow({ data }: FinancialFlowProps) {
  const {
    currency,
    segments,
    revenue,
    cogs,
    grossProfit,
    opex,
    ebita,
    depreciation,
    ebit,
    taxAndFinance,
    netProfit,
  } = data;

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to format values
  const formatVal = (val: number) => {
    const absVal = Math.abs(val);
    if (absVal >= 1000) {
      return `${Math.round(absVal).toLocaleString("sv-SE")} ${currency}`;
    }
    return `${absVal.toFixed(1).replace(".", ",")} ${currency}`;
  };

  // Helper to calculate percentages relative to revenue
  const getMarginStr = (val: number) => {
    const percentage = (val / revenue) * 100;
    return `${percentage.toFixed(1).replace(".", ",")}%`;
  };

  // Static content details for tooltips
  const NODES_INFO: Record<string, { title: string; value: string; desc: string; color: string }> = {
    skandinavien: {
      title: "Skandinavien",
      value: `${formatVal(4430)} · 49,2% av omsättning`,
      desc: "Inwidos största och lönsammaste marknad med starka varumärken som Elitfönster.",
      color: "#2563EB",
    },
    vast: {
      title: "Väst",
      value: `${formatVal(1774)} · 19,7% av omsättning`,
      desc: "Fönster- och dörrmarknaderna i Storbritannien och Irland.",
      color: "#2563EB",
    },
    ost: {
      title: "Öst",
      value: `${formatVal(1743)} · 19,4% av omsättning`,
      desc: "Finska fönstermarknaden. Hög marknadsandel men lägre marginal under 2025.",
      color: "#2563EB",
    },
    ecommerce: {
      title: "e-Commerce",
      value: `${formatVal(1071)} · 11,9% av omsättning`,
      desc: "Direktförsäljning online till konsumenter. Stark tillväxt och goda marginaler.",
      color: "#2563EB",
    },
    ovrigt: {
      title: "Övrigt & Elimineringar",
      value: `${formatVal(-16)}`,
      desc: "Koncerninterna elimineringar och övriga gemensamma poster.",
      color: "#2563EB",
    },
    revenue: {
      title: "Nettoomsättning",
      value: `${formatVal(revenue)}`,
      desc: "Koncernens totala nettoomsättning för helåret 2025.",
      color: "#059669",
    },
    gross_profit: {
      title: "Bruttoresultat",
      value: `${formatVal(grossProfit)} · ${getMarginStr(grossProfit)} marginal`,
      desc: "Nettoomsättning minus direkta varukostnader för material och tillverkning.",
      color: "#059669",
    },
    cogs: {
      title: "Varukostnad (COGS)",
      value: `${formatVal(cogs)} · ${getMarginStr(cogs)} av omsättning`,
      desc: "Direkta tillverkningskostnader, material (trä, glas, aluminium) och produktionstjänster.",
      color: "#BE123C",
    },
    ebita: {
      title: "Operationell EBITA",
      value: `${formatVal(ebita)} · ${getMarginStr(ebita)} marginal`,
      desc: "Koncernens rörelseresultat före avskrivningar på immateriella anläggningstillgångar.",
      color: "#059669",
    },
    opex: {
      title: "Rörelsekostnader",
      value: `${formatVal(opex)} · ${getMarginStr(opex)} av omsättning`,
      desc: "Försäljnings-, marknadsförings- och administrativa overheadkostnader.",
      color: "#BE123C",
    },
    ebit: {
      title: "Rörelseresultat (EBIT)",
      value: `${formatVal(ebit)} · ${getMarginStr(ebit)} marginal`,
      desc: "Rörelseresultat efter alla rörelseavskrivningar och goodwill-avskrivningar.",
      color: "#059669",
    },
    depr: {
      title: "Avskrivningar",
      value: `${formatVal(depreciation)} · ${getMarginStr(depreciation)} av omsättning`,
      desc: "Avskrivningar på materiella och immateriella anläggningstillgångar.",
      color: "#BE123C",
    },
    net_profit: {
      title: "Nettoresultat",
      value: `${formatVal(netProfit)} · ${getMarginStr(netProfit)} nettomarginal`,
      desc: "Periodens resultat efter finansiella poster och skatt. Tillfaller aktieägarna.",
      color: "#059669",
    },
    tax_finance: {
      title: "Finansnetto & Skatt",
      value: `${formatVal(taxAndFinance)} · ${getMarginStr(taxAndFinance)} av omsättning`,
      desc: "Koncernens räntekostnader och årets beräknade skattekostnad.",
      color: "#BE123C",
    },
  };

  // Flow relations mapping for highlight logic
  const isFlowHighlighted = (sourceId: string, targetId: string) => {
    if (!activeNodeId) return true; // Default: show all with normal opacity

    const flowRelations: Record<string, string[]> = {
      skandinavien: ["skandinavien-revenue"],
      vast: ["vast-revenue"],
      ost: ["ost-revenue"],
      ecommerce: ["ecommerce-revenue"],
      ovrigt: ["ovrigt-revenue"],
      revenue: [
        "skandinavien-revenue",
        "vast-revenue",
        "ost-revenue",
        "ecommerce-revenue",
        "ovrigt-revenue",
        "revenue-gross_profit",
        "revenue-cogs",
      ],
      gross_profit: [
        "revenue-gross_profit",
        "gross_profit-ebita",
        "gross_profit-opex",
      ],
      cogs: ["revenue-cogs"],
      ebita: ["gross_profit-ebita", "ebita-ebit", "ebita-depr"],
      opex: ["gross_profit-opex"],
      ebit: ["ebita-ebit", "ebit-net_profit", "ebit-tax_finance"],
      depr: ["ebita-depr"],
      net_profit: ["ebit-net_profit"],
      tax_finance: ["ebit-tax_finance"],
    };

    const key = `${sourceId}-${targetId}`;
    return flowRelations[activeNodeId]?.includes(key) || false;
  };

  // Coordinate positions
  const width = 1000;
  const height = 450;

  const colX = {
    col1: 75,   // Segments
    col2: 245,  // Omsättning
    col3: 415,  // Bruttoresultat
    col4: 585,  // Operationell EBITA
    col5: 755,  // EBIT
    col6: 925,  // Nettoresultat
  };

  const backboneY = 175;
  const costY = 350;

  // Stacking segment Y values
  const segmentCount = segments.length;
  const segmentSpacing = 65;
  const segmentStartY = backboneY - ((segmentCount - 1) * segmentSpacing) / 2;

  const mainNode = { w: 135, h: 72 };
  const smallNode = { w: 95, h: 42 };

  const getStrokeWidth = (val: number) => {
    const maxVal = revenue;
    const minWidth = 3;
    const maxWidth = 26;
    const width = (Math.abs(val) / maxVal) * maxWidth;
    return Math.max(minWidth, width);
  };

  const handleMouseEnter = (e: React.MouseEvent, nodeId: string) => {
    setActiveNodeId(nodeId);
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nodeRect = e.currentTarget.getBoundingClientRect();

    // Position centered above the node card
    const x = nodeRect.left - containerRect.left + nodeRect.width / 2;
    const y = nodeRect.top - containerRect.top;

    const info = NODES_INFO[nodeId];
    if (info) {
      setTooltip({
        x,
        y,
        title: info.title,
        value: info.value,
        desc: info.desc,
        color: info.color,
        visible: true,
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveNodeId(null);
    setTooltip(null);
  };

  // Render segment nodes helper
  const renderSegmentNode = (segName: string, segValue: number, id: string, yPos: number) => {
    const isActive = activeNodeId === id;
    const isAnyActive = activeNodeId !== null;
    const opacity = isAnyActive ? (isActive ? "1" : "0.35") : "1";

    return (
      <g
        key={id}
        transform={`translate(${colX.col1 - smallNode.w / 2}, ${yPos - smallNode.h / 2})`}
        className="cursor-pointer transition-all duration-200"
        style={{ opacity }}
        onMouseEnter={(e) => handleMouseEnter(e, id)}
        onMouseLeave={handleMouseLeave}
      >
        <rect
          width={smallNode.w}
          height={smallNode.h}
          rx="8"
          fill="#FFFFFF"
          stroke="#2563EB"
          strokeWidth={isActive ? "2.5" : "1.5"}
          className={`transition-shadow ${isActive ? "shadow-md" : "shadow-sm"}`}
        />
        <text
          x={smallNode.w / 2}
          y="16"
          textAnchor="middle"
          className="fill-slate-800 text-[9px] font-black uppercase tracking-wider pointer-events-none"
        >
          {segName}
        </text>
        <text
          x={smallNode.w / 2}
          y="30"
          textAnchor="middle"
          className="fill-[#1D4ED8] text-[10px] font-bold pointer-events-none"
        >
          {formatVal(segValue)}
        </text>
      </g>
    );
  };

  // Render main nodes helper
  const renderMainNode = (title: string, value: number, id: string, showPercentage = false) => {
    const isActive = activeNodeId === id;
    const isAnyActive = activeNodeId !== null;
    const opacity = isAnyActive ? (isActive ? "1" : "0.35") : "1";

    return (
      <g
        transform={`translate(${colX[id === "revenue" ? "col2" : id === "gross_profit" ? "col3" : id === "ebita" ? "col4" : id === "ebit" ? "col5" : "col6"] - mainNode.w / 2}, ${backboneY - mainNode.h / 2})`}
        className="cursor-pointer transition-all duration-200"
        style={{ opacity }}
        onMouseEnter={(e) => handleMouseEnter(e, id)}
        onMouseLeave={handleMouseLeave}
      >
        <rect
          width={mainNode.w}
          height={mainNode.h}
          rx="12"
          fill="#FFFFFF"
          stroke="#059669"
          strokeWidth={isActive ? "3.5" : "2.5"}
          className={`transition-shadow ${isActive ? "shadow-lg" : "shadow-md"}`}
        />
        <text
          x={mainNode.w / 2}
          y="22"
          textAnchor="middle"
          className="fill-slate-800 text-[9px] font-black uppercase tracking-widest pointer-events-none"
        >
          {title}
        </text>
        <text
          x={mainNode.w / 2}
          y="42"
          textAnchor="middle"
          className="fill-[#059669] text-sm font-black pointer-events-none"
        >
          {formatVal(value)}
        </text>
        <text
          x={mainNode.w / 2}
          y="58"
          textAnchor="middle"
          className="fill-slate-400 text-[9px] font-bold pointer-events-none"
        >
          {showPercentage ? getMarginStr(value) : "100%"}
        </text>
      </g>
    );
  };

  // Render cost nodes helper
  const renderCostNode = (title: string, value: number, id: string) => {
    const isActive = activeNodeId === id;
    const isAnyActive = activeNodeId !== null;
    const opacity = isAnyActive ? (isActive ? "1" : "0.35") : "1";

    return (
      <g
        transform={`translate(${colX[id === "cogs" ? "col3" : id === "opex" ? "col4" : id === "depr" ? "col5" : "col6"] - smallNode.w / 2}, ${costY - smallNode.h / 2})`}
        className="cursor-pointer transition-all duration-200"
        style={{ opacity }}
        onMouseEnter={(e) => handleMouseEnter(e, id)}
        onMouseLeave={handleMouseLeave}
      >
        <rect
          width={smallNode.w}
          height={smallNode.h}
          rx="8"
          fill="#FFFFFF"
          stroke="#BE123C"
          strokeWidth={isActive ? "2.5" : "1.5"}
          className={`transition-shadow ${isActive ? "shadow-md" : "shadow-sm"}`}
        />
        <text
          x={smallNode.w / 2}
          y="16"
          textAnchor="middle"
          className="fill-slate-800 text-[8px] font-black uppercase tracking-wider pointer-events-none"
        >
          {title}
        </text>
        <text
          x={smallNode.w / 2}
          y="30"
          textAnchor="middle"
          className="fill-[#BE123C] text-[10px] font-bold pointer-events-none"
        >
          {formatVal(value)}
        </text>
      </g>
    );
  };

  return (
    <div ref={containerRef} className="w-full relative overflow-x-auto select-none py-4">
      <div className="min-w-[1000px] mx-auto bg-[#FAF8F5] p-6 rounded-[2rem] border border-[#78716C]/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="100%"
          className="overflow-visible"
        >
          {/* ==================== FLOWS / LINKS ==================== */}

          {/* 1. Segment flows (Blue) */}
          {segments.map((seg, i) => {
            const segY = segmentStartY + i * segmentSpacing;
            const startX = colX.col1 + smallNode.w / 2;
            const endX = colX.col2 - mainNode.w / 2;
            const strokeWidth = getStrokeWidth(seg.value);
            const isHigh = isFlowHighlighted(seg.name === "Skandinavien" ? "skandinavien" : seg.name === "Väst" ? "vast" : seg.name === "Öst" ? "ost" : seg.name === "e-Commerce" ? "ecommerce" : "ovrigt", "revenue");

            return (
              <path
                key={`seg-flow-${i}`}
                d={`M ${startX} ${segY} C ${startX + 60} ${segY}, ${endX - 60} ${backboneY}, ${endX} ${backboneY}`}
                fill="none"
                stroke="#2563EB"
                strokeWidth={strokeWidth}
                strokeOpacity={isHigh ? 0.8 : 0.12}
                className="transition-all duration-200"
              />
            );
          })}

          {/* 2. Main Backbone flows (Green) */}
          <line
            x1={colX.col2 + mainNode.w / 2}
            y1={backboneY}
            x2={colX.col3 - mainNode.w / 2}
            y2={backboneY}
            stroke="#059669"
            strokeWidth={getStrokeWidth(grossProfit)}
            strokeOpacity={isFlowHighlighted("revenue", "gross_profit") ? 1.0 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <line
            x1={colX.col3 + mainNode.w / 2}
            y1={backboneY}
            x2={colX.col4 - mainNode.w / 2}
            y2={backboneY}
            stroke="#059669"
            strokeWidth={getStrokeWidth(ebita)}
            strokeOpacity={isFlowHighlighted("gross_profit", "ebita") ? 1.0 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <line
            x1={colX.col4 + mainNode.w / 2}
            y1={backboneY}
            x2={colX.col5 - mainNode.w / 2}
            y2={backboneY}
            stroke="#059669"
            strokeWidth={getStrokeWidth(ebit)}
            strokeOpacity={isFlowHighlighted("ebita", "ebit") ? 1.0 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <line
            x1={colX.col5 + mainNode.w / 2}
            y1={backboneY}
            x2={colX.col6 - mainNode.w / 2}
            y2={backboneY}
            stroke="#059669"
            strokeWidth={getStrokeWidth(netProfit)}
            strokeOpacity={isFlowHighlighted("ebit", "net_profit") ? 1.0 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          {/* 3. Cost flows (Vinröd/Rose) */}
          <path
            d={`M ${colX.col2 + mainNode.w / 2 + 30} ${backboneY + 10} C ${colX.col2 + mainNode.w / 2 + 50} ${backboneY + 80}, ${colX.col3 - 50} ${costY}, ${colX.col3} ${costY}`}
            fill="none"
            stroke="#BE123C"
            strokeWidth={getStrokeWidth(cogs)}
            strokeOpacity={isFlowHighlighted("revenue", "cogs") ? 0.85 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <path
            d={`M ${colX.col3 + mainNode.w / 2 + 30} ${backboneY + 10} C ${colX.col3 + mainNode.w / 2 + 50} ${backboneY + 80}, ${colX.col4 - 50} ${costY}, ${colX.col4} ${costY}`}
            fill="none"
            stroke="#BE123C"
            strokeWidth={getStrokeWidth(opex)}
            strokeOpacity={isFlowHighlighted("gross_profit", "opex") ? 0.85 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <path
            d={`M ${colX.col4 + mainNode.w / 2 + 30} ${backboneY + 10} C ${colX.col4 + mainNode.w / 2 + 50} ${backboneY + 80}, ${colX.col5 - 50} ${costY}, ${colX.col5} ${costY}`}
            fill="none"
            stroke="#BE123C"
            strokeWidth={getStrokeWidth(depreciation)}
            strokeOpacity={isFlowHighlighted("ebita", "depr") ? 0.85 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          <path
            d={`M ${colX.col5 + mainNode.w / 2 + 30} ${backboneY + 10} C ${colX.col5 + mainNode.w / 2 + 50} ${backboneY + 80}, ${colX.col6 - 50} ${costY}, ${colX.col6} ${costY}`}
            fill="none"
            stroke="#BE123C"
            strokeWidth={getStrokeWidth(taxAndFinance)}
            strokeOpacity={isFlowHighlighted("ebit", "tax_finance") ? 0.85 : 0.12}
            strokeLinecap="round"
            className="transition-all duration-200"
          />


          {/* ==================== NODES / CARDS ==================== */}

          {/* 1. Segment Nodes */}
          {segments.map((seg, i) => {
            const segY = segmentStartY + i * segmentSpacing;
            const id = seg.name === "Skandinavien" ? "skandinavien" : seg.name === "Väst" ? "vast" : seg.name === "Öst" ? "ost" : seg.name === "e-Commerce" ? "ecommerce" : "ovrigt";
            return renderSegmentNode(seg.name, seg.value, id, segY);
          })}

          {/* 2. Backbone Main Nodes */}
          {renderMainNode("Nettoomsättning", revenue, "revenue", false)}
          {renderMainNode("Bruttoresultat", grossProfit, "gross_profit", true)}
          {renderMainNode("Operationell EBITA", ebita, "ebita", true)}
          {renderMainNode("Rörelseresultat (EBIT)", ebit, "ebit", true)}
          {renderMainNode("Nettoresultat", netProfit, "net_profit", true)}

          {/* 3. Cost Nodes */}
          {renderCostNode("Varukostnad (COGS)", cogs, "cogs")}
          {renderCostNode("Rörelsekostnader", opex, "opex")}
          {renderCostNode("Avskrivningar", depreciation, "depr")}
          {renderCostNode("Finansnetto & Skatt", taxAndFinance, "tax_finance")}

        </svg>
      </div>

      {/* Dynamic Floating Tooltip */}
      {tooltip && tooltip.visible && (
        <div
          className="absolute bg-[#FFFDFB] border border-[#78716C]/20 rounded-xl p-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-[250px] pointer-events-none transition-all duration-75 z-20 text-xs text-left"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            marginTop: "-8px",
          }}
        >
          <strong className="block text-slate-800 text-[12px] font-black uppercase tracking-wider mb-1">
            {tooltip.title}
          </strong>
          <div className="font-mono text-sm font-black mb-1.5" style={{ color: tooltip.color }}>
            {tooltip.value}
          </div>
          <div className="text-slate-500 font-medium leading-relaxed">
            {tooltip.desc}
          </div>
        </div>
      )}
    </div>
  );
}
