import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardCover from '@mui/joy/CardCover';

const lightingCategories = [
  {
    title: 'LED Bulbs',
    image: '/images/led.jpg',
    path: 'ledbulbs',
  },
  {
    title: 'LED Batten',
    image: '/images/decorative.jpg',
    path: 'ledbatten',
  },
  {
    title: 'LED Panel',
    image: '/images/outdoor.jpg',
    path: 'ledpanel',
  },
  {
    title: 'Spot Light',
    image: '/images/smart.jpg',
    path: 'spotlight',
  },
];

const LightCategory = () => {
  return (
    <Box sx={{ px: 2, py: 5 }}>
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
              <CardContent sx={{ mt: 'auto', background: 'rgba(255,255,255,0.8)' }}>
                <Typography level="h4" textAlign="center" textColor="black">
                  {cat.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default LightCategory;
