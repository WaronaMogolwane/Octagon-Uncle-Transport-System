export class AuthenticationResponseModel {
  firebaseFunction?: String | null;
  uid?: String | null ;
  status?: String;
  errorCode?: String | null;
  errorMessage?: String | null;

  constructor(
    firebaseFunction?: String | null,
    uid?: String | null,
    status?: String,
    errorCode?: String | null,
    errorMessage?: String | null
  ) {
    this.firebaseFunction = firebaseFunction;
    this.uid = uid;
    this.status = status;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
