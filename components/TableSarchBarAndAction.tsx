import React from 'react';
import { RefreshCw, Search } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import Selector from './Selector';

interface TableSarchBarAndActionProps {
  TableSearchAction?: React.ReactNode,
  showRefreshButton?: boolean, 
  selectorOptions?: string[] | null,
  setSelectedLabel?: (label: string) => void 
}

export default function TableSarchBarAndAction({ TableSearchAction = null,showRefreshButton = true, selectorOptions = null,setSelectedLabel = () => {} }: Readonly<TableSarchBarAndActionProps>) {
  return (
    <div className="w-full  flex items-center justify-between mb-4">
      {/* Barre de recherche */}
      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm w-[350px]">
        <Search className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Rechercher un patient (id, Téléphone ...)"
          className="bg-transparent outline-none text-gray-400 text-base flex-1"
        />
      </div>
      {/* Bouton rafraîchir */}
      {/* <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-xl shadow transition">
        <RefreshCw className="w-5 h-5" />
        Rafraîchir
      </button> */}
      <div className="flex items-center gap-2 bg-primary-50 rounded-full">
       {selectorOptions && selectorOptions.length > 0 && <Selector 
          label=""
          className='rounded-full bg-primary-50 text-primary-500 py-2 px-2'
          options={selectorOptions} 
          onChange={(value) =>
            setSelectedLabel && setSelectedLabel(value)
          }
        />}
      </div>
      <div className="flex gap-4">
      {showRefreshButton && <PrimaryButton icon={<RefreshCw className="w-5 h-5" />} label="Rafraîchir" className='bg-orange-500 hover:bg-orange-600' />}
      {TableSearchAction}
      </div>
    </div>
  );
}
