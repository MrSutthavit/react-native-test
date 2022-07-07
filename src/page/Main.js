import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {View, Text, Modal, Image} from 'react-native';
import {connect} from 'react-redux';

//redux
import {SendMember} from '../actions/auth.action';

const Main = ({navigation, dispatch, getMember}) => {
  const [data, setdata] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectdata, setselectdata] = useState({});
  useEffect(() => {
    if (getMember != null) {
      setdata(getMember.isResult);
    }
  }, [navigation, getMember]);

  const renderItem = ({item}) => (
    <View style={styles.Viewrender}>
      <View style={{width: '90%'}}>
        <Text style={styles.textItem}>
          ชื่อ: {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.textItem}>ID: {item.id}</Text>
        <Text style={styles.textItem}>เบอร์: {item.phone}</Text>
      </View>
      <View style={{width: '10%', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create', {temp: item, type: 'edit'});
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={{
              uri: 'https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              setselectdata(item);
              setmodalVisible(true);
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWEG6XTurTRPot2gunMp9Eln6Kvelp-uMkwY10fXiEkDvjuIWju8yo1oSLO3fMO6KGxIA&usqp=CAU',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.styles}>
      <ScrollView>
        <View style={styles.continer2}>
          <FlatList
            nestedScrollEnabled
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View style={styles.viewEmpty}>
                <Text style={styles.TextEmpty}>
                  คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.TouchAdd}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Create');
            }}
            style={styles.TouchAdd2}>
            <Text style={styles.TextAdd}>เพิ่ม</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.ViewModal}>
          <View style={styles.ViewModal2}>
            <View style={styles.viewcard}>
              <Text style={styles.textmodal}>ลบสมาชิก</Text>
              <Text style={styles.textmodal}>ต้องการลบ</Text>
              <Text style={styles.textmodal}>
                {selectdata.firstName} {selectdata.lastName}
              </Text>
            </View>
            <View style={styles.ViewModalTouch}>
              <TouchableOpacity
                onPress={() => {
                  setmodalVisible(false);
                }}
                style={styles.ViewModalTouch2}>
                <Text style={styles.textmodal}>ไม่</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const temp = [...data];
                  const index = temp.indexOf(selectdata);
                  if (index > -1) {
                    temp.splice(index, 1);
                  }
                  await dispatch(SendMember(temp));
                  setdata(temp);
                  setmodalVisible(false);
                }}
                style={styles.ViewModalTouch3}>
                <Text style={styles.textmodal}>ใช่</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  continer2: {
    marginHorizontal: 20,
  },
  viewEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  TextEmpty: {
    fontSize: 18,
    color: '#000',
  },
  TouchAdd: {
    alignItems: 'center',
    marginVertical: 20,
  },
  TouchAdd2: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  TextAdd: {
    fontSize: 18,
    color: '#000',
  },
  ViewModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ViewModal2: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 28,
    width: '60%',
    height: '20%',
    alignItems: 'center',
  },
  viewcard: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  textmodal: {
    fontSize: 14,
    color: '#000',
  },
  ViewModalTouch: {
    borderTopWidth: 1,
    width: '100%',
    flexDirection: 'row',
    flex: 1,
  },
  ViewModalTouch2: {
    width: '50%',
    borderRightWidth: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewModalTouch3: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Viewrender: {
    borderWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
  },
  textItem: {
    fontSize: 16,
    color: '#000',
  },
});

const mapStateToProps = state => ({
  getMember: state.dataReducers.getMember,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
