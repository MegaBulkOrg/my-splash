import { Reducer } from "react";
import { ICollectionsCardProps } from 'Shared/CollectionsCard';
import { CollectionsRequestAction, CollectionsRequestErrorAction, CollectionsRequestSuccessAction, COLLECTIONS_REQUEST, COLLECTIONS_REQUEST_ERROR, COLLECTIONS_REQUEST_SUCCESS } from "./collections";

export type CollectionsState = {
    loading: boolean
    error: string
    items: ICollectionsCardProps[]
}

type CollectionsActions = CollectionsRequestAction | CollectionsRequestSuccessAction | CollectionsRequestErrorAction

export const collectionsReducer: Reducer<CollectionsState, CollectionsActions> = (state, action) => {
    switch (action.type) {
        case COLLECTIONS_REQUEST:
            return {...state, loading: true}
        case COLLECTIONS_REQUEST_ERROR: 
            return {...state, error: action.error, loading: false}
        case COLLECTIONS_REQUEST_SUCCESS: 
            return {...state, items: action.collections, loading: false}
        default:
            return state
    }
}