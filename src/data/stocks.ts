export interface FinancialYear {
  year: string;
  revenue: number;
  profit: number;
}

export interface StockData {
  slug: string;
  name: string;
  ticker: string;
  market: string;
  sector: string;
  description: string;
  logoColor: string;
  financialUnit?: string;
  stats: {
    price: string;
    change: string;
    pe: string;
    yield: string;
    marketCap: string;
  };
  financialData?: FinancialYear[];
}

export const stocks: Record<string, StockData> = {
  "nvidia": {
    slug: "nvidia",
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    market: "NASDAQ",
    sector: "Halvledare",
    description: "NVIDIA är världsledande inom accelererad beräkning. Bolaget uppfann GPU:n och har transformerat gaming, datacenter och AI-marknaden. Deras Blackwell-arkitektur och CUDA-plattform utgör ryggraden i den globala AI-revolutionen.",
    logoColor: "bg-[#76B900]",
    financialUnit: "Mdr USD",
    stats: {
      price: "$148.50",
      change: "+2.4%",
      pe: "48.20",
      yield: "0.02%",
      marketCap: "$3.6T"
    },
    financialData: [
      { year: '2020', revenue: 10.9, profit: 2.8 },
      { year: '2021', revenue: 16.7, profit: 4.3 },
      { year: '2022', revenue: 26.9, profit: 9.7 },
      { year: '2023', revenue: 27.0, profit: 4.4 },
      { year: '2024', revenue: 60.9, profit: 29.8 },
    ]
  },
  "investor": {
    slug: "investor",
    name: "Investor AB",
    ticker: "INVE-B.ST",
    market: "Stockholm",
    sector: "Investmentbolag",
    description: "Investor grundades av familjen Wallenberg 1916 och är idag ett av Nordens ledande investmentbolag. Portföljen består av högkvalitativa noterade bolag som Atlas Copco, ABB och SEB, samt onoterade Patricia Industries.",
    logoColor: "bg-[#004b89]",
    financialUnit: "Mdkr",
    stats: {
      price: "245.20 kr",
      change: "+0.8%",
      pe: "14.20",
      yield: "1.8%",
      marketCap: "750 Bkr"
    },
    financialData: [
      { year: '2020', revenue: 55.1, profit: 52.8 },
      { year: '2021', revenue: 231.7, profit: 228.1 },
      { year: '2022', revenue: -67.4, profit: -74.7 },
      { year: '2023', revenue: 132.7, profit: 127.0 },
      { year: '2024', revenue: 122.1, profit: 113.3 },
      { year: '2025', revenue: 162.8, profit: 157.5 },
    ]
  },
  "microsoft": {
    slug: "microsoft",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    market: "NASDAQ",
    sector: "Mjukvara",
    description: "Microsoft är ett globalt teknikbolag som erbjuder mjukvara, molntjänster (Azure) och hårdvara. Genom sitt partnerskap med OpenAI har de tagit en ledande position inom generativ AI för företag och konsumenter.",
    logoColor: "bg-[#00a4ef]",
    financialUnit: "Mdr USD",
    stats: {
      price: "$415.20",
      change: "-0.5%",
      pe: "32.40",
      yield: "0.75%",
      marketCap: "$3.1T"
    },
    financialData: [
      { year: '2020', revenue: 143.0, profit: 44.3 },
      { year: '2021', revenue: 168.1, profit: 61.3 },
      { year: '2022', revenue: 198.3, profit: 72.7 },
      { year: '2023', revenue: 211.9, profit: 72.4 },
      { year: '2024', revenue: 245.1, profit: 88.1 },
    ]
  },
  "evolution": {
    slug: "evolution",
    name: "Evolution AB",
    ticker: "EVO.ST",
    market: "Stockholm",
    sector: "Gaming",
    description: "Evolution är världsledande inom B2B-lösningar för live casino. Bolaget levererar innovativa spelupplevelser till operatörer globalt och har en historik av extremt hög lönsamhet och skalbar tillväxt.",
    logoColor: "bg-[#000000]",
    financialUnit: "MEUR",
    stats: {
      price: "577 kr",
      change: "-1.2%",
      pe: "9.95",
      yield: "5.3%",
      marketCap: "115 Mdr EUR"
    },
    financialData: [
      { year: '2020', revenue: 561, profit: 285 },
      { year: '2021', revenue: 1068, profit: 605 },
      { year: '2022', revenue: 1457, profit: 843 },
      { year: '2023', revenue: 1899, profit: 1070 },
      { year: '2024', revenue: 2250, profit: 1320 },
    ]
  },
  "apple": {
    slug: "apple",
    name: "Apple Inc.",
    ticker: "AAPL",
    market: "NASDAQ",
    sector: "Konsumentelektronik",
    description: "Apple designar, tillverkar och marknadsför smartphones, datorer och wearables. Bolagets ekosystem av tjänster och hårdvara skapar en av världens starkaste kundlojaliteter och kassaflöden.",
    logoColor: "bg-[#555555]",
    financialUnit: "Mdr USD",
    stats: {
      price: "$228.10",
      change: "+0.3%",
      pe: "31.20",
      yield: "0.45%",
      marketCap: "$3.5T"
    },
    financialData: [
      { year: '2020', revenue: 274.5, profit: 57.4 },
      { year: '2021', revenue: 365.8, profit: 94.7 },
      { year: '2022', revenue: 394.3, profit: 99.8 },
      { year: '2023', revenue: 383.3, profit: 97.0 },
      { year: '2024', revenue: 391.0, profit: 93.7 },
    ]
  },
  "tesla": {
    slug: "tesla",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    market: "NASDAQ",
    sector: "Automotive",
    description: "Tesla accelererar världens övergång till hållbar energi genom elbilar, solpaneler och energilagringslösningar. Bolaget leder utvecklingen inom autonom körning och robotik.",
    logoColor: "bg-[#e0001c]",
    financialUnit: "Mdr USD",
    stats: {
      price: "$260.40",
      change: "+3.8%",
      pe: "85.40",
      yield: "0%",
      marketCap: "$830B"
    },
    financialData: [
      { year: '2020', revenue: 31.5, profit: 0.7 },
      { year: '2021', revenue: 53.8, profit: 5.5 },
      { year: '2022', revenue: 81.5, profit: 12.6 },
      { year: '2023', revenue: 96.8, profit: 15.0 },
      { year: '2024', revenue: 96.8, profit: 12.5 },
    ]
  },
  "volvo": {
    slug: "volvo",
    name: "Volvo AB",
    ticker: "VOLV-B.ST",
    market: "Stockholm",
    sector: "Industri",
    description: "Volvo Group är en av världens ledande tillverkare av lastbilar, bussar, anläggningsmaskiner och marinmotorer. Bolaget leder den gröna omställningen inom tunga transporter genom elektrifiering.",
    logoColor: "bg-[#003057]",
    financialUnit: "Bkr",
    stats: {
      price: "322.40 kr",
      change: "-1.1%",
      pe: "19.00",
      yield: "4.04%",
      marketCap: "660 Bkr"
    },
    financialData: [
      { year: '2020', revenue: 338.4, profit: 20.1 },
      { year: '2021', revenue: 372.2, profit: 33.3 },
      { year: '2022', revenue: 473.5, profit: 33.0 },
      { year: '2023', revenue: 552.8, profit: 49.9 },
      { year: '2024', revenue: 554.8, profit: 48.2 },
    ]
  },
  "alphabet": {
    slug: "alphabet",
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    market: "NASDAQ",
    sector: "Internet",
    description: "Alphabet är moderbolaget till Google, YouTube och Waymo. Genom sin dominans inom sök och digital annonsering finansierar de banbrytande forskning inom AI och framtidens teknik.",
    logoColor: "bg-[#4285F4]",
    financialUnit: "Mdr USD",
    stats: {
      price: "$175.30",
      change: "+1.1%",
      pe: "24.20",
      yield: "0.45%",
      marketCap: "$2.2T"
    },
    financialData: [
      { year: '2020', revenue: 182.5, profit: 40.3 },
      { year: '2021', revenue: 257.6, profit: 76.0 },
      { year: '2022', revenue: 282.8, profit: 60.0 },
      { year: '2023', revenue: 307.4, profit: 73.8 },
      { year: '2024', revenue: 353.5, profit: 94.3 },
    ]
  },
  "novo-nordisk": {
    slug: "novo-nordisk",
    name: "Novo Nordisk A/S",
    ticker: "NOVO-B.CO",
    market: "Copenhagen",
    sector: "Hälsovård",
    description: "Novo Nordisk är ett globalt läkemedelsbolag som leder kampen mot diabetes och fetma. Genom sina banbrytande GLP-1-läkemedel som Ozempic och Wegovy har bolaget blivit Europas mest värdefulla företag.",
    logoColor: "bg-[#003366]",
    financialUnit: "Mdr DKK",
    stats: {
      price: "845.20 DKK",
      change: "+1.5%",
      pe: "38.40",
      yield: "1.2%",
      marketCap: "3.8 TDKK"
    },
    financialData: [
      { year: '2020', revenue: 126.9, profit: 42.1 },
      { year: '2021', revenue: 140.8, profit: 47.8 },
      { year: '2022', revenue: 177.0, profit: 55.5 },
      { year: '2023', revenue: 232.3, profit: 83.7 },
      { year: '2024', revenue: 285.0, profit: 105.0 },
    ]
  }
};
