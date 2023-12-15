import { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import Card from "../../components/Card";
import Story from "../../components/Story";
import User from "../../components/User";
import Button from "../../components/Button";
import ticktak from "../../assets/icons/BsClock.svg";
import calendar from "../../assets/icons/BsCalendar2Check.svg";
import question from "../../assets/icons/CkQuestion.svg";
import styles from "./profile.module.scss";

function Profile({ data }) {
    const [showStories, setShowStories] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    let toggleShowStories = () => {
        setShowStories(!showStories);
    };
    let toggleShowUsers = () => {
      setShowUsers(!showUsers);
  };

    const LazyStoryComponents = data.stories.map((el, i) =>
        lazy(() => import("../../components/Story"))
    );
    const LazyUserComponents = data.auditory.map((el, i) =>
    lazy(() => import("../../components/User"))
);
  
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.btn_container}>
                    <Button href="auth" title="Выйти" />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div className={styles.username_container}>
                        <div className={styles.login}>{data.login}</div>
                        <div className={styles.username}>{data.username}</div>
                    </div>
                    <div className={styles.avatar}>
                        <img src={data.path} alt="avatar" />
                    </div>
                </div>
                <div className={styles.time}>
                    <Card
                        title="Лучшее время для публикации"
                        bold={data.time}
                        icon={ticktak}
                        btn="Подробнее"
                        onclick={false}
                        href="activity"
                    />
                    <Card
                        title="Лучший день для публикации"
                        bold={data.day}
                        icon={calendar}
                        btn="Подробнее"
                        onclick={false}
                        href="activity"
                    />
                </div>

                <div className={styles.subtitle}>Аудитория</div>
                <div className={styles.auditory}>
                    <Card
                        title="Ваши контакты"
                        bold={data.follow}
                        btn="Список контактов"
                    />
                    <Card
                        title="Вы в контактах"
                        bold={data.followers}
                        btn="Список контактов"
                    />
                    <Card
                        title="Распределение"
                        icon={question}
                        simple={data.followers - data.premium_followers}
                        premium={data.premium_followers}
                    />
                </div>
                <div className={styles.subtitle_box}>
                    <div className={styles.subtitle}>Последние stories</div>
                    <div className={styles.btn_container}>
                        <Button
                            title={"Смотреть все " + data.stories.length}
                            onclick={toggleShowStories}
                        />
                    </div>
                </div>
                <div className={styles.stories_box}>
                    {data.stories.slice(0, 8).map((el, i) => (
                        <Link to={`story/${i}`} key={i} className={styles.link}>
                          <Story
                            path={el.path}
                            views={el.views}
                            likes={el.likes}
                            date={el.date}
                            status={el.status}
                        /></Link> 
                    ))}
                    {showStories && (
                        <Suspense fallback={<div>Loading...</div>}>
                            {LazyStoryComponents.slice(
                                8,
                                LazyStoryComponents.length
                            ).map((LazyStoryComponent, i) => (
                              <Link to={`story/${i}`} key={i}>
                              <LazyStoryComponent
                                    path={data.stories[i].path}
                                    views={data.stories[i].views}
                                    likes={data.stories[i].likes}
                                    date={data.stories[i].date}
                                    status={data.stories[i].status}
                                />
                                </Link>
                            ))}
                        </Suspense>
                    )}
                </div>

                <div className={styles.stories_mobile}>
                    {data.stories.slice(0, 3).map((el, i) => (
                        <Link to={`story/${i}`} key={i}  className={styles.link}>
                        <Story
                            path={el.path}
                            views={el.views}
                            likes={el.likes}
                            date={el.date}
                            status={el.status}
                        /></Link>
                    ))}
                    {showStories && (
                        <Suspense fallback={<div>Loading...</div>}>
                            {LazyStoryComponents.slice(
                                3,
                                LazyStoryComponents.length
                            ).map((LazyStoryComponent, i) => (
                              <Link to={`story/${i}`} key={i} className={styles.link}>
                              <LazyStoryComponent
                                    path={data.stories[i].path}
                                    views={data.stories[i].views}
                                    likes={data.stories[i].likes}
                                    date={data.stories[i].date}
                                    status={data.stories[i].status}
                                /></Link>

                            ))}
                        </Suspense>
                    )}
                </div>

                <div className={styles.subtitle_box}>
                    <div className={styles.subtitle}>Аудитория</div>
                    <div className={styles.btn_container}>
                        <Button
                            title={"Смотреть все " + data.auditory.length}
                            onclick={toggleShowUsers}
                        />
                    </div>
                </div>
                <div className={styles.users_box}>
                    {data.auditory.slice(0, 10).filter((el) => el.status === 'В сети').map((el, i) => (
                        <User
                            key={i}
                            path={el.path}
                            views={el.views}
                            likes={el.likes}
                            username={el.username}
                            status={el.status}
                            stories = {data.stories.length}

                        />
                    ))}
                    {data.auditory.slice(0, 10).filter((el) => el.status != 'В сети').map((el, i) => (
                        <User
                            key={i}
                            path={el.path}
                            views={el.views}
                            likes={el.likes}
                            username={el.username}
                            status={el.status}
                            stories = {data.stories.length}

                        />
                    ))}
                    {showUsers && (
                        <Suspense fallback={<div>Loading...</div>}>
                            {LazyUserComponents.slice(
                                10,
                                LazyUserComponents.length
                            ).map((LazyUserComponent, i) => (
                                <LazyUserComponent
                                    key={i}
                                    path={data.auditory[i].path}
                                    views={data.auditory[i].views}
                                    likes={data.auditory[i].likes}
                                    username={data.auditory[i].username}
                                    status={data.auditory[i].status}
                                    stories = {data.stories.length}
                                />
                            ))}
                        </Suspense>
                    )}
                </div>

            </div>
        </div>
    );
}
export default Profile;
