'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  propertyId: number;
  onUploadComplete: (data: any) => void;
}

export default function FileUpload({ propertyId, onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus('idle');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('propertyId', propertyId.toString());

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        setUploadMessage(`Archivo procesado exitosamente. ${data.processedData?.recordCount || 0} registros importados.`);
        onUploadComplete(data);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setSelectedFile(null);
          setUploadStatus('idle');
          setUploadMessage('');
        }, 3000);
      } else {
        setUploadStatus('error');
        setUploadMessage(data.error || 'Error al procesar el archivo');
      }
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage('Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Cargar Datos de Consumo Real</h3>
      
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Arrastra y suelta tu archivo aquí
          </p>
          <p className="text-sm text-gray-500 mb-4">
            o haz clic para seleccionar
          </p>
          <input
            type="file"
            accept=".csv,.pdf,.xlsx,.xls,.json"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Seleccionar Archivo
          </label>
          <p className="text-xs text-gray-400 mt-4">
            Formatos soportados: CSV, PDF, Excel, JSON
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              disabled={uploading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {uploading ? 'Procesando...' : 'Subir y Procesar'}
          </button>

          {uploadStatus !== 'idle' && (
            <div
              className={`flex items-center space-x-2 p-4 rounded-lg ${
                uploadStatus === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {uploadStatus === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{uploadMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

