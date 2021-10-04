export class PipeUtils {
  public static account(value: string ) {

    if(value.length == 9 ) {
      const pipe0 = value.substr(0, 3);
      const pipe1 = value.substr(3, 3);
      const pipe2 = value.substr(6, 3);
      return pipe0 + '-'+pipe1+'-'+pipe2;
    } else {
      return value;
    }
  }

  public static accountBalance(value: number, currency: string) {
    if(currency === 'KH') {
      return (value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  public static gender(value: string ) {
    if(value === 'm') {
      return "Male";
    } else if (value === 'f') {
      return 'Female';
    }
    return 'Other';
  }


}
