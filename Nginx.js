// ---------------NEVER MAKE YOUR PRODUCTION CONFIGURATION PUBLIC--------------- //
// change the server block for enhanced security, this would work for most people.
// ensure your servers are also properly secured to reduce proxy vulnerabilities.
const fs = require('fs');
function generateServerBlock(projectName, frontendPort, backend, subdomain, reverseProxyDomain) {
  let serverBlock = `
#  ----------   ~@@@   ${projectName}   @@@~  ----------   #
server {
    listen 80;
    listen [::]:80;
    server_name ${subdomain}.${reverseProxyDomain};

`;

  if (backend !== null) {
    serverBlock += `
    location /ep {
        proxy_pass http://localhost:${backend.port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

`;
  }

  serverBlock += `
    location / {
        proxy_pass http://localhost:${frontendPort};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

`;

  return serverBlock;
}

function generateNginxConfig(config) {
  const reverseProxyDomain = config.reverseProxy.domainName;
  let serverBlocks = '';
  for (const [project, projectData] of Object.entries(config.projects)) {
    serverBlocks += generateServerBlock(project, projectData.port, projectData.backend, projectData.subdomain, reverseProxyDomain);
  }

  return serverBlocks;
}

fs.readFile('Projects/config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading config.json:', err);
    return;
  }

  const config = JSON.parse(data);
  const nginxConfig = generateNginxConfig(config);

  const finalConfig = `
${nginxConfig}
`;
  fs.writeFile('default', finalConfig, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to default:', writeErr);
      return;
    }

    console.log('File default generated successfully.');
  });
});
