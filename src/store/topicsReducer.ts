import { Reducer } from "react";
import { ITopicsProps } from 'Shared/pages/Topics';
import { TopicsRequestAction, TopicsRequestErrorAction, TopicsRequestSuccessAction, TOPICS_REQUEST, TOPICS_REQUEST_ERROR, TOPICS_REQUEST_SUCCESS } from "./topics";

export type TopicsState = {
    loading: boolean
    error: string
    items: ITopicsProps[]
}

type TopicsActions = TopicsRequestAction | TopicsRequestSuccessAction | TopicsRequestErrorAction

export const topicsReducer: Reducer<TopicsState, TopicsActions> = (state, action) => {
    switch (action.type) {
        case TOPICS_REQUEST:
            return {...state, loading: true}
        case TOPICS_REQUEST_ERROR: 
            return {...state, error: action.error, loading: false}
        case TOPICS_REQUEST_SUCCESS: 
            return {...state, items: action.topics, loading: false}
        default:
            return state
    }
}