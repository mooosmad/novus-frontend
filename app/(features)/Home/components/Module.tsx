"use client";
import { useState } from "react";
const CATEGORIES = ["Médical", "Administratif", "Technique", "Tous"];

export default function Module() {
  const [selected, setSelected] = useState("Médical");
  const [search, setSearch] = useState("");
  // const activeWorkspaceId = useSelector((state: RootState) => state.workspaceModules.activeId);
  // const workspaceModules = useSelector((state: RootState) => 
  //   activeWorkspaceId ? state.workspaceModules.modules[activeWorkspaceId] || [] : []
  // );
const  modules = [
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    icon: '/assets/icons/dashboard.svg',
    description: 'Vue d\'ensemble de votre activité',
    color: '#3B82F6',
    isActive: true,
    category: 'main',
    permissions: ['read'],
    order: 1
  },
  {
    id: 'patients',
    title: 'Gestion des patients',
    icon: '/assets/icons/patients.svg',
    description: 'Gérer les dossiers patients',
    color: '#10B981',
    isActive: false,
    category: 'management',
    permissions: ['read', 'write'],
    order: 2
  },
  {
    id: 'appointments',
    title: 'Rendez-vous',
    icon: '/assets/icons/calendar.svg',
    description: 'Planifier et gérer les rendez-vous',
    color: '#F59E0B',
    isActive: false,
    category: 'scheduling',
    permissions: ['read', 'write'],
    order: 3
  },
  {
    id: 'billing',
    title: 'Facturation',
    icon: '/assets/icons/billing.svg',
    description: 'Gérer la facturation et les paiements',
    color: '#EF4444',
    isActive: false,
    category: 'finance',
    permissions: ['read', 'write'],
    order: 4
  },
  {
    id: 'reports',
    title: 'Rapports',
    icon: '/assets/icons/reports.svg',
    description: 'Générer des rapports et statistiques',
    color: '#8B5CF6',
    isActive: false,
    category: 'analytics',
    permissions: ['read'],
    order: 5
  },
  {
    id: 'settings',
    title: 'Paramètres',
    icon: '/assets/icons/settings.svg',
    description: 'Configurer l\'application',
    color: '#6B7280',
    isActive: false,
    category: 'system',
    permissions: ['admin'],
    order: 6
  }
]

  const filtered = modules.filter(
    (m) =>
      (selected === "Tous" || m.category === selected) &&
      m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-2 mt-5">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Découvrez vos modules</h1>
      <p className="text-gray-500 text-center mb-8">Sélectionnez un module pour accéder à ses fonctionnalités</p>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 items-center justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-5 py-2 rounded-full border transition font-medium ${
              selected === cat
                ? "bg-primary-400 text-white border-primary-400 shadow"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          placeholder="Rechercher un module..."
          className="ml-4 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Grille de modules */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-h-[500px] overflow-y-auto pr-2">
            {filtered.map((mod) => (
            <div
              key={mod.id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-4">{mod.icon}</div>
              <div className="text-base font-medium text-gray-700 text-center">{mod.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
