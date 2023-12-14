export function ConvertDate(dateString: string) {
  let date = dateString.substring(0, 10);
  //   var timeonly = dateString.substring(11, 19);
  //   var formattedDateTime = dateonly + ' ' + timeonly;
  //   var gdt = new GlideDateTime(formattedDateTime);

  return date;
}
