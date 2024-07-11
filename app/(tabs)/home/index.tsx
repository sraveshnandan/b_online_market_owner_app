import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { hp, tintColorLight, wp } from '@/constants';
import { Bannen, CategorySlider } from '@/components';
import { SearchBar } from 'react-native-screens';

const HomeScreen = () => {
  const navigation = useNavigation();

  // setting some header data 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      // headerLeftsetion 
      headerLeft: () => (
        <View style={styles.left_nav_container}>
          <Image style={styles.nav_logo} source={require("../../../assets/images/icon.png")} />
          <Text style={styles.header_nav_text}>Online Market</Text>
        </View>
      ),
      // // headerRightSection 
      headerRight: () => (
        <View style={styles.rightHeader}>
          <Ionicons name='cart-outline' size={28} />
          <AntDesign name='customerservice' size={28} />
        </View>
      ),
      headerSearchBarOptions: {
        inputType: "text",
        headerIconColor: tintColorLight,
        shouldShowHintSearchIcon: true,
        onchange: (e: any) => {
          console.log("search text", e.nativeEvent.text)
        }
      }
    })
  }, [])



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.maincontainer}>
      {/* category slider  */}
      <CategorySlider />
      {/* banners  */}
      <Bannen />

      {/* recomended shop  */}

      {/* trending products  */}

      {/* shop list with search filter  */}

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
    paddingRight: wp(2)
  },
  left_nav_container: {
    paddingLeft: wp(2),
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2)
  },
  nav_logo: {
    width: wp(10),
    height: hp(5),
    borderRadius: 8
  },
  header_nav_text: {
    fontSize: hp(2.4),
    fontWeight: "600"
  },
  maincontainer: {
    flex: 1,
    padding: wp(2),

  },

})