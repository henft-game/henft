import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
}

export const pageView = (location) => {
    ReactGA.pageview(location.pathname + location.search);
}

export const event = (options) => {
    ReactGA.event(options);
};

export const modalView = (location) => {
    ReactGA.modalview(location);
}