import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation ({
            query: credentials =>({
                url:'/auth',
                method: 'POST',
                body:{...credentials}
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url:'/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted (arg, {dispatch, queryFulfilled}){
                try{
                   const {data} = await queryFulfilled 
                   console.log(data)
                   //clear cookies
                    dispatch(logOut()) //clear the token in the authSlice
                    setTimeout(() =>{
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                     //clear the cache and query subscriptions
                }catch(err){
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () =>({
                url:'/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted (arg, {dispatch, queryFulfilled}){
                try{
                   const {data} = await queryFulfilled 
                   console.log(data)
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                     //clear the cache and query subscriptions
                }catch(err){
                    console.log(err)
                }
            }
        }),
    })
})

export const {useLoginMutation, useRefreshMutation, useSendLogoutMutation} = authApiSlice