import { Thermometer, Wind, Droplets } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { PropertyData } from '@/types';

interface RiesgosTabProps {
    propertyData: PropertyData;
}

export function RiesgosTab({ propertyData }: RiesgosTabProps) {
    const risk = propertyData.climateRisk;

    const transitionData = [
        { year: 'Actual', value: risk?.transitionRiskCurrent || 0 },
        { year: '2030', value: risk?.transitionRisk2030 || 0 },
        { year: '2050', value: risk?.transitionRisk2050 || 0 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Riesgos Climáticos MSCI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Thermometer className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-bold text-gray-900">Temperatura Implícita</h3>
                    </div>
                    <div className="text-center py-6">
                        <div className="text-5xl font-bold text-red-600 mb-2">{risk?.impliedTemperature}</div>
                        <div className="text-lg text-gray-600">{risk?.alignmentScenario}</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Riesgos Físicos</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Wind className="w-5 h-5 text-orange-600" />
                                <span className="font-medium">Calor Extremo</span>
                            </div>
                            <span className="font-bold text-orange-600">{risk?.physicalRiskHeat}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Droplets className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">Escasez de Agua</span>
                            </div>
                            <span className="font-bold text-blue-600">{risk?.physicalRiskWater}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trayectoria de Intensidad de Carbono</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={transitionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'kgCO₂/m²', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number | undefined) => `${value ?? 0} kgCO₂/m²`} />
                        <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={3} name="Intensidad de Carbono" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
