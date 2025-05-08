import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
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
        // Desktop layout - flexible wrap
        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
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
                  flexGrow: 1,
                  // Maintain aspect ratio for desktop
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

// Extracted ServiceCard component to avoid code duplication
const ServiceCard = ({ service }) => (
  <Card
    component="li"
    sx={{
      boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.03)'
      },
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      // Make the card a square
      aspectRatio: '1/1',
      width: '100%',
    }}
  >
    <CardCover sx={{ 
      position: 'relative', 
      height: '75%', // Give image 75% of card height
    }}>
      {service.type === 'video' ? (
        <video
          autoPlay
          loop
          muted
          poster={service.poster || ''}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', // Changed to cover to maintain square aspect
          }}
        >
          <source src={service.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={service.image}
          loading="lazy"
          alt={service.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }} 
        />
      )}
    </CardCover>
    <CardContent sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      height: '25%', // Give text 25% of card height
    }}>
      <Typography level="body-lg" textColor="black" sx={{ fontWeight: 'lg' }}>
        {service.title}
      </Typography>
    </CardContent>
  </Card>
);

export default Services;