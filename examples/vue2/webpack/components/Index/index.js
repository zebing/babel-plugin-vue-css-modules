
import List from '@/List';
import TemplateJSX from '@/TemplateJSX';
import Template from '@/Template';

export default {
  components: {
    List,
    TemplateJSX,
    Template
  },

  render () {
    return (
      <div>
        <div>List</div>
        <List />
        <div>TemplateJSX</div>
        <TemplateJSX />
        <div>Template</div>
        <Template />
      </div>
    )
  }
}