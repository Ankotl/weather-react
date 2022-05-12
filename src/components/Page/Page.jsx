import React, { Fragment } from 'react';

import Form from '../Form';
import Error from '../Error';
import Forecast from '../Forecast';
import Loader from '../Loader';
import Header from '../Header';

import useForecat from '../../hooks/useForecast';

import styles from './Page.module.css';

const Page = () => {
    const { isError, isLoading, forecast, submitRequest } = useForecat();

    const onSubmit = value => {
        submitRequest(value);
    };
    return (
        <Fragment>
            <Header />
            {!forecast && (
                <div className={`${styles.box} position-relative`}>
                    {!isLoading && <Form submitSearch={onSubmit} />}
                    {isError && <Error message={isError} />}
                    {isLoading && <Loader />}
                </div>
            )}
            {forecast && <Forecast forecast={forecast} />}
        </Fragment>
    );
};

export default Page;
