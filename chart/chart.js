document.addEventListener('DOMContentLoaded', function () {
    const chartContainer = document.getElementById('chart');
    const chartOptions = {
        layout: {
            textColor: 'black',
            background: {
                type: 'solid',
                color: 'white'
            }
        },
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
    };
    const chart = LightweightCharts.createChart(chartContainer, chartOptions);

    // const areaSeries = chart.addSeries(LightweightCharts.AreaSeries, {
    //     lineColor: '#2962FF', topColor: '#2962FF',
    //     bottomColor: 'rgba(41, 98, 255, 0.28)',
    // });
    // areaSeries.setData([
    //     { time: '2018-12-22', value: 32.51 },
    //     { time: '2018-12-23', value: 31.11 },
    //     { time: '2018-12-24', value: 27.02 },
    //     { time: '2018-12-25', value: 27.32 },
    //     { time: '2018-12-26', value: 25.17 },
    //     { time: '2018-12-27', value: 28.89 },
    //     { time: '2018-12-28', value: 25.46 },
    //     { time: '2018-12-29', value: 23.92 },
    //     { time: '2018-12-30', value: 22.68 },
    //     { time: '2018-12-31', value: 22.67 },
    // ]);

    const candlestickSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData([
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    ]);

    chart.timeScale().fitContent();

    const ws = new WebSocket('ws://localhost:3000/asset');

    ws.onmessage = (event) => {
        const asset = JSON.parse(event.data);
        candlestickSeries.update(asset);
    };

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
});
