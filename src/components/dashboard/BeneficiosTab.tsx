import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { PropertyData } from '@/types';

interface BeneficiosTabProps {
    propertyData: PropertyData;
}

export function BeneficiosTab({ propertyData }: BeneficiosTabProps) {
    const totalInvestment = propertyData.improvements.reduce((sum, imp) => sum + imp.investmentAmount, 0);
    const totalAnnualSavings = propertyData.improvements.reduce((sum, imp) => sum + imp.annualSavings, 0);
    const paybackPeriod = totalInvestment / totalAnnualSavings;
    // const roi = (totalAnnualSavings / totalInvestment * 100); // Unused variable

    const projectionData = Array.from({ length: 11 }, (_, i) => ({
        year: i,
        savings: totalAnnualSavings * i,
        investment: totalInvestment,
    }));

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Beneficios Financieros</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Inversión Total</h3>
                    <div className="text-3xl font-bold text-blue-600">{totalInvestment.toLocaleString()}€</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Ahorro Anual</h3>
                    <div className="text-3xl font-bold text-green-600">{totalAnnualSavings.toLocaleString()}€</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Período de Retorno</h3>
                    <div className="text-3xl font-bold text-purple-600">{paybackPeriod.toFixed(1)} años</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proyección de Ahorros Acumulados</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Años', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Euros (€)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()}€`} />
                        <Legend />
                        <Line type="monotone" dataKey="investment" stroke="#EF4444" strokeWidth={2} name="Inversión" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} name="Ahorros Acumulados" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
