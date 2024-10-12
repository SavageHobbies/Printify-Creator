import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MockupTemplateSelectionProps {
  product: string;
  onSelect: (templates: string[]) => void;
}

const mockupTemplates = {
  'Men\'s Crew Neck': [
    { id: 't1', name: 'Front View', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 't2', name: 'Back View', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 't3', name: 'Folded', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ],
  'Classic Mug': [
    { id: 'm1', name: 'Front View', image: 'https://images.unsplash.com/photo-1577937927133-66ef87ce9e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 'm2', name: 'Angled View', image: 'https://images.unsplash.com/photo-1577937927133-66ef87ce9e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 'm3', name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1577937927133-66ef87ce9e97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ],
};

const MockupTemplateSelection: React.FC<MockupTemplateSelectionProps> = ({ product, onSelect }) => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId].slice(0, 10)
    );
  };

  const handleSubmit = () => {
    onSelect(selectedTemplates);
  };

  const templates = mockupTemplates[product as keyof typeof mockupTemplates] || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Mockup Templates</h2>
      <p className="mb-4 text-gray-600">Choose up to 10 mockup templates for your {product}.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden ${
              selectedTemplates.includes(template.id) ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => toggleTemplate(template.id)}
          >
            <img src={template.image} alt={template.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white text-center font-semibold">{template.name}</p>
            </div>
            {selectedTemplates.includes(template.id) && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedTemplates.length === 0}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue with {selectedTemplates.length} selected template{selectedTemplates.length !== 1 ? 's' : ''}
      </button>
    </div>
  );
};

export default MockupTemplateSelection;