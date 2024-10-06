"use client";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'; // Use ListItemButton for button behavior
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Image from 'next/image';
import NavbarActions from '../navbar-actions';

// Data for various sections
const generalLessons = [
  { title: 'Saturday', href: '/generallessons/saturday' },
  { title: 'Sunday', href: '/generallessons/sunday' },
  { title: 'Private Lessons', href: '/generallessons/private-lessons' },
  { title: 'Seniors', href: '/generallessons/seniors' },
  { title: 'Thursday Board', href: '/generallessons/thursday-board' },
];

const schoolPrograms = [
  { title: 'Eastside Catholic Snow Sports', href: '/school-programs/eastside-catholic' },
  { title: 'Ballard Snow Sports', href: '/school-programs/ballard' },
  { title: 'Interlake Ave Snow Sports', href: '/school-programs/interlake' },
  { title: 'Meadowbrook Snow Sports', href: '/school-programs/meadowbrook' },
  { title: 'Northeast Seattle Snow Sports', href: '/school-programs/northeast-seattle' },
  { title: 'Roosevelt Snow Sports', href: '/school-programs/roosevelt' },
  { title: 'Soundview Snow Sports', href: '/school-programs/soundview' },
  { title: 'Thornton Creek Snow Sports', href: '/school-programs/thornton-creek' },
  { title: 'Wallingford Snow Sports', href: '/school-programs/wallingford' },
  { title: 'South Jackson Snow Sports', href: '/school-programs/south-jackson' },
  { title: 'Salmon Bay Snow Sports', href: '/school-programs/salmon-bay' },
];

const resources = [
  { title: 'Arrival Video', href: '/resources/arrival-video' },
  { title: 'Equipment Guide', href: '/resources/equipmentguide' },
  { title: 'Lift Tickets', href: '/resources/lifttickets' },
  { title: 'Health Expectations', href: '/resources/healthexpectations' },
  { title: 'Risk and Liability Release', href: '/resources/liabilityrelease' },
  { title: 'Maria Jose Scholarship', href: '/resources/maria-jose-scholarship' },
  { title: 'Operation and Refund Policy', href: '/resources/operationrefundpolicy' },
  { title: 'Pins and Ribbons', href: '/resources/pinsribbons' },
  { title: 'FAQ\'s', href: '/resources/faq' },
];

const staff = [
  { title: 'Instructor', href: '/staff/instructor' },
  { title: 'Assistant', href: '/staff/assistant' },
  { title: 'Volunteer', href: '/staff/volunteer' },
  { title: 'Ski Term Glossary', href: '/staff/ski-term-glossary' },
];

