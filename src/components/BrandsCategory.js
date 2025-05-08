import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Navbar from './Navbar';
import Footer from "./Footer";

const brandsList = [
  {
    id: 'havells',
    name: 'Havells',
    logo: '/images/havells-logo.png',
  },
  {
    id: 'anchor',
    name: 'Anchor Penta',
    logo: '/images/brands/crompton-logo.png',
  },
  
  // Add more brands as needed
];

const BrandsCategory = () => {

  const serviceId = '3';

  return (
    <>
      <Navbar className="Navbar-fixed-top" />
      <Box sx={{ px: 1, py: 5 }}>
        <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
          Select a Brand
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
            p: 0,
          }}
        >
          {brandsList.map((brand) => (
            <Link
              to={`/services/${serviceId}/brands/${brand.id}`}
              key={brand.id}
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
                  <img
                    src={brand.logo}
                    loading="lazy"
                    alt={brand.name}
                    style={{ width: '100%', height: '180px', objectFit: 'contain' }} 
                  />
                </CardCover>
                <CardContent sx={{ mt: { xs: 12, sm: 18 } }}>
                  <Typography level="body-lg" textColor="black" sx={{ fontWeight: 'lg' }}>
                    {brand.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
      <Footer/>
    </>
  );
};

export default BrandsCategory;