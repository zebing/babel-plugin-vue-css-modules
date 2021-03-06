import { createApp } from 'vue';
// import List from '@/List';
// import Template from '@/Template';
import Index from '@/Index';

import Vant from 'vant';
import 'vant/lib/index.css';
import './reset.css';

const app = createApp(Index)
app.use(Vant);
app.mount(document.body);