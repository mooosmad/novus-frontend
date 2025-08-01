import React from 'react';
import TableSarchBarAndAction from './TableSarchBarAndAction';
import Pagination from './Pagination';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface Header {
  label: string;
  key: string;
}

interface TableProps {
  headers: Header[];
  rows: any[];
  onRowClick?: (row: any, index: number) => void;
  searchBar?: boolean;
  pagination?: boolean;
  customCellRender?: (row: any, header: Header) => React.ReactNode;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  TableSearchAction?: React.ReactNode;  
  setPage: ActionCreatorWithPayload<number, string>;
  showRefreshButton?: boolean;
  title?: string;
  selectorOptions?: string[] | null;
  setSelectedLabel?: (label: string) => void;
}

export default function Table({ 
  headers, 
  rows, 
  onRowClick,
  searchBar = true,
  pagination = true,
  customCellRender,
  currentPage,
  pageSize,
  totalItems,
  TableSearchAction,
  setPage,
  showRefreshButton = true,
  title,
  selectorOptions = null,
  setSelectedLabel = () => {}
}: TableProps) {
  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow">
      {title && <h4 className='text-xl font-bold mb-4'>{title}</h4>}
      {searchBar && <TableSarchBarAndAction TableSearchAction={TableSearchAction} showRefreshButton={showRefreshButton} selectorOptions={selectorOptions} setSelectedLabel={setSelectedLabel} />}
      
      <table className="min-w-full text-left">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="py-3 px-2 font-medium text-gray-400">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b last:border-b-0 hover:bg-gray-50 hover:translate-y-[-2px] 
        active:translate-y-[1px]  "
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="py-3 px-2">
                  {customCellRender ? 
                    customCellRender(row, header) : 
                    row[header.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination && <Pagination currentPage={currentPage} pageSize={pageSize} totalItems={totalItems} setPage={setPage} />}
    </div>
  );
}