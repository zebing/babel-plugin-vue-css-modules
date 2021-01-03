import data from './data';
import styles from './styles.css';
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
        {
          data.data.content.map((item) =>
            <div class={styles.item}>
              <div class={styles.left}>
                <div class={styles.title}>
                  {item.realtimeTitle}
                </div>
                <div class={styles.context}>
                  <div class={styles.middle}>
                    <span class={styles.source}>第三方资讯</span>
                    <span>{item.sendTime}</span>
                  </div>
                </div>
              </div>
              <div class={styles.right}>
                <img src={item.coverUri} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}