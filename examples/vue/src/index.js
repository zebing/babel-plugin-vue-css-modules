import { createApp } from 'vue';
// import List from '@/List';
import TemplateJSX from '@/TemplateJSX';
// import Index from '@/Index';

import Vant from 'vant';
import 'vant/lib/index.css';
import './reset.css';

const app = createApp(TemplateJSX)
app.use(Vant);
app.mount(document.body);