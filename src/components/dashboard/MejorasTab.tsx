import { Award } from 'lucide-react';
import { PropertyData } from '@/types';

interface MejorasTabProps {
    propertyData: PropertyData;
}

export function MejorasTab({ propertyData }: MejorasTabProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Mejoras Implementadas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyData.improvements.map((improvement) => (
                    <div key={improvement.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="bg-blue-100 rounded-full p-2">
                                <Award className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900">{improvement.improvementType}</h3>
                                <p className="text-sm text-gray-600 mt-1">{improvement.description}</p>
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Inversión:</span>
                                <span className="font-bold text-gray-900">{improvement.investmentAmount.toLocaleString()}€</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Ahorro anual:</span>
                                <span className="font-bold text-green-600">{improvement.annualSavings.toLocaleString()}€</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Implementación:</span>
                                <span className="text-sm text-gray-900">
                                    {new Date(improvement.implementationDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
