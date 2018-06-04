const LS_KEY = 'LS_activepath_IsUserAcceptedTerms';

export const IsUserAcceptedTerms = () => {
    return localStorage.getItem(LS_KEY)
};

export const acceptedTermsAndConditions = () => {
    return localStorage.setItem(LS_KEY, true)
};
