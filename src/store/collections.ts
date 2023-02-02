import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ICollectionsCardProps } from 'Shared/CollectionsCard';
import { RootState } from './store';

export const COLLECTIONS_REQUEST = 'COLLECTIONS_REQUEST'
export const COLLECTIONS_REQUEST_SUCCESS = 'COLLECTIONS_REQUEST_SUCCESS'
export const COLLECTIONS_REQUEST_ERROR = 'COLLECTIONS_REQUEST_ERROR'

export type CollectionsRequestAction = {
    type: typeof COLLECTIONS_REQUEST
}
export type CollectionsRequestSuccessAction = {
    type: typeof COLLECTIONS_REQUEST_SUCCESS
    collections: ICollectionsCardProps[]
}
export type CollectionsRequestErrorAction = {
    type: typeof COLLECTIONS_REQUEST_ERROR
    error: string
}

export const collectionsRequest: ActionCreator<CollectionsRequestAction> = () => ({
    type: COLLECTIONS_REQUEST
})
export const collectionsRequestSuccess: ActionCreator<CollectionsRequestSuccessAction> = (collections:ICollectionsCardProps[]) => ({
    type: COLLECTIONS_REQUEST_SUCCESS,
    collections
})
export const collectionsRequestError: ActionCreator<CollectionsRequestErrorAction> = (error: string) => ({
    type: COLLECTIONS_REQUEST_ERROR,
    error
})

export const collectionsRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(collectionsRequest())
    axios
        .get(`https://api.unsplash.com/collections?client_id=${process.env.ACCESS_KEY}`)
        .then(({ data }) => {
            // console.log(data);
            const collectionsList = data
            const collectionsToRedux = collectionsList.map((data: { [x: string]: any }): ICollectionsCardProps | null => {
                return {
                    id: data['id'],
                    title: data['title'],
                    published_at: data['published_at'],
                    tags: data['tags'],
                    user: data['user']['name'],
                    img: data['cover_photo']['urls']['regular'],
                }
            })
            dispatch(collectionsRequestSuccess(collectionsToRedux))
        })
        .catch((error) => dispatch(collectionsRequestError(String(error))))
}