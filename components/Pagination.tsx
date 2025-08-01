
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { setPage } from '@/app/store/patientTableSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';


interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  setPage: ActionCreatorWithPayload<number, string>;
  
}

export default function Pagination({ currentPage, pageSize, totalItems, setPage }: PaginationProps) {
  const dispatch = useDispatch();
  
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(totalItems/ pageSize);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  // Génère les boutons de page (1, 2, 3, 4, ..., totalPages)
  let pages: (number | string)[] = [];
  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  return (
    <div className="w-full flex items-center justify-between mt-4">
      {/* Texte info */}
      <div className="text-gray-400 text-sm">
        Affichage des données {start} à {end} sur {totalItems} entrées
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Flèche gauche */}
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && dispatch(setPage(currentPage - 1))}
        >
          &lt;
        </button>
        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={p}
              className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition ${
                currentPage === p
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              onClick={() => dispatch(setPage(p))}
            >
              {p}
            </button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
          )
        )}
        {/* Flèche droite */}
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => currentPage < totalPages && dispatch(setPage(currentPage + 1))}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
