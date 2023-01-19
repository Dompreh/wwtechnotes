import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { store } from '../../app/store'

const Prefetch = () => {
    useEffect(() => {
        // console.log('subscribing')
        //manually subscribin our data so that the data doesn't disappear after 15s 0r 60s
      store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force: true}))
      store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))    
    }, [])
    return <Outlet/>

}

export default Prefetch