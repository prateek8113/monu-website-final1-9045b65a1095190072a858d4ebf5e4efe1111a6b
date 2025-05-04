import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/joy';
import { Link } from 'react-router-dom';

const lightSubcategories = [
  { id: 'led-bulbs', title: 'LED Bulbs', image: '/images/led-bulb.png' },
  { id: 'tube-lights', title: 'Tube Lights', image: '/images/tube-light.png' },
  { id: 'led-panels', title: 'LED Panels', image: '/images/led-panel.png' },
  { id: 'decorative-lights', title: 'Decorative Lights', image: '/images/decorative-light.png' },
];

const LightCategories = () => {
  return (
    <Box sx={{ px: 2, py: 5 }}>
      <Typography level="h3" sx={{ textAlign: 'center', mb: 4 }}>
        Light Categories
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {lightSubcategories.map((cat, i) => (
          <Link
            to={`/services/1/categories/${cat.id}`}
            key={cat.id || i}
            style={{ textDecoration: 'none' }}
          >
            <Card sx={{ width: 250, textAlign: 'center' }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{ height: 160, objectFit: 'contain', width: '100%' }}
              />
              <CardContent>
                <Typography level="title-md">{cat.title}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default LightCategories;
