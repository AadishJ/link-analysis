import { ViewType } from '@/types';

interface ViewSelectorProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewSelector = ({ activeView, onViewChange }: ViewSelectorProps) => {
  const views: ViewType[] = ['graph', 'results', 'comparison', 'convergence', 'analysis'];

  return (
    <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl shadow-md border border-gray-200">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
            activeView === view 
              ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  );
};