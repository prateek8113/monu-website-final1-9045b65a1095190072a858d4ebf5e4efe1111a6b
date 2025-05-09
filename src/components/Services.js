import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { services } from './productCatlog';
import useMediaQuery from '@mui/material/useMediaQuery';

const Services = () => {
  // Check if screen is mobile size
  const isMobile = useMediaQuery('(max-width:767px)');
  
  // Create pairs of services for mobile view
  const servicePairs = React.useMemo(() => {
    if (!isMobile) return [services]; // Return all services in one array for desktop
    
    // For mobile, create pairs of services
    const pairs = [];
    for (let i = 0; i < services.length; i += 2) {
      pairs.push(services.slice(i, i + 2));
    }
    return pairs;
  }, [isMobile]);

  return (
    <Box sx={{ px: 1, py: 5 }}>
      <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Our Services
      </Typography>
      
      {isMobile ? (
        // Mobile layout - render in pairs
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {servicePairs.map((pair, pairIndex) => (
            <Box
              key={`pair-${pairIndex}`}
              component="ul"
              sx={{
                display: 'flex',
                flexWrap: 'nowrap', // Prevent wrapping within a pair
                gap: 2,
                justifyContent: 'center',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {pair.map((service, index) => {
                const serviceIndex = pairIndex * 2 + index;
                const linkTo = serviceIndex === 3 ? `/services/${serviceIndex}/brands` : `/services/${serviceIndex}`;
                
                return (
                  <Link
                    to={linkTo}
                    key={serviceIndex}
                    style={{
                      textDecoration: 'none',
                      width: 'calc(50% - 8px)', // 50% width minus half the gap
                      flexShrink: 0,
                      // Fixed dimensions for mobile view
                      maxWidth: '160px',
                      minWidth: '140px',
                    }}
                  >
                    <ServiceCard service={service} />
                  </Link>
                );
              })}
            </Box>
          ))}
        </Box>
      ) : (
        // Desktop layout - 2 rows with reduced column gap
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(2, auto)', // Two rows
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Dynamic columns
            gridAutoFlow: 'column', // Fill columns first
            rowGap: 2, // Row gap
            columnGap: 0.2, // Reduced column gap
            justifyItems: 'center',
            listStyle: 'none',
            maxWidth: '100%',
            padding: 0,
            margin: 0,
          }}
        >
          {services.map((service, index) => {
            const linkTo = index === 3 ? `/services/${index}/brands` : `/services/${index}`;
            
            return (
              <Link
                to={linkTo}
                key={index}
                style={{
                  textDecoration: 'none',
                  minWidth: 250,
                  maxWidth: 300,
                  width: '100%',
                  aspectRatio: '1/1',
                }}
              >
                <ServiceCard service={service} />
              </Link>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

// Simplified ServiceCard component with clear separation between image and text
const ServiceCard = ({ service }) => (
  <Card
    component="li"
    sx={{
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.03)'
      },
      display: 'flex',
      flexDirection: 'column',
      aspectRatio: '1/1',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
    }}
  >
    {/* Image Container - 75% of card height */}
    <Box 
      sx={{
        height: '75%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      <img
        src={service.image}
        loading="lazy"
        alt={service.title}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%', 
          objectFit: 'contain' 
        }} 
      />
    </Box>
    
    {/* Text Container - 25% of card height with solid background */}
    <Box 
      sx={{
        height: '25%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 1,
      }}
    >
      <Typography 
        level="body-lg" 
        textColor="black" 
        sx={{ 
          fontWeight: 'lg',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {service.title}
      </Typography>
    </Box>
  </Card>
);

export default Services;