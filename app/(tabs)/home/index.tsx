import { View, Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Colors, hp, tintColorLight, wp } from '@/constants';
import { Banner, CategorySlider, ProductCard, ShopList, ShopSearchModel, SupportModel } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchAlldata } from '@/redux/reducers/main.reducers';
import { IShop } from '@/types';
import ShopCard from '@/components/shared/ShopCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { banners, shops, products } = useSelector((state: RootState) => state.main);
  const { userData, authState } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart)
  const [refreshing, setrefreshing] = useState(false);
  const [recomendedShop, setrecomendedShop] = useState<IShop[]>(shops.filter(s => s.pin_code === Number(userData.pin_code)));

  // states 
  const [modelOpen, setmodelOpen] = useState(false);
  const [shopModeOpen, setshopModeOpen] = useState(false)


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
          <View className='p-2'>
            {
              cart.length > 0 && (
                <View className='bg-red-600 items-center top-0   w-5 h-5 z-50 right-0  rounded-full justify-center absolute '>
                  <Text className="text-white text-xsm font-semibold ">{cart.length}</Text>
                </View>
              )
            }
            <Ionicons onPress={() => router.push("/(screens)/cart")} name='cart-outline' size={28} />
          </View>
          <AntDesign name='customerservice' onPress={() => setmodelOpen(prev => !prev)} size={28} />
          <AntDesign name='search1' onPress={() => setshopModeOpen(prev => !prev)} size={28} color={Colors.Primary} />
        </View>
      ),

    })
  }, [cart.length])






  // handling refress controll 

  const onRefress = useCallback(() => {

    setrefreshing(true);
    dispatch(fetchAlldata() as any);
    setrefreshing(false)


  }, [])


  console.log(recomendedShop.length)


  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefress} />} showsVerticalScrollIndicator={false} style={styles.maincontainer}>
      {/* support model  */}
      <SupportModel isOpen={modelOpen} setOpen={setmodelOpen} email='' phone='' />

      {/* shop search model  */}
      <ShopSearchModel isOpen={shopModeOpen} setIsopen={setshopModeOpen} />
      {/* category slider  */}
      <CategorySlider />
      {/* banners  */}
      <Banner images={banners} infinite={true} delay={2500} dotColor={Colors.Primary} />
      {
        authState && (
          <>
            {/* recomended shop  */}
            <ShopList title='Recomended Shops' shops={recomendedShop} />
          </>
        )
      }
      {/* trending products  */}
      <Text className='text-xl border-b-2 border-b-primary mx-auto border-x-white pb-2 font-semibold text-center mb-4'>Trending products</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full p-2 mb-8'>
        {products.map((item, index) => <View style={{ width: wp(50), marginHorizontal: 10 }}>
          {/* indicator  */}
          <View className='bg-green-500 p-2 shadow-lg shadow-black absolute flex-row items-center z-50 rounded-md'>
            <Ionicons name='trending-up-outline' size={22} color={"#fff"} />
            <Text className='text-sm text-white font-semibold ml-2'>Trending</Text>
          </View>
          <ProductCard cardWidth={"100%"} pr={item} key={index} /></View>)}
      </ScrollView>
      {/* shop list with search filter  */}

      {/* trending products  */}
      <Text className='text-xl border-b-2 border-b-primary pb-2 border-x-white mx-auto font-semibold text-center mb-4'>All Shops</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full  mb-8'>
        {shops.map((item, index) =>
          <View style={{ width: wp(100), }}>
            {/* indicator  */}
            <View className='bg-green-500 p-2 shadow-lg shadow-black absolute flex-row items-center z-50 rounded-md'>
              <Ionicons name='trending-up-outline' size={22} color={"#fff"} />
              <Text className='text-sm text-white font-semibold ml-2'>Trending</Text>
            </View>
            <ShopCard shop={item} key={index} />
          </View>
        )}
      </ScrollView>

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