import { createApp } from 'vue';
// import List from '@/List';
// import TemplateJSX from '@/TemplateJSX';
import Template from '@/Template';

import Vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(Template).mount(document.body);
app.use(Vant);