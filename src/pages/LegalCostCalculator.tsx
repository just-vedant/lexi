import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricingModel: 'hourly' | 'fixed' | 'contingency' | 'retainer';
  estimatedHours?: number;
  contingencyPercentage?: number;
  defaultHourlyRate: number;
  retainerFee?: number;
  complexityMultipliers: {
    basic: number;
    moderate: number;
    complex: number;
  };
}

interface CalculatorInputs {
  location: string;
  complexity: 'basic' | 'moderate' | 'complex';
  caseType: string;
  duration: number;
  hourlyRate?: number;
  retainerFee?: number;
  additionalFees: number;
}

const LegalCostCalculator: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [inputs, setInputs] = useState<CalculatorInputs>({
    location: '',
    complexity: 'basic',
    caseType: '',
    duration: 1,
    additionalFees: 0
  });
  const [totalCost, setTotalCost] = useState<number>(0);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const legalServices: Service[] = [
    {
      id: 'divorce',
      name: 'Divorce Lawyer',
      description: 'Legal representation for divorce proceedings',
      basePrice: 50000,
      pricingModel: 'hourly',
      defaultHourlyRate: 5000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.5,
        complex: 2
      }
    },
    {
      id: 'property',
      name: 'Property Lawyer',
      description: 'Property purchase/sale legal services',
      basePrice: 75000,
      pricingModel: 'fixed',
      defaultHourlyRate: 6000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.3,
        complex: 1.7
      }
    },
    {
      id: 'criminal',
      name: 'Criminal Defense Lawyer',
      description: 'Criminal defense representation',
      basePrice: 25000,
      pricingModel: 'retainer',
      defaultHourlyRate: 4000,
      retainerFee: 50000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.4,
        complex: 2
      }
    },
    {
      id: 'personal-injury',
      name: 'Personal Injury Lawyer',
      description: 'Personal injury claim representation',
      basePrice: 0,
      pricingModel: 'contingency',
      defaultHourlyRate: 0,
      contingencyPercentage: 33,
      complexityMultipliers: {
        basic: 1,
        moderate: 1,
        complex: 1
      }
    },
    {
      id: 'immigration',
      name: 'Immigration Lawyer',
      description: 'Immigration legal services',
      basePrice: 100000,
      pricingModel: 'fixed',
      defaultHourlyRate: 8000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.3,
        complex: 1.6
      }
    },
    {
      id: 'family',
      name: 'Family Lawyer',
      description: 'Family law representation',
      basePrice: 40000,
      pricingModel: 'hourly',
      defaultHourlyRate: 4000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.4,
        complex: 1.8
      }
    },
    {
      id: 'business',
      name: 'Business/Corporate Lawyer',
      description: 'Business and corporate legal services',
      basePrice: 100000,
      pricingModel: 'hourly',
      defaultHourlyRate: 8000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.5,
        complex: 2
      }
    },
    {
      id: 'employment',
      name: 'Employment Lawyer',
      description: 'Employment law representation',
      basePrice: 50000,
      pricingModel: 'hourly',
      defaultHourlyRate: 5000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.4,
        complex: 1.8
      }
    },
    {
      id: 'tax',
      name: 'Tax Lawyer',
      description: 'Tax law services',
      basePrice: 75000,
      pricingModel: 'hourly',
      defaultHourlyRate: 6000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.5,
        complex: 2
      }
    },
    {
      id: 'ip',
      name: 'Intellectual Property Lawyer',
      description: 'IP law services',
      basePrice: 100000,
      pricingModel: 'hourly',
      defaultHourlyRate: 8000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.4,
        complex: 1.8
      }
    },
    {
      id: 'environmental',
      name: 'Environmental Lawyer',
      description: 'Environmental law services',
      basePrice: 75000,
      pricingModel: 'hourly',
      defaultHourlyRate: 6000,
      complexityMultipliers: {
        basic: 1,
        moderate: 1.5,
        complex: 2
      }
    },
    {
      id: 'civil-rights',
      name: 'Civil Rights Lawyer',
      description: 'Civil rights representation',
      basePrice: 0,
      pricingModel: 'contingency',
      defaultHourlyRate: 0,
      contingencyPercentage: 40,
      complexityMultipliers: {
        basic: 1,
        moderate: 1,
        complex: 1
      }
    }
  ];

  const caseTypes = {
    divorce: ['Contested', 'Uncontested', 'Collaborative', 'Mediation'],
    property: ['Residential Purchase', 'Commercial Purchase', 'Lease Agreement', 'Property Dispute'],
    criminal: ['Misdemeanor', 'Felony', 'DUI', 'White Collar'],
    'personal-injury': ['Car Accident', 'Medical Malpractice', 'Workplace Injury', 'Product Liability'],
    immigration: ['Visa Application', 'Green Card', 'Citizenship', 'Deportation Defense'],
    family: ['Child Custody', 'Child Support', 'Adoption', 'Guardianship'],
    business: ['Business Formation', 'Contract Review', 'Mergers & Acquisitions', 'Compliance'],
    employment: ['Discrimination', 'Wrongful Termination', 'Wage Dispute', 'Contract Negotiation'],
    tax: ['Tax Planning', 'Audit Defense', 'Tax Dispute', 'Estate Planning'],
    ip: ['Patent', 'Trademark', 'Copyright', 'Trade Secret'],
    environmental: ['Compliance', 'Permitting', 'Litigation', 'Regulatory'],
    'civil-rights': ['Discrimination', 'Police Misconduct', 'First Amendment', 'Voting Rights']
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCost = () => {
    const service = legalServices.find(s => s.id === selectedService);
    if (!service) return;

    let cost = 0;
    const complexityMultiplier = service.complexityMultipliers[inputs.complexity];
    const hourlyRate = inputs.hourlyRate || service.defaultHourlyRate;

    switch (service.pricingModel) {
      case 'hourly':
        cost = hourlyRate * (inputs.duration * 40) * complexityMultiplier; // Assuming 40 hours per month
        break;
      case 'fixed':
        cost = service.basePrice * complexityMultiplier;
        break;
      case 'contingency':
        cost = 0; // Contingency fees are typically a percentage of the settlement
        break;
      case 'retainer':
        cost = service.retainerFee || 0;
        break;
    }

    // Add additional fees
    cost += inputs.additionalFees;

    setTotalCost(cost);
    setShowBreakdown(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Legal Cost Calculator
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Estimate the cost of your legal services
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Select Legal Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a service</option>
                  {legalServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedService && (
                <>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={inputs.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter city/state"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="complexity" className="block text-sm font-medium text-gray-700">
                      Case Complexity
                    </label>
                    <select
                      id="complexity"
                      value={inputs.complexity}
                      onChange={(e) => handleInputChange('complexity', e.target.value as 'basic' | 'moderate' | 'complex')}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="basic">Basic</option>
                      <option value="moderate">Moderate</option>
                      <option value="complex">Complex</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="caseType" className="block text-sm font-medium text-gray-700">
                      Type of Case
                    </label>
                    <select
                      id="caseType"
                      value={inputs.caseType}
                      onChange={(e) => handleInputChange('caseType', e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select case type</option>
                      {caseTypes[selectedService as keyof typeof caseTypes]?.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Estimated Duration (months)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={inputs.duration}
                      onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {legalServices.find(s => s.id === selectedService)?.pricingModel === 'hourly' && (
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                        Hourly Rate (optional)
                      </label>
                      <input
                        type="number"
                        id="hourlyRate"
                        value={inputs.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', Number(e.target.value))}
                        placeholder={`Default: ₹${legalServices.find(s => s.id === selectedService)?.defaultHourlyRate}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="additionalFees" className="block text-sm font-medium text-gray-700">
                      Additional Fees (court, filing, etc.)
                    </label>
                    <input
                      type="number"
                      id="additionalFees"
                      value={inputs.additionalFees}
                      onChange={(e) => handleInputChange('additionalFees', Number(e.target.value))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <button
                  onClick={calculateCost}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Calculate Cost
                </button>
              </div>

              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gray-50 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-gray-900">Cost Breakdown</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      Selected Service: {legalServices.find(s => s.id === selectedService)?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Location: {inputs.location || 'Not specified'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Complexity: {inputs.complexity.charAt(0).toUpperCase() + inputs.complexity.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Case Type: {inputs.caseType || 'Not specified'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {inputs.duration} months
                    </p>
                    {legalServices.find(s => s.id === selectedService)?.pricingModel === 'hourly' && (
                      <p className="text-sm text-gray-500">
                        Hourly Rate: ₹{inputs.hourlyRate || legalServices.find(s => s.id === selectedService)?.defaultHourlyRate}
                      </p>
                    )}
                    {inputs.additionalFees > 0 && (
                      <p className="text-sm text-gray-500">
                        Additional Fees: ₹{inputs.additionalFees}
                      </p>
                    )}
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      Estimated Total: ₹{totalCost.toLocaleString()}
                    </p>
                    {legalServices.find(s => s.id === selectedService)?.pricingModel === 'contingency' && (
                      <p className="text-sm text-gray-500 mt-2">
                        Note: This is a contingency fee case. The lawyer will take {legalServices.find(s => s.id === selectedService)?.contingencyPercentage}% of the settlement amount.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCostCalculator;