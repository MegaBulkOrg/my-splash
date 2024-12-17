import axios from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IСollectionPhotosProps } from 'Shared/pages/Сollection';
import { RootState } from './store';

export const COLLECTION_REQUEST = 'COLLECTION_REQUEST'
export const COLLECTION_REQUEST_SUCCESS = 'COLLECTION_REQUEST_SUCCESS'
export const COLLECTION_REQUEST_ERROR = 'COLLECTION_REQUEST_ERROR'

export type CollectionRequestAction = {
    type: typeof COLLECTION_REQUEST
}
export type CollectionRequestSuccessAction = {
    type: typeof COLLECTION_REQUEST_SUCCESS
    collection: IСollectionPhotosProps[]
}
export type CollectionRequestErrorAction = {
    type: typeof COLLECTION_REQUEST_ERROR
    error: string
}

export const collectionRequest: ActionCreator<CollectionRequestAction> = () => ({
    type: COLLECTION_REQUEST
})
export const collectionRequestSuccess: ActionCreator<CollectionRequestSuccessAction> = (collection:IСollectionPhotosProps[]) => ({
    type: COLLECTION_REQUEST_SUCCESS,
    collection
})
export const collectionRequestError: ActionCreator<CollectionRequestErrorAction> = (error: string) => ({
    type: COLLECTION_REQUEST_ERROR,
    error
})

export const collectionRequestAsync = (id:string | undefined): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(collectionRequest())
    axios
        .get(`https://api.unsplash.com/collections/${id}/photos?client_id=${process.env.ACCESS_KEY}`)
        .then(({ data }) => {
            // console.log(data);
            const collectionList = data
            const collectionToRedux = collectionList.map((data: { [x: string]: any }): IСollectionPhotosProps | null => {
                return {
                    id: data['id'],
                    title: data['description'],
                    description: data['alt_description'],
                    img: data['urls']['raw'],
                    thumb: data['urls']['regular'],
                    user: data['user']['name']
                }
            })
            dispatch(collectionRequestSuccess(collectionToRedux))
        })
        .catch((error) => dispatch(collectionRequestError(String(error))))
}
