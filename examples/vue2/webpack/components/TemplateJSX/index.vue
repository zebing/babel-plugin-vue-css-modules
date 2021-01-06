<script>
import data from './data';
import './styles.css';
import './styles1.css';

export default {
  data () {
    return {
      name: 'list',
    }
  },

  render () {
    return (
      <div classname="wrap" class="classnamename">
        <div classname="jsx" class={{ test: true, test2: true}}>test</div>
        <div classname="jsx" class={['test1']}>array class</div>
        <div classname="jsx" class={'test1'}>string class</div>
        {
          data.data.content.map((item) =>
            <div classname="item">
              <div classname="left">
                <div classname="title">
                  {item.realtimeTitle}
                </div>
                <div classname="context">
                  <div classname="middle">
                    <span classname="source">第三方资讯</span>
                    <span>{item.sendTime}</span>
                  </div>
                </div>
              </div>
              <div classname="right">
                <img src={item.coverUri} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
</script>
<style module>
.jsx {
  border: 1px solid;
}
</style>