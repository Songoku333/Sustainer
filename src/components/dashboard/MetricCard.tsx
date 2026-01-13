import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
    subtitle: string;
    color: 'green' | 'blue' | 'purple' | 'orange' | 'indigo' | 'red';
}

export function MetricCard({ icon: Icon, title, value, subtitle, color }: MetricCardProps) {
    const colorClasses = {
        green: 'bg-green-50 text-green-600 border-green-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        red: 'bg-red-50 text-red-600 border-red-200',
    };

    return (
        <div className={`${colorClasses[color]} border rounded-lg p-4`}>
            <div className="flex items-center gap-3 mb-2">
                <Icon className="w-6 h-6" />
                <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-600 mt-1">{subtitle}</div>
        </div>
    );
}
