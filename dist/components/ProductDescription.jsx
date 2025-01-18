import React from 'react';
import '@/components/richtext-component.css'; // Import the CSS file here
var ProductDescription = function (_a) {
    var descriptionHtml = _a.descriptionHtml;
    return (<div className="max-w-2xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} className="rich-text-content prose prose-headings:mb-3 prose-p:mb-2"/>
    </div>);
};
export default ProductDescription;