const aboutUs = [
  { title: 'Be A Part Of Our Team', href: '/staff' },
  { title: 'Company Profile', href: '/aboutus/company-profile' },
  { title: 'Our Mission', href: '/aboutus/our-mission' },
  { title: 'Founders and Past Leaders', href: '/aboutus/our-leadership' },
  { title: 'Today\'s Leadership', href: '/aboutus/todays-leadership' },
];

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [openGeneralLessons, setOpenGeneralLessons] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openSchoolPrograms, setOpenSchoolPrograms] = useState(false); // New state for School Programs

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCollapseToggle = (menu: string) => {
    if (menu === 'generalLessons') {
      setOpenGeneralLessons(!openGeneralLessons);
    } else if (menu === 'resources') {
      setOpenResources(!openResources);
    } else if (menu === 'staff') {
      setOpenStaff(!openStaff);
    } else if (menu === 'aboutUs') {
      setOpenAboutUs(!openAboutUs);
    } else if (menu === 'schoolPrograms') {
      setOpenSchoolPrograms(!openSchoolPrograms);  // Handle School Programs state
    }
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 'none', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Link href="/" passHref legacyBehavior>
              <a>
                <Box sx={{ display: 'flex', alignItems: 'center', width: 100, height: 100 }}>
                  <Image
                    src="/ski_mohan_logo.png"  // Ensure this image is in your public directory
                    alt="Ski Mohan Logo"
                    width={100}
                    height={100}
                    priority
                  />
                </Box>
              </a>
            </Link>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Link href="/" passHref legacyBehavior>
              <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                Home
              </Button>
            </Link>

            <Button onMouseEnter={(e) => handlePopoverOpen(e, 'generalLessons')} sx={{ my: 2, color: 'black', display: 'block' }}>
              General Lessons
            </Button>

            <Button onMouseEnter={(e) => handlePopoverOpen(e, 'schoolPrograms')} sx={{ my: 2, color: 'black', display: 'block' }}>
              School Programs
            </Button>

            <Button onMouseEnter={(e) => handlePopoverOpen(e, 'resources')} sx={{ my: 2, color: 'black', display: 'block' }}>
              Resources
            </Button>

            <Button onMouseEnter={(e) => handlePopoverOpen(e, 'staff')} sx={{ my: 2, color: 'black', display: 'block' }}>
              Staff
            </Button>

            <Button onMouseEnter={(e) => handlePopoverOpen(e, 'aboutUs')} sx={{ my: 2, color: 'black', display: 'block' }}>
              About Us
            </Button>

            <Link href="/contactUs" passHref legacyBehavior>
              <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                Contact Us
              </Button>
            </Link>
          </Box>

          {/* Mobile Menu (Hamburger Icon) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {/* Home Link */}
                <ListItemButton component="a">
                  <Link href="/" passHref legacyBehavior>
                    <Button sx={{ my: 2, color: 'black', display: 'block' }}>Home</Button>
                  </Link>
                </ListItemButton>

                {/* General Lessons - Collapsible */}
                <ListItemButton component="div" onClick={() => handleCollapseToggle('generalLessons')}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                    General Lessons
                    {openGeneralLessons ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItemButton>
                <Collapse in={openGeneralLessons} timeout="auto" unmountOnExit>
                  {generalLessons.map((item) => (
                    <ListItemButton key={item.title} component="a" sx={{ pl: 4 }}>
                      <Link href={item.href} passHref legacyBehavior>
                        <Button sx={{ my: 2, color: 'black', display: 'block' }}>{item.title}</Button>
                      </Link>
                    </ListItemButton>
                  ))}
                </Collapse>

                {/* School Programs - Collapsible */}
                <ListItemButton component="div" onClick={() => handleCollapseToggle('schoolPrograms')}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                    School Programs
                    {openSchoolPrograms ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItemButton>
                <Collapse in={openSchoolPrograms} timeout="auto" unmountOnExit>
                  {schoolPrograms.map((item) => (
                    <ListItemButton key={item.title} component="a" sx={{ pl: 4 }}>
                      <Link href={item.href} passHref legacyBehavior>
                        <Button sx={{ my: 2, color: 'black', display: 'block' }}>{item.title}</Button>
                      </Link>
                    </ListItemButton>
                  ))}
                </Collapse>

                {/* Resources - Collapsible */}
                <ListItemButton component="div" onClick={() => handleCollapseToggle('resources')}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                    Resources
                    {openResources ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItemButton>
                <Collapse in={openResources} timeout="auto" unmountOnExit>
                  {resources.map((item) => (
                    <ListItemButton key={item.title} component="a" sx={{ pl: 4 }}>
                      <Link href={item.href} passHref legacyBehavior>
                        <Button sx={{ my: 2, color: 'black', display: 'block' }}>{item.title}</Button>
                      </Link>
                    </ListItemButton>
                  ))}
                </Collapse>

                {/* Staff - Collapsible */}
                <ListItemButton component="div" onClick={() => handleCollapseToggle('staff')}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                    Staff
                    {openStaff ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItemButton>
                <Collapse in={openStaff} timeout="auto" unmountOnExit>
                  {staff.map((item) => (
                    <ListItemButton key={item.title} component="a" sx={{ pl: 4 }}>
                      <Link href={item.href} passHref legacyBehavior>
                        <Button sx={{ my: 2, color: 'black', display: 'block' }}>{item.title}</Button>
                      </Link>
                    </ListItemButton>
                  ))}
                </Collapse>

                {/* About Us - Collapsible */}
                <ListItemButton component="div" onClick={() => handleCollapseToggle('aboutUs')}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                    About Us
                    {openAboutUs ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </ListItemButton>
                <Collapse in={openAboutUs} timeout="auto" unmountOnExit>
                  {aboutUs.map((item) => (
                    <ListItemButton key={item.title} component="a" sx={{ pl: 4 }}>
                      <Link href={item.href} passHref legacyBehavior>
                        <Button sx={{ my: 2, color: 'black', display: 'block' }}>{item.title}</Button>
                      </Link>
                    </ListItemButton>
                  ))}
                </Collapse>

                {/* Contact Us */}
                <ListItemButton component="a">
                  <Link href="/contactUs" passHref legacyBehavior>
                    <Button sx={{ my: 2, color: 'black', display: 'block' }}>Contact Us</Button>
                  </Link>
                </ListItemButton>
              </List>
            </Drawer>
          </Box>

          {/* NavbarActions (e.g., cart, social media) */}
          <NavbarActions />
        </Toolbar>
      </Container>

      {/* Popover for Hover Menus */}
      <Popover
  id="menu-popover"
  open={open}
  anchorEl={anchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  disableRestoreFocus
  slotProps={{
    paper: {
      onMouseEnter: () => setAnchorEl(anchorEl),
      onMouseLeave: handlePopoverClose,
      style: {
        width: '300px',  // Increase the width to fit the long names
        pointerEvents: 'all',
      },
    },
  }}
>
  <Box p={2}>
    {(menuType === 'generalLessons' ? generalLessons :
      menuType === 'schoolPrograms' ? schoolPrograms :
      menuType === 'resources' ? resources :
      menuType === 'staff' ? staff :
      menuType === 'aboutUs' ? aboutUs : []
    ).map((item) => (
      <MenuItem key={item.title} onClick={handlePopoverClose}>
        <Link href={item.href} passHref legacyBehavior>
          <Typography textAlign="center">{item.title}</Typography>
        </Link>
      </MenuItem>
    ))}
  </Box>
</Popover>
    </AppBar>
  );
}

export default ResponsiveAppBar;
