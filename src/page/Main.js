import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, ScrollView} from 'react-native';
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
    <View
      style={{
        borderWidth: 1,
        marginTop: 20,
        flexDirection: 'row',
        padding: 10,
      }}>
      <View style={{width: '90%'}}>
        <Text style={{fontSize: 16, color: '#000'}}>
          ชื่อ: {item.firstName} {item.lastName}
        </Text>
        <Text style={{fontSize: 16, color: '#000'}}>ID: {item.id}</Text>
        <Text style={{fontSize: 16, color: '#000'}}>เบอร์: {item.phone}</Text>
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
          <FlatList
            nestedScrollEnabled
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 60,
                }}>
                <Text style={{fontSize: 18, color: '#000'}}>
                  คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Create');
            }}
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
              width: '50%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#000'}}>เพิ่ม</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderRadius: 28,
              width: '60%',
              height: '20%',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 8,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, color: '#000'}}>ลบสมาชิก</Text>
              <Text style={{fontSize: 14, color: '#000'}}>ต้องการลบ</Text>
              <Text style={{fontSize: 14, color: '#000'}}>
                {selectdata.firstName} {selectdata.lastName}
              </Text>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                width: '100%',
                flexDirection: 'row',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setmodalVisible(false);
                }}
                style={{
                  width: '50%',
                  borderRightWidth: 1,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#000'}}>ไม่</Text>
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
                style={{
                  width: '50%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#000'}}>ใช่</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const mapStateToProps = state => ({
  getMember: state.dataReducers.getMember,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
