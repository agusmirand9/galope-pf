export default function Tabs({ tabs, active, onChange }) {
    return (
        <div role="tablist" className="flex gap-6 border-b border-marron/15">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active === tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
                        active === tab.id ? "border-azul text-azul" : "border-transparent text-marron/70"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}