import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import StyledText from '../../components/StyledText';
import DrawerLink from './DrawerLink';
import { DRAWER_LINKS } from '../../utils/drawerLinks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../../../firebaseCofing';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


function DrawerContent(props: any) {
    
    const navigation = useNavigation()

    const handleLogout = () => {
        FIREBASE_AUTH.signOut()
        navigation.dispatch(DrawerActions.closeDrawer())
    }
    
    return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.drawerContent}>
        <View style={styles.userContainer}>
          <View style={styles.userPicture}></View>
          <View style={styles.userData}>
            <StyledText semibold color="negative">Facundo Toloza</StyledText>
            <StyledText color="negative" fontSize="small">facutoloza2005@gmail.com</StyledText>
          </View>
        </View>
        <View style={styles.drawerLinks}>
          {DRAWER_LINKS.map((link, index) => (
            <DrawerLink key={index} title={link.name} icon={link.icon} />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => handleLogout()} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" color={theme.colors.negative} size={20} />
        <StyledText color="negative">Salir</StyledText>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.accent
  },
  drawerContent: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  userPicture: {
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    width: 75,
    height: 75,
  },
  userData: {
    marginLeft: 12,
  },
  drawerLinks: {
    paddingHorizontal: 36,
    marginTop: 24
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingBottom: 24,  
    gap: 12  
  },
});

export default DrawerContent;
