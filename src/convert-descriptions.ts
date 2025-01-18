// migrations/convert-descriptions.ts
import { Payload } from 'payload';

interface LexicalNode {
  type: string;
  children?: LexicalTextNode[];
}

interface LexicalTextNode {
  text: string;
  type?: string;
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
  };
}

export async function convertDescriptions(payload: Payload) {
  try {
    console.log('Starting description conversion...');
    
    const { docs: products } = await payload.find({
      collection: 'products',
      limit: 1000,
    });

    console.log(`Found ${products.length} products to process`);

    for (const product of products) {
      const description = product.description as LexicalContent;
      if (description?.root?.children) {
        console.log(`Converting description for product: ${product.name}`);
        
        try {
          let html = '';
          description.root.children.forEach((node: LexicalNode) => {
            if (node.type === 'paragraph' && node.children) {
              const text = node.children
                .map((child: LexicalTextNode) => child.text || '')
                .join('');
              html += `<p>${text}</p>`;
            }
          });
          
          await payload.update({
            collection: 'products',
            id: product.id,
            data: {
              description_html: html,
            },
          });
          
          console.log(`Successfully updated product: ${product.name}`);
        } catch (error) {
          console.error(`Error updating product ${product.name}:`, error);
        }
      }
    }

    console.log('Finished converting descriptions');
  } catch (error) {
    console.error('Error in conversion script:', error);
  }
}