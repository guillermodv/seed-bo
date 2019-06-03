export const FETCH_SURVEY_WITH_TYPE_REQUESTED = 'FETCH_SURVEY_WITH_TYPE_REQUESTED';
export const FETCH_SURVEY_WITH_TYPE_SUCCEEDED = 'FETCH_SURVEY_WITH_TYPE_SUCCEEDED';

export const fetchSurveyWithTypeRequested = (id, collectionType, sample) => ({
    type: FETCH_SURVEY_WITH_TYPE_REQUESTED, id, collectionType, sample
});

export const surveyFetchWithTypeSucceeded = (survey, sample) => ({
    type: FETCH_SURVEY_WITH_TYPE_SUCCEEDED,
    survey,
    sample
});

export const DWELLINGS_FETCH_WITH_TYPE_REQUESTED = 'DWELLINGS_FETCH_WITH_TYPE_REQUESTED';
export const DWELLINGS_FETCH_WITH_TYPE_SUCCEEDED = 'DWELLINGS_FETCH_WITH_TYPE_SUCCEEDED';

export const fetchDwellingsWithTypeRequested = (id, sample, collectionType) => ({
    type: DWELLINGS_FETCH_WITH_TYPE_REQUESTED, id, sample, collectionType
});

export const dwellingsFetchWithTypeSucceeded = (dwellings, sample) => ({
    type: DWELLINGS_FETCH_WITH_TYPE_SUCCEEDED,
    dwellings,
    sample
});

export const CLEAN_SURVEYS = 'CLEAN_SURVEYS';

export const cleanSurveys = () => ({type: CLEAN_SURVEYS});
