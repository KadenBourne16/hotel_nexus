export function StatsCard({ title, value, subtitle, icon, trend }) {
    return (
      <div className="border border-rose-200 hover:shadow-md transition-shadow rounded-lg p-4 bg-white">
        <div className="flex flex-row items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="text-rose-600">{icon}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-rose-900">{value}</div>
          {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {trend.isPositive ? "↗" : "↘"} {trend.value}
            </p>
          )}
        </div>
      </div>
    )
  }
  
  export function UpdateCard({ title, description, date, type, isNew }) {
    const typeColors = {
      service: "bg-blue-100 text-blue-800",
      event: "bg-purple-100 text-purple-800",
      menu: "bg-orange-100 text-orange-800",
      announcement: "bg-green-100 text-green-800",
    }
  
    const typeLabels = {
      service: "New Service",
      event: "Event",
      menu: "Menu Update",
      announcement: "Announcement",
    }
  
    return (
      <div className="border border-rose-200 hover:shadow-md transition-shadow rounded-lg bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${typeColors[type]}`}>{typeLabels[type]}</span>
            {isNew && <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded">NEW</span>}
          </div>
          <h2 className="text-lg font-semibold text-rose-900">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    )
  }
  