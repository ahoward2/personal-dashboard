// @ts-nocheck
import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export const TwitterChart = ({ data }) => {
  const constructData = (dataType: string) => {
    let finalData = [];
    data.map((item, index) => {
      let objectType;

      if (dataType === "retweets") {
        objectType = {
          x: (index + 1).toString(),
          y: item?.public_metrics?.retweet_count,
        };
      } else if (dataType === "likes") {
        objectType = {
          x: (index + 1).toString(),
          y: item?.public_metrics?.like_count,
        };
      } else {
        objectType = {
          x: (index + 1).toString(),
          y: item?.public_metrics?.reply_count,
        };
      }

      finalData.push(objectType);
    });
    return finalData;
  };

  useEffect(() => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: constructData("retweets"),
            label: "Retweets",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              // "rgba(54, 162, 235, 0.2)",
              // "rgba(255, 206, 86, 0.2)",
              // "rgba(75, 192, 192, 0.2)",
              // "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)",
              // "rgba(75, 192, 192, 1)",
              // "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
          {
            data: constructData("likes"),
            label: "Likes",
            backgroundColor: [
              // "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              // "rgba(255, 206, 86, 0.2)",
              // "rgba(75, 192, 192, 0.2)",
              // "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              // "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)",
              // "rgba(75, 192, 192, 1)",
              // "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
          {
            data: constructData("replies"),
            label: "Replies",
            backgroundColor: [
              // "rgba(255, 99, 132, 0.2)",
              // "rgba(54, 162, 235, 0.2)",
              // "rgba(255, 206, 86, 0.2)",
              // "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              // "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)",
              // "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Past 30 Tweets Activity",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas id="myChart" width="400" height="100"></canvas>
    </div>
  );
};
