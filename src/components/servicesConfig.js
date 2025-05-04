// servicesConfig.js
export const servicesConfig = {
    // List of service IDs that use the brand selection feature
    servicesWithBrands: ['1', '3', '5'], // Add any service IDs that need brand selection
    
    // Service information
    services: {
      '1': {         title: 'Service 1', 
        description: 'Description for Service 1',
        image: '/images/services/service1.jpg'
      },
      '2': { 
        title: 'Service 2', 
        description: 'Description for Service 2',
        image: '/images/services/service2.jpg'
      },
      '3': { 
        title: 'Service 3', 
        description: 'Description for Service 3',
        image: '/images/services/service3.jpg'
      },
      // Add more services as needed
    },
    
    // Brands organized by service
    brandsByService: {
      '1': [
        {
          id: 'ledpannel',
          name: 'ledpannel',
          logo: '/images/brands/brand1-logo.png',
        },
        {
          id: 'brand2',
          name: 'Brand 2 for Service 1',
          logo: '/images/brands/brand2-logo.png',
        },
      ],
      '3': [
        {
          id: 'havells',
          name: 'Havells',
          logo: '/images/havells-logo.png',
        },
        {
          id: 'anchor',
          name: 'Anchor Penta',
          logo: '',
        },
      ],
      '5': [
        // Add brands for service 5 if needed
      ],
      // Add more service-brand mappings as needed
    }
  };