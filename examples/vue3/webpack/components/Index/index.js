
import List from '@/List';
import TemplateJSX from '@/TemplateJSX';
import Template from '@/Template';

export default {
  components: {
    List,
    TemplateJSX,
    Template
  },

  setup () {
    return () => (
      <div>
        <div>List</div>
        <List />
        <div>TemplateJSX</div>
        <TemplateJSX />
        <div>Template</div>
        <Template />
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
      </div>
    )
  }
}