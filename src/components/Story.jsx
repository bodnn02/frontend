import { useRef, useState, useEffect } from 'react';
import view from '../assets/icons/BsFillEyeFill.svg';
import like from '../assets/icons/IoHeartSharp.svg';
import styles from './components.module.scss';

function Story({path, views, likes, date, status}){
  const [imgPath, setImgPath]=useState('../assets/images/story2.png');

  useEffect(() => {
    setImgPath(path);

  }, []);
  const story = useRef(null);


  if (story.current !== null) {
    story.current.style.backgroundImage = `url("${imgPath}")`;
  }
  // 'active' ? '#38A169' : '#DD6B20';
  
return(
<div className={styles.story} ref={story}>
    {status === "active" ?<div className={styles.label_active}>
 Активная</div>
:<div className={styles.label_archive}>Архив</div>}
  <div className={styles.stat_box}>
  <div className={styles.views}>
    <img src={view} alt="глаз" /> <span className={styles.span}>{views}</span>
    <img src={like} alt="сердце" /> <span>{likes}</span>
    </div>
    <div>{date}</div>
  </div>
</div>)
}
export default Story