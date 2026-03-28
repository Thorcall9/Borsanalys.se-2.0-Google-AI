import React from 'react';

export interface TableRow {
  [key: string]: any;
}

interface Column {
  key: string;
  label: string;
  format?: (value: any) => string;
}

interface FinancialTableProps {
  data: TableRow[];
  columns: Column[];
  title?: string;
  accentColor?: string;
}

export default function FinancialTable({ data, columns, title, accentColor = "#10B981" }: FinancialTableProps) {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      {title && (
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/10">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-muted/5 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-foreground font-medium">
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
