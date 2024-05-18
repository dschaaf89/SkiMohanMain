(async () => {
    const { default: fetch } = await import('node-fetch');
  
    const apiUrl = 'https://ski-mohan-admin.vercel.app/api/3523ea0b-4dc2-4efb-be8d-10e1740d2f63/programs';
  
    console.log('API URL:', apiUrl); // Log the API URL to check if it's correct
  
    const checkAPI = async () => {
      try {
        const res = await fetch(apiUrl);
  
        // Log the response status and headers
        console.log('Response Status:', res.status);
        console.log('Response Headers:', getHeadersObject(res.headers));
  
        if (!res.ok) {
          throw new Error(`Failed to fetch programs with status ${res.status}`);
        }
  
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Expected JSON, but received:', text);
          throw new Error('Received non-JSON response. Possibly a sign-in redirect.');
        }
  
        const data = await res.json();
        console.log('API is accessible and returned data:', data);
      } catch (error) {
        console.error('API check failed:', error);
        process.exit(1); // Exit the process with a non-zero status
      }
    };
  
    // Helper function to convert headers to a plain object
    const getHeadersObject = (headers: any) => {
      const headersObj: { [key: string]: string } = {};
      headers.forEach((value: string, key: string) => {
        headersObj[key] = value;
      });
      return headersObj;
    };
  
    checkAPI();
  })();
  