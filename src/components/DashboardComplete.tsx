'use client';

import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Leaf, DollarSign, FileText, AlertTriangle, BarChart3, LogOut, CheckCircle, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import FileUpload from './FileUpload';
import { ResumenTab } from './dashboard/ResumenTab';
import { CertificacionTab } from './dashboard/CertificacionTab';
import { MejorasTab } from './dashboard/MejorasTab';
import { BeneficiosTab } from './dashboard/BeneficiosTab';
import { CAETab } from './dashboard/CAETab';
import { RiesgosTab } from './dashboard/RiesgosTab';
import { PerformanceTab } from './dashboard/PerformanceTab';
import { PropertyData, CertificationType } from '@/types';

export default function DashboardComplete() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInitialCert, setShowInitialCert] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    try {
      // In a real app, we would fetch the property associated with the user
      // For now, we'll fetch the first property found for the user
      const response = await fetch('/api/properties/1');
      if (!response.ok) throw new Error('Failed to fetch data');
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <div className="text-xl text-red-600">Error al cargar datos</div>
        </div>
      </div>
    );
  }

  // Prevención: si no hay certificaciones, evitamos romper el render
  if (!propertyData?.certifications || propertyData.certifications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600">
            No hay certificaciones disponibles para esta propiedad todavía.
          </div>
        </div>
      </div>
    );
  }

  const initialCert = propertyData.certifications.find(
    c => c.certificationType === 'initial' as CertificationType
  );
  const improvedCert = propertyData.certifications.find(
    c => c.certificationType === 'improved' as CertificationType
  );
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                Dashboard de Sostenibilidad Inmobiliaria
              </h1>
              <p className="text-sm text-gray-600 mt-1">By Smart REM Solutions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
              <button
                onClick={() => setShowInitialCert(!showInitialCert)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Leaf className="w-4 h-4" />
                {showInitialCert ? 'Ver Certificación A' : 'Ver Certificación E'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alert */}
      {!showInitialCert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
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
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
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
        {activeTab === 'resumen' && <ResumenTab propertyData={propertyData} currentCert={currentCert} initialCert={initialCert} improvedCert={improvedCert} />}
        {activeTab === 'certificacion' && <CertificacionTab propertyData={propertyData} initialCert={initialCert} improvedCert={improvedCert} />}
        {activeTab === 'mejoras' && <MejorasTab propertyData={propertyData} />}
        {activeTab === 'beneficios' && <BeneficiosTab propertyData={propertyData} />}
        {activeTab === 'cae' && <CAETab propertyData={propertyData} />}
        {activeTab === 'riesgos' && <RiesgosTab propertyData={propertyData} />}
        {activeTab === 'performance' && <PerformanceTab propertyData={propertyData} improvedCert={improvedCert} setShowUploadModal={setShowUploadModal} />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Dashboard de Sostenibilidad Inmobiliaria | Datos actualizados: {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </p>
        </div>
      </footer>

      {/* Modal de carga de archivos */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Cargar Datos de Consumo</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <FileUpload
                propertyId={propertyData?.id || 1}
                onUploadComplete={(data) => {
                  console.log('Upload complete:', data);
                  fetchPropertyData();
                  setTimeout(() => setShowUploadModal(false), 2000);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
