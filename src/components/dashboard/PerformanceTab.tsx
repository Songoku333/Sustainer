import { Upload, Download, FileText } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell } from 'recharts';
import { PropertyData, EnergyCertification } from '@/types';

interface PerformanceTabProps {
    propertyData: PropertyData;
    improvedCert?: EnergyCertification;
    setShowUploadModal: (show: boolean) => void;
}

export function PerformanceTab({ propertyData, improvedCert, setShowUploadModal }: PerformanceTabProps) {
    const consumptionRecords = propertyData.consumptionRecords;

    const totalConsumption = consumptionRecords.reduce((sum, record) => sum + record.consumptionKwh, 0);
    const avgDailyConsumption = totalConsumption / 278; // 278 días
    const theoreticalAnnual = (improvedCert?.consumptionKwhM2 || 0) * propertyData.surfaceArea;
    const realAnnualProjected = (totalConsumption / 278) * 365;
    const difference = theoreticalAnnual > 0 ? ((realAnnualProjected - theoreticalAnnual) / theoreticalAnnual * 100).toFixed(1) : '0';

    const monthlyData = consumptionRecords.map((record) => ({
        month: new Date(record.periodStart).toLocaleDateString('es-ES', { month: 'short' }),
        real: record.consumptionKwh,
        teorico: theoreticalAnnual / 12,
    }));

    const tariffData = [
        { name: 'Valle (0h-8h)', value: 42, color: '#3B82F6' },
        { name: 'Llano (8h-18h)', value: 24, color: '#FBBF24' },
        { name: 'Punta (18h-22h)', value: 26, color: '#EF4444' },
        { name: 'Otros', value: 9, color: '#9CA3AF' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Análisis de Performance Real</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Actualizar con Datos Reales
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Descargar Análisis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Consumo Real Anual</h3>
                    <div className="text-2xl font-bold text-blue-600">{(realAnnualProjected / propertyData.surfaceArea).toFixed(1)} kWh/m²</div>
                    <div className="text-xs text-gray-600 mt-1">vs. {improvedCert?.consumptionKwhM2} kWh/m² teórico</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Diferencia vs Teórico</h3>
                    <div className="text-2xl font-bold text-orange-600">+{difference}%</div>
                    <div className="text-xs text-gray-600 mt-1">{(realAnnualProjected - theoreticalAnnual).toFixed(0)} kWh adicionales</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Consumo Promedio Diario</h3>
                    <div className="text-2xl font-bold text-green-600">{avgDailyConsumption.toFixed(2)} kWh</div>
                    <div className="text-xs text-gray-600 mt-1">Máximo: {Math.max(...consumptionRecords.map((r) => r.consumptionKwh))} kWh</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Período Analizado</h3>
                    <div className="text-2xl font-bold text-purple-600">278 días</div>
                    <div className="text-xs text-gray-600 mt-1">Ene 2025 - Oct 2025</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Evolución del Consumo Mensual</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="real" stroke="#3B82F6" strokeWidth={2} name="Consumo Real" />
                        <Line type="monotone" dataKey="teorico" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Consumo Teórico" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Distribución por Períodos Tarifarios</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={tariffData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {tariffData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Factores que Explican las Diferencias</h3>
                    <div className="space-y-3">
                        {[
                            'Uso real de la vivienda vs. condiciones estándar de certificación',
                            'Variaciones en temperatura exterior vs. condiciones de diseño',
                            'Patrones de ocupación y uso de equipos',
                            'Eficiencia real de los sistemas vs. eficiencia nominal',
                            'Período de adaptación tras las mejoras energéticas'
                        ].map((factor, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                                <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{factor}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
