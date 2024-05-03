export function ConvertDate(dateString: string) {
  let date = dateString.substring(0, 10);
  //   var timeonly = dateString.substring(11, 19);
  //   var formattedDateTime = dateonly + ' ' + timeonly;
  //   var gdt = new GlideDateTime(formattedDateTime);

  return date;
}

export function SplitTimeString(dateTime: string) {
  if (
    dateTime == undefined ||
    dateTime == null ||
    dateTime == '' ||
    dateTime == 'null'
  ) {
    return null;
  } else {
    let time = dateTime.split('T')[1];
    let formattedTime = `${time.split(':')[0]}:${time.split(':')[1]}`;

    return formattedTime;
  }
}
