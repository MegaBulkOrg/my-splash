import { Reducer } from "redux";
import { AUTHORIZATION_STATUS } from "./authorization";
import { COLLECTION_REQUEST, COLLECTION_REQUEST_ERROR, COLLECTION_REQUEST_SUCCESS } from "./collection";
import { collectionReducer, CollectionState } from "./collectionReducer";
import { COLLECTIONS_REQUEST, COLLECTIONS_REQUEST_ERROR, COLLECTIONS_REQUEST_SUCCESS } from "./collections";
import { collectionsReducer, CollectionsState } from "./collectionsReducer";
import { TOPICS_REQUEST, TOPICS_REQUEST_ERROR, TOPICS_REQUEST_SUCCESS } from "./topics";
import { topicsReducer, TopicsState } from "./topicsReducer";

export type RootState = {
  isAuthorized: boolean
  topics: TopicsState
  collections: CollectionsState
  collection: CollectionState
}

const initialState: RootState = {
  isAuthorized: false,
  topics: {loading: false, error: '', items: []},
  collections: {loading: false, error: '', items: []},
  collection: {loading: false, error: '', items: []}
}

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    switch (action.type) {      
      case AUTHORIZATION_STATUS:
        return {...state, isAuthorized: action.status}
      case TOPICS_REQUEST:
      case TOPICS_REQUEST_ERROR: 
      case TOPICS_REQUEST_SUCCESS:
        return {...state, topics: topicsReducer(state.topics, action)}
      case COLLECTIONS_REQUEST:
      case COLLECTIONS_REQUEST_ERROR:
      case COLLECTIONS_REQUEST_SUCCESS:
        return {...state, collections: collectionsReducer(state.collections, action)}
      case COLLECTION_REQUEST:
      case COLLECTION_REQUEST_ERROR:
      case COLLECTION_REQUEST_SUCCESS:
          return {...state, collection: collectionReducer(state.collection, action)}
      default:
        return state
  }
}