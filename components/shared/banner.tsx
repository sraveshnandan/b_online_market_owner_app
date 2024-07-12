import { tintColorLight } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    Image,
} from "react-native";

const Slider = ({ images }: { images: string[] }) => {
    const { width } = Dimensions.get("window");
    const height = width * 0.7;

    const [active, setActive] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const onScrollChange = ({ nativeEvent }: { nativeEvent: any }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (active < images.length - 1) {
                scrollViewRef.current?.scrollTo({
                    x: (active + 1) * width,
                    animated: true,
                });
                setActive(active + 1);
            } else {
                scrollViewRef.current?.scrollTo({
                    x: 0,
                    animated: true,
                });
                setActive(0);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [active, images.length]);

    return (
        <View>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={onScrollChange}
                showsHorizontalScrollIndicator={false}
                style={{ width, height }}
                ref={scrollViewRef}
                scrollEventThrottle={16}
            >
                {!!images.length
                    ? images.map((i, index) => (
                        <Image
                            style={{ width: width, height: height, resizeMode: "contain" }}
                            key={index}
                            source={{ uri: i }}
                        />
                    ))
                    : (<View></View>)}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((i, k) => (
                    <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: -15,
        alignSelf: "center",
    },
    dot: {
        color: "#888",
        fontSize: 40,
    },
    activeDot: {
        color: tintColorLight,
        fontSize: 40,
    },
});

export default Slider;