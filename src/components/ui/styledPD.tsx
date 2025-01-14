import React from 'react';

interface StyledProductDescriptionProps {
  descriptionHtml: string;
}

const StyledProductDescription: React.FC<StyledProductDescriptionProps> = ({ descriptionHtml }) => {
  // Add null/undefined check and ensure it's a string
  const safeHtml = typeof descriptionHtml === 'string' ? descriptionHtml : '';
  
  return (
    <div className="relative p-6 rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'radial-gradient(circle, rgba(245, 245, 245, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
          boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.6)',
        }}
        aria-hidden="true"
      ></div>
      <div
        className="relative prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={safeHtml ? { __html: safeHtml } : { __html: '' }}
      />
    </div>
  );
};

export default StyledProductDescription;