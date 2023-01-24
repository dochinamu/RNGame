import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    // 0과 1사이 난수를 최댓값 최솟값 사이 난수로 전환 후 소수 자리 정리
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    
    // 첫판부터 답을 맞히지 못하도록 써둔 장치
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;


function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const { width, height } = useWindowDimensions();
    
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    // 두번째 인자가 빈 배열이면, 이 컴포넌트가 '처음 렌더링 될 때 + UI에서 제거된 후 다시 추가됐을 때'만 실행됨
    useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) {
        // 무한루프 방지용 
        if (
          (direction === "lower" && currentGuess < userNumber) ||
          (direction === "greater" && currentGuess > userNumber)
        ) {
            
            Alert.alert("Don't Lie!", 'You know that this is wrong ...'), [
                { text: 'Sorry!', style: 'cancel'},
            ];    
            return;
        }

          if (direction === "lower") {
            maxBoundary = currentGuess;
          } else {
            minBoundary = currentGuess + 1;
          }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    // 컴포넌트 실행 시마다(새 라운드마다) 다시 계산함
    const guessRoundsListLength = guessRounds.length;

    let content = (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            {/* bind: this가 지칭하는 값을 두번째 매개변수 값으로 사전에 설정함 */}
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </>
    );

    if (width > 500) {
      content = (
        <>
          <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>

            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </>
      );
    } 

    return (
      <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        {content}
        {/* FlatList는 높이가 무한인 것처럼 작동하므로, FlatList의 높이를 제한하는 부모 컨테이너를 추가하자!*/}
        <View style={styles.listContainer}>
          {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
          {/* FlatList: data, renderItem 인수 지정. itemData는 자동으로 인식하는 매개변수이며, 현재는 숫자만 data에 들어가있으니 .item.value 없이 .item만 해줘도 충분함. 키 프로퍼티도 본래는 객체에서 자동으로 추가해주지면 이 경우엔 숫자이므로 keyExtractor로 키 찾게 알려주기*/}
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
      marginBottom: 12,
    },
    buttonsContainer: {
      flexDirection: 'row'
  },
  buttonContainer: {
      flex: 1
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    padding: 16,
  }
})