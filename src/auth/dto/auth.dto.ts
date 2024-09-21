export interface WsAuthRequest{
    token : string
}

export interface WsMessageResponse{
    resonseCount : number,
    uid : string,
    number : number
}

export interface RegisterAuthResponse{
    access_token : string
}

export interface User{
    uid : string
}