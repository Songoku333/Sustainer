'use client';

import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Leaf, DollarSign, FileText, AlertTriangle, BarChart3, Upload } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PropertyData {
  id: number;
  name: string;
  address: string;
  surfaceArea: number;
  certifications: any[];
  improvements: any[];
  consumptionRecords: any[];
  climateRisk: any;
  caeCertificate: any;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInitialCert, setShowInitialCert] = useState(false);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      const response = await fetch('/api/properties/1');
      const data = await response.json();
      setPropertyData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error al cargar datos</div>
      </div>
    );
  }

  const initialCert = propertyData.certifications.find(c => c.certificationType === 'initial');
  const improvedCert = propertyData.certifications.find(c => c.certificationType === 'improved');
  const currentCert = showInitialCert ? initialCert : improvedCert;

  const tabs = [
    { id: 'resumen', label: 'Resumen Ejecutivo', icon: Building2 },
    { id: 'certificacion', label: 'Certificación Energética', icon: Leaf },
    { id: 'mejoras', label: 'Mejoras Implementadas', icon: TrendingUp },
    { id: 'beneficios', label: 'Beneficios Financieros', icon: DollarSign },
    { id: 'cae', label: 'Certificados CAE', icon: FileText },
    { id: 'riesgos', label: 'Riesgos Climáticos', icon: AlertTriangle },
    { id: 'performance', label: 'Performance Real', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                Dashboard de Sostenibilidad Inmobiliaria
              </h1>
              <p className="text-sm text-gray-600 mt-1">By Smart REM Solutions</p>
            </div>
            <button
              onClick={() => setShowInitialCert(!showInitialCert)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showInitialCert ? 'Ver Certificación A' : 'Ver Certificación E'}
            </button>
          </div>
        </div>
      </header>

      {/* Alert */}
      {!showInitialCert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Leaf className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Visualizando datos con certificación energética mejorada (A)</h3>
              <p className="text-sm text-green-700 mt-1">
                La propiedad ha sido renovada con medidas de eficiencia energética que han mejorado su calificación de E a A.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'resumen' && <ResumenTab propertyData={propertyData} currentCert={currentCert} />}
        {activeTab === 'certificacion' && <CertificacionTab propertyData={propertyData} />}
        {activeTab === 'mejoras' && <MejorasTab propertyData={propertyData} />}
        {activeTab === 'beneficios' && <BeneficiosTab propertyData={propertyData} />}
        {activeTab === 'cae' && <CAETab propertyData={propertyData} />}
        {activeTab === 'riesgos' && <RiesgosTab propertyData={propertyData} />}
        {activeTab === 'performance' && <PerformanceTab propertyData={propertyData} />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Dashboard de Sostenibilidad Inmobiliaria | Datos actualizados: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Tab Components (placeholders - will be implemented)
function ResumenTab({ propertyData, currentCert }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Resumen Ejecutivo</h2>
    <p>Contenido del resumen...</p>
  </div>;
}

function CertificacionTab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Certificación Energética</h2>
    <p>Contenido de certificación...</p>
  </div>;
}

function MejorasTab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Mejoras Implementadas</h2>
    <p>Contenido de mejoras...</p>
  </div>;
}

function BeneficiosTab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Beneficios Financieros</h2>
    <p>Contenido de beneficios...</p>
  </div>;
}

function CAETab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Certificados de Ahorro Energético</h2>
    <p>Contenido de CAE...</p>
  </div>;
}

function RiesgosTab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Riesgos Climáticos</h2>
    <p>Contenido de riesgos...</p>
  </div>;
}

function PerformanceTab({ propertyData }: any) {
  return <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">Performance Real</h2>
    <p>Contenido de performance...</p>
  </div>;
}

