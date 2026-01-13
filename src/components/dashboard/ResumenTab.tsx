import { Leaf, Wind, DollarSign, TrendingDown, Target, Thermometer } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { MetricCard } from './MetricCard';
import { PropertyData, EnergyCertification } from '@/types';

interface ResumenTabProps {
    propertyData: PropertyData;
    currentCert?: EnergyCertification;
    initialCert?: EnergyCertification;
    improvedCert?: EnergyCertification;
}

export function ResumenTab({ propertyData, currentCert, initialCert, improvedCert }: ResumenTabProps) {
    const totalInvestment = propertyData.improvements.reduce((sum, imp) => sum + imp.investmentAmount, 0);
    const totalAnnualSavings = propertyData.improvements.reduce((sum, imp) => sum + imp.annualSavings, 0);
    const roi = totalInvestment > 0 ? (totalAnnualSavings / totalInvestment * 100).toFixed(1) : 0;

    const efficiencyData = [
        {
            category: 'Consumo Energético',
            'Certificación Inicial (E)': initialCert?.consumptionKwhM2 || 0,
            'Certificación Mejorada (A)': improvedCert?.consumptionKwhM2 || 0,
        },
        {
            category: 'Emisiones CO₂',
            'Certificación Inicial (E)': initialCert?.emissionsKgCo2M2 || 0,
            'Certificación Mejorada (A)': improvedCert?.emissionsKgCo2M2 || 0,
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Resumen Ejecutivo</h2>

            {/* Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                    icon={Leaf}
                    title="Consumo Energético"
                    value={`${currentCert?.consumptionKwhM2} kWh/m²`}
                    subtitle="año"
                    color="green"
                />
                <MetricCard
                    icon={Wind}
                    title="Emisiones CO₂"
                    value={`${currentCert?.emissionsKgCo2M2} kgCO₂/m²`}
                    subtitle="año"
                    color="blue"
                />
                <MetricCard
                    icon={DollarSign}
                    title="Inversión Realizada"
                    value={`${totalInvestment.toLocaleString()}€`}
                    subtitle="total"
                    color="purple"
                />
                <MetricCard
                    icon={TrendingDown}
                    title="Ahorro Anual"
                    value={`${totalAnnualSavings.toLocaleString()}€`}
                    subtitle="por año"
                    color="orange"
                />
                <MetricCard
                    icon={Target}
                    title="ROI"
                    value={`${roi}%`}
                    subtitle="retorno anual"
                    color="indigo"
                />
                <MetricCard
                    icon={Thermometer}
                    title="Temperatura Implícita"
                    value={propertyData.climateRisk?.impliedTemperature || 'N/A'}
                    subtitle={propertyData.climateRisk?.alignmentScenario || ''}
                    color="red"
                />
            </div>

            {/* Gráfico de Mejora en Eficiencia */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mejora en Eficiencia Energética</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={efficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Certificación Inicial (E)" fill="#FFA500" />
                        <Bar dataKey="Certificación Mejorada (A)" fill="#10B981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
