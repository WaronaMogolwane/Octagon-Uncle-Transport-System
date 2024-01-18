import {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, GestureResponderEvent} from 'react-native';
import {SignUpForm} from '../../Components/Forms/SignUpForm';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';

const SignUpScreen = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [role, setRole] = useState('');

  const phoneRegExp: RegExp =
    /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  const passwordExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const registerSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        passwordExp,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string().email('Invalid email').required('Email is required'),
    cellphone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Cellphone is required'),
    otp: yup.string(),
  });
  const registerInitialValues = {
    password: '',
    confirmPassword: '',
    email: '',
    cellphone: '',
    opt: '',
  };
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: (values, {resetForm}) => {
      setShowModal(true);
    },
  });

  const GoToUserDetailsSignUp = () => {
    navigation.navigate('User Details Sign Up');
  };
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <View>
        <SignUpForm
          emailIsInvalid={!!formik.errors.email}
          emailOnChangeText={formik.handleChange('email')}
          emailErrorText={formik?.errors?.email}
          emailOnBlur={formik.handleBlur('email')}
          emailValue={formik.values?.email}
          passwordIsInvalid={!!formik.errors.password}
          passwordOnChangeText={formik.handleChange('password')}
          passwordErrorText={formik?.errors?.password}
          passwordOnBlur={formik.handleBlur('password')}
          passwordValue={formik.values?.password}
          cellphoneErrorText={formik?.errors?.cellphone}
          cellphoneIsInvalid={!!formik.errors.cellphone}
          cellphoneOnBlur={formik.handleBlur('cellphone')}
          cellphoneOnChangeText={formik.handleChange('cellphone')}
          cellphoneValue={formik.values?.cellphone}
          confirmPasswordIsInvalid={!!formik.errors.password}
          confirmPasswordOnChangeText={formik.handleChange('password')}
          confirmPasswordErrorText={formik?.errors?.password}
          confirmPasswordOnBlur={formik.handleBlur('password')}
          confirmPasswordValue={formik.values?.password}
          signUpButtonOnPress={
            formik.handleSubmit as (
              values:
                | GestureResponderEvent
                | React.FormEvent<HTMLFormElement>
                | undefined,
            ) => void
          }
        />
      </View>
      <VerifyEmailModal
        ShowModal={showModal}
        ToEmailAddress={formik.values.email}
        VerifyOtpButtonOnPress={() => {
          setShowModal(false);
          GoToUserDetailsSignUp();
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
};
export default SignUpScreen;
