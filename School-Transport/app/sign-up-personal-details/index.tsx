import { GestureResponderEvent, View } from "react-native";
import { UserDetailForm } from "../../src/Components/Forms/UserDetailForm";
import { ThemeStyles } from "../../src/Stylesheets/GlobalStyles";
import { useFormik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserDetail } from "../../src/Models/UserDetail";
import { AddUserDetail } from "../../src/Controllers/UserDetailController";

export default function UserDetailSignUp() {
  const userId = "c7728615-394f-466b-833e-ea9dd60ba836";

  const userDetailHelper = (values: any) => {
    let userDetail = new UserDetail(
      "",
      values.firstname,
      values.lastname,
      values.addressline1,
      values.addressline2,
      values.surburb,
      values.city,
      values.province,
      values.postalCode,
      userId
    );

    AddUserDetail(userDetail);
  };

  const userDetailSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Firstname too Short!")
      .max(50, "Firstname too Long!")
      .required("Required"),
    lastName: yup
      .string()
      .min(2, "lastname too Short!")
      .max(50, "lastname too Long!")
      .required("Required"),
    addressline1: yup
      .string()
      .min(2, "Address too Short!")
      .max(100, "Address too Long!")
      .required("Required"),
    addressline2: yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    suburb: yup
      .string()
      .min(2, "Suburb too Short!")
      .max(50, "Suburb too  Long!")
      .required("Required"),
    city: yup
      .string()
      .min(2, "City too Short!")
      .max(50, "City too Long!")
      .required("Required"),
    province: yup
      .string()
      .min(2, "Province too Short!")
      .max(50, "Province too Long!")
      .required("Required"),
    postalCode: yup
      .string()
      .min(2, "Postal code too Short!")
      .max(4, "Postal code too Long!")
      .required("Required"),
  });

  const userDetailsInitialValues = {
    firstname: "",
    lastname: "",
    addressline1: "",
    addressline2: "",
    surburb: "",
    city: "",
    province: "",
    postalCode: "",
  };

  const formik = useFormik({
    initialValues: userDetailsInitialValues,
    validationSchema: userDetailSchema,

    onSubmit: (values, { resetForm }) => {
      userDetailHelper(values);
      resetForm();
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{ paddingBottom: 15, paddingTop: 15 }}>
          <UserDetailForm
            firstNameIsInvalid={!!formik.errors.firstname}
            firstNameOnChangeText={formik.handleChange("firstname")}
            firstNameErrorText={formik?.errors?.firstname}
            firstNameOnBlur={formik.handleBlur("firstname")}
            firstNameValue={formik.values?.firstname}
            lastNameIsInvalid={!!formik.errors.lastname}
            lastNameOnChangeText={formik.handleChange("lastname")}
            lastNameErrorText={formik?.errors?.lastname}
            lastNameOnBlur={formik.handleBlur("lastname")}
            lastNameValue={formik.values?.lastname}
            addressline1IsInvalid={!!formik.errors.addressline1}
            addressline1OnChangeText={formik.handleChange("addressline1")}
            addressline1ErrorText={formik?.errors?.addressline1}
            addressline1OnBlur={formik.handleBlur("addressline1")}
            addressline1Value={formik.values?.addressline1}
            addressline2IsInvalid={!!formik.errors.addressline2}
            addressline2OnChangeText={formik.handleChange("addressline2")}
            addressline2ErrorText={formik?.errors?.addressline2}
            addressline2OnBlur={formik.handleBlur("addressline2")}
            addressline2Value={formik.values?.addressline2}
            suburbIsInvalid={!!formik.errors.surburb}
            suburbOnChangeText={formik.handleChange("surburb")}
            suburbErrorText={formik?.errors?.surburb}
            suburbOnBlur={formik.handleBlur("surburb")}
            suburbValue={formik.values?.surburb}
            cityIsInvalid={!!formik.errors.city}
            cityOnChangeText={formik.handleChange("city")}
            cityErrorText={formik?.errors?.city}
            cityOnBlur={formik.handleBlur("city")}
            cityValue={formik.values?.city}
            provinceIsInvalid={!!formik.errors.province}
            provinceOnChangeText={formik.handleChange("province")}
            provinceErrorText={formik?.errors?.province}
            provinceOnBlur={formik.handleBlur("province")}
            provinceValue={formik.values?.province}
            postalCodeIsInvalid={!!formik.errors.postalCode}
            postalCodeOnChangeText={formik.handleChange("postalCode")}
            postalCodeErrorText={formik?.errors?.postalCode}
            postalCodeOnBlur={formik.handleBlur("postalCode")}
            postalCodeValue={formik.values?.postalCode}
            submitUserDetails={
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined
              ) => void
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
