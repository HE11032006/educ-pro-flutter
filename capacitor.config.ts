import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2e801e7636574c759039c2340ffb6738',
  appName: 'educ-pro-flutter',
  webDir: 'dist',
  server: {
    url: 'https://2e801e76-3657-4c75-9039-c2340ffb6738.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;