import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable';
import * as directives from 'vuetify/directives';

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#f1f2f8',
    surface: '#15202b',
    primary: '#3f51b5',
    secondary: '#03dac6',
    error: '#f44336',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {},
  },
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
  },
  directives,
});

export default vuetify;
