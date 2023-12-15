import { useRef, useState, useEffect } from "react";
import GetServices from "../../api/getServices";
import { useParams } from "react-router-dom";
import User from "../../components/User";
import Chart from "chart.js/auto";
import Header from "../../components/Header";
import eye from "../../assets/icons/BsFillEyeFill.svg";
import heart from "../../assets/icons/IoHeartSharp.svg";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./story.module.scss";

function StoryPage() {
    const exampleData = {
        id: "1",
        path: "../assets/images/story2.png",
        views_per_hour: {
            "00:00": 100,
            "01:00": 150,
            // ... остальные часы
        },
        people: [
            { premium: true, sex: "man", like: 1, path: "path1", username: "user1", date: "date1" },
            { premium: false, sex: "woman", like: 0, path: "path2", username: "user2", date: "date2" },
            // ... другие пользователи
        ],
        status: "active",
        rest: "2 часа",
        date: "2023-01-01",
        time: "12:00",
        duration: 24,
        content: "Описание вашей истории",
        views: 1000,
        likes: 500,
    };

    const [story, setStory] = useState(exampleData);
    async function getData(id) {
        const result = exampleData; // Замените exampleData на result в фактическом коде
        setStory(result);
    }



    const { id } = useParams();
    const [imgPath, setImgPath] = useState("../assets/images/story2.png");
    const storyImg = useRef(null);
    const views = useRef(null);
    const chart = useRef(null);
    const premium = useRef(null);
    const premiumChart = useRef(null);
    const sexChart = useRef(null);
    const sex = useRef(null);
    const chartViews = Object.values(story.views_per_hour);

    useEffect(() => {
        getData(id)
        setImgPath(story.path);
        if (views.current) {
            const ctx = views.current.getContext("2d");
            const data = {
                labels: Object.keys(story.views_per_hour),
                datasets: [
                    {
                        label: "",
                        data: chartViews,
                        backgroundColor: "#3182CE",
                        hoverBackgroundColor: "#38A169",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            };
            if (chart.current) {
                chart.current.destroy();
            }
            const options = {
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                const value = context[0].raw;
                                const percentage = +(
                                    (value * 100) /
                                    +story.views
                                ).toFixed(1);
                                return `👁 ${value} (${percentage}%)`;
                            },
                            label: function (context) {
                                return ``;
                            },
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: Math.max(...chartViews),
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
                        },
                    },
                },
            };

            chart.current = new Chart(ctx, {

                type: "bar",
                data: data,
                options: options,
            });
        }

        const premiumX = story.people.filter((el) => el.premium == true);

        if (premium.current) {
            const doug = premium.current.getContext("2d");
            const data = {
                datasets: [
                    {
                        label: "",
                        data: [
                            premiumX.length,
                            story.people.length - premiumX.length,
                        ],
                        backgroundColor: ["#48BB78", "#3182CE"],
                        hoverOffset: 4,
                    },
                ],
                labels: [
                    `Premium (${premiumX.length})`,
                    `Обычные (${story.people.length - premiumX.length})`,
                ],
            };
            const options = {
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            boxWidth: 10,
                            usePointStyle: true,
                            generateLabels: function (chart) {
                                const data = chart.data;
                                if (
                                    data.labels.length &&
                                    data.datasets.length
                                ) {
                                    return data.labels.map(function (
                                        label,
                                        index
                                    ) {
                                        const dataset = data.datasets[0];
                                        const backgroundColor =
                                            dataset.backgroundColor[index];
                                        const pointStyle = "circle";

                                        return {
                                            text: label,
                                            fillStyle: backgroundColor,
                                            strokeStyle: backgroundColor,
                                            pointStyle: pointStyle,
                                            index: index,
                                        };
                                    });
                                }
                                return [];
                            },
                        },
                    },
                    datalabels: {
                        color: 'white',
                        formatter: function (value) {
                            const item = (value * 100 / story.people.length).toFixed(0) + `%`;
                            return item
                        }

                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                const value = context[0].label.slice(0, 8) + ": " + context[0].label.slice(9, -1);

                                return value;
                            },
                            label: function (context) {
                                return ``;
                            },
                        },
                    },
                },
            };
            if (premiumChart.current) {
                premiumChart.current.destroy();
            }
            premiumChart.current = new Chart(doug, {
                plugins: [ChartDataLabels],
                type: "doughnut",
                data: data,
                options: options,
            });
        }

        const man = story.people.filter((el) => el.sex === "man").length;
        const woman = story.people.filter((el) => el.sex === "woman").length;
        const some = story.people.length - man - woman;

        if (sex.current) {
            const sexctx = sex.current.getContext("2d");
            const data = {
                datasets: [
                    {
                        label: "",
                        data: [man, woman, some],
                        backgroundColor: ["#3182CE", "#ED64A6", "#ECC94B"],
                        hoverOffset: 4,
                    },
                ],
                labels: [`Мужчины`, `Женщины`, `Не определено`],
            };
            const options = {

                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            boxWidth: 10,
                            usePointStyle: true,
                            generateLabels: function (chart) {
                                const data = chart.data;
                                if (
                                    data.labels.length &&
                                    data.datasets.length
                                ) {
                                    return data.labels.map(function (
                                        label,
                                        index
                                    ) {
                                        const dataset = data.datasets[0];
                                        const backgroundColor =
                                            dataset.backgroundColor[index];
                                        const pointStyle = "circle";

                                        return {
                                            text: label,
                                            fillStyle: backgroundColor,
                                            strokeStyle: backgroundColor,
                                            pointStyle: pointStyle,
                                            index: index,
                                        };
                                    });
                                }
                                return [];
                            },
                        }
                    },
                    datalabels: {
                        color: 'white',
                        formatter: function (value) {
                            const item = (value * 100 / story.people.length).toFixed(0) + `%`;
                            return item
                        },
                        center: true,

                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                const value = context[0].label + ": " + context[0].raw;

                                return value;
                            },
                            label: function (context) {
                                return ``;
                            },
                        },
                    },
                },
            };

            if (sexChart.current) {
                sexChart.current.destroy();
            }
            sexChart.current = new Chart(sexctx, {
                plugins: [ChartDataLabels],
                type: "doughnut",
                data: data,
                options: options,
            });
        }
    }, [story]);

    if (storyImg.current !== null) {
        storyImg.current.style.backgroundImage = `url("${imgPath}")`;
    }

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.story}>
                        <div className={styles.img} ref={storyImg}></div>
                        <div className={styles.cards}>
                            <div className={styles.card}>
                                <div className={styles.card_header}>
                                    {story.status == "active" ? (
                                        <>
                                            <div
                                                className={styles.label_active}
                                            >
                                                Активная
                                            </div>
                                            <div className={styles.thin_title}>
                                                Закончится через {story.rest}
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.label_archive}>
                                            Архив
                                        </div>
                                    )}
                                </div>
                                <div className={styles.info}>
                                    <div>
                                        <p className={styles.thin_title}>
                                            Дата публикации
                                        </p>
                                        <p className={styles.bold}>
                                            {story.date}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={styles.thin_title}>
                                            Время публикации
                                        </p>
                                        <p className={styles.bold}>
                                            {story.time}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={styles.thin_title}>
                                            Срок публикации
                                        </p>
                                        <p className={styles.bold}>
                                            {story.duration}
                                        </p>
                                    </div>
                                </div>
                                <p className={styles.thin_title}>Описание</p>
                                <p className={styles.describtion}>
                                    {story.content}
                                </p>
                            </div>
                            <div className={styles.card_bottom}>
                                <div className={styles.views}>
                                    <p className={styles.thin_title}>
                                        Просмотров
                                    </p>
                                    <p className={styles.bold}>
                                        <img
                                            className={styles.icon}
                                            src={eye}
                                            alt="глаз"
                                        />
                                        {story.views}
                                    </p>
                                </div>

                                <div className={styles.views}>
                                    <p className={styles.thin_title}>Лайков</p>
                                    <p className={styles.bold}>
                                        <img
                                            className={styles.icon}
                                            src={heart}
                                            alt="сердце"
                                        />
                                        {story.likes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.title}>Просмотры по часам</div>
                    <div className={styles.chart_card}>
                        <div className={styles.chart}>
                            <p className={styles.thin_title}>
                                Срок публикации: {story.duration} часов
                            </p>
                            <canvas ref={views}></canvas>
                        </div>
                    </div>
                    <div className={styles.charts_container}>
                        <div className={styles.chart_card}>
                            <div className={styles.doughnut}>
                                <p className={styles.title}>Распределение</p>
                                <p className={styles.thin_title}>
                                    {story.people.length} аккаунтов
                                </p>
                                <canvas ref={premium}></canvas>
                                <p className={styles.doughnut_center}>
                                    {story.people.length}
                                </p>
                            </div>
                        </div>
                        <div className={styles.chart_card}>
                            <div className={styles.doughnut}>
                                <p className={styles.title}>Пол аудитории</p>
                                <p className={styles.thin_titlex}>
                                    {story.people.length} аккаунтов
                                </p>
                                <canvas ref={sex}></canvas>
                                <p className={styles.doughnut_center}>
                                    {story.people.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.title}>Вашу stories посмотрели</div>
                    <div className={styles.users_box}>

                        {story.people.filter((el) => el.like === 1).map((el, i) => (
                            <User
                                key={i}
                                path={el.path}
                                like={el.like}
                                username={el.username}
                                status={el.date}
                            />
                        ))}
                        {story.people.filter((el) => el.like === 0).map((el, i) => (
                            <User
                                key={i}
                                path={el.path}
                                like={el.like}
                                username={el.username}
                                status={el.date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryPage;
