import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { Colors, hp, ShopMenu, wp } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchUserProfile, logout } from '@/redux/reducers/auth.reducer';
import Toast from 'react-native-toast-message';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchAlldata } from '@/redux/reducers/main.reducers';
import Animated, { FadeInDown } from 'react-native-reanimated';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { userData, authToken, userShop } = useSelector((state: RootState) => state.auth);
  const [refreshing, setrefreshing] = useState(false);

  // states 

  // setting some header data 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      // headerLeftsetion 
      headerLeft: () => (
        <View style={styles.left_nav_container}>
          <Image style={styles.nav_logo} source={require("../../../assets/images/icon.png")} />
          {userShop && (<Text style={styles.header_nav_text}>{userShop && userShop.name.length > 26 ? `${userShop.name.substring(0, 26)}...` : userShop.name}</Text>)}
        </View>
      ),
      // // headerRightSection 
      headerRight: () => (
        <View style={styles.rightHeader}>
          <AntDesign name='customerservice' size={29} color={Colors.Primary} />
        </View>
      ),

    });

  }, [])


  // checking if user has any shop 

  useEffect(() => {
    if (!userData.isShopOwner) {
      return router.replace(`/(auth)/startBusiness`)
    }
  }, [])







  // handling refress controll 

  const onRefress = async () => {
    setrefreshing(true)
    try {
      dispatch(fetchAlldata() as any)
      dispatch(fetchUserProfile({ token: authToken }) as any)
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Something wnet wrong.",
        text2: "Please check your internet connection."
      })
    } finally {
      setrefreshing(false)
    }


  }

  return userData.isShopOwner && userShop.address && (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefress} />} showsVerticalScrollIndicator={false} style={styles.maincontainer}>
      {/* support model  */}


      {/* shop info */}
      <View style={{ height: hp(45) }} className='relative   h-fit'>
        <View style={{ height: hp(30) }} className='w-[98%] rounded-md overflow-hidden  mx-auto '>
          {userShop.banners.length && (
            <Image source={{ uri: userShop?.banners[0].url }} width={100} height={100} className='w-full h-full object-cover' />
          )}

        </View>
        {/* infocard  */}

        <Animated.View entering={FadeInDown.delay(500).springify()} style={{ height: hp(16) }} className='w-[85%] items-center  shadow-lg shadow-black relative -top-12  z-50 mx-auto p-3 bg-primary rounded-md'>
          <Text className='text-white text-xl '>{userShop.name}
          </Text>

          <View className='flex-row items-center mt-2 '>
            <Ionicons name='location' color={"#fff"} size={18} />
            <Text className='text-white ml-2 opacity-75'>{userShop.address.substring(0, 50)}...</Text>
          </View>

          <View className='flex-row items-center mt-2 '>
            <Ionicons name='call-sharp' color={"#fff"} size={18} />
            <Text className='text-white ml-2 opacity-75'>+91 {userData.phone_no}</Text>
          </View>

          <View className='flex-row items-center mt-2 '>
            <Ionicons name='calendar' color={"#fff"} size={18} />
            <Text className='text-white ml-2 opacity-75'> {new Date(userShop.createdAt).toDateString()}</Text>
          </View>

        </Animated.View>
      </View>

      <Text className='text-primary text-2xl font-semibold text-center my-2'>Manage your shop</Text>

      <View className='flex-row flex-wrap items-center h-fit justify-center '>
        {ShopMenu.map((item, index) => (
          <TouchableOpacity onPress={() => router.push(item.link)} style={{ height: hp(10) }} key={index} className='items-center justify-center bg-white m-2 p-2 rounded-md shadow-lg shadow-black w-[28%]'>
            <MaterialCommunityIcons name={item.icon as any} size={30} color={Colors.Primary} />
            <Text className='text-md font-semibold text-primary mt-2'>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>


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