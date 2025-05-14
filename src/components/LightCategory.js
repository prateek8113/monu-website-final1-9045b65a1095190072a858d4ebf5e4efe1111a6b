import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardCover from '@mui/joy/CardCover';
import Footer from "./Footer";
import Navbar from './Navbar';

const lightingCategories = [
  {
    title: 'LED Bulbs',
    image: '/images/panasonic-led.png',
    path: 'ledbulbs',
  },
  {
    title: 'LED Batten',
    image: '/images/ledbatten.png',
    path: 'ledbatten',
  },
  {
    title: 'LED Panel',
    image: '/images/havells-trim-nxt-round.png',
    path: 'ledpanel',
  },
  {
    title: 'Spot Light',
    image: '/images/surya-prime-spot.png',
    path: 'spotlight',
  },
];

const LightCategory = () => {
  return (
    <>
    <Navbar/>
      <Box sx={{ px: 0, py: 5 }}>
        <Typography level="h2" textAlign="center" sx={{ mb: 4 }}>
          Lighting Categories
        </Typography>

        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            listStyle: 'none',
            p: 0,
          }}
        >
          {lightingCategories.map((cat, index) => (
            <Link
              to={`/services/1/${cat.path}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <Card
                component="li"
                sx={{
                  width: 260,
                  height: 300,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardCover>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </CardCover>
                <CardContent sx={{
                 position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    opacity: 1,
                     
                }}>
                  <Typography level="h4" textAlign="center" textColor="black">
                    {cat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>

      </Box>
      <Footer />
    </>

  );
};

export default LightCategory;
