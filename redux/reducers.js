import { combineReducers } from 'redux'
import { GET_CONTACTS_INFO, ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./types"

const defaultContacts = [
    {
        id: 1,
        phone1: { type: 'Mobile', value: '1234567890' },
        phone2: { type: 'Home', value: '' },
        email: { type: 'Work', value: '' },
        name: 'Rahul',
        image: ''
    },
    {
        id: 2,
        phone1: { type: 'Mobile', value: '' },
        phone2: { type: 'Home', value: '1234567890' },
        email: { type: 'Work', value: '' },
        name: '',
        image: ''
    },
    {
        id: 3,
        phone1: { type: 'Mobile', value: '' },
        phone2: { type: 'Home', value: '' },
        email: { type: 'Work', value: 'a@gmail.com' },
        name: '',
        image: ''
    },
    {
        id: 4,
        phone1: { type: 'Mobile', value: '1234567890' },
        phone2: { type: 'Home', value: '1234567890' },
        email: { type: 'Work', value: 'a@gmail.com' },
        name: 'Shankar',
        image: ''
    },
]

const contactsInfo = (state = defaultContacts, action) => {
    switch (action.type) {
        case GET_CONTACTS_INFO:
            return state
        case ADD_CONTACT:
            return [...state, { ...action.payload, id: Math.max.apply(this, state.map(s => s.id)) + 1 }]
        case EDIT_CONTACT:
            return [...state.filter(item => item.id !== action.payload.id), action.payload]
        case DELETE_CONTACT:
            return [...state.filter(item => item.id !== action.payload)]
        default:
            return state
    }
}

export default combineReducers({ contactsInfo })