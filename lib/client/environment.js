let env;

const set = (isProduction) => {
    if (isProduction)
        env = 'production';
    else
        env = 'sandbox';
};

const get = () => {
    return env;
};

export default {
    set,
    get
}
