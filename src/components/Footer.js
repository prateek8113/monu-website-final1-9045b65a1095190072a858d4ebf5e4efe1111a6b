import React from "react";
import { Box, Grid, Stack, Typography, Divider } from "@mui/joy";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "neutral.900", color: "white", py: 5, px: 2 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Grid item xs={12} md={3} textAlign={{ xs: "center", md: "left" }}>
          <Box
            component="img"
            src="/images/Monu-logo.svg"
            alt="Monu Logo"
            sx={{
              maxWidth: { xs: 160, md: 280 },
              width: "100%",
              height: "auto",
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>

        {/* Product List */}
        <Grid item xs={12} md={3} textAlign={{ xs: "center", md: "left" }}>
          <Typography color="white" level="h4" mb={2}>
            Our Products
          </Typography>
          <Stack spacing={1}>
            <Link to="/services/0" style={{ color: 'white', textDecoration: 'none' }}>Chandeliers</Link>
            <Link to="/services/2" style={{ color: 'white', textDecoration: 'none' }}>Fans</Link>
            <Link to="/services/5" style={{ color: 'white', textDecoration: 'none' }}>Coolers</Link>
            <Link to="/services/6" style={{ color: 'white', textDecoration: 'none' }}>Exhaust Fans</Link>
          </Stack>
        </Grid>

        {/* Contact Info */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography level="h4" mb={2} color="white">
            Contact Us
          </Typography>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Phone color="skyblue" />
              <Typography color="white">9810468106, 9213684115</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Mail color="skyblue" />
              <Typography color="white">monuelectricals@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: "" }}>
              <MapPin color="skyblue" />
              <Typography color="white">
                Head Office: Sec-10, Vasundhara, Ghaziabad<br />
                Branch Office: Plot No-10, Govind Vihar II, Govindpuram, Ghaziabad
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Divider sx={{ my: 4, borderColor: "neutral.400" }} />
      <Typography level="body-sm" textAlign="center" color="neutral.400">
        © {new Date().getFullYear()} Monu Electricals. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;