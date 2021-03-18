import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import contactsInfo from './redux/reducers'
import ContactScreen from './screens/ContactScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import AddContactScreen from './screens/AddContactScreen'
import EditContactScreen from './screens/EditContactScreen'
import MoreMenu from './components/MoreMenu'

const Stack = createStackNavigator()

export default () => {
  return (
    <Provider store={createStore(contactsInfo)}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ContactScreen} options={{ title: 'Contacts' }} />
          <Stack.Screen
            name="Details"
            component={ContactDetailsScreen}
            options={({ route, navigation }) => ({
              title: 'Contact Details',
              headerRight: () => <MoreMenu contactDetail={route.params.contactDetail} navigation={navigation} />
            })} />
          <Stack.Screen name="Add New Contact" component={AddContactScreen} options={{ title: 'Add New Contact' }} />
          <Stack.Screen name="Edit Contact" component={EditContactScreen} options={{ title: 'Edit Contact', }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
