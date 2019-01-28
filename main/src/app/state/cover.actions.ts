import { Action } from "@ngrx/store";

export enum CoverActionTypes {
    HandleToggleLargeImages = '[COVER] TOGGLE_IMAGE_SIZE',
    LoadSuccess = "[COVER] LOAD_SUCCESS",
    Load = "[COVER] LOAD",
    LoadFail = "[COVER] LOAD_FAIL"
}

export class HandleToggleLargeImages implements Action {
    readonly type = CoverActionTypes.HandleToggleLargeImages;

    constructor(public payload: boolean) { }
}


export type CoverAction = HandleToggleLargeImages