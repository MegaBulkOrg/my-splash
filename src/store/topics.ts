import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ITopicsProps } from 'Shared/pages/Topics';
import { RootState } from './store';

export const TOPICS_REQUEST = 'TOPICS_REQUEST'
export const TOPICS_REQUEST_SUCCESS = 'TOPICS_REQUEST_SUCCESS'
export const TOPICS_REQUEST_ERROR = 'TOPICS_REQUEST_ERROR'

export type TopicsRequestAction = {
    type: typeof TOPICS_REQUEST
}
export type TopicsRequestSuccessAction = {
    type: typeof TOPICS_REQUEST_SUCCESS
    topics: ITopicsProps[]
}
export type TopicsRequestErrorAction = {
    type: typeof TOPICS_REQUEST_ERROR
    error: string
}

export const topicsRequest: ActionCreator<TopicsRequestAction> = () => ({
    type: TOPICS_REQUEST
})
export const topicsRequestSuccess: ActionCreator<TopicsRequestSuccessAction> = (topics:ITopicsProps[]) => ({
    type: TOPICS_REQUEST_SUCCESS,
    topics
})
export const topicsRequestError: ActionCreator<TopicsRequestErrorAction> = (error: string) => ({
    type: TOPICS_REQUEST_ERROR,
    error
})

export const topicsRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(topicsRequest())
    axios
        .get(`https://api.unsplash.com/topics?client_id=${process.env.ACCESS_KEY}`)
        .then(({ data }) => {
            // console.log(data);
            const topicsList = data
            const topicsToRedux = topicsList.map((data: { [x: string]: any }): ITopicsProps | null => {
                return {
                    id: data['id'],
                    slug: data['slug'],
                    title: data['title'],
                    description: data['description'],
                    published_at: data['published_at'],
                    img: data['cover_photo']['urls']['raw'],
                    thumb: data['cover_photo']['urls']['regular']
                }
            })
            dispatch(topicsRequestSuccess(topicsToRedux))
        })
        .catch((error) => dispatch(topicsRequestError(String(error))))
}