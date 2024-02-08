export default function FormatDate(date: string) {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    if (month < 10) {
        return day + '/0' + month + '/' + year;
    }
    else{
        return day + '/' + month + '/' + year;
    }

    
    
}
