import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function SliderChoice({ route, navigation }) {

  const mainAct = (props) => {
    const count = route.params.countUp; //현재의 질문 번호
    const countQuest = route.params.countDown; //현재 시점에서 남은 질문 갯수
    const Question = "Q";
    const Answer = "A";
    var WholeTool = route.params.WholeBox;
    var QuestionTool = route.params.QuestionBox;
    var AnswerTool = route.params.AnswerBox;

    if (countQuest == 0) { //마지막 질문지인 경우
      AsyncStorage.getItem('userId', (err, result) => {
        AnswerTool[Answer + count] = props;
        QuestionTool[Question + count] = route.params.Qcontent;
        WholeTool.id = result;
        WholeTool.answer = AnswerTool;
        WholeTool.question = QuestionTool;
        const response = axios.post("http://13.209.212.43/api/upload_answer", {
          WholeTool
        })
      })

      alert('문진이 완료되었습니다');
      navigation.reset({ routes: [{ name: 'MainScreen' }] })

    } else { //여분의 질문지가 남은 경우
      AnswerTool[Answer + count] = props;
      QuestionTool[Question + count] = route.params.Qcontent;

      const Qjson = JSON.parse(route.params.str_Quest); //스트링 형태로 넘어온 질문정보 파싱
      const Qinfo = JSON.stringify(Qjson); //다시 스트링화
      const QAnswer = JSON.parse(Qjson[route.params.countUp].option); //다음 질문지의 답변 정보 파싱
      const QPhoto = JSON.parse(Qjson[route.params.countUp].photo); //다음 질문지의 사진 정보 파싱
      const countChoice = Qjson[route.params.countUp].type; //다음 질문지의 답변 갯수
      const contentOfQuestion = Qjson[route.params.countUp].question; //다음질문지의 질문정보
      const contentOfAnswerOne = QAnswer.a1; //다음질문지의 답변1 내용
      const contentOfAnswerTwo = QAnswer.a2; //다음질문지의 답변2 내용
      const imageOfQuestion = QPhoto.q; //다음 질문지의 질문 사진
      const imageOfAnswerOne = QPhoto.a1; //다음 질문지의 답변1 사진
      const imageOfAnswerTwo = QPhoto.a2; //다음 질문지의 답변2 사진

      if (countChoice == '2') {
        navigation.navigate('TwoChoice', {
          str_Quest: Qinfo, //스트링으로 변환한 질문 정보
          countDown: countQuest - 1, //남은 질문의 수
          countUp: count + 1, //질문지 번호
          Qcontent: contentOfQuestion, //질문지 내용
          AcontentOne: contentOfAnswerOne, //답변 내용1
          AcontentTwo: contentOfAnswerTwo, //답변 내용2
          Qimage: imageOfQuestion, //질문 사진
          AimageOne: imageOfAnswerOne, //답변1 사진
          AimageTwo: imageOfAnswerTwo, //답변2 사진
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
        });
      } else if (countChoice == 3) {
        navigation.navigate('ThreeChoice', { //선택지 3개
          str_Quest: Qinfo,
          countDown: countQuest - 1,
          countUp: count + 1,
          Qcontent: contentOfQuestion,
          AcontentOne: contentOfAnswerOne,
          AcontentTwo: contentOfAnswerTwo,
          AcontentThree: QAnswer.a3,
          Qimage: imageOfQuestion,
          AimageOne: imageOfAnswerOne,
          AimageTwo: imageOfAnswerTwo,
          AimageThree: QPhoto.a3,
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
        });
      } else if (countChoice == 4) {
        navigation.navigate('FourChoice', { //선택지 4개
          str_Quest: Qinfo,
          countDown: countQuest - 1,
          countUp: count + 1,
          Qcontent: contentOfQuestion,
          AcontentOne: contentOfAnswerOne,
          AcontentTwo: contentOfAnswerTwo,
          AcontentThree: QAnswer.a3,
          AcontentFour: QAnswer.a4,
          Qimage: imageOfQuestion,
          AimageOne: imageOfAnswerOne,
          AimageTwo: imageOfAnswerTwo,
          AimageThree: QPhoto.a3,
          AimageFour: QPhoto.a4,
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
        });
      } else if (countChoice == 1) {
        navigation.navigate('SliderChoice', { //슬라이더
          str_Quest: Qinfo,
          countDown: countQuest - 1,
          countUp: count + 1,
          Qcontent: contentOfQuestion,
          Qimage: imageOfQuestion,
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Image style={styles.image} source={{ uri: route.params.Qimage }} />
        <Text sytle={styles.titleText}>{route.params.Qcontent}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => mainAct(route.params.AcontentOne)}>
          <Image style={styles.image} source={{ uri: route.params.AimageOne }} />
          <Text style={styles.titleButton}>{route.params.AcontentOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => mainAct(route.params.AcontentTwo)}>
          <Image style={styles.image} source={{ uri: route.params.AimageTwo }} />
          <Text style={styles.titleButton}>{route.params.AcontentTwo}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  image: {
    justifyContent: 'center',
    height: '75%',
    width: '75%',
    resizeMode: 'contain',
    borderRadius: 35,
    marginTop: 15
  },
  titleText: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: 10
  },
  titleButton: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  question: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 25
  },
});