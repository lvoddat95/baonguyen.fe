import { ActionReducerMap } from "@ngrx/store";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { EcommerceState, ecommercerReducer } from "./Ecommerce/ecommerce_reducer";
import { FileManagerReducer, FileManagerState } from "./File Manager/filemanager_reducer";
import { ApikeyReducer, ApikeyState } from "./APIKey/apikey_reducer";
// import { authenticationReducer, AuthenticationState } from "./Authentication/authentication.reducer";

export interface RootReducerState {
    layout: LayoutState;
    Ecommerce: EcommerceState;
    FileManager: FileManagerState;
    APIKey: ApikeyState;
    // authentication: AuthenticationState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    Ecommerce: ecommercerReducer,
    FileManager: FileManagerReducer,
    APIKey: ApikeyReducer,
    // authentication: authenticationReducer,

}