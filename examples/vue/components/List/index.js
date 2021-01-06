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
      <div classname="wrap">
        <div classname="test">test</div>
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