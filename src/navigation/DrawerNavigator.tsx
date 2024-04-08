import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import DrawerContent from "./components/DrawerContent";

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent props={props}/>}>
            <Drawer.Screen name='InsideLayout' component={StackNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator