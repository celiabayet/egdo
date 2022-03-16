import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, Typography, Box, Grid } from '@mui/material';

import SportCard from './SportCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function StudentTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ width: '100%' }}  >
      <Box sx={{ maxWidth: 610, bgcolor: 'background.paper', display: "flex", justifyContent: "center", marginLeft: 'auto', marginRight: 'auto' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="7-11 ans" {...a11yProps(0)} />
          <Tab label="12-13 ans" {...a11yProps(1)} />
          <Tab label="14-15 ans" {...a11yProps(2)} />
          <Tab label="16 ans et +" {...a11yProps(3)} />
          <Tab label="Féminines" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>

        <Grid container xs={12} justifyContent='center' style={{ width: '100%' }}>

          <SportCard
            terrain='Gymnase Doudeauville'
            adress='82, rue Doudeauville'
            city='75018 Paris'
            img='u9'
            category={[{ cat: '7 ans', trainingDays: [{ day: 'Mercredi', hour: '16h15' }] }, { cat: '8 ans', trainingDays: [{ day: 'Mercredi', hour: '17h15' }] }, { cat: '9 ans', trainingDays: [{ day: 'Mercredi', hour: '18h15' }] }]}
            coaches={['Chafai_Aitsaid-U7_U8_U14_U15', 'Mendy_Jacques-U9...U13_U1_U2', 'Nasser_Hamici-U8_U9_U12f_U13f_U14...U17f', 'Ozdemir_Kaan-U8_U9_U10']}
          />

          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='u10'
            category={[{ cat: '10 / 11 ans', trainingDays: [{ day: 'Mercredi', hour: '16h00' }] }]}
            coaches={['Bangaly_Souare-U10_U11', 'Diabi_Kone-U10_U11', 'Ozdemir_Kaan-U8_U9_U10']}
          />

        </Grid>

      </TabPanel>

      <TabPanel value={value} index={1}>

        <Grid container justifyContent='center'>
          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='u12-u13'
            category={[{ cat: '12 ans', trainingDays: [{ day: 'Mardi', hour: 'de 17h45 à 19h15' }, { day: 'Mercredi', hour: 'de 17h30 à 19h15' }] }, { cat: '13 ans', trainingDays: [{ day: 'Mardi & Jeudi', hour: 'de 17h45 à 19h15' }, { day: 'Mercredi', hour: 'de 17h30 à 19h15' }] }]}
            coaches={['Elyte_Agamah-U12...U15_U1_U2', 'Mendy_Jacques-U9...U13_U1_U2']}
          />
        </Grid>

      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container justifyContent='center'>
          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='u14-u15'
            category={[{ cat: '14 ans', trainingDays: [{ day: 'Lundi', hour: 'de 17h45 à 19h30' }] }, { cat: '15 ans', trainingDays: [{ day: 'Lundi, Jeudi & Vendredi', hour: 'de 17h45 à 19h30' }] }]}
            coaches={['Chafai_Aitsaid-U7_U8_U14_U15', 'Diawara_Mamadou-U14_U15', 'Elyte_Agamah-U12...U15_U1_U2', 'Nasser_Hamici-U8_U9_U12f_U13f_U14...U17f']}
          />
        </Grid >
      </TabPanel >

      <TabPanel value={value} index={3}>
        <Grid container justifyContent='center'>
          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='u16-17'
            category={[{ cat: '16 ans', trainingDays: [{ day: 'Vendredi', hour: '18h00' }] }, { cat: '17 ans', trainingDays: [{ day: 'Mercredi & Vendredi', hour: 'de 18h30 à 20h30' }] }]}
            coaches={['Nasser_Hamici-U8_U9_U12f_U13f_U14...U17f']}
          />
        </Grid >
      </TabPanel >

      <TabPanel value={value} index={4}>

        <Grid container justifyContent='center'>

          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='u12f'
            category={[{ cat: '12 / 13 ans', trainingDays: [{ day: 'Mardi & Jeudi', hour: 'de 17h45 à 19h30' }] },
            ]}
            coaches={['Elyte_Agamah-U12...U15_U1_U2', 'Nasser_Hamici-U8_U9_U12f_U13f_U14...U17f']}
          />

          <SportCard
            terrain='Stade Porte de la Chapelle'
            adress='56, boulevard de Ney'
            city='75018 Paris'
            img='sectionf'
            category={[{ cat: '15 ans', trainingDays: [{ day: 'Mercredi', hour: 'de 17h30 à 19h30' }] },
            { cat: '16 ans', trainingDays: [{ day: 'Mardi & Jeudi', hour: 'de 17h45 à 19h30' }] }
            ]}
            coaches={['Nasser_Hamici-U8_U9_U12f_U13f_U14...U17f']}
          />

        </Grid>
      </TabPanel>
    </Box >
  );
}

function AdultTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Grid container sx={12} justifyContent='center' >


      <SportCard
        terrain='Stade des Fillettes'
        adress='56, boulevard Ney'
        city='75018 Paris'
        img='senior1'
        category={[{ cat: 'Senior 1', trainingDays: [{ day: 'Mardi & Vendredi', hour: 'de 20h30 à 22h30' }, { day: "Jeudi", hour: 'de 21h à 22h30' }] }]}
        coaches={['Elyte_Agamah-U12...U15_U1_U2', 'Mbounou_Roger-U1_U2', 'Mendy_Jacques-U9...U13_U1_U2']}
      />

      <SportCard
        terrain='Stade des Fillettes'
        adress='56, boulevard Ney'
        city='75018 Paris'
        img='senior2'
        category={[{ cat: 'Senior 2', trainingDays: [{ day: 'Mardi & Vendredi', hour: 'de 20h30 à 22h30' }, { day: "Jeudi", hour: 'de 21h à 22h30' }] }]}
        coaches={['Assoumani_Abdou-U2_Senior', 'Elyte_Agamah-U12...U15_U1_U2', 'Mbounou_Roger-U1_U2', 'Mendy_Jacques-U9...U13_U1_U2']}
      />

      <SportCard
        terrain='Stade Porte de la Chapelle'
        adress='56, boulevard de Ney'
        city='75018 Paris'
        img='senior-f'
        category={[{ cat: 'Senior F', trainingDays: [{ day: 'Lundi', hour: 'de 19h30 à 21h30' }, { day: 'Jeudi', hour: 'de 19h30 à 21h' }] }]}
        coaches={['Elyte_Agamah-U12...U15_U1_U2', 'Mendy_Jacques-U9...U13_U1_U2']}
      />

    </Grid>
  );
}

export { StudentTabs, AdultTabs }