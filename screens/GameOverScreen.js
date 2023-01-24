import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
    const {width, height} = useWindowDimensions();

    let imageSize = 300;

    if (width < 300) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

     const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius : imageSize / 2
     }

    return (
        <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        {/* 중첩된 text끼리는 부모 컴포넌트에 설정한 텍스트 스타일이 자식에게도 영향을 줌 */}
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
      </ScrollView>

    );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        // width = height 이면서, borderRadius는 그의 절반이면 원형 이미지 만들어짐
        // borderRadius: deviceWidth < 300 ? 75 : 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        overflow: 'hidden',          // 이미지의 모서리(튀어나온 부분 숨김)
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontsize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})