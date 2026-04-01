const fs = require('fs');
const path = require('path');

function replaceBlurs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace blur blobs with radial gradients
  content = content.replace(/bg-([a-zA-Z0-9#\[\]]+)\/([0-9]+) blur-\[[0-9]+px\](.*?)group-hover:bg-([a-zA-Z0-9#\[\]]+)\/([0-9]+)/g, 
    "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-$1/$2 to-transparent$3group-hover:from-$4/$5");

  // Fix stand-alone blurs like `bg-emerald-500/5 blur-[120px]` in pricing-section.tsx
  content = content.replace(/bg-([a-zA-Z0-9#\[\]]+)\/([0-9]+) blur-\[[0-9]+px\](?!.*?group-hover)/gi,
    "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-$1/$2 to-transparent");

  // Remove heavy backdrop-blur filters
  content = content.replace(/backdrop-blur-([a-z]+)/g, "");

  fs.writeFileSync(filePath, content);
  console.log('Fixed', path.basename(filePath));
}

replaceBlurs('src/components/ui/modules-grid.tsx');
replaceBlurs('src/components/ui/pricing-section.tsx');
