import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Ruler, CheckCircle } from 'lucide-react';

export const SizeGuideModal = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!sizeGuideOpen) return null;

  const measurementsInches = [
    { size: 'XS', bust: '32 - 34', waist: '24 - 26', hips: '34 - 36', us: '0 - 2', uk: '4 - 6', eu: '32 - 34', it: '38' },
    { size: 'S', bust: '34 - 36', waist: '26 - 28', hips: '36 - 38', us: '4 - 6', uk: '8 - 10', eu: '36 - 38', it: '40' },
    { size: 'M', bust: '36 - 38', waist: '28 - 30', hips: '38 - 40', us: '8 - 10', uk: '12 - 14', eu: '40 - 42', it: '42' },
    { size: 'L', bust: '38 - 41', waist: '30 - 33', hips: '40 - 43', us: '12 - 14', uk: '16 - 18', eu: '44 - 46', it: '44' },
    { size: 'XL', bust: '41 - 44', waist: '33 - 36', hips: '43 - 46', us: '16', uk: '20', eu: '48', it: '46' },
  ];

  const measurementsCm = [
    { size: 'XS', bust: '81 - 86', waist: '61 - 66', hips: '86 - 91', us: '0 - 2', uk: '4 - 6', eu: '32 - 34', it: '38' },
    { size: 'S', bust: '86 - 91', waist: '66 - 71', hips: '91 - 96', us: '4 - 6', uk: '8 - 10', eu: '36 - 38', it: '40' },
    { size: 'M', bust: '91 - 96', waist: '71 - 76', hips: '96 - 101', us: '8 - 10', uk: '12 - 14', eu: '40 - 42', it: '42' },
    { size: 'L', bust: '96 - 104', waist: '76 - 84', hips: '101 - 109', us: '12 - 14', uk: '16 - 18', eu: '44 - 46', it: '44' },
    { size: 'XL', bust: '104 - 112', waist: '84 - 91', hips: '109 - 117', us: '16', uk: '20', eu: '48', it: '46' },
  ];

  const tableData = unit === 'in' ? measurementsInches : measurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSizeGuideOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-noir-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
          <Ruler className="w-4 h-4" /> Velora Precision Tailoring Guide
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-noir-950 font-normal mb-2">
          International Size & Measurements
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          All Velora creations are drafted according to classic European haute couture proportions.
        </p>

        {/* Unit Selector */}
        <div className="flex justify-end mb-4">
          <div className="bg-velora-100 p-1 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs uppercase font-semibold rounded transition-colors ${
                unit === 'in' ? 'bg-noir-900 text-white' : 'text-noir-700 hover:text-noir-900'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase font-semibold rounded transition-colors ${
                unit === 'cm' ? 'bg-noir-900 text-white' : 'text-noir-700 hover:text-noir-900'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-velora-100 text-noir-900 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Bust / Chest</th>
                <th className="py-3 px-3">Waist</th>
                <th className="py-3 px-3">Hips</th>
                <th className="py-3 px-3">US</th>
                <th className="py-3 px-3">UK</th>
                <th className="py-3 px-3">EU</th>
                <th className="py-3 px-3">IT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {tableData.map((row) => (
                <tr key={row.size} className="hover:bg-velora-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-noir-950">{row.size}</td>
                  <td className="py-3 px-3">{row.bust} {unit}</td>
                  <td className="py-3 px-3">{row.waist} {unit}</td>
                  <td className="py-3 px-3">{row.hips} {unit}</td>
                  <td className="py-3 px-3">{row.us}</td>
                  <td className="py-3 px-3">{row.uk}</td>
                  <td className="py-3 px-3">{row.eu}</td>
                  <td className="py-3 px-3">{row.it}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring tips */}
        <div className="bg-velora-50 p-4 rounded-xl border border-velora-200 text-xs text-noir-800 space-y-2">
          <h4 className="font-semibold uppercase tracking-wider text-noir-900 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-gold" /> How to Measure for Haute Couture
          </h4>
          <p className="text-gray-600 font-light leading-relaxed">
            • <strong>Chest / Bust:</strong> Measure around the fullest part of your chest under arms.<br />
            • <strong>Waist:</strong> Measure around natural waistline, keeping tape comfortably loose.<br />
            • <strong>Hips:</strong> Stand with feet together and measure around the widest point.
          </p>
        </div>
      </div>
    </div>
  );
};
