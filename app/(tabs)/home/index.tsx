import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Colors, hp, tintColorLight, wp } from '@/constants';
import { Banner, CategorySlider, ShopList, SupportModel } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { banners, shops } = useSelector((state: RootState) => state.main)

  // states 
  const [modelOpen, setmodelOpen] = useState(false)

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
          <AntDesign name='customerservice' onPress={() => setmodelOpen(prev => !prev)} size={28} />
        </View>
      ),
      headerSearchBarOptions: {
        inputType: "text",
        headerIconColor: tintColorLight,
        shouldShowHintSearchIcon: true,
        placeholder: 'Search ...',
        onChangeText: (event: any) => {
          const query = event.nativeEvent.text;
          // Add your search logic here
          console.log(query);
        },
        autoCapitalize: 'none',
        spellCheck: false,
        autoCorrect: false,
      }
    })
  }, [])



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.maincontainer}>
      {/* support model  */}
      <SupportModel isOpen={modelOpen} setOpen={setmodelOpen} email='' phone='' />
      {/* category slider  */}
      <CategorySlider />
      {/* banners  */}
      <Banner images={banners} infinite={true} delay={2500} dotColor={Colors.Primary} />
      {/* recomended shop  */}
      <ShopList title='Recomended Shops' shops={shops} />
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
    width: wp(8),
    height: hp(4),
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