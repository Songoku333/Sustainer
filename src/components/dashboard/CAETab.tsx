import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { PropertyData } from '@/types';

interface CAETabProps {
    propertyData: PropertyData;
}

export function CAETab({ propertyData }: CAETabProps) {
    const cae = propertyData.caeCertificate;

    const projectionData = Array.from({ length: cae?.projectionYears || 10 }, (_, i) => ({
        year: i + 1,
        value: (cae?.certificateValueEuros || 0) * (i + 1),
    }));

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Certificados de Ahorro Energético (CAE)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Ahorro Anual</h3>
                    <div className="text-2xl font-bold text-indigo-600">{cae?.annualSavingsKwh.toLocaleString()} kWh</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Valor Anual CAE</h3>
                    <div className="text-2xl font-bold text-green-600">{cae?.certificateValueEuros.toLocaleString()}€</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Proyección</h3>
                    <div className="text-2xl font-bold text-purple-600">{cae?.projectionYears} años</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Valor Total</h3>
                    <div className="text-2xl font-bold text-blue-600">{cae?.totalValueEuros.toLocaleString()}€</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proyección de Ingresos por CAE</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Año', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Valor Acumulado (€)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()}€`} />
                        <Area type="monotone" dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} name="Valor Acumulado" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
