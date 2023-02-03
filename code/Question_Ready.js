import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';


export default class Question_Ready extends Component {

  async mainAct(cate) {

    const count = 0;
    const response = await axios.get("http:/13.209.212.43/api/load_question", {
      params: {
        category: cate
      }
    })
    console.log(response.data);

    // const navigate = this.props.navigate;
    const Qjson = response.data; //서버에서 받아온 질문 정보
    const Qinfo = JSON.stringify(Qjson); //스트링으로 변환한 질문 정보
    const QAnswer = JSON.parse(Qjson[count].option); //다음질문 페이지의 답변정보 파싱
    const QPhoto = JSON.parse(Qjson[count].photo); //다음질문 페이지의 질문정보 파싱
    const countQuest = Qjson.length; //총 질문의 갯수
    const countChoice = Qjson[count].type; //다음질문 페이지의 답변 갯수
    const contentOfQuestion = Qjson[count].question; //다음질문페이지의 질문내용
    const contentOfAnswerOne = QAnswer.a1; //다음질문 페이지의 첫번째 답변
    const contentOfAnswerTwo = QAnswer.a2; //다음질문 페이지의 두번째 답변
    const imageOfQuestion = QPhoto.q; //다음질문 페이지의 질문 이미지
    const imageOfAnswerOne = QPhoto.a1; //다음질문 페이지의 첫번째 답변 이미지
    const imageOfAnswerTwo = QPhoto.a2; //다음질문 페이지의 두번째 답변 이미지

    var Whole = {
      "category": cate,
      "type": countQuest
    };
    var Question = {

    };
    var Answer = {

    };

    if (countChoice == '2') {
      this.props.navigation.navigate('TwoChoice', {
        str_Quest: Qinfo, //스트링으로 변환한 질문 정보
        countDown: countQuest - 1, //남은 질문의 수
        countUp: count + 1, //질문지 번호
        Qcontent: contentOfQuestion, //질문지 내용
        AcontentOne: contentOfAnswerOne, //답변 내용1
        AcontentTwo: contentOfAnswerTwo, //답변 내용2
        Qimage: imageOfQuestion, //질문 사진
        AimageOne: imageOfAnswerOne, //답변1 사진
        AimageTwo: imageOfAnswerTwo, //답변2 사진
        WholeBox: Whole,
        QuestionBox: Question,
        AnswerBox: Answer
      });
    } else if (countChoice == 3) {
      this.props.navigation.navigate('ThreeChoice', { //선택지 3개
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
        WholeBox: Whole,
        QuestionBox: Question,
        AnswerBox: Answer
      });
    } else if (countChoice == 4) {
      this.props.navigation.navigate('FourChoice', { //선택지 4개
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
        WholeBox: Whole,
        QuestionBox: Question,
        AnswerBox: Answer
      });
    } else if (countChoice == 1) {
      this.props.navigation.navigate('SliderChoice', { //슬라이더
        str_Quest: Qinfo,
        countDown: countQuest - 1,
        countUp: count + 1,
        Qcontent: contentOfQuestion,
        Qimage: imageOfQuestion,
        WholeBox: Whole,
        QuestionBox: Question,
        AnswerBox: Answer
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={() => { this.mainAct("H") }}>
            <Image style={styles.image} source={require('./../assets/health.png')} />
            <Text style={styles.title}>건강</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { this.mainAct("M") }}>
            <Image style={styles.image} source={require('./../assets/mental.png')} />
            <Text style={styles.title}>마음</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => { this.mainAct("S") }}>
            <Image style={styles.image} source={require('./../assets/safe.png')} />
            <Text style={styles.title}>안전</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { this.mainAct("DL") }}>
            <Image style={styles.image} source={require('./../assets/daily.png')} />
            <Text style={styles.title}>일상</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  footer: {
    flex: 2,
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
  image: {
    height: '75%',
    width: '75%',
    resizeMode: 'contain',
    borderRadius: 35
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
  },
});