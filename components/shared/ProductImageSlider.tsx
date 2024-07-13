import { Colors, ScreenHeight, ScreenWidth, } from "@/constants";
import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    ImageStyle,
    ViewStyle
} from "react-native";

interface ISliderProps {
    images?: { id?: string; url?: string }[];
    dotColor?: string | "royalblue";
    inActiveDotColor?: string | "#222";
    contentStyle?: ImageStyle;
    containerStyle?: ViewStyle;
}

const ProductimageSlider = ({
    images,
    dotColor,
    inActiveDotColor,
    containerStyle,
    contentStyle,
}: ISliderProps) => {
    const width = ScreenWidth * 0.96;
    const height = ScreenHeight * 0.4;
    // Satates
    const [active, setActive] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView | null>(null);

    // OnSlider Window Changed
    const onScrollChange = ({ nativeEvent }: { nativeEvent: any }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    // handle image click

    const handleImageClick = (index: number) => {
        return console.log(`${index} image is clicked.`);
    };

    return (
        <View>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={onScrollChange}
                showsHorizontalScrollIndicator={false}
                style={[styles.sliderContainer, containerStyle ? containerStyle : null]}
                ref={scrollViewRef}
                scrollEventThrottle={16}
            >
                {images &&
                    images.map((item, index) => (
                        <View key={index}>
                            <Image
                                style={[
                                    {
                                        width: width * 0.996,
                                        height: height,
                                    },
                                    contentStyle ? contentStyle : null,
                                ]}
                                resizeMethod="resize"
                                source={{ uri: item.url }}
                            />
                        </View>
                    ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images &&
                    images.map((i: any, index: number) => (
                        <View
                            key={index}
                            style={
                                index === active
                                    ? {
                                        marginHorizontal: 5,
                                        backgroundColor: dotColor,
                                        padding: 4,
                                        width: 15,
                                        borderRadius: 55,
                                    }
                                    : {
                                        marginHorizontal: 5,
                                        backgroundColor: inActiveDotColor,
                                        padding: 4,
                                        width: 5,
                                        borderRadius: 55,
                                    }
                            }
                        ></View>
                    ))}
            </View>
        </View>
    );
};

export default ProductimageSlider;

const styles = StyleSheet.create({
    sliderImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        marginRight: 2,
        borderRadius: 8,
    },
    sliderContainer: {
        width: ScreenWidth * 0.96,
        maxHeight: ScreenHeight * 0.45,
        overflow: "hidden",
        zIndex: 100,
    },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 4,
        left: "35%",
        alignSelf: "flex-start",
        backgroundColor: Colors.CardBg,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 55,
        padding: 4,
        zIndex: 100,
    },
});