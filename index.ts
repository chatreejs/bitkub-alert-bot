import { App } from './src/app';

const app = new App();
app.init(process.env.SYMBOL || 'BTC/THB');
