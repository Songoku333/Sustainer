import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { PropertyData, EnergyCertification } from '@/types';

interface CertificacionTabProps {
    propertyData: PropertyData;
    initialCert?: EnergyCertification;
    improvedCert?: EnergyCertification;
}

export function CertificacionTab({ propertyData, initialCert, improvedCert }: CertificacionTabProps) {
    const comparisonData = [
        {
            metric: 'Consumo',
            Inicial: initialCert?.consumptionKwhM2 || 0,
            Mejorado: improvedCert?.consumptionKwhM2 || 0,
        },
        {
            metric: 'Emisiones',
            Inicial: initialCert?.emissionsKgCo2M2 || 0,
            Mejorado: improvedCert?.emissionsKgCo2M2 || 0,
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Certificación Energética</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Certificación Inicial */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Certificación Inicial</h3>
                        <div className="bg-orange-500 text-white text-3xl font-bold rounded-lg px-4 py-2">
                            {initialCert?.rating}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm text-gray-600">Consumo Energético</div>
                            <div className="text-2xl font-bold text-gray-900">{initialCert?.consumptionKwhM2} kWh/m² año</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Emisiones CO₂</div>
                            <div className="text-2xl font-bold text-gray-900">{initialCert?.emissionsKgCo2M2} kgCO₂/m² año</div>
                        </div>
                    </div>
                </div>

                {/* Certificación Mejorada */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Certificación Mejorada</h3>
                        <div className="bg-green-500 text-white text-3xl font-bold rounded-lg px-4 py-2">
                            {improvedCert?.rating}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm text-gray-600">Consumo Energético</div>
                            <div className="text-2xl font-bold text-gray-900">{improvedCert?.consumptionKwhM2} kWh/m² año</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Emisiones CO₂</div>
                            <div className="text-2xl font-bold text-gray-900">{improvedCert?.emissionsKgCo2M2} kgCO₂/m² año</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico Comparativo */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comparativa de Eficiencia</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Inicial" fill="#FFA500" name="Certificación E (Inicial)" />
                        <Bar dataKey="Mejorado" fill="#10B981" name="Certificación A (Mejorada)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
