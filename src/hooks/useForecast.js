import { useState } from 'react';
import axios from 'axios';

import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com/';
const REQUEST_URL = `${CROSS_DOMAIN}${BASE_URL}`;

console.log(REQUEST_URL);

const useForecat = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    const getWoied = async location => {
        const { data } = await axios(`${REQUEST_URL}/search`, { params: { query: location } });

        if (!data || data.length === 0) {
            setError('Не могу найти такую локацию');
            setLoading(false);
            return;
        }
        return data[0];
    };

    const getForecastData = async woeid => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`);
        if (!data || data.length === 0) {
            setError('Что-то пошло не так');
            setLoading(false);
            return;
        }
        return data;
    };

    const gatherForecast = data => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        setForecast({ currentDay, currentDayDetails, upcomingDays });
        setLoading(false);
    };

    const submitRequest = async location => {
        setLoading(true);
        setError(false);
        const response = await getWoied(location);
        if (!response?.woeid) return;
        const data = await getForecastData(response.woeid);
        if (!data) return;
        gatherForecast(data);
    };

    return { isError, isLoading, forecast, submitRequest };
};

export default useForecat;
