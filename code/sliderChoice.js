import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RNListSlider from 'react-native-list-slider';
import 'react-native-gesture-handler';
import happy from 'C://Users//kjh14//Onsaemiro//assets//happy.png';
import soso from 'C://Users//kjh14//Onsaemiro//assets//soso.png';
import sad from 'C://Users//kjh14//Onsaemiro//assets//sad.png';
import axios from 'axios';
let photo = soso;
let emo = "기분이 보통이에요";

export default class SliderChoice extends Component {
  state = {
    value: 5,
  };

  //onValueChanged = value => this.setState({value});
  onValueChanged = value => {
    this.setState({
      value: Math.round(value)
    });
    if (value < 3) {
      photo = sad;
      emo = "기분이 나빠요";
    }
    else if (value < 7) {
      photo = soso;
      emo = "기분이 보통이에요";
    }
    else if (value <= 10) {
      photo = happy;
      emo = "기분이 좋아요"
    }

  };

  mainAct(props){
    const count = this.props.route.params.countUp; //현재의 질문 번호
    const countQuest = this.props.route.params.countDown; //현재 시점에서 남은 질문 갯수
    const Question = "Q";
    const Answer = "A";
    var WholeTool = this.props.route.params.WholeBox;
    var QuestionTool = this.props.route.params.QuestionBox;
    var AnswerTool = this.props.route.params.AnswerBox;

    if (countQuest == 0) { //마지막 질문지인 경우
      AsyncStorage.getItem('userId', (err, result) => {
        AnswerTool[Answer + count] = props;
        QuestionTool[Question + count] = "기분 점수";
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
      QuestionTool[Question + count] = this.props.route.params.Qcontent;

      const Qjson = JSON.parse(this.props.route.params.str_Quest); //스트링 형태로 넘어온 질문정보 파싱
      const Qinfo = JSON.stringify(Qjson); //다시 스트링화
      const QAnswer = JSON.parse(Qjson[this.props.route.params.countUp].option); //다음 질문지의 답변 정보 파싱
      const QPhoto = JSON.parse(Qjson[this.props.route.params.countUp].photo); //다음 질문지의 사진 정보 파싱
      const countChoice = Qjson[this.props.route.params.countUp].type; //다음 질문지의 답변 갯수
      const contentOfQuestion = Qjson[this.props.route.params.countUp].question; //다음질문지의 질문정보
      const contentOfAnswerOne = QAnswer.a1; //다음질문지의 답변1 내용
      const contentOfAnswerTwo = QAnswer.a2; //다음질문지의 답변2 내용
      const imageOfQuestion = QPhoto.q; //다음 질문지의 질문 사진
      const imageOfAnswerOne = QPhoto.a1; //다음 질문지의 답변1 사진
      const imageOfAnswerTwo = QPhoto.a2; //다음 질문지의 답변2 사진

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
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
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
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
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
          WholeBox: WholeTool,
          QuestionBox: QuestionTool,
          AnswerBox: AnswerTool
        });
      } else if (countChoice == 1) {
        this.props.navigation.navigate('SliderChoice', { //슬라이더
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.tf1}>{"\n"}기분을 점수로 표현해봐요!</Text>
        </View>
        <View style={styles.imogi}>
          <Image source={photo} style={styles.image} />
        </View>
        <View style={styles.text}>
          <Text style={styles.tf2}>행복 지수: {this.state.value}</Text>
          <Text style={styles.tf2}>{emo}</Text>
        </View>
        <RNListSlider
          value={this.state.value}
          onValueChange={this.onValueChanged}
          //onPress={this.Photo}
          arrayLength={121}
        />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.bs}
            onPress={() => this.mainAct(this.state.value)}>
            <Text style={styles.tf2}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    height: '85%',
    width: '60%',
    resizeMode: 'contain',
    borderRadius: 35,
    marginTop: 15
  },
  tf1: {
    fontSize: 40,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  tf2: {
    fontSize: 30,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  imogi: {
    flex: 3,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  bs: {
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: 'skyblue',
    marginTop: 25,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});