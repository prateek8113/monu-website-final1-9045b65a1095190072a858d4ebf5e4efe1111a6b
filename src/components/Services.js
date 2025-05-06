import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { services } from './productCatlog';

const Services = () => {
  return (
    <Box sx={{ px: 1, py: 5 }}>
      <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Our Services
      </Typography>
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          listStyle: 'none',
          maxWidth: '100%', 
        }}
      >
        {services.map((service, index) => {
          // Special routing for the 4th service (index 3)
          const linkTo = index === 3 ? `/services/${index}/brands` : `/services/${index}`;
          
          return (
            <Link
              to={linkTo} 
              key={index}
              style={{
                textDecoration: 'none',
                minWidth: 300,
                maxWidth: 340,
                flexGrow: 1,
              }}
            >
              <Card
                component="li"
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  } 
                }}
              >
                <CardCover>
                  {service.type === 'video' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      poster={service.poster || ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={service.image}
                      loading="lazy"
                      alt={service.title}
                      style={{ width: '100%', height: '180px', objectFit: 'fit' }} 
                    />
                  )}
                </CardCover>
                <CardContent sx={{ mt: { xs: 12, sm: 18 } }}>
                  <Typography level="body-lg" textColor="black" sx={{ fontWeight: 'lg' }}>
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Services;