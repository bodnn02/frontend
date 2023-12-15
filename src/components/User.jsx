import { useRef, useState, useEffect } from "react";
import styles from "./components.module.scss";
import dots from '../assets/images/dots.png';
import heart from '../assets/icons/IoHeartSharp.svg';

function User({ path, views, likes, username, status, stories, like }) {
    const [imgPath, setImgPath] = useState("../assets/images/story2.png");
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        setImgPath(path);
    }, []);

  function handleClick(e){
    if (e.target === e.currentTarget) {
      setPopup(false);
    }
  }
    return (
      <>
        <div className={styles.user_wrapper}>
            <div className={styles.user_passport}>
              <img src={imgPath} alt="avatar" className={styles.ava_box}/>
                <div className={styles.user_info}>
                  <p>{username}</p>
                  <p className={status=='В сети'?styles.status_online:styles.status_offline}>{status}</p>
                </div>
            </div>
            {like==1&&  <img src={heart} className={styles.red_heart} alt="сердце"/>} 
            {views&&<><div className={styles.user_views}> 
              <p>{views}&nbsp;&#40;{views*100/stories}&#37;&#41;</p>
              <p>Просмотров stories</p>
            </div>
            <div className={styles.user_likes}>
              <p>{likes}</p>
              <p>Лайков</p>
            </div></>}
        </div>
        <div className={styles.user_mobile}>
            <div className={styles.user_passport}>
            <img src={imgPath} alt="avatar" className={styles.ava_box}/>
                <div className={styles.user_info}>
                  <p>{username}</p>
                  <p className={status=='В сети'?styles.status_online:styles.status_offline}>{status}</p>
                </div>
            </div>
            {like==1&&  <img src={heart} className={styles.red_heart} alt="сердце"/>} 
            {views&&<div className={styles.dots} onClick={()=>setPopup(true)}>
            <img src={dots} alt="три точки"/>
           </div>}
        { 
popup && 
      <div className={styles.popup} onClick={(e)=>handleClick(e)}>
        <div className={styles.popup_content}>
          <div className={styles.user_passport}>
              <img className={styles.ava_box} src={imgPath} alt="man">
              </img>
              <div className={styles.user_info}>
                <p>{username}</p>
                <p className={status=='В сети'?styles.status_online:styles.status_offline}>{status}</p>
                <div className={styles.views_cont}>

<div className={styles.user_views}> 
      <p>{views}&nbsp;&#40;{views*100/+stories}&#37;&#41;</p>
      <p>Просмотров stories</p>
</div>
<div className={styles.user_likes}>
  <p>{likes}</p>
  <p>Лайков</p>
</div>
</div>
              </div>
                <div className={styles.exit} onClick={() => setPopup(false)}>+</div>
          </div>
          
            
      </div>
      </div>}
      </div>

        </>
    );
}
export default User;
