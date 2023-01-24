import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({children, onPress}) {

    return (
      <View style={styles.buttonOuterContainer}>
        {/* pressable이 view 안에 있으면, ripple 효과 넣을 수 있음 */}
        <Pressable
        // ios용 터치 시의 효과
          style={({ pressed }) =>
            pressed
              ? [styles.buttonInnerContainer, styles.pressed]
              : styles.buttonInnerContainer
          }
          onPress={onPress}
          android_ripple={{ color: Colors.primary600 }}
        >
          <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',  //컨테이너를 넘어가는 부분은 잘려서 안 보이도록 함
    
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8, //상하단 간격
    paddingHorizontal: 16, //양옆 간격
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75
  }
});
