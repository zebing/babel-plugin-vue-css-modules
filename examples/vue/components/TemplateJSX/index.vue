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
      <div class="wrap">
        <div class="jsx">test</div>
        {
          data.data.content.map((item) =>
            <div class="item">
              <div class="left">
                <div class="title">
                  {item.realtimeTitle}
                </div>
                <div class="context">
                  <div class="middle">
                    <span class="source">第三方资讯</span>
                    <span>{item.sendTime}</span>
                  </div>
                </div>
              </div>
              <div class="right">
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