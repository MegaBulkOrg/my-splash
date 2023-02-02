import { Reducer } from "react";
import { IСollectionPhotosProps } from 'Shared/pages/Сollection';
import { CollectionRequestAction, CollectionRequestErrorAction, CollectionRequestSuccessAction, COLLECTION_REQUEST, COLLECTION_REQUEST_ERROR, COLLECTION_REQUEST_SUCCESS } from "./collection";

export type CollectionState = {
    loading: boolean
    error: string
    items: IСollectionPhotosProps[]
}

type CollectionAction = CollectionRequestAction | CollectionRequestSuccessAction | CollectionRequestErrorAction

export const collectionReducer: Reducer<CollectionState, CollectionAction> = (state, action) => {
    switch (action.type) {
        case COLLECTION_REQUEST:
            return {...state, loading: true}
        case COLLECTION_REQUEST_ERROR: 
            return {...state, error: action.error, loading: false}
        case COLLECTION_REQUEST_SUCCESS: 
            return {...state, items: action.collection, loading: false}
        default:
            return state
    }
}