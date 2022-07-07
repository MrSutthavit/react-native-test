import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';

//action
import {SendMember} from '../actions/auth.action';

const Create = ({navigation, dispatch, getMember, route}) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [id, setid] = useState('');
  const [phone, setphone] = useState('');

  const phoneRegExp = '^[0-9]{10}$';
  const idRegExp = '^[0-9]{13}$';

  useEffect(() => {
    if (route.params != null) {
      const {type, temp} = route.params;
      const {firstName, lastName, id, phone} = temp;
      if (type === 'edit') {
        navigation.setOptions({
          headerTitle: 'แก้ไขสมาชิก',
        });
      }
    } else {
      navigation.setOptions({
        headerTitle: 'เพิ่มสมาชิก',
      });
    }
  }, [navigation, route]);

  useEffect(() => {
    if (route.params != null) {
      const {type, temp} = route.params;
      if (type === 'edit') {
        const {firstName, lastName, id, phone} = temp;
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('id', id);
        setValue('phone', phone);
      }
    }
  }, [route]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('กรุณากรอกชื่อ'),
    lastName: yup.string().required('กรุณากรอกนามสกุล'),
    id: yup
      .string()
      .matches(idRegExp, 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง')
      .required('กรุณากรอกนามสกุล'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
      .required('กรุณากรอกเบอร์โทรศัพท์'),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      id: id,
      phone: phone,
    },
  });

  const onSubmit = async data => {
    if (route.params != null) {
      const {type, temp} = route.params;
      if (type === 'edit') {
        let item = getMember.isResult;
        const index = item.indexOf(temp);
        if (index > -1) {
          item.splice(index, 1);
        }
        item.push(data);

        await dispatch(SendMember(item));
        navigation.navigate('Main');
      }
    } else {
      let temp = [];
      if (getMember.isResult != null && _.size(getMember.isResult) !== 0) {
        temp = getMember.isResult;
      }
      let item = temp;
      item.push(data);
      await dispatch(SendMember(item));
      navigation.navigate('Main');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.continer}>
      <ScrollView>
        <View style={styles.continer2}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.marginTop10}>
                <Text style={styles.textlabel}>ชื่อ</Text>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInput}
                />
              </View>
            )}
            name="firstName"
          />
          {errors.firstName != null ? (
            <Text style={styles.texterror}>{errors.firstName.message}</Text>
          ) : null}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.marginTop28}>
                <Text style={styles.textlabel}>นามสกุล</Text>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInput}
                />
              </View>
            )}
            name="lastName"
          />
          {errors.lastName != null ? (
            <Text style={styles.texterror}>{errors.lastName.message}</Text>
          ) : null}

          <Controller
            control={control}
            rules={{
              maxLength: 13,
              pattern: idRegExp,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.marginTop28}>
                <Text style={styles.textlabel}>เลขบัตรประชาชน</Text>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInput}
                />
              </View>
            )}
            name="id"
          />
          {errors.id != null ? (
            <Text style={styles.texterror}>{errors.id.message}</Text>
          ) : null}

          <Controller
            control={control}
            rules={{
              maxLength: 10,
              pattern: phoneRegExp,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.marginTop28}>
                <Text style={styles.textlabel}>เบอร์โทรศัพท์</Text>
                <TextInput
                  ref={register('phone')}
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.textInput}
                />
              </View>
            )}
            name={'phone'}
          />
          {errors.phone != null ? (
            <Text style={styles.texterror}>{errors.phone.message}</Text>
          ) : null}

          <View style={styles.viewTouch}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.TouchStyle}>
              <Text style={styles.TextTouch}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  continer2: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop28: {
    marginTop: 28,
  },
  textlabel: {
    fontSize: 12,
    color: '#000',
  },
  texterror: {
    fontSize: 14,
    color: 'red',
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 0,
  },
  viewTouch: {
    alignItems: 'center',
    marginVertical: 28,
  },
  TouchStyle: {
    borderWidth: 1,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#000',
    borderRadius: 8,
  },
  TextTouch: {
    fontSize: 18,
    color: '#000',
  },
});

const mapStateToProps = state => ({
  getMember: state.dataReducers.getMember,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Create);
