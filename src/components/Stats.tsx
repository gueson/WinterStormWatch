interface StatsProps {
  totalAlerts: number;
  statesAffected: number;
  warnings: number;
  watches: number;
}

export function Stats({ totalAlerts, statesAffected, warnings, watches }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" role="region" aria-label="Alert statistics">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-gray-500 mb-1">Total Alerts</p>
        <p className="text-3xl font-bold text-gray-900">{totalAlerts}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-gray-500 mb-1">States Affected</p>
        <p className="text-3xl font-bold text-gray-900">{statesAffected}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 p-4">
        <p className="text-sm text-gray-500 mb-1">Warnings</p>
        <p className="text-3xl font-bold text-red-600">{warnings}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-yellow-500 p-4">
        <p className="text-sm text-gray-500 mb-1">Watches</p>
        <p className="text-3xl font-bold text-yellow-600">{watches}</p>
      </div>
    </div>
  );
}
